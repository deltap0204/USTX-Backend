
const { payment } = require('../lib/middlewares/validations.tsx');
const { generateToken} = require('../lib/middlewares/stripeToken.tsx');

var stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECURITY_KEY);
exports.thirdparty1 = (req, res, next) => {
    console.log("thirdparty1" , req.body);
    return res.status(200).json({message: "success"});
};
exports.thirdparty2 = async (req, res, next) => {
    try {
        //console.log("thirdparty2" , req.body);
        let userEmail = req.body.email;
        let card = req.body.card;
        let amount = req.body.amount;
        let token = await generateToken(card, res);
        //console.log("token", token);
        //Create stripe customer
        let stripeCustomer = await stripe.customers.create({
            email: userEmail,
            source: token.id
        })

        //console.log("stripeCustomer", stripeCustomer);

        //Create stripe payment

        let charge = await stripe.charges.create({
            amount: amount *100,
            currency: "usd",
            customer: stripeCustomer.id
        })
        //console.log("charge", charge);

        if (charge) {
            res.status(200).json({
                stripe: {
                    customer: stripeCustomer,
                    payment: charge
                },
                message: `You successfully paid ${amount}$.`
            })
        }
    }
    catch (error) {
        console.log(error);
    }

};

