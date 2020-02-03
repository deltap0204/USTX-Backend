var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { payment } = require('../lib/middlewares/validations.tsx');
const { generateToken } = require('../lib/middlewares/stripeToken.tsx');
var stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECURITY_KEY);
exports.thirdparty1 = (req, res, next) => {
    console.log("thirdparty1", req.body);
    return res.status(200).json({ message: "success" });
};
exports.thirdparty2 = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        //console.log("thirdparty2" , req.body);
        let userEmail = req.body.email;
        let card = req.body.card;
        let amount = req.body.amount;
        let token = yield generateToken(card, res);
        //console.log("token", token);
        //Create stripe customer
        let stripeCustomer = yield stripe.customers.create({
            email: userEmail,
            source: token.id
        });
        //console.log("stripeCustomer", stripeCustomer);
        //Create stripe payment
        let charge = yield stripe.charges.create({
            amount: amount * 100,
            currency: "usd",
            customer: stripeCustomer.id
        });
        //console.log("charge", charge);
        if (charge) {
            res.status(200).json({
                stripe: {
                    customer: stripeCustomer,
                    payment: charge
                },
                message: `You successfully paid ${amount}$.`
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
