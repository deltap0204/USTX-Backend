const ParameterParser = require('../services/parameter-parser.ts').ParameterParser;
const ShareValueService = require('../services/share-value.service.ts').ShareValueService;
const FundValueService = require('../services/fund-value.service.ts').FundValueService;
const CommonsService = require('../services/commons.service.ts').CommonsService;
const TOKEN_PROPERTIES = require('../models/token-properties.ts').TOKEN_PROPERTIES;
const TokenPropertiesService = require('../services/token-properties.service.ts').TokenPropertiesService;

const AdminModel = require('../models/admin_user.tsx');
const TokenByDate = require('../models/token_by_date.tsx');
const Transactions = require('../models/transaction.tsx');
const TokenPropertiesModel = require('../models/token-properties.model.ts');
const User = require('../models/user.tsx');
var bcrypt = require('bcrypt-nodejs');
User.Promise = global.Promise;

exports.GetDashboardData = (req, res, next) => {
    AdminModel.findOne(function (err, admin) {
        if (admin != null) {

            TokenByDate.find().sort({createdAt: 1}).skip(req.body.LoadedCount).limit(5).exec(function (err, DataList) {
                if (DataList != null) {
                    return res.status(200).json({
                        TotalUser: admin.UserCount,
                        TotalUSTX: admin.BuyAmount - admin.SellAmount,
                        Labels: DataList.map(data => `${data.createdAt.getMonth()}/${data.createdAt.getDate()}`),
                        Series: [DataList.map(data => data.Buy),
                            DataList.map(data => data.Sell)]
                    });
                } else
                    return res.status(204).json();
            })
        } else
            return res.status(204).json();
    })
};
const getNameByEmail = (Email) => {
    User.findOne({email: Email}, 'firstName lastName', function (err, user) {
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
    })
};
exports.GetSellRequests = (req, res, next) => {
    Transactions.find({SellConfirmed: false}, async function (err, data) {
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
                        }
                    } catch (e) {

                    }
                })
            });
        } else
            return res.status(205).json();
    });
};
exports.CheckConfirm = (req, res, next) => {
    console.log(req.body);

    Transactions.findOne({Unique_ID: req.body.Unique_ID}, function (err, trans) {
        console.log(trans);
        if (trans != null) {
            trans.SellConfirmed = true;
            trans.save();
            return res.status(200).json();
        } else {
            return res.status(205).json();
        }
    })
};
exports.SetTokenPrice = (req, res, next) => {
    AdminModel.findOne(function (err, admin) {
        if (admin != null) {
            admin.TokenPrice = req.body.TokenPrice;
            admin.save();
            return res.status(200).json();
        } else return res.status(204).json();
    });
};
exports.GetTokenPrice = (req, res, next) => {
    AdminModel.findOne(function (err, admin) {
        if (admin != null) {
            return res.status(200).json({
                TokenPrice: admin.TokenPrice
            });
        } else return res.status(204).json();
    });
};
exports.UpdatePassword = (req, res, next) => {
    AdminModel.findOne(function (err, admin) {
        admin.verifyPassword(req.body.OldPassword, function (err, isMatch) {
            if (err) throw err;

            if (isMatch) {
                admin.generateJWTPassword(req.body.NewPassword, function (err, hash) {
                    if (err) throw err;

                    admin.Password = hash;
                    admin.save()
                    return res.status(200).json();
                });
            } else {
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
    })
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
                    if (err) res.status(205).json();

                    if (isMatch) {
                        return res.status(200).json();
                    } else {
                        return res.status(204).json();
                    }
                });
            } else {
                return res.status(204).json();
            }
        } else {
            return res.status(204).json();
        }

    })
};

exports.getTotalPurchase = (req, res, next) => {
    Transactions.find({type: false}, function (err, docs) {
        let count = 0;
        for (let i = 0; docs.length > i; i++) {
            let data = docs[i];
            count += parseFloat(data.USTX);
        }
        return res.status(200).json({result: count});
    });
};

