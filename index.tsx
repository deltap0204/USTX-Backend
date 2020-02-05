
console.log('here');
require('dotenv').config();
const http = require('http');
const app = require('./app.tsx');
const cron = require('node-cron');
const FundValueService = require('./services/fund-value.service.ts').FundValueService;
const ShareValueService = require('./services/share-value.service.ts').ShareValueService;
const moment = require('moment');

const PORT = process.env.PORT || 3001;

console.log('creating server');
const server = http.createServer(app);

server.listen(PORT, () => {

    const SCHEDULE_MINUTES = process.env.SCHEDULE_MINUTES;
    const SCHEDULE_HOUR = process.env.SCHEDULE_HOUR;
    const SCHEDULE_UTC = process.env.SCHEDULE_UTC

    cron.schedule(`${SCHEDULE_MINUTES} ${SCHEDULE_HOUR} * * *`, () => {
        let currentDate = moment()
        let endingFundValue = FundValueService.getEndingAdjustmentFundValue(currentDate);
        const shareValue = ShareValueService.getNextDayShareValue(currentDate.clone().add(-1, 'days'));
        console.log(endingFundValue, shareValue)
    }, {
        scheduled: true,
        timezone: SCHEDULE_UTC
    });

    console.log(`Listening on port ${PORT} `)
},
);

module.exports=server;
