const CommonsService = require('../services/commons.service.ts').CommonsService;

const TOKEN_PROPERTIES = {
    TOTAL_TOKENS: parseInt(process.env.TOTAL_TOKENS, 10),
    TOKEN_START_TIME: CommonsService.getDateFromMoment(
        CommonsService.getMomentFromDateString(process.env.FUND_START_DATE)),
    FUND_INTEREST: parseFloat(process.env.FUND_INTEREST),
    INITIAL_SHARE_VALUE: parseFloat(process.env.INITIAL_SHARE_VALUE),
    INITIAL_PRE_FUND_VALUE: parseFloat(process.env.INITITAL_PRE_FUND_VALUE),
    INITIAL_ENDING_FUND_VALUE: parseFloat(process.env.INITIAL_ENDING_FUND_VALUE),
    DEPOSIT_FEE_RATE: parseFloat(process.env.DEPOSIT_FEE_RATE)
};

exports.TOKEN_PROPERTIES = TOKEN_PROPERTIES;
