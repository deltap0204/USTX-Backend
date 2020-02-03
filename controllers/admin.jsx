var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var AdminModel = require('../models/admin_user.tsx');
var TokenByDate = require('../models/token_by_date.tsx');
var Transactions = require('../models/transaction.tsx');
var User = require('../models/user.tsx');
User.Promise = global.Promise;
exports.GetDashboardData = function (req, res, next) {
    AdminModel.findOne(function (err, admin) {
        if (admin != null) {
            TokenByDate.find().sort({ createdAt: 1 }).skip(req.body.LoadedCount).limit(5).exec(function (err, DataList) {
                if (DataList != null) {
                    return res.status(200).json({
                        TotalUser: admin.UserCount,
                        TotalUSTX: admin.BuyAmount - admin.SellAmount,
                        Labels: DataList.map(function (data) { return data.createdAt.getMonth() + "/" + data.createdAt.getDate(); }),
                        Series: [DataList.map(function (data) { return data.Buy; }), DataList.map(function (data) { return data.Sell; })]
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
var getNameByEmail = function (Email) {
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
exports.GetSellRequests = function (req, res, next) {
    Transactions.find({ SellConfirmed: false }, function (err, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (data != null) {
                    return [2 /*return*/, res.status(200).json({
                            dataRows: data.map(function (item) {
                                try {
                                    return {
                                        trans_id: item.Unique_ID,
                                        name: item.Name,
                                        email: item.Email,
                                        ustx: item.USTX,
                                        usd: item.USD
                                    };
                                }
                                catch (e) {
                                }
                            })
                        })];
                }
                else
                    return [2 /*return*/, res.status(205).json()];
                return [2 /*return*/];
            });
        });
    });
};
exports.CheckConfirm = function (req, res, next) {
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
exports.SetTokenPrice = function (req, res, next) {
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
exports.GetTokenPrice = function (req, res, next) {
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
exports.UpdatePassword = function (req, res, next) {
    AdminModel.findOne(function (err, admin) {
        console.log("admin", admin);
        console.log("old", req.body.OldPassword);
        if (admin != null) {
            if (admin.Password == req.body.OldPassword) {
                admin.Password = req.body.NewPassword;
                admin.save();
                return res.status(200).json();
            }
            else {
                return res.status(205).json();
            }
        }
        else {
            return res.status(204).json();
        }
    });
};
exports.LogIn = function (req, res, next) {
    AdminModel.findOne(function (err, admin) {
        if (admin != null) {
            if (admin.Name == req.body.UserName && admin.Password == req.body.UserPassword) {
                return res.status(200).json();
            }
            else {
                return res.status(205).json();
            }
        }
        else {
            return res.status(204).json();
        }
    });
};