exports.getBuySellTokens = (req, res, next) => {
    Transactions.aggregate([
        {
            $project: {
                date: {
                    year: {$year: '$createdAt'}, month: {$month: '$createdAt'},
                    day: {$dayOfMonth: '$createdAt'}
                },
                type: true,
                USTX: true
            }
        },
        //{ $addFields: { test: { $convert: { input: '$USTX', to: 'double'}}}},
        {
            $group: {
                _id: {date: '$date'},
                buy: {
                    $push: {
                        $cond: [{
                            '$eq': ['$type',
                                false]
                        },
                            '$USTX',
                            0]
                    }
                },
                sell: {
                    $push: {
                        $cond: [{
                            '$eq': ['$type',
                                true]
                        },
                            '$USTX',
                            0]
                    }
                },
            }
        },
        {
            $sort: {'_id': 1}
        }], function (err, doc) {

        let result = {};
        let buyGroup = [];
        let sellGroup = [];
        for (let i = 0; doc.length > i; i++) {
            let data = doc[i];
            let date = [data._id.date.year,
                data._id.date.month,
                data._id.date.day].join('-');
            data.date = new Date(date).getTime();
            data.buy = data.buy.map((buy) => {
                return parseFloat(buy)
            });
            data.buy = data.buy.reduce((a, b) => {
                return a + b
            }, 0);

            data.sell = data.sell.map(function (sell) {
                return parseFloat(sell)
            });
            data.sell = data.sell.reduce((a, b) => {
                return a + b
            }, 0);

            buyGroup.push([data.date,
                data.buy]);
            sellGroup.push([data.date,
                data.sell]);
        }

        result.buyGroup = buyGroup;
        result.sellGroup = sellGroup;

        return res.status(200).json({result: result});
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

exports.createSharePriceForDate = async (req, res, next) => {
    try {
        const payload = req.body;
        const date = ParameterParser.getDateParameter(payload, 'date', true);
        const price = ParameterParser.getStringParameter(payload, 'price', true);
        const value = await ShareValueService.createShareValueForDate(price, date);
        return res.status(200).json(value);
    } catch (e) {
        return res.status(500).json({error: e});
    }
};

exports.getShareValueForDate = async (req, res, next) => {
    try {
        const payload = req.query;
        console.log(req)
        const date = ParameterParser.getDateParameter(payload, 'date', true);
        const value = await ShareValueService.getShareValueForDate(date);
        return res.status(200).json(value);
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: e});
    }
};

exports.createSharePricesForDates = async (req, res, next) => {
    try {
        const payload = req.body;
        const startDate = CommonsService.getMomentFromDate(
            ParameterParser.getDateParameter(payload, 'start_date', true));
        const endDate = CommonsService.getMomentFromDate(ParameterParser.getDateParameter(payload, 'end_date', true));
        let currentDate = startDate;
        const results = [];
        while (currentDate.isBefore(endDate)) {
            let existingValue = await ShareValueService.getShareValueForDate(currentDate);
            if (CommonsService.isNullOrUndefined(existingValue)) {

                const shareValue = await ShareValueService.getNextDayShareValue(currentDate.clone().add(-1, 'days'));
                existingValue = await ShareValueService.createShareValueForDate(shareValue, currentDate);
            }
            results.push(existingValue);
            currentDate = currentDate.clone().add(1, 'days');
        }
        return res.status(200).json(results);
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: e});
    }
};

exports.getShareValueForDates = async (req, res, next) => {
    try {
        const payload = req.query;
        const startDate = CommonsService.getMomentFromDate(
            ParameterParser.getDateParameter(payload, 'start_date', true)).clone().startOf('day');
        const endDate = CommonsService.getMomentFromDate(ParameterParser.getDateParameter(payload, 'end_date', true))
            .clone().endOf('day');
        const results = await ShareValueService.getShareValueForDateRanges(startDate, endDate);
        return res.status(200).json(results);
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: e});
    }
};

exports.getTokenProperties = async (req, res, next) => {
    try {
        const token = await TokenPropertiesService.getTokenProperties();
        return res.status(200).json({token});
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: e});
    }
};

exports.setTokenProperties = async (req, res, next) => {
    try {
        const token = await TokenPropertiesService.getTokenProperties();
        token.tokenTotal = CommonsService.isNullOrUnDefined(req.body.tokenTotal) ? token.tokenTotal : ParameterParser.getIntegerParameter(req.body.tokenTotal, 'tokenTotal', false);
        token.tokenStartTime = CommonsService.isNullOrUnDefined(req.body.tokenStartTime) ? token.tokenStartTime : ParameterParser.getDateParameter(req.body.fun, 'tokenStartTime', false);
        token.fundInterest = CommonsService.isNullOrUnDefined(req.body.fundInterest) ? token.fundInterest : ParameterParser.getFloatParameter(req.body, 'fundInterest', false);
        token.intialShareValue = CommonsService.isNullOrUnDefined(req.body.intialShareValue) ? token.intialShareValue : ParameterParser.getFloatParameter(req.body, 'intialShareValue', false);
        token.intialPreFundValue = CommonsService.isNullOrUnDefined(req.body.intialPreFundValue) ? token.intialPreFundValue : ParameterParser.getFloatParameter(req.body, 'intialPreFundValue', false);
        token.intialEndingFundValue = CommonsService.isNullOrUnDefined(req.body.intialEndingFundValue) ? token.intialEndingFundValue : ParameterParser.getFloatParameter(req.body, 'intialEndingFundValue', false);
        token.depositFeeRate = CommonsService.isNullOrUnDefined(req.body.depositFeeRate) ? token.depositFeeRate : ParameterParser.getFloatParameter(req.body, 'depositFeeRate', false);
        TokenPropertiesService.updateTokenProperties(token);
        return res.status(200).json();
    } catch (e) {
        return res.status(500).json({error: e});
    }
};

