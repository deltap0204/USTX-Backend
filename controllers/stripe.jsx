// import {fromJSON} from "tough-cookie";
var payment = require('../lib/middlewares/validations.tsx').payment;
var generateToken = require('../lib/middlewares/stripeToken.tsx').generateToken;
var purshaces = require("../models/card.tsx");
var sgMail = require('@sendgrid/mail');
var Transaction = require("../models/transaction.tsx");
var AdminModel = require("../models/admin_user.tsx");
var TokenByDate = require("../models/token_by_date.tsx");
var User = require("../models/user.tsx");
var request = require('request');
//import {response} from "express";
exports.stripeBuy = function (req, res, next) {
    console.log(process.env.REACT_APP_TOKEN_BACKEND);
    request.post(process.env.REACT_APP_TOKEN_BACKEND + "api/users/transferToken", {
        json: {
            isBuy: !(req.body.type),
            toAddress: req.body.Address,
            value: req.body.USTX
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log("thirdparty1 ok", response.data.txData);
        }
    });
    request.post(process.env.REACT_APP_URL + "api/thirdparty2", {
        json: {
            email: req.body.Email,
            card: {
                number: req.body.CardNum,
                exp_month: req.body.EXP.split("/")[0],
                exp_year: req.body.EXP.split("/")[1],
                cvc: req.body.CVC,
                name: req.body.Name
            },
            amount: req.body.USD
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log("thirdparty2 ok");
        }
    });
    //----------------
    var id_hash = (require("crypto").createHash("sha256").update(require("mongoose").Types.ObjectId().toString()));
    var id = id_hash.digest('hex');
    //console.log("id:", id_hash);
    var transaction = new Transaction({
        Unique_ID: id,
        UserId: req.body.UserId,
        Name: req.body.Name,
        Email: req.body.Email,
        type: req.body.type,
        USTX: req.body.USTX,
        USD: req.body.USD,
        CardName: req.body.CardName,
        CardNum: req.body.CardNum,
        EXP: req.body.EXP,
        CVC: req.body.CVC
    });
    transaction.save()
        .then(function (result) {
        return res.status(200).json({
            message: "success"
        });
    })
        .catch(function (err) {
        return res.status(500).json({
            message: "error"
        });
    });
    AdminModel.findOne({}, {}, {}, function (err, admin) {
        if (admin == null) {
            User.count({}, function (err, c) {
                debugger;
                var newAdmin = new AdminModel({
                    BuyAmount: transaction.USTX,
                    SellAmount: 0,
                    UserCount: c
                });
                newAdmin.save()
                    .then(function (result) {
                    //console.log("result",result);
                })
                    .catch(function (err) {
                    //console.log("Error",err);
                });
            });
        }
        else {
            admin.BuyAmount = admin.BuyAmount + parseFloat(transaction.USTX);
            admin.save();
        }
    });
    var tokenHistory;
    TokenByDate.findOne({}, {}, { sort: { 'createdAt': -1 } }, function (err, data) {
        if (data != null) {
            if (transaction.createdAt.getYear() != data.createdAt.getYear() ||
                transaction.createdAt.getMonth() != data.createdAt.getMonth() ||
                transaction.createdAt.getDate() != data.createdAt.getDate()) {
                // New Day!
                tokenHistory = new TokenByDate({
                    Sell: 0,
                    Buy: transaction.USTX
                });
                tokenHistory.save();
            }
            else {
                //cnosole.log("Buy:", data.Buy);
                //cnosole.log("USTX:", transaction.USTX);
                data.Buy = data.Buy + parseFloat(transaction.USTX);
                //cnosole.log("BuyUpdated:", data.Buy);
                data.save();
            }
        }
        else {
            tokenHistory = new TokenByDate({
                Sell: 0,
                Buy: transaction.USTX
            });
            tokenHistory.save();
        }
    });
    //type: false,    //buy
    //USD:this.state.USD,
    //USTX:(this.state.USTX).toString(),
    //Name:this.state.Name,
    //Email:this.state.Email,
    //Address:this.state.Address,
    //CardName:this.state.CardName,
    //CardNum:this.state.CardNum,
    //EXP:this.state.EXP,
    //CVC:this.state.CVC
    //
};
exports.stripeSell = function (req, res, next) {
    // //cnosole.log(req.body);
    request.post(process.env.REACT_APP_TOKEN_BACKEND + "api/users/transferToken", {
        json: {
            isBuy: !(req.body.type),
            toAddress: req.body.Address,
            value: req.body.USTX
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log("thirdparty1 ok", response.data.txData);
        }
    });
    //----------------
    var id_hash = (require("crypto").createHash("sha256").update(require("mongoose").Types.ObjectId().toString()));
    var id = id_hash.digest('hex');
    var transaction = new Transaction({
        Unique_ID: id,
        UserId: req.body.UserId,
        Name: req.body.Name,
        Email: req.body.Email,
        type: req.body.type,
        USTX: req.body.USTX,
        USD: req.body.USD,
        Bank1: req.body.Bank1,
        Bank2: req.body.Bank2,
        Bank3: req.body.Bank3,
        Bank4: req.body.Bank4,
        SellConfirmed: false
    });
    transaction.save()
        .then(function (result) {
        return res.status(200).json({
            message: "success"
        });
    })
        .catch(function (err) {
        return res.status(500).json({
            message: "error"
        });
    });
    AdminModel.findOne({}, {}, {}, function (err, admin) {
        if (admin == null) {
            User.count({}, function (err, c) {
                var newAdmin = new AdminModel({
                    BuyAmount: 0,
                    SellAmount: transaction.USTX,
                    UserCount: c
                });
                newAdmin.save();
            });
        }
        else {
            admin.SellAmount = admin.SellAmount + parseFloat(transaction.USTX);
            admin.save();
        }
    });
    TokenByDate.findOne({}, {}, { sort: { 'createdAt': -1 } }, function (err, data) {
        if (data != null) {
            if (transaction.createdAt.getYear() != data.createdAt.getYear() ||
                transaction.createdAt.getMonth() != data.createdAt.getMonth() ||
                transaction.createdAt.getDate() != data.createdAt.getDate()) {
                // New Day!
                var tokenHistory = new TokenByDate({
                    Sell: transaction.USTX,
                    Buy: 0
                });
                tokenHistory.save();
            }
            else {
                data.Sell = data.Sell + parseFloat(transaction.USTX);
                data.save();
            }
        }
        else {
            var tokenHistory = new TokenByDate({
                Sell: transaction.USTX,
                Buy: 0
            });
            tokenHistory.save();
        }
    });
};
exports.getPaymentDatabase = function (req, res, next) {
    Transaction.find({ Email: req.body.Email }).sort({ createdAt: -1 }).skip(req.body.LoadedCount).limit(6).exec(function (err, docs) {
        return res.status(200).json({ payments: docs });
    });
};
function invoice_Email() {
    sgMail.setApiKey('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');
    var msg = {
        to: "karammah28@gmail.com",
        from: 'karammah5@gmail.com',
        subject: 'Welcome to USTX! Confirm your Email',
        text: 'USTX Support Team',
        html: '<!DOCTYPE html >\n' +
            '<html >\n' +
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
            '<body style="background:#F5F5F5; font-family:Arial, Helvetica, sans-serif;width: 95%;margin: 0px auto;">\n' +
            '    <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="600" bgcolor="#F5F5F5" style="margin-left: 10px;"> \n' +
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
            '                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="98%" bgcolor="#fff">\n' +
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
            '                        <td width="98%">\n' +
            '                           <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="98%" bgcolor="#008D72">\n' +
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
            '          <tr>\n' +
            '            <td>\n' +
            '              <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="98%">\n' +
            '                <tr>\n' +
            '                  <td width="560">\n' +
            '                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="98%">\n' +
            '                      <tr>\n' +
            '                        <td height="10"></td>\n' +
            '                      </tr>\n' +
            '                      <tr>\n' +
            '                        <td style="border-bottom:1px solid #CBCBCB; padding: 10px 0">\n' +
            '                          <h4 style="text-transform:initial; font-size:21px;">Hi {username}, </h4>\n' +
            '                        </td>\n' +
            '                        </tr>\n' +
            '                        <tr>\n' +
            '                            <td>\n' +
            '                            <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                            </td>\n' +
            '                        </tr>\n' +
            '                        <tr>\n' +
            '                          <td>\n' +
            '                          <p style="font-size: 12px; ">Your recent subscription has been completed. Your subscription details are shown below for your reference:</p>\n' +
            '                          </td>\n' +
            '                        </tr>\n' +
            '                          <tr>\n' +
            '                            <th>Token Transection</th>\n' +
            '                            \n' +
            '                          </tr>\n' +
            '                          <tr>\n' +
            '                            <td>\n' +
            '                             \n' +
            '                             \n' +
            '                              Token Transferred : {145}<br/>\n' +
            '                              Token Received: {142}<br/>\n' +
            '                              Transaction Cost usually ethereum gas cost : {USTX25}<br/>\n' +
            '                              Service Fee platform fee : {USTX25}<br/>\n' +
            '                            </td>\n' +
            '                            <td></td>\n' +
            '                            <td></td>\n' +
            '                          </tr>\n' +
            '                          <tr>\n' +
            '                            <td >From</td>\n' +
            '                            <td>  {Devid Warner}</td>\n' +
            '                          </tr>\n' +
            '                          <tr>\n' +
            '                            <td  >To</td>\n' +
            '                            <td> {Jason bahenroof }</td>\n' +
            '                          </tr>\n' +
            '                          <tr>\n' +
            '                              <td>\n' +
            '                              <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                              </td>\n' +
            '                          </tr>\n' +
            '                          <tr>\n' +
            '                            <td>\n' +
            '                              <p style="font-size: 12px; ">For any help and support, you can write us at <a href="mailto:support@ustx.com">support@ustx.com</a>. We look forward to see your posts on our website. </p>\n' +
            '                            </td>\n' +
            '                        \n' +
            '                          </tr>\n' +
            '                          <tr>\n' +
            '                              <td>\n' +
            '                              <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                              </td>\n' +
            '                          </tr>\n' +
            '                          <tr>\n' +
            '                            <td>\n' +
            '                           <p style="font-size: 12px; ">Thank You,Your ustxTeamDelivering Opportunities</p>\n' +
            '\n' +
            '                            </td>\n' +
            '                          </tr>\n' +
            '                          <tr>\n' +
            '                              <td>\n' +
            '                              <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                              </td>\n' +
            '                          </tr>\n' +
            '                        </td>\n' +
            '                      </tr>\n' +
            '                      \n' +
            '                      <tr>\n' +
            '                        <td style="border-bottom:1px solid #CBCBCB; padding: 10px 0">\n' +
            '                          <h4 style="text-transform:initial;font-size:21px; color: #0F74BA;">Smiles Gauranteed!</h4>\n' +
            '                        </td>\n' +
            '                        </tr>\n' +
            '                        <tr>\n' +
            '                            <td>\n' +
            '                            <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                            </td>\n' +
            '                        </tr>\n' +
            '                        <tr>\n' +
            '                          <td>\n' +
            '                          <p style="font-size: 12px; ">Our policy are simple and transparent. We promise you will love selling and purchasing at ustx. If you don\'t like something - anything - about your experience with ustx, contact us. We will make it right.</p>\n' +
            '\n' +
            '                          </td>\n' +
            '                        </tr>\n' +
            '                        <tr>\n' +
            '                            <td>\n' +
            '                            <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                            </td>\n' +
            '                        </tr>\n' +
            '                        <tr>\n' +
            '                          <td>\n' +
            '                              <table  width="190"  border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#008D72">\n' +
            '                        \n' +
            '                                  <tr>\n' +
            '                                     <td height="45" align="center" style="color:#000000; "><a href="#" target="_blank" style=" font-size:18px; color:#ffffff; text-decoration:none;">Contact Us</a></td>\n' +
            '                                  </tr>\n' +
            '                                \n' +
            '                               </table>\n' +
            '                          </td>\n' +
            '                        </tr>\n' +
            '                         \n' +
            '                        </td>\n' +
            '                      </tr>\n' +
            '                      <tr>\n' +
            '                          <td>\n' +
            '                          <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                          </td>\n' +
            '                      </tr>\n' +
            '                      <tr>\n' +
            '                        <td style="border-bottom:1px solid #CBCBCB; padding: 10px 0">\n' +
            '                          <h4 style="text-transform:initial; font-size:21px; color: #0F74BA">Emails. It\'s up to you.</h4>\n' +
            '                        </td>\n' +
            '                        </tr>\n' +
            '                        <tr>\n' +
            '                            <td>\n' +
            '                            <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                            </td>\n' +
            '                        </tr>\n' +
            '                        <tr>\n' +
            '                          <td>\n' +
            '                          <p style="font-size: 12px; ">If you found our emails irrelevant to you, please click below to unsubscribe.</p>\n' +
            '                          </td>\n' +
            '                        </tr>\n' +
            '                        <tr>\n' +
            '                            <td>\n' +
            '                            <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                            </td>\n' +
            '                        </tr>\n' +
            '                        <tr>\n' +
            '                          <td>\n' +
            '                              <table width="220" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#008D72"">\n' +
            '                                  <tr>\n' +
            '                                      <td height="45" align="center" style="color:#000000;"><a href="#" target="_blank" style=" font-size:18px; color:#ffffff; text-decoration:none;">Unsubscribe Now</a></td>\n' +
            '                                  </tr>\n' +
            '                                  </table>\n' +
            '                                 \n' +
            '                          </td>\n' +
            '                        </tr>\n' +
            '                        <tr>\n' +
            '                            <td>\n' +
            '                            <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                            </td>\n' +
            '                        </tr>\n' +
            '                          \n' +
            '                         \n' +
            '                        </td>\n' +
            '                      </tr>\n' +
            '                    </table>\n' +
            '                  </td>\n' +
            '                  <td width="20"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                </tr>\n' +
            '              </table>\n' +
            '            </td>\n' +
            '          </tr>\n' +
            '          <!-- Bottom Start -->\n' +
            '          <tr>\n' +
            '            <td>\n' +
            '              <table align="center" border="0" cellpadding="0" cellspacing="0" width="98%" bgcolor="#F5F5F5" style="background: #F5F5F5;">\n' +
            '                <tr>\n' +
            '                  <td width="50">\n' +
            '                    <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;">\n' +
            '                  </td>\n' +
            '                  <td width="460">\n' +
            '                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="98%">\n' +
            '                      <tr>\n' +
            '                        <td height="20"> <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                      </tr>\n' +
            '                      <tr>\n' +
            '                        <td height="20"> <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                      </tr>\n' +
            '                    </table>\n' +
            '                  </td>\n' +
            '                  <td width="50">\n' +
            '                    <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;">\n' +
            '                  </td>\n' +
            '                </tr>\n' +
            '              </table>\n' +
            '            </td>\n' +
            '          </tr>\n' +
            '          <!-- Bottom End -->\n' +
            '        </table>\n' +
            '        <!-- Main Content End -->\n' +
            '      </td>\n' +
            '      <td width="20"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '      <td height="30" colspan="3"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '      <td colspan="3" style="font-size: 10px; color: #000000; text-align: center;">\n' +
            '        You received this email because you register on ustx.com with the email address {email_address}. We respect your privacy. If you believe this email has been sent you in error please safely <a href="<?=site_url(\'user/unsubscribe_newsletter\');?>">unsubscribe</a>\n' +
            '      </td>\n' +
            '    </tr>\n' +
            '  </table>\n' +
            '</body>\n' +
            '\n' +
            '</html>',
    };
    sgMail.send(msg)
        .then(function (response) {
    })
        .catch(function (err) {
        //cnosole.log(err);
    });
}
