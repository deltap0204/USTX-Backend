const cron = require('node-cron');
const FundValueService = require('./fund-value.service.ts').FundValueService;
const ShareValueService = require('./share-value.service.ts').ShareValueService;
const EnvironmentDbModel = require('../models/environment_db.model.ts');
const moment = require('moment');

class EnvironmentDBService {
	async setCron() {
	    const result = await EnvironmentDbModel.findOne({});
	    const { scheduleHour , scheduleMinutes, scheduleUtc } = result;
        cron.schedule(`${scheduleMinutes ? scheduleMinutes : process.env.SCHEDULE_MINUTES} ${scheduleHour ? scheduleHour : process.env.SCHEDULE_HOUR} * * *`, () => {
            let currentDate = moment();
            let endingFundValue = FundValueService.getEndingAdjustmentFundValue(currentDate);
            const shareValue = ShareValueService.getNextDayShareValue(currentDate.clone().add(-1, 'days'));
            FundValueService.createFundValueForDate(endingFundValue, currentDate);
            ShareValueService.createShareValueForDate(shareValue, currentDate);
        },
        {
            scheduled: true,
            timezone: scheduleUtc ? scheduleUtc : process.env.SCHEDULE_UTC 
        });
	}
}

const EnvironmentDBServiceInstance = new EnvironmentDBService();
exports.EnvironmentDBService = EnvironmentDBServiceInstance;
