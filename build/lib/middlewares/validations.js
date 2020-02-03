var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    payment: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let card = req.body.card;
        // console.log("middleware", card);
        if (!card.number || !card.exp_year || !card.exp_month || !card.cvc) {
            res.status(400).json({ err: "Card information is missing." });
        }
        else {
            next();
        }
    })
};
