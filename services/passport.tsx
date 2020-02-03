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
            done(null, user)
        })
});



passport.use(

    new LocalStrategy({
        email: 'email',
        password: 'password'
		},
    async (email, password, done) => {

        try {
            const existingUser = await User.findOne({ 'email': email });

            if(!existingUser) {
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

        } catch (error) {
            return done(error);
        }

    }

));
