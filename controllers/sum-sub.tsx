const sumSubService = require('../services/sum-sub-service.tsx');
const User = require('../models/user.tsx');
const mongoose = require('mongoose');

const createAuthToken = (req, res, next) => {
    sumSubService.createAuthToken().then(function (success) {
        return res.status(200).json(success.data);
    }, function (error) {
        return res.status(500).json(error);
    })
};

const createApplicant = (req, res, next) => {
    const userId = req.body.userId;
    User.findById(userId).then(function (success) {
        console.log('user', success);
        sumSubService.createAuthToken().then(function (success2) {
            sumSubService.createApplicant(success, success2.data.payload).then(function (success) {
                return res.status(200).json(success.data);
            }, function (error) {
                console.log(error);
                return res.status(500).json(error.response.data);
            })
        }, function (error) {
            console.log(error);
            return res.status(500).json(error.response.data);
        })

    }, function (error) {
        return res.status(500).json(error);
    });
};

const recieveResult = (req, res, next) => {
    const userId = req.body.externalUserId;
    User.findById(userId).then(function (success) {
        console.log('user', success);
        success.sumSubVerified = req.body.reviewResult.reviewAnswer === 'GREEN';
        User.update({'_id': success._id}, success)
            .then(doc => {
                if (!doc) {
                    return res.status(404).end();
                }
                return res.status(200).json(doc);
            })
            .catch(err => {
                return res.status(500).json(error);
            });

    }, function (error) {
        return res.status(500).json(error);
    });
};

exports.createAuthToken = createAuthToken;
exports.createApplicant = createApplicant;
exports.recieveResult = recieveResult;