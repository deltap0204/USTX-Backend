var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require('passport-local');
var cookieSession = require("cookie-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var path = require('path');
var authRoutes = require('./routes/auth.tsx');
var adminRoutes = require('./routes/admin.tsx');
require('dotenv').config();
mongoose.connect(process.env.REACT_APP_MONGOOSE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true
});
app.set('x-powered-by', false);
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", authRoutes);
app.use("/admin", adminRoutes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
module.exports = app;
