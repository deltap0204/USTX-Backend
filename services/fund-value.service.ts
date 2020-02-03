const CommonsService = require('./commons.service.ts').CommonsService;
const FundValueModel = require('../models/fund-value.model.ts');
const TransactionsModel = require('../models/transaction.tsx');
const mongoose = require('mongoose');
const TOKEN_PROPERTIES = require('../models/token-properties.ts').TOKEN_PROPERTIES;
const ShareValueService = require('../services/share-value.service.ts').ShareValueService;

class FundValueService {

    getFundValueForDate(date) {
        const momentDate = CommonsService.getMomentFromDate(date).startOf('day');
        const tokenStartDate = CommonsService.getMomentFromDate(TOKEN_PROPERTIES.TOKEN_START_TIME).startOf('day');
        if (momentDate.isBefore(tokenStartDate)) {
            return Promise.reject(`Token doesnt exist before ${date}`);
        }
        return FundValueModel.findOne({
            'startTime': {'$gte': this.getFundValueStartTimeOfDay(date)},
            'endTime': {'$lte': this.getFundValueEndTimeOfDay(date)}
        });
    }

    getFundValueForDateRanges(startTime, endTime) {
        return FundValueModel.find({
            'startTime': {'$gte': CommonsService.getDateFromMoment(startTime)},
            'endTime': {'$lte': CommonsService.getDateFromMoment(endTime)}
        });
    }

    async getNextDayPreAdjustmentFundValue(currentDate) {
        const currentMomentDate = CommonsService.getMomentFromDate(currentDate);
        const nextDayMomentDate = currentMomentDate.clone().add(1, 'days');
        const currentFundValue = await this.getFundValueForDate(currentMomentDate);
        const currentDayShareValue = await ShareValueService.getShareValueForDate(currentMomentDate);
        const nextDayShareValue = await ShareValueService.getShareValueForDate(nextDayMomentDate);
        if (CommonsService.isNullOrUndefined(currentFundValue)) {
            return Promise.reject(`${currentDate} is invalid. No share value found`);
        }
        return this.calculatePreAdjustmentFundValue(currentFundValue.preAdjustmentValue, nextDayShareValue.price,
            currentDayShareValue.price);
    }

    async getEndingAdjustmentFundValue(currentDate) {
        const momentCurrentDate = CommonsService.getMomentFromDate(currentDate);
        const momentPreviousDate = momentCurrentDate.clone().add(-1, 'days');
        const fundValue = await this.getFundValueForDate(currentDate);

        if (CommonsService.isNullOrUndefined(fundValue)) {
            throw new Error(`cannot find fund value for date ${currentDate}`);
        }
        const netDeposits = await this.getNetDepositsForDate(currentDate);
        const netRedeems = await this.getNetRedeems(currentDate);
        const coinValue = await this.getCoinValueForDate(momentPreviousDate);

        const endingFundValue = this.calculateEndingFundValue(fundValue.preAdjustmentValue, netDeposits, netRedeems,
            coinValue, this.getDepositFeeRate(currentDate));

        return endingFundValue;
    }

    async getCoinValueForDate(currentDate) {
        const fundValuePreviousDate = await this.getFundValueForDate(currentDate);
        const previousRedeems = await this.getNetRedeems(currentDate.add(-1, 'days'));

        const coinValue = previousRedeems ? this.calculateCoinValue(fundValuePreviousDate.preAdjustmentValue,
            previousRedeems) : 0;
        return coinValue;
    }

    calculateCoinValue(preAdjustmentFundValue, numberOfRedeems) {
        return preAdjustmentFundValue / numberOfRedeems;
    }

    getDepositFeeRate(currentDate) {
        return TOKEN_PROPERTIES.DEPOSIT_FEE_RATE / CommonsService.getTotalDaysInYear(currentDate);
    }

    calculatePreAdjustmentFundValue(currentDayEndingFundValue, nextDayShareValue, currentDayShareValue) {
        return currentDayEndingFundValue * (nextDayShareValue / currentDayShareValue);
    }

    calculateEndingFundValue(preAdjustmentFundValue, netDeposits, netRedeems, preAdjustmentCoinValue, depositFeeRate) {
        return ((preAdjustmentFundValue) + netDeposits - (netRedeems * preAdjustmentCoinValue)) * (1 - depositFeeRate);
    }

    async createFundValueForDate(preAdjustmentValue, date) {
        let fundValue = await this.getFundValueForDate(date);
        if (CommonsService.isNullOrUndefined(fundValue)) {
            fundValue = new FundValueModel({
                preAdjustmentValue: preAdjustmentValue,
                startTime: this.getFundValueStartTimeOfDay(date),
                endTime: this.getFundValueEndTimeOfDay(date)
            });
            return fundValue.save();
        } else {
            return Promise.reject(`share value already exists for date ${date}`);
        }
    }

    updateFundValue(fundValue) {
        if (CommonsService.isNullOrUndefined(fundValue)) {
            throw new Error(`fund value cannot be null to update it`);
        }
        return fundValue.save();
    }

    async getNetDepositsForDate(date) {
        //TODO:have to find out whether we need date
        const transactions = await TransactionsModel.find(
            {
                type: false,
                'createdAt': {
                    '$gte': this.getFundValueStartTimeOfDay(date),
                    '$lte': this.getFundValueEndTimeOfDay(date)
                },
            }
        );
        const sum = (transactions || []).map(a => a.USD).reduce((a, b) => {
            return parseFloat(a) + parseFloat(b)
        }, 0);
        return sum;
    }

    async getNetIssued(date) {
        const transactions = await TransactionsModel.find(
            {
                type: true,
                'createdAt': {
                    '$gte': this.getFundValueStartTimeOfDay(date),
                    '$lte': this.getFundValueEndTimeOfDay(date)
                },
            }
        );
        const sum = (transactions || []).map(a => a.USTX).reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
        return sum;
    }

    async getNetRedeems(date) {
        //TODO:have to find out whether we need date
        const value = await TransactionsModel.aggregate([
            {
                $match: {
                    type: true,
                    SellConfirmed: true,
                    'createdAt': {
                        '$gte': this.getFundValueStartTimeOfDay(date),
                        '$lte': this.getFundValueEndTimeOfDay(date)
                    },
                }
            },
            {$group: {_id: null, amount: {$sum: 'USTX'}}}
        ]);
        console.log(value);
        return value ? value.amount || 0 : 0;
    }

    getFundValueStartTimeOfDay(date) {
        return CommonsService.getMomentFromDate(date).startOf('day').toDate();
    }

    getFundValueEndTimeOfDay(date) {
        return CommonsService.getMomentFromDate(date).endOf('day').toDate();
    }
}

const FundValueServiceInstance = new FundValueService();
exports.FundValueService = FundValueServiceInstance;