exports.createStartShareValue = async (req, res, next) => {
    try {
        const startDate = CommonsService.getMomentFromDate(TOKEN_PROPERTIES.TOKEN_START_TIME);
        const price = TOKEN_PROPERTIES.INITIAL_SHARE_VALUE;
        const interest = TOKEN_PROPERTIES.FUND_INTEREST;
        const value = await ShareValueService.createShareValueForDate(price, startDate, interest);
        return res.status(200).json(value);
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: e});
    }
}

exports.createStartFundValue = async (req, res, next) => {
    try {
        const startDate = CommonsService.getMomentFromDate(TOKEN_PROPERTIES.TOKEN_START_TIME);
        const price = TOKEN_PROPERTIES.INITIAL_PRE_FUND_VALUE;
        const value = await FundValueService.createFundValueForDate(price, startDate);
        value.endingFundValue = TOKEN_PROPERTIES.INITIAL_ENDING_FUND_VALUE;
        const finalValue = await FundValueService.updateFundValue(value);
        return res.status(200).json(value);
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: e});
    }
}

exports.getFundValueForDate = async (req, res, next) => {
    try {
        const payload = req.query;
        const date = ParameterParser.getDateParameter(payload, 'date', true);
        const value = await FundValueService.getFundValueForDate(date);
        return res.status(200).json(value);
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: e});
    }
};

exports.createFundValuesForDates = async (req, res, next) => {
    try {
        const payload = req.body;
        const startDate = CommonsService.getMomentFromDate(
            ParameterParser.getDateParameter(payload, 'start_date', true));
        const endDate = CommonsService.getMomentFromDate(ParameterParser.getDateParameter(payload, 'end_date', true));
        let currentDate = startDate;
        const results = [];
        while (currentDate.isBefore(endDate)) {
            let existingFundValue = await FundValueService.getFundValueForDate(currentDate);
            if (CommonsService.isNullOrUndefined(existingFundValue)) {
                const fundValue = await FundValueService.getNextDayPreAdjustmentFundValue(
                    currentDate.clone().add(-1, 'days'));
                existingFundValue = await FundValueService.createFundValueForDate(fundValue, currentDate);
            }
            results.push(existingFundValue);
            currentDate = currentDate.clone().add(1, 'days');
        }
        return res.status(200).json(results);
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: e});
    }
};

exports.getFundValuesForDates = async (req, res, next) => {
    try {
        const payload = req.query;
        const startDate = CommonsService.getMomentFromDate(
            ParameterParser.getDateParameter(payload, 'start_date', true)).clone().startOf('day');
        const endDate = CommonsService.getMomentFromDate(ParameterParser.getDateParameter(payload, 'end_date', true))
            .clone().endOf('day');
        const results = await FundValueService.getFundValueForDateRanges(startDate, endDate);
        return res.status(200).json(results);
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: e});
    }
};

exports.getFundValueForDate = async (req, res, next) => {

}
exports.updateEndFundValuesForDates = async (req, res, next) => {
    try {
        const payload = req.body;
        const startDate = CommonsService.getMomentFromDate(
            ParameterParser.getDateParameter(payload, 'start_date', true));
        const endDate = CommonsService.getMomentFromDate(ParameterParser.getDateParameter(payload, 'end_date', true));
        let currentDate = startDate;
        const results = [];
        while (currentDate.isBefore(endDate)) {
            const fundValue = await FundValueService.getFundValueForDate(currentDate);
            let endingFundValue = await FundValueService.getEndingAdjustmentFundValue(currentDate);
            fundValue.endingFundValue = endingFundValue;
            endingFundValue = await FundValueService.updateFundValue(fundValue);
            results.push(endingFundValue);
            currentDate = currentDate.clone().add(1, 'days');
        }
        return res.status(200).json(results);
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: e});
    }
};
