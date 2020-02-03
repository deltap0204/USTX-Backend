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
var _this = this;
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var passport = require('passport');
var LocalStrategy = require('passport-local');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var User = require("../models/user.tsx");
var countries = require("../models/country.tsx");
var states = require("../models/state.tsx");
var cities = require("../models/cities.tsx");
var AdminModel = require("../models/admin_user.tsx");
var tokeninfo_url;
require('../services/passport.tsx');
var sgMail = require('@sendgrid/mail');
var generator = require('generate-password');
var fs = require('file-system');
function generateToken() {
    return __awaiter(this, void 0, void 0, function () {
        var buffer, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        crypto.randomBytes(256, function (ex, buffer) {
                            if (ex) {
                                reject("error generating token");
                            }
                            resolve(buffer);
                        });
                    })];
                case 1:
                    buffer = _a.sent();
                    token = crypto
                        .createHash("sha1")
                        .update(buffer)
                        .digest("hex");
                    console.log(token);
                    return [2 /*return*/, token];
            }
        });
    });
}
exports.signup = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var buffer, buffer2, token, token_pass;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                    crypto.randomBytes(256, function (ex, buffer) {
                        if (ex) {
                            reject("error generating token");
                        }
                        resolve(buffer);
                    });
                })];
            case 1:
                buffer = _a.sent();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        crypto.randomBytes(256, function (ex, buffer) {
                            if (ex) {
                                reject("error generating token");
                            }
                            resolve(buffer);
                        });
                    })];
            case 2:
                buffer2 = _a.sent();
                token = crypto
                    .createHash("sha1")
                    .update(buffer)
                    .digest("hex");
                token_pass = crypto
                    .createHash("sha1")
                    .update(buffer2)
                    .digest("hex");
                User.find({ 'email': req.body.email })
                    .then(function (user) {
                    if (user.length >= 1) {
                        return res.status(200).json({
                            message: "Mailexists",
                            LoginData: []
                        });
                    }
                    else {
                        var password = generator.generate({
                            length: 10,
                            numbers: true
                        });
                        var username_1 = req.body.firstName + ' ' + req.body.lastName;
                        bcrypt.hash(password, 10, function (err, hash) {
                            var user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                mobileNo: req.body.mobileNo,
                                email: req.body.email,
                                DOB: req.body.DOB,
                                SSN: req.body.SSN,
                                usCity: req.body.usCity,
                                address: {
                                    country: req.body.address.country,
                                    AddressLine1: req.body.address.AddressLine1,
                                    AddressLine2: req.body.address.AddressLine2,
                                    city: req.body.address.city,
                                    state: req.body.address.state,
                                    zipCode: req.body.address.zipCode
                                },
                                password: hash,
                                Active: false,
                                confirmation_tokken: token,
                                reset_pass_confirmation_tokken: token_pass
                            });
                            tokeninfo_url = process.env.REACT_APP_FRONT_URL + "signup_verify/" + user.confirmation_tokken;
                            user.save()
                                .then(function (result) {
                                Verify_Email(req.body.email, password, username_1);
                                User.findOne({ email: req.body.email }, function (err, obj) {
                                    var obje = {
                                        _id: obj._id,
                                        firstName: obj.firstName,
                                        lastName: obj.lastName,
                                        mobileNo: obj.mobileNo,
                                        email: obj.email,
                                        DOB: obj.DOB,
                                        SSN: obj.SSN,
                                        usCity: obj.usCity,
                                        address: {
                                            country: obj.address.country,
                                            AddressLine1: obj.address.AddressLine1,
                                            AddressLine2: obj.address.AddressLine2,
                                            city: obj.address.city,
                                            state: obj.address.state,
                                            zipCode: obj.address.zipCode
                                        },
                                        Active: obj.Active
                                    };
                                    console.log("yes3");
                                    AdminModel.findOne({}, {}, function (err, admin) {
                                        if (admin == null) {
                                            User.count({}, function (err, c) {
                                                var newAdmin = new AdminModel({
                                                    Buy: 0,
                                                    Sell: 0,
                                                    UserCount: c
                                                });
                                                newAdmin.save();
                                            });
                                        }
                                        else {
                                            admin.UserCount++;
                                            admin.save();
                                        }
                                    });
                                    return res.status(201).json({
                                        message: "User created",
                                        LoginData: obje
                                    });
                                });
                            })
                                .catch(function (err) {
                                console.log(err);
                                return res.status(500).json({
                                    error: err
                                });
                            });
                        });
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
exports.login = function (req, res, next) {
    var token_user = req.body.token;
    if (token_user != "token") {
        User.findOne({ confirmation_tokken: token_user }, function (err, obj) {
            if (obj != null) {
                var obje = {
                    _id: obj._id,
                    firstName: obj.firstName,
                    lastName: obj.lastName,
                    mobileNo: obj.mobileNo,
                    email: obj.email,
                    DOB: obj.DOB,
                    SSN: obj.SSN,
                    usCity: obj.usCity,
                    address: {
                        country: obj.country,
                        AddressLine1: obj.AddressLine1,
                        AddressLine2: obj.AddressLine2,
                        city: obj.city,
                        state: obj.state,
                        zipCode: obj.zipCode
                    },
                    password: obj.password,
                    Active: true,
                    confirmation_tokken: obj.confirmation_tokken,
                    reset_pass_confirmation_tokken: obj.reset_pass_confirmation_tokken
                };
                User.update({ '_id': obje._id }, obje)
                    .then(function (doc) {
                    if (!doc) {
                        return res.status(404).end();
                    }
                    return res.status(200).json(doc);
                })
                    .catch(function (err) {
                    console.log(err);
                });
                return res.status(200).json({
                    message: "success",
                    LoginData: obje
                });
            }
        });
    }
    else {
        User.findOne({ email: req.body.email }, function (err, obj) {
            console.log(obj);
            if (obj != null) {
                bcrypt.compare(req.body.password, obj.password, function (err, result) {
                    if (result) {
                        var obje = {
                            _id: obj._id,
                            firstName: obj.firstName,
                            lastName: obj.lastName,
                            mobileNo: obj.mobileNo,
                            email: obj.email,
                            DOB: obj.DOB,
                            SSN: obj.SSN,
                            usCity: obj.usCity,
                            address: {
                                country: obj.address.country,
                                AddressLine1: obj.address.AddressLine1,
                                AddressLine2: obj.address.AddressLine2,
                                city: obj.address.city,
                                state: obj.address.state,
                                zipCode: obj.address.zipCode
                            },
                            Active: obj.Active
                        };
                        ////////////////check login///////////////////
                        if (!obje.Active) {
                            return res.status(205).json({
                                message: "No Active",
                                LoginData: null
                            });
                        }
                        else if (err) {
                            return res.status(409).json({
                                message: "Auth failed",
                                LoginData: null
                            });
                        }
                        else if (obj.Active) {
                            return res.status(200).json({
                                message: "success",
                                LoginData: obje
                            });
                        }
                    }
                    else {
                        return res.status(204).json({
                            message: "Password Error"
                        });
                    }
                });
            }
            else {
                return res.status(204).json({
                    message: "Not Exist",
                    LoginData: null
                });
            }
        });
    }
};
exports.login_new = function (req, res, next) {
    console.log(req.params.id);
    User.findOne({ confirmation_tokken: req.params.id }, function (err, obj) {
        if (obj != null) {
            console.log("venus_token_____", req.params.id);
            var obje = {
                _id: obj._id,
                firstName: obj.firstName,
                lastName: obj.lastName,
                mobileNo: obj.mobileNo,
                email: obj.email,
                DOB: obj.DOB,
                SSN: obj.SSN,
                usCity: obj.usCity,
                address: {
                    country: obj.country,
                    AddressLine1: obj.AddressLine1,
                    AddressLine2: obj.AddressLine2,
                    city: obj.city,
                    state: obj.state,
                    zipCode: obj.zipCode
                },
                password: obj.password,
                Active: true,
                confirmation_tokken: obj.confirmation_tokken,
                reset_pass_confirmation_tokken: obj.reset_pass_confirmation_tokken
            };
            User.update({ '_id': obje._id }, obje)
                .then(function (doc) {
                if (!doc) {
                    return res.status(404).end();
                }
                return res.status(200).json(doc);
            })
                .catch(function (err) {
                console.log(err);
            });
        }
    });
};
exports.edituser = function (req, res, next) {
    User.update({ '_id': req.body._id }, req.body)
        .then(function (doc) {
        if (!doc) {
            return res.status(404).end();
        }
        return res.status(200).json(doc);
    })
        .catch(function (err) {
        console.log(err);
    });
};
exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};
function next(error) {
    console.log(error);
}
exports.GetCountry = function (req, res, next) {
    mongoose.model('countries').find(function (err, countries) {
        return res.status(200).json({
            message: "success",
            data: countries
        });
    });
};
exports.GetStates = function (req, res, next) {
    mongoose.model('states').find({ CID: req.body.CID }, function (err, states) {
        if (states != null) {
            return res.status(200).json({
                message: "success",
                count: states.length,
                data: states
            });
        }
        else {
            return res.status(200).json({
                message: "success",
                count: 0,
                data: []
            });
        }
    });
};
exports.GetCitizesByCID = function (req, res, next) {
    mongoose.model('cities').find({ CID: req.body.CID }, function (err, cities) {
        return res.status(200).json({
            message: "success",
            data: cities
        });
    });
};
exports.GetCitizesBySID = function (req, res, next) {
    mongoose.model('cities').find({ SID: req.body.SID }, function (err, cities) {
        return res.status(200).json({
            message: "success",
            data: cities
        });
    });
};
exports.resetPassworddashborad = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        User.findOne({ _id: req.body._id }, function (err, obj) {
            if (obj != null) {
                bcrypt.compare(req.body.oldpass, obj.password, function (err, result) {
                    if (err) {
                        return res.status(409).json({
                            message: "Auth failed",
                            LoginData: null
                        });
                    }
                    if (result) {
                        User.update({ '_id': req.body._id }, req.body)
                            .then(function (doc) {
                            if (!doc) {
                                return res.status(404).end();
                            }
                            return res.status(200).json(doc);
                        })
                            .catch(function (err) {
                            console.log(err);
                        });
                        bcrypt.hash(req.body.newpass, 10, function (err, hash) {
                            var user = new User({
                                password: hash
                            });
                            user
                                .save();
                        });
                        return res.status(200).json({
                            message: "success",
                        });
                    }
                });
            }
            else {
                return res.status(200).json({
                    message: "NotExist",
                    LoginData: null
                });
            }
        });
        return [2 /*return*/];
    });
}); };
exports.resetPassword = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var existingUser, userPassword, user, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                return [4 /*yield*/, User.findOne({ 'resetPasswordToken': req.params.token, resetPasswordExpires: { $gt: Date.now() } })];
            case 1:
                existingUser = _a.sent();
                if (!existingUser) return [3 /*break*/, 7];
                if (!(req.body.newPassword === req.body.confirmPassword)) return [3 /*break*/, 5];
                return [4 /*yield*/, bcrypt.hash(req.body.newPassword, 10)];
            case 2:
                userPassword = _a.sent();
                if (!userPassword) return [3 /*break*/, 4];
                existingUser.password = userPassword;
                existingUser.name = 'test';
                existingUser.resetPasswordToken = undefined;
                existingUser.resetPasswordExpires = undefined;
                return [4 /*yield*/, existingUser.save()];
            case 3:
                user = _a.sent();
                if (user) {
                    token = jwt.sign({ id: user._id }, 'top_secret', {
                        expiresIn: 246400
                    });
                    // return new token for auto sign in after password reset
                    return [2 /*return*/, res.status(200).json({ auth: true, token: token })];
                }
                else {
                    return [2 /*return*/, res.status(422).send({
                            message: "Unprocessable Entity",
                            status: 'Unprocessable'
                        })];
                }
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5: return [2 /*return*/, res.status(422).send({
                    message: 'Passwords do not match',
                    status: ' not match'
                })];
            case 6: return [3 /*break*/, 8];
            case 7: return [2 /*return*/, res.status(400).json({
                    message: "Password reset token is invalid or has expired.",
                    status: 'invalid'
                })];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_1 = _a.sent();
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
function Verify_Email(UserEmail, Password, userName) {
    sgMail.setApiKey('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');
    var msg = {
        to: UserEmail,
        from: 'wonderful@ustx.com',
        subject: 'Welcome to USTX! Confirm your Email',
        text: 'USTX Support Team',
        html: '<!DOCTYPE html>\n' +
            '<html style="-webkit-text-size-adjust: none; -webkit-background-size: 100%; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '\n' +
            '<head>\n' +
            '    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n' +
            '    <title>ustx</title>\n' +
            '    <style type="text/css">\n' +
            '        html {\n' +
            '            -webkit-text-size-adjust: none;\n' +
            '            -webkit-background-size: 100%;\n' +
            '        }\n' +
            '        \n' +
            '        body,\n' +
            '        td,\n' +
            '        th {\n' +
            '            font-family: Arial, Helvetica, sans-serif; color: #000000;\n' +
            '            \n' +
            '        }\n' +
            '        \n' +
            '        body {\n' +
            '            background-color: #eeeeee; margin-left: 0px;margin-top: 0px;  margin-right: 0px; margin-bottom: 0px;margin: 0px 0px 0px 0px !important;padding: 0px 0px 0px 0px !important;\n' +
            '           \n' +
            '            \n' +
            '          \n' +
            '           \n' +
            '            \n' +
            '            \n' +
            '        }\n' +
            '        \n' +
            '        html,\n' +
            '        h1,\n' +
            '        h2,\n' +
            '        h3,\n' +
            '        h4,\n' +
            '        h5,\n' +
            '        h6,\n' +
            '        p,\n' +
            '        ol,\n' +
            '        ul,\n' +
            '        li,\n' +
            '        fieldset,\n' +
            '        form,\n' +
            '        label,\n' +
            '        legend,\n' +
            '        tr,\n' +
            '        input,\n' +
            '        textarea,\n' +
            '        select,\n' +
            '        div {\n' +
            '            margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;\n' +
            '           \n' +
            '           \n' +
            '            \n' +
            '        }\n' +
            '        \n' +
            '        img {\n' +
            '            border: 0;\n' +
            '            margin: 0px;\n' +
            '            padding: 0px;\n' +
            '            display: block;\n' +
            '        }\n' +
            '        \n' +
            '        li {\n' +
            '            list-style: none;\n' +
            '        }\n' +
            '        \n' +
            '        a {\n' +
            '            outline: none;\n' +
            '        }\n' +
            '        \n' +
            '        p {\n' +
            '            margin: 0px 0px 0px 0px !important;\n' +
            '            padding: 10px 0px !important;\n' +
            '            margin-bottom: 0px !important;\n' +
            '            margin-top: 0px !important;\n' +
            '            display: block;\n' +
            '        }\n' +
            '        \n' +
            '        a:link,\n' +
            '        a:visited,\n' +
            '        a:active {\n' +
            '            color: #55c2d9;\n' +
            '            text-decoration: underline;\n' +
            '        }\n' +
            '        \n' +
            '        a:hover {\n' +
            '            text-decoration: underline;\n' +
            '        }\n' +
            '        \n' +
            '        body a:link,\n' +
            '        a:visited,\n' +
            '        a:active {\n' +
            '            color: #000;\n' +
            '        }\n' +
            '        \n' +
            '        .ExternalClass,\n' +
            '        .ExternalClass p,\n' +
            '        .ExternalClass span,\n' +
            '        .ExternalClass font,\n' +
            '        .ExternalClass td,\n' +
            '        .ExternalClass div {\n' +
            '            line-height: 150%!important;\n' +
            '        }\n' +
            '    </style>\n' +
            '</head>\n' +
            '\n' +
            '<body dir="ltr" style="background:#F5F5F5; font-family:Arial, Helvetica, sans-serif;width: 100%; color: #000000; background-color: #eeeeee; margin-left: 0px;margin-top: 0px;  margin-right: 0px; margin-bottom: 0px;margin: 0px 0px 0px 0px !important;padding: 0px 0px 0px 0px !important;">\n' +
            '    <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="640" bgcolor="#F5F5F5">\n' +
            '        <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '            <td height="20" colspan="3"><img src="/assets/frontend/images/space.gif" width="20" height="1" style="display: block; width:20px; height: 1px; font-family: Arial, Helvetica, sans-serif; color: #000000;"></td>\n' +
            '        </tr>\n' +
            '          <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '            <td width="20"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="20" height="1" style="display: block; width:20px; height: 1px;"></td>\n' +
            '            <td width="600">\n' +
            '               \n' +
            '                <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="600" bgcolor="#fff">\n' +
            '                    <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                        <td height="18"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                    </tr>\n' +
            '                    <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                        <td>\n' +
            '                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="100%" bgcolor="#fff">\n' +
            '                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '\n' +
            '                                    <td width="227"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                    <td align="center">\n' +
            '                                        <a href="#"><img src="<?php echo site_url(\'/assets/frontend/images/logo.png\'); ?>" width="146" style="display: block; width: 146px; height: auto;"></a>\n' +
            '                                    </td>\n' +
            '                                    <td width="227"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                </tr>\n' +
            '                            </table>\n' +
            '                        </td>\n' +
            '                    </tr>\n' +
            '                   \n' +
            '                      <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                        <td width="100%">\n' +
            '                           <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="100%" bgcolor="#008D72">\n' +
            '                                      <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                        <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                        <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                        <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                    </tr>  \n' +
            '                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                    <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                                \n' +
            '                                    <td align="center" width="100%">' +
            '<img src="http://karammah123-001-site1.atempurl.com/assets/logowhite.png" class="img-responsive" /></td>\n' +
            '                                    <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                                \n' +
            '                                </tr>\n' +
            '                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                    <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                    <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                    <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                </tr> \n' +
            '             </table>\n' +
            '                        </td>\n' +
            '                    </tr>\n' +
            '                   \n' +
            '                      <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                        <td>\n' +
            '                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="100%">\n' +
            '                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                    <td width="560">\n' +
            '                                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="100%">\n' +
            '                                              <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                <td height="10"></td>\n' +
            '                                            </tr>\n' +
            '                                              <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                    <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                    </td>\n' +
            '                                                </tr>\n' +
            '                                              <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                <td style="border-bottom:1px solid #CBCBCB; padding: 10px 0">\n' +
            '                                                    <h4 style="text-transform:initial; font-size:21px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">Hello Dear  ' + userName + ', </h4>\n' +
            '                                                </td>\n' +
            '                                                </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                    <p style="font-size: 12px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">Welcome to our community. Now you\'re officially a valued member of our ustx family. We can\'t wait for you to start your ustx journey!</p>\n' +
            '\n' +
            '                                                    </td>\n' +
            '                                                </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                            <p style="font-size: 12px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">Welcome to ustx. You have registered with us and you are </p>\n' +
            '                                                    </td>\n' +
            '\n' +
            '                                                </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                    <p style="font-size: 12px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">Here is your ' + UserEmail + ' and ' + Password + '. </p>\n' +
            '                                                    </td>\n' +
            '                                                </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                    <p style="font-size: 12px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">You have to first activate your account to login</p>\n' +
            '                                                    </td>\n' +
            '                                                </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                     <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                       <td>\n' +
            '                                                            <table width="190" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#008D72">\n' +
            '                                                     \n' +
            '                                                                      <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                                        <td height="45" align="center" style="color:#000000; "><a href="' + tokeninfo_url + '" target="_blank" style=" font-size:18px; color:#ffffff; text-decoration:none;">Verify Email Address</a></td>\n' +
            '                                                                    </tr>\n' +
            '                                                                    \n' +
            '                                                                </table>\n' +
            '                                                       </td>\n' +
            '                                                   </tr> \n' +
            '                                                     <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                     <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                       <td>\n' +
            '                                                             <p style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">Button not working? Copy and paste this link into your browser:</p>\n' +
            '                                                       </td>\n' +
            '                                                   </tr>\n' +
            '                                                     <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                     <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                       <td>\n' +
            '                                                            <p style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;"> ' + tokeninfo_url + '</p>\n' +
            '                                                       </td>\n' +
            '                                                   </tr>\n' +
            '                                                     <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                     <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                       <td>\n' +
            '                                                    <p style="font-size: 12px;margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">You’re just a few steps away from experiencing the benefits of ustx. Request for Quote or Check your Bid Opportunities. Have a nice time enjoying ustx services!</p>\n' +
            '\n' +
            '                                                       </td>\n' +
            '                                                   </tr>\n' +
            '                                                     <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                          <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                                <td>\n' +
            '                                                                <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                                </td>\n' +
            '                                                            </tr>\n' +
            '                                                       <td>\n' +
            '                                                    <p style="font-size: 12px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">For any help and support, you can write us at <a href="mailto:support@ustx.com">support@ustx.com</a>. We look forward to see your posts on our website. </p>\n' +
            '\n' +
            '                                                       </td>\n' +
            '                                                   </tr>\n' +
            '                                                     <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                   <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                     <td>\n' +
            '                                                    <p style="font-size: 12px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">Thank You,Your ustxTeamDelivering Opportunities</p>\n' +
            '\n' +
            '                                                     </td>\n' +
            '                                                 </tr>\n' +
            '                                                   \n' +
            '                                                </td>\n' +
            '                                            </tr>\n' +
            '                                            \n' +
            '                                              <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                    <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                    </td>\n' +
            '                                                </tr>\n' +
            '                                              <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                <td style="border-bottom:1px solid #CBCBCB; padding: 10px 0">\n' +
            '                                                    <h4 style="text-transform:initial; font-size:21px; color: #0F74BA; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">Smiles Gauranteed!</h4>\n' +
            '                                                </td>\n' +
            '                                                </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                    <p style="font-size: 12px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">Our policy are simple and transparent. We promise you will love selling and purchasing at ustx. If you don\'t like something - anything - about your experience with ustx, contact us. We will make it right.</p>\n' +
            '\n' +
            '                                                    </td>\n' +
            '                                                </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                      <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                                <table width="190" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#008D72">\n' +
            '                                                        \n' +
            '                                                                          <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                                            <td height="45" align="center" style="color:#000000; "><a href="<?=site_url(\'user/contact_us\')?>" target="_blank" style=" font-size:18px; color:#ffffff; text-decoration:none;">Contact Us</a></td>\n' +
            '                                                                        </tr>\n' +
            '                                                                     \n' +
            '                                                                    </table>\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                   \n' +
            '                                                \n' +
            '                                           \n' +
            '                                              <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                    <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                    </td>\n' +
            '                                                </tr>\n' +
            '                                              <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                <td style="border-bottom:1px solid #CBCBCB; padding: 10px 0">\n' +
            '                                                    <h4 style="text-transform:initial; font-size:21px; color: #0F74BA; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">Emails. It\'s up to you.</h4>\n' +
            '                                                </td>\n' +
            '                                                </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                    <p style="font-size: 12px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">If you found our emails irrelevant to you, please click below to unsubscribe.</p>\n' +
            '\n' +
            '                                                    </td>\n' +
            '\n' +
            '                                                </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                            <table width="220" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#008D72"">\n' +
            '                         \n' +
            '                                                                      <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                                       <td height="45" align="center" style="color:#000000;"><a href="<?=site_url(\'user/unsubscribe_newsletter\')?>" target="_blank" style=" font-size:18px; color:#ffffff; text-decoration:none;">Unsubscribe Now</a></td>\n' +
            '                                                                    </tr>\n' +
            '                                                                  \n' +
            '                                                                 </table>\n' +
            '                                                    </td>\n' +
            '                                                </tr>\n' +
            '                                                   \n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '\n' +
            '                                    \n' +
            '                                </table>\n' +
            '                        </td>\n' +
            '                        <td width="20"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="20" height="1" style="display: block; width:20px; height: 1px;"></td>\n' +
            '                    </tr>\n' +
            '                    </table>\n' +
            '            </td>\n' +
            '            <td width="20"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="20" height="1" style="display: block; width:20px; height: 1px;"></td>\n' +
            '          \n' +
            '        </tr>\n' +
            '          <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '            <td>\n' +
            '                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F5F5F5" style="background: #F5F5F5;">\n' +
            '                      <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                        <td width="50">\n' +
            '                            <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;">\n' +
            '                        </td>\n' +
            '                        <td width="460">\n' +
            '                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">\n' +
            '                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                    <td height="20"> <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                </tr>\n' +
            '                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                    <td height="20"> <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                </tr>\n' +
            '                            </table>\n' +
            '                        </td>\n' +
            '                        <td width="20">\n' +
            '                            <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="20" height="1" style="display: block; width:20px; height: 1px;">\n' +
            '                        </td>\n' +
            '                    </tr>\n' +
            '                </table>\n' +
            '            </td>\n' +
            '        </tr>\n' +
            '        </table>\n' +
            '        </td>\n' +
            '        <td width="20"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="20" height="30" style="display: block; width: 20px; height: 1px;"></td>\n' +
            '        </tr>\n' +
            '          <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '            <td height="30" colspan="3"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '        </tr>\n' +
            '          <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '            <td colspan="3" style="font-size: 10px; color: #000000; text-align: center;">\n' +
            '                You received this email because you register on ustx.com with the email address {email_address}. We respect your privacy. If you believe this email has been sent you in error please safely <a href="<?=site_url(\'user/unsubscribe_newsletter\');?>">unsubscribe</a>\n' +
            '            </td>\n' +
            '        </tr>\n' +
            '    </table>\n' +
            '</body>\n' +
            '\n' +
            '</html>',
    };
    console.log("Venus_sendMail_vevifiy_Email");
    sgMail.send(msg)
        .then(function (response) {
        console.log("Venus_sendMail_.than");
    })
        .catch(function (err) {
        console.log(err);
    });
}
exports.sendResetEmail = function (req, res, next) {
    debugger;
    var reset_link = "";
    User.findOne({ email: req.body.email }, function (err, obj) {
        if (obj) {
            reset_link = process.env.REACT_APP_FRONT_URL + "confirm/" + obj.reset_pass_confirmation_tokken;
            sgMail.setApiKey('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');
            var msg = {
                to: req.body.email,
                from: 'support@ustx.com',
                subject: 'Welcome to USTX! Confirm your Email',
                text: 'USTX Support Team',
                html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n' +
                    '<html xmlns="http://www.w3.org/1999/xhtml">\n' +
                    '\n' +
                    '<head>\n' +
                    '    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n' +
                    '    <title>ustx</title>\n' +
                    '    <style type="text/css">\n' +
                    '        html {\n' +
                    '            -webkit-text-size-adjust: none;\n' +
                    '            -webkit-background-size: 100%;\n' +
                    '        }\n' +
                    '        \n' +
                    '        body,\n' +
                    '        td,\n' +
                    '        th {\n' +
                    '            font-family: Arial, Helvetica, sans-serif;\n' +
                    '            color: #000000;\n' +
                    '        }\n' +
                    '        \n' +
                    '        body {\n' +
                    '            background-color: #eeeeee;\n' +
                    '            margin-left: 0px;\n' +
                    '            margin-top: 0px;\n' +
                    '            margin-right: 0px;\n' +
                    '            margin-bottom: 0px;\n' +
                    '            margin: 0px 0px 0px 0px !important;\n' +
                    '            padding: 0px 0px 0px 0px !important;\n' +
                    '        }\n' +
                    '        \n' +
                    '        html,\n' +
                    '        h1,\n' +
                    '        h2,\n' +
                    '        h3,\n' +
                    '        h4,\n' +
                    '        h5,\n' +
                    '        h6,\n' +
                    '        p,\n' +
                    '        ol,\n' +
                    '        ul,\n' +
                    '        li,\n' +
                    '        fieldset,\n' +
                    '        form,\n' +
                    '        label,\n' +
                    '        legend,\n' +
                    '        tr,\n' +
                    '        input,\n' +
                    '        textarea,\n' +
                    '        select,\n' +
                    '        div {\n' +
                    '            margin: 0;\n' +
                    '            padding: 0;\n' +
                    '            font-family: Arial, Helvetica, sans-serif;\n' +
                    '            border-spacing: 0px;\n' +
                    '        }\n' +
                    '        \n' +
                    '        img {\n' +
                    '            border: 0;\n' +
                    '            margin: 0px;\n' +
                    '            padding: 0px;\n' +
                    '            display: block;\n' +
                    '        }\n' +
                    '        \n' +
                    '        li {\n' +
                    '            list-style: none;\n' +
                    '        }\n' +
                    '        \n' +
                    '        a {\n' +
                    '            outline: none;\n' +
                    '        }\n' +
                    '        \n' +
                    '        p {\n' +
                    '            margin: 0px 0px 0px 0px !important;\n' +
                    '            padding: 10px 0px !important;\n' +
                    '            margin-bottom: 0px !important;\n' +
                    '            margin-top: 0px !important;\n' +
                    '            display: block;\n' +
                    '        }\n' +
                    '        \n' +
                    '        a:link,\n' +
                    '        a:visited,\n' +
                    '        a:active {\n' +
                    '            color: #55c2d9;\n' +
                    '            text-decoration: underline;\n' +
                    '        }\n' +
                    '        \n' +
                    '        a:hover {\n' +
                    '            text-decoration: underline;\n' +
                    '        }\n' +
                    '        \n' +
                    '        body a:link,\n' +
                    '        a:visited,\n' +
                    '        a:active {\n' +
                    '            color: #000;\n' +
                    '        }\n' +
                    '        \n' +
                    '        .ExternalClass,\n' +
                    '        .ExternalClass p,\n' +
                    '        .ExternalClass span,\n' +
                    '        .ExternalClass font,\n' +
                    '        .ExternalClass td,\n' +
                    '        .ExternalClass div {\n' +
                    '            line-height: 150%!important;\n' +
                    '        }\n' +
                    '    </style>\n' +
                    '</head>\n' +
                    '\n' +
                    '<body style="background:#F5F5F5; font-family:Arial, Helvetica, sans-serif;width: 100%;">\n' +
                    '    <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="640" bgcolor="#F5F5F5">\n' +
                    '        <tr>\n' +
                    '            <td height="20" colspan="3"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="20" height="1" style="display: block; width:20px; height: 1px;"></td>\n' +
                    '        </tr>\n' +
                    '        <tr>\n' +
                    '            <td width="20"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="20" height="1" style="display: block; width:20px; height: 1px;"></td>\n' +
                    '            <td width="600">\n' +
                    '                <!-- Main Table Start -->\n' +
                    '                <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="600" bgcolor="#fff">\n' +
                    '                    <tr>\n' +
                    '                        <td height="18"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
                    '                    </tr>\n' +
                    '                    <!-- Header Start -->\n' +
                    '                    <tr>\n' +
                    '                        <td>\n' +
                    '                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="100%" bgcolor="#fff">\n' +
                    '                                <tr>\n' +
                    '\n' +
                    '                                    <td width="227"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
                    '                                    <td align="center">\n' +
                    '                                        <a href="#"><img src="<?php echo site_url(\'/assets/frontend/images/logo.png\'); ?>" width="146" style="display: block; width: 146px; height: auto;"></a>\n' +
                    '                                    </td>\n' +
                    '                                    <td width="227"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
                    '                                </tr>\n' +
                    '                            </table>\n' +
                    '                        </td>\n' +
                    '                    </tr>\n' +
                    '                   \n' +
                    '                    <tr>\n' +
                    '                        <td width="100%">\n' +
                    '                           <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="100%" bgcolor="#008D72">\n' +
                    '                                    <tr>\n' +
                    '                                        <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
                    '                                        <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
                    '                                        <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
                    '                                    </tr>  \n' +
                    '                                <tr>\n' +
                    '                                    <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
                    '                                                \n' +
                    '                                    <td align="center" width="100%"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"><a href=""><img src="images/logo-white.png" class="img-responsive"></a></td>\n' +
                    '                                    <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
                    '                                                \n' +
                    '                                </tr>\n' +
                    '                                <tr>\n' +
                    '                                    <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
                    '                                    <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
                    '                                    <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
                    '                                </tr> \n' +
                    '             </table>\n' +
                    '                        </td>\n' +
                    '                    </tr>\n' +
                    '                    <!-- Header End -->\n' +
                    '                   \n' +
                    '                    <!-- Main Table End -->\n' +
                    '\n' +
                    '                 \n' +
                    '          <!-- Main Content Start -->\n' +
                    '                  <tr>\n' +
                    '                     <td>\n' +
                    '                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="100%">\n' +
                    '                           <tr>\n' +
                    '                              <td width="20"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
                    '                              <td width="560">\n' +
                    '                                 <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="100%">\n' +
                    '                                    <tr>\n' +
                    '                                        <td>\n' +
                    '                                       <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                                        </td>\n' +
                    '                                    </tr>\n' +
                    '                                    <tr>\n' +
                    '                                       <td style="border-bottom:1px solid #CBCBCB; padding: 10px 0">\n' +
                    '                                          <h4 style="text-transform:initial; font-size:21px;">Hello Dear ' + obj.firstName + ' ' + obj.lastName + ', </h4>\n' +
                    '                                       </td>\n' +
                    '                                       </tr>\n' +
                    '                                       <tr>\n' +
                    '                                          <td>\n' +
                    '                                         <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                                          </td>\n' +
                    '                                      </tr>\n' +
                    '                                       <tr>\n' +
                    '                                         <td>\n' +
                    '                                            <p style="font-size: 12px; ">This email is an automatically sent by ustx in response to your request to reset password. Follow the below mentioned link to reset the password.</p>\n' +
                    '\n' +
                    '                                         </td>\n' +
                    '                                       </tr>\n' +
                    '                                       <tr>\n' +
                    '                                          <td>\n' +
                    '                                         <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                                          </td>\n' +
                    '                                      </tr>\n' +
                    '                                       <tr>\n' +
                    '                                         <td>\n' +
                    '                                            <p style="font-size: 12px; ">If this request is not made by you and you have not forgotten your password, kindly ignore the mail.  </p>\n' +
                    '\n' +
                    '                                         </td>\n' +
                    '                                       </tr>\n' +
                    '                                       <tr>\n' +
                    '                                          <td>\n' +
                    '                                         <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                                          </td>\n' +
                    '                                      </tr>\n' +
                    '                                       <tr>\n' +
                    '                                         <td>\n' +
                    '                                            <p style="font-size: 12px; ">You have to first activate your account to login</p>\n' +
                    '                                         </td>\n' +
                    '                                       </tr>\n' +
                    '                                       <tr>\n' +
                    '                                          <td>\n' +
                    '                                         <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                                          </td>\n' +
                    '                                      </tr>\n' +
                    '                                       <tr>\n' +
                    '                                         <td>\n' +
                    '                                            <table width="190"  border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#008D72" >\n' +
                    '                                                <tr>\n' +
                    '                                          \n' +
                    '                                                   <tr>\n' +
                    '                                                      <td height="45" align="center" style="color:#000000;"><a href="' + reset_link + '" target="_blank" style="font-size:18px; color:#ffffff; text-decoration:none;">Reset Password</a></td>\n' +
                    '                                                   </tr>\n' +
                    '                                                  \n' +
                    '                                                </tr>\n' +
                    '                                                </table>\n' +
                    '                                         </td>\n' +
                    '                                       </tr>\n' +
                    '                                       <tr>\n' +
                    '                                          <td>\n' +
                    '                                         <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                                          </td>\n' +
                    '                                      </tr>\n' +
                    '                                       <tr>\n' +
                    '                                         <td>\n' +
                    '                                            <p>Button not working? Copy and paste this link into your browser:</p>\n' +
                    '\n' +
                    '                                         </td>\n' +
                    '                                       </tr>\n' +
                    '                                       <tr>\n' +
                    '                                          <td>\n' +
                    '                                         <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                                          </td>\n' +
                    '                                      </tr>\n' +
                    '                                       <tr>\n' +
                    '                                         <td>\n' +
                    '                                            <p style="color:#0F74BA !important;"> ' + reset_link + '</p>\n' +
                    '\n' +
                    '                                         </td>\n' +
                    '                                       </tr>\n' +
                    '                                       <tr>\n' +
                    '                                          <td>\n' +
                    '                                         <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                                          </td>\n' +
                    '                                      </tr>\n' +
                    '                                       <tr>\n' +
                    '                                         <td>\n' +
                    '                                            <p style="font-size: 12px; ">For any help and support, you can write us at <a href="mailto:support@ustx.com">support@ustx.com</a>. We look forward to see your posts on our website. </p>\n' +
                    '                                         </td>\n' +
                    '                                       </tr>\n' +
                    '                                       <tr>\n' +
                    '                                          <td>\n' +
                    '                                         <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                                          </td>\n' +
                    '                                      </tr>\n' +
                    '                                           <tr>\n' +
                    '                                             <td>\n' +
                    '                                           <p style="font-size: 12px; ">Thank You,Your ustxTeamDelivering Opportunities</p>\n' +
                    '\n' +
                    '                                             </td>\n' +
                    '                                           </tr>\n' +
                    '                                       </td>\n' +
                    '                                    </tr>\n' +
                    '                                    <tr>\n' +
                    '                                        <td>\n' +
                    '                                       <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                                        </td>\n' +
                    '                                    </tr>\n' +
                    '                                    <tr>\n' +
                    '                                       <td style="border-bottom:1px solid #CBCBCB; padding: 10px 0">\n' +
                    '                                          <h4 style="text-transform:initial; font-size:21px; color: #0F74BA;">Smiles Gauranteed!</h4>\n' +
                    '                                       </td>\n' +
                    '                                       </tr>\n' +
                    '                                       <tr>\n' +
                    '                                          <td>\n' +
                    '                                         <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                                          </td>\n' +
                    '                                      </tr>\n' +
                    '                                       <tr>\n' +
                    '                                         <td>\n' +
                    '                                            <p style="font-size: 12px; ">Our policy are simple and transparent. We promise you will love selling and purchasing at ustx. If you don\'t like something - anything - about your experience with ustx, contact us. We will make it right.</p>\n' +
                    '                                         </td>\n' +
                    '                                       </tr>\n' +
                    '                                       <tr>\n' +
                    '                                          <td>\n' +
                    '                                         <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                                          </td>\n' +
                    '                                      </tr>\n' +
                    '                                       <tr>\n' +
                    '                                         <td>\n' +
                    '                                            <table  width="190"  border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#008D72">\n' +
                    '                                                <tr>\n' +
                    '                                                       <td height="45" align="center" style="color:#000000; "><a href="<?=site_url(\'user/contact_us\')?>" target="_blank" style=" font-size:18px; color:#ffffff; text-decoration:none;">Contact Us</a></td>\n' +
                    '                                                    </tr>\n' +
                    '                                                   </table>\n' +
                    '                                         </td>\n' +
                    '                                       </tr>\n' +
                    '                                       <tr>\n' +
                    '                                          <td>\n' +
                    '                                         <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                                          </td>\n' +
                    '                                      </tr>\n' +
                    '                                        \n' +
                    '                                       </td>\n' +
                    '                                    </tr>\n' +
                    '                                  \n' +
                    '                                    <tr>\n' +
                    '                                       <td style="border-bottom:1px solid #CBCBCB; padding: 10px 0">\n' +
                    '                                          <h4 style="text-transform:initial; font-size:21px; color: #0F74BA">Emails. It\'s up to you.</h4>\n' +
                    '                                       </td>\n' +
                    '                                       </tr>\n' +
                    '                                       <tr>\n' +
                    '                                          <td>\n' +
                    '                                         <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                                          </td>\n' +
                    '                                      </tr>\n' +
                    '\n' +
                    '                                       <tr>\n' +
                    '                                         <td>\n' +
                    '                                            <p style="font-size: 12px; ">If you found our emails irrelevant to you, please click below to unsubscribe.</p>\n' +
                    '                                         </td>\n' +
                    '                                       </tr>\n' +
                    '                                       <tr>\n' +
                    '                                          <td>\n' +
                    '                                         <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                                          </td>\n' +
                    '                                      </tr>\n' +
                    '                                       <tr>\n' +
                    '                                         <td>\n' +
                    '                                            <table width="220" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#008D72"">\n' +
                    '                                                  <tr>\n' +
                    '                                                      <td height="45" align="center" style="color:#000000;"><a href="<?=site_url(\'user/unsubscribe_newsletter\')?>" target="_blank" style=" font-size:18px; color:#ffffff; text-decoration:none;">Unsubscribe Now</a></td>\n' +
                    '                                                   </tr>\n' +
                    '                                                  </table>\n' +
                    '                                         </td>\n' +
                    '                                       </tr>\n' +
                    '                                       <tr>\n' +
                    '                                          <td>\n' +
                    '                                         <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                                          </td>\n' +
                    '                                      </tr>\n' +
                    '                                       \n' +
                    '                                    <tr>\n' +
                    '                                        <td>\n' +
                    '                                       <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                                        </td>\n' +
                    '                                    </tr>\n' +
                    '                                 </table>\n' +
                    '                              </td>\n' +
                    '                              <td width="20"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="10" style="display: block; width: 1px; height: 1px;"></td>\n' +
                    '                           </tr>\n' +
                    '                        </table>\n' +
                    '                     </td>\n' +
                    '                  </tr>\n' +
                    '                  <tr>\n' +
                    '                      <td>\n' +
                    '                     <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                      </td>\n' +
                    '                  </tr>\n' +
                    '                  <!-- Bottom Start -->\n' +
                    '                  <tr>\n' +
                    '                     <td>\n' +
                    '                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F5F5F5" style="background: #F5F5F5;">\n' +
                    '                           <tr>\n' +
                    '                              <td width="50">\n' +
                    '                                 <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                              </td>\n' +
                    '                              <td width="460">\n' +
                    '                                 <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">\n' +
                    '                                    <tr>\n' +
                    '                                       <td height="20"> <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
                    '                                    </tr>\n' +
                    '                                    <tr>\n' +
                    '                                       <td height="20"> <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
                    '                                    </tr>\n' +
                    '                                 </table>\n' +
                    '                              </td>\n' +
                    '                              <td width="50">\n' +
                    '                                 <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
                    '                              </td>\n' +
                    '                           </tr>\n' +
                    '                        </table>\n' +
                    '                     </td>\n' +
                    '                  </tr>\n' +
                    '                  <!-- Bottom End -->\n' +
                    '               </table>\n' +
                    '               <!-- Main Content End -->\n' +
                    '            </td>\n' +
                    '            <td width="20"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="20" height="30" style="display: block; width: 20px; height: 1px;"></td>\n' +
                    '         </tr>\n' +
                    '         <tr>\n' +
                    '            <td height="30" colspan="3"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
                    '         </tr>\n' +
                    '         <tr>\n' +
                    '            <td colspan="3" style="font-size: 10px; color: #000000; text-align: center;">\n' +
                    '               You received this email because you register on ustx.com with the email address {email_address}. We respect your privacy. If you believe this email has been sent you in error please safely <a href="<?=site_url(\'user/unsubscribe_newsletter\');?>">unsubscribe</a>\n' +
                    '            </td>\n' +
                    '         </tr>\n' +
                    '      </table>\n' +
                    '          \n' +
                    '   </body>\n' +
                    '</html>\n' +
                    '\n'
            };
            sgMail.send(msg)
                .then(function (response) {
            })
                .catch(function (err) {
                console.log(err);
            });
            return res.status(200).json({ messgae: "yes" });
        }
    });
};
exports.receivedResetToken = function (req, res, next) {
    User.findOne({ reset_pass_confirmation_tokken: req.body.reset_token }, function (err, obj) {
        if (obj) {
            return res.status(200).json({ message: "i found it" });
        }
        else
            return res.status(204).json({ message: "no content" });
    });
};
exports.newPass = function (req, res, next) {
    User.findOne({ reset_pass_confirmation_tokken: req.body.reset_token }, function (err, obj) {
        if (obj) {
            bcrypt.hash(req.body.new_pass, 10, function (err, hash) {
                obj.password = hash;
                obj.save();
                return res.status(200).json({ message: "new password has been set" });
            });
        }
        else
            return res.status(204).json({ message: "no content1" });
    });
};
exports.changePass = function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, obj) {
        if (obj) {
            bcrypt.compare(req.body.old_pass, obj.password, function (err, result) {
                if (result) {
                    bcrypt.hash(req.body.new_pass, 10, function (err, hash) {
                        obj.password = hash;
                        obj.save();
                        return res.status(200).json({ message: "success" });
                    });
                }
                else
                    return res.status(208).json({ message: "check failed" });
            });
        }
        else
            return res.status(204).json({ message: "no content" });
    });
};
exports.updateProfile = function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, obj) {
        if (obj) {
            obj.firstName = req.body.firstName;
            obj.lastName = req.body.lastName;
            obj.mobileNo = req.body.mobileNo;
            obj.DOB = req.body.DOB;
            obj.SSN = req.body.SSN;
            obj.address = req.body.address;
            obj.save();
            return res.status(200).json({ message: "success" });
        }
        else
            return res.status(204).json({ message: "no content" });
    });
};
