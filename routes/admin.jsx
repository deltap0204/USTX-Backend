var express = require("express");
var router = express.Router();
var AdminController = require('../controllers/admin.tsx');
var SumSubContorller=require('../controllers/sum-sub');

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
router.post('/login', function (req, res, next) {
    AdminController.LogIn(req, res, next);
});

module.exports = router;
