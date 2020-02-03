var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const AdminModel = require('../models/admin_user.tsx');
const TokenByDate = require('../models/token_by_date.tsx');
const Transactions = require('../models/transaction.tsx');
const User = require('../models/user.tsx');
var bcrypt = require('bcrypt-nodejs');
User.Promise = global.Promise;
exports.GetDashboardData = (req, res, next) => {
    AdminModel.findOne(function (err, admin) {
        if (admin != null) {
            TokenByDate.find().sort({ createdAt: 1 }).skip(req.body.LoadedCount).limit(5).exec(function (err, DataList) {
                if (DataList != null) {
                    return res.status(200).json({
                        TotalUser: admin.UserCount,
                        TotalUSTX: admin.BuyAmount - admin.SellAmount,
                        Labels: DataList.map(data => `${data.createdAt.getMonth()}/${data.createdAt.getDate()}`),
                        Series: [DataList.map(data => data.Buy), DataList.map(data => data.Sell)]
                    });
                }
                else
                    return res.status(204).json();
            });
        }
        else
            return res.status(204).json();
    });
};
const getNameByEmail = (Email) => {
    User.findOne({ email: Email }, 'firstName lastName', function (err, user) {
        if (user != null) {
            return user.firstName + ' ' + user.lastName;
            /*
             return {
                 trans_id: item.Unique_ID,
                 name: user.firstName + ' ' +user.lastName,
                 email: item.Email,
                 ustx: item.USTX,
                 usd: item.USD
             };*/
        }
    });
};
exports.GetSellRequests = (req, res, next) => {
    Transactions.find({ SellConfirmed: false }, function (err, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data != null) {
                return res.status(200).json({
                    dataRows: data.map(function (item) {
                        try {
                            return {
                                trans_id: item.Unique_ID,
                                name: item.Name,
                                email: item.Email,
                                ustx: item.USTX,
                                usd: item.USD,
                                bank: item.Bank
                            };
                        }
                        catch (e) {
                        }
                    })
                });
            }
            else
                return res.status(205).json();
        });
    });
};
exports.CheckConfirm = (req, res, next) => {
    console.log(req.body);
    Transactions.findOne({ Unique_ID: req.body.Unique_ID }, function (err, trans) {
        console.log(trans);
        if (trans != null) {
            trans.SellConfirmed = true;
            trans.save();
            return res.status(200).json();
        }
        else {
            return res.status(205).json();
        }
    });
};
exports.SetTokenPrice = (req, res, next) => {
    AdminModel.findOne(function (err, admin) {
        if (admin != null) {
            admin.TokenPrice = req.body.TokenPrice;
            admin.save();
            return res.status(200).json();
        }
        else
            return res.stat(204).json();
    });
};
exports.GetTokenPrice = (req, res, next) => {
    AdminModel.findOne(function (err, admin) {
        if (admin != null) {
            return res.status(200).json({
                TokenPrice: admin.TokenPrice
            });
        }
        else
            return res.stat(204).json();
    });
};
exports.UpdatePassword = (req, res, next) => {
    AdminModel.findOne(function (err, admin) {
        admin.verifyPassword(req.body.OldPassword, function (err, isMatch) {
            if (err)
                throw err;
            if (isMatch) {
                admin.generateJWTPassword(req.body.NewPassword, function (err, hash) {
                    if (err)
                        throw err;
                    admin.Password = hash;
                    admin.save();
                    return res.status(200).json();
                });
            }
            else {
                return res.status(204).json();
            }
        });
        //if (admin != null){
        //    if (admin.Password == req.body.OldPassword) {
        //        //admin.Password = req.body.NewPassword;
        //				//admin.Password = admin.generateJwtPassword();
        //        //admin.save();
        //        return res.status(200).json();
        //    } else{
        //        return res.status(205).json();
        //    }
        //} else{
        //    return res.status(204).json();
        //}
    });
};
exports.LogIn = (req, res, next) => {
    AdminModel.findOne(function (err, admin) {
        //admin.generateJWTPassword(req.body.UserPassword, function(err, hash){
        //    if(err) throw err;
        //		console.log(hash);
        //});
        if (admin != null) {
            if (admin.Name !== '' && admin.Password !== '') {
                admin.verifyPassword(req.body.UserPassword, function (err, isMatch) {
                    if (err)
                        res.status(205).json();
                    if (isMatch) {
                        return res.status(200).json();
                    }
                    else {
                        return res.status(204).json();
                    }
                });
            }
            else {
                return res.status(204).json();
            }
        }
        else {
            return res.status(204).json();
        }
    });
};
exports.getTotalPurchase = (req, res, next) => {
    Transactions.find({ type: false }, function (err, docs) {
        let count = 0;
        for (let i = 0; docs.length > i; i++) {
            let data = docs[i];
            count += parseFloat(data.USTX);
        }
        return res.status(200).json({ result: count });
    });
};
exports.getBuySellTokens = (req, res, next) => {
    Transactions.aggregate([
        { $project: {
                date: {
                    year: { $year: "$createdAt" }, month: { $month: "$createdAt" },
                    day: { $dayOfMonth: '$createdAt' }
                },
                type: true,
                USTX: true
            } },
        //{ $addFields: { test: { $convert: { input: '$USTX', to: 'double'}}}}, 
        { $group: {
                _id: { date: '$date' },
                buy: { $push: { $cond: [{ "$eq": ['$type', false] }, '$USTX', 0] } },
                sell: { $push: { $cond: [{ "$eq": ['$type', true] }, '$USTX', 0] } },
            } },
        { $sort: { '_id': 1 }
        }
    ], function (err, doc) {
        let result = {};
        let buyGroup = [];
        let sellGroup = [];
        for (let i = 0; doc.length > i; i++) {
            let data = doc[i];
            let date = [data._id.date.year, data._id.date.month, data._id.date.day].join('-');
            data.date = new Date(date).getTime();
            data.buy = data.buy.map((buy) => { return parseFloat(buy); });
            data.buy = data.buy.reduce((a, b) => { return a + b; }, 0);
            data.sell = data.sell.map(function (sell) { return parseFloat(sell); });
            data.sell = data.sell.reduce((a, b) => { return a + b; }, 0);
            buyGroup.push([data.date, data.buy]);
            sellGroup.push([data.date, data.sell]);
        }
        result.buyGroup = buyGroup;
        result.sellGroup = sellGroup;
        return res.status(200).json({ result: result });
    });
    /*
    Transactions.find({}, function(err, docs){
      let buyArray = [];
      let sellArray = [];
      for(let i=0; docs.length > i; i++){
        let data = docs[i];
        if(data.type == false){
          buyArray.push(parseFloat(data.USTX));
        }else{
          sellArray.push(parseFloat(data.USTX));
        }
      }
      return res.status(200).json({ result: { buyArray, sellArray } });
    });
    */
};
