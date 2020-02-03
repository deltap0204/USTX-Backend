const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.tsx');
const SumSubController = require('../controllers/sum-sub.tsx');

router.post('/get_dashboard_data', function (req, res, next) {
    AdminController.GetDashboardData(req, res, next);
});
router.post('/get_sell_requests', function (req, res, next) {
    AdminController.GetSellRequests(req, res, next);
});
router.post('/check_confirm', function (req, res, next) {
    AdminController.CheckConfirm(req, res, next);
});
router.post('/set_token_price', function (req, res, next) {
    AdminController.SetTokenPrice(req, res, next);
});
router.post('/get_token_price', function (req, res, next) {
    AdminController.GetTokenPrice(req, res, next);
});
router.post('/update_password', function (req, res, next) {
    AdminController.UpdatePassword(req, res, next);
});
router.post('/sumsubtoken', function (req, res, next) {
    SumSubController.createAuthToken(req, res, next);
});

router.post('/sumsub', function (req, res, next) {
    SumSubController.createApplicant(req, res, next);
});

router.post('/sumsubverify', function (req, res, next) {
    SumSubController.recieveResult(req, res, next);
});

router.post('/sharevalue', function (req, res, next) {
    AdminController.createSharePriceForDate(req, res, next);
});

router.get('/sharevalue', function (req, res, next) {
    AdminController.getShareValueForDate(req, res, next);
});


router.get('/fundvalue', function (req, res, next) {
    AdminController.getFundValueForDate(req, res, next);
});

router.get('/tokenproperties', function (req, res, next) {
    AdminController.getTokenProperties(req, res, next);
});

router.post('/startShareValue', function (req, res, next) {
    AdminController.createStartShareValue(req, res, next);

});

router.post('/startFundValue', function (req, res, next) {
    AdminController.createStartFundValue(req, res, next);

});

router.post('/createShareValueRange', function (req, res, next) {
    AdminController.createSharePricesForDates(req, res, next);
});

router.get('/getShareValueRange', function (req, res, next) {
    AdminController.getShareValueForDates(req, res, next);
});


router.post('/createFundValueRange', function (req, res, next) {
    AdminController.createFundValuesForDates(req, res, next);
});

router.get('/getFundValueRange', function (req, res, next) {
    AdminController.getFundValuesForDates(req, res, next);
});

router.put('/updateFundValueRange', function (req, res, next) {
    AdminController.updateEndFundValuesForDates(req, res, next);
});

router.post('/login', function (req, res, next) {
    AdminController.LogIn(req, res, next);
});
router.post('/get_total_purchase', function (req, res, next) {
    AdminController.getTotalPurchase(req, res, next)
});
router.post('/get_buy_sell_tokens', function (req, res, next) {
    AdminController.getBuySellTokens(req, res, next)
});
module.exports = router;
