
console.log('here');
require('dotenv').config();
const http = require('http');
const app = require('./app.tsx');
const cron = require('node-cron');
const FundValueService = require('./services/fund-value.service.ts').FundValueService;
const ShareValueService = require('./services/share-value.service.ts').ShareValueService;
const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;

const url = process.env.REACT_APP_MONGOOSE_URL;

const PORT = process.env.PORT || 3001;

console.log('creating server');
const server = http.createServer(app);

server.listen(PORT, () => {

    MongoClient.connect(url, function (err, db) {
        const dbo = db.db("ustxdb");
        if (err) throw err;
        dbo.collection("environmentDB").findOne({}, function (err, res) {
            if (err) throw err;
            const { scheduleHour = "" || process.env.SCHEDULE_HOUR, scheduleMinutes = "" || process.env.SCHEDULE_MINUTES, scheduleUtc = "" || process.env.SCHEDULE_UTC } = res
            cron.schedule(`${scheduleMinutes} ${scheduleHour} * * *`, () => {
                let currentDate = moment()
                let endingFundValue = FundValueService.getEndingAdjustmentFundValue(currentDate);
                const shareValue = ShareValueService.getNextDayShareValue(currentDate.clone().add(-1, 'days'));
                FundValueService.createFundValueForDate(endingFundValue, currentDate);
                ShareValueService.createShareValueForDate(shareValue, currentDate);
            },
                {
                    scheduled: true,
                    timezone: scheduleUtc
                });
            db.close();
        });
    });     

    console.log(`Listening on port ${PORT} `)
},
);

module.exports=server;
