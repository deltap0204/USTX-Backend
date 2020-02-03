const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require('passport-local');
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
var path = require('path');
const authRoutes = require('./routes/auth.tsx');
const adminRoutes = require('./routes/admin.tsx');
require('dotenv').config();
console.log(process.env.REACT_APP_MONGOOSE_URL);
mongoose.connect(process.env.REACT_APP_MONGOOSE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true
});
mongoose.set('debug', true);
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
