module.exports = {

  payment: async (req, res, next) => {
    let card = req.body.card;
   // console.log("middleware", card);
    if (!card.number || !card.exp_year || !card.exp_month || !card.cvc) {
      res.status(400).json({err:"Card information is missing."})
    } else {
      next();
    }

  }
}
