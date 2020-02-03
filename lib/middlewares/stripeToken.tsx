
var stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECURITY_KEY)
module.exports = {
  generateToken: async(card, res) => {
    //console.log("card", card);
    let cardToken = await stripe.tokens.create({card:card });
    //console.log("cardToken", cardToken);
    if (cardToken) {
      //console.log(cardToken,"=>")
      return cardToken
    }
  }
}
