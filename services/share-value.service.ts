const CommonsService = require('./commons.service.ts').CommonsService;
const ShareValueModel = require('../models/share-value.model.ts');
const mongoose = require('mongoose');
const TOKEN_PROPERTIES = require('../models/token-properties.ts').TOKEN_PROPERTIES;

class ShareValueService {

    getShareValueForDate(date) {
        const momentDate = CommonsService.getMomentFromDate(date).startOf('day');
        const tokenStartDate = CommonsService.getMomentFromDate(TOKEN_PROPERTIES.TOKEN_START_TIME).startOf('day');
        if (momentDate.isBefore(tokenStartDate)) {
            return Promise.reject(`Token doesnt exist before ${date}`);
        }
        return ShareValueModel.findOne({
            'startTime': {'$gte': this.getShareValueStartTimeOfDay(date)},
            'endTime': {'$lte': this.getShareValueEndTimeOfDay(date)}
        })
    }

    getShareValueForDateRanges(startTime, endTime) {
        return ShareValueModel.find({
            'startTime': {'$gte': CommonsService.getDateFromMoment(startTime)},
            'endTime': {'$lte': CommonsService.getDateFromMoment(endTime)}
        });
    }


    async getNextDayShareValue(currentDate) {
        const momentDate = CommonsService.getMomentFromDate(currentDate);
        const shareValue = await this.getShareValueForDate(momentDate);
        if (CommonsService.isNullOrUndefined(shareValue)) {
            return Promise.reject(`${currentDate} is invalid. No share value found`);
        }
        return this.calculateNextDayShareValuePrice(shareValue.price, shareValue.interest, momentDate);
    }

    calculateNextDayShareValuePrice(currentShareValuePrice, interest, currentDate) {
        return currentShareValuePrice *
            (1 + (interest / CommonsService.getTotalDaysInYear(currentDate)));
    }

    async createShareValueForDate(price, date, interest) {
        let shareValue = await this.getShareValueForDate(date);
        if (CommonsService.isNullOrUndefined(shareValue)) {
            shareValue = new ShareValueModel({
                // _id: mongoose.Schema.Types.ObjectId,
                price: price,
                interest: interest || TOKEN_PROPERTIES.FUND_INTEREST,
                startTime: this.getShareValueStartTimeOfDay(date),
                endTime: this.getShareValueEndTimeOfDay(date)
            });
            return shareValue.save();
        } else {
            return Promise.reject(`share value already exists for date ${date}`);
        }
    }

    getShareValueStartTimeOfDay(date) {
        return CommonsService.getMomentFromDate(date).startOf('day').toDate();
    }

    getShareValueEndTimeOfDay(date) {
        return CommonsService.getMomentFromDate(date).endOf('day').toDate();
    }
}

const ShareValueServiceInstance = new ShareValueService();
exports.ShareValueService = ShareValueServiceInstance;
