var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECURITY_KEY);
module.exports = {
    generateToken: (card, res) => __awaiter(this, void 0, void 0, function* () {
        //console.log("card", card);
        let cardToken = yield stripe.tokens.create({ card: card });
        //console.log("cardToken", cardToken);
        if (cardToken) {
            //console.log(cardToken,"=>")
            return cardToken;
        }
    })
};
