const express = require("express");
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
router.post('/sumsubverify', function (req, res, next) {
    SumSubController.recieveResult(req, res, next);
});
router.post('/login', function (req, res, next) {
    AdminController.LogIn(req, res, next);
});
router.post('/get_total_purchase', function (req, res, next) {
    AdminController.getTotalPurchase(req, res, next);
});
router.post('/get_buy_sell_tokens', function (req, res, next) {
    AdminController.getBuySellTokens(req, res, next);
});
module.exports = router;
