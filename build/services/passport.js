var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const User = require("../models/user.tsx");
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
        done(null, user);
    });
});
passport.use(new LocalStrategy({
    email: 'email',
    password: 'password'
}, (email, password, done) => __awaiter(this, void 0, void 0, function* () {
    try {
        const existingUser = yield User.findOne({ 'email': email });
        if (!existingUser) {
            return done(null, false);
        }
        bcrypt.compare(password, existingUser.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            if (result) {
                return done(null, existingUser);
            }
            done(null, false, { message: "Invalid password" });
        });
    }
    catch (error) {
        return done(error);
    }
})));
