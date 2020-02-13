const CommonsService = require('./commons.service.ts').CommonsService;
const TokenPropertiesModel = require('../models/token-properties.model.ts');

class TokenPropertiesService {
	async updateTokenProperties(tokenProps) {
        if (CommonsService.isNullOrUndefined(tokenProps)) {
        	throw new Error(`token properties cannot be null to update it`);
        } 
        const tokenProperties = await TokenPropertiesModel.findOne({});
        tokenProperties.tokenTotal = tokenProps.tokenTotal;
        tokenProperties.tokenStartTime = tokenProps.tokenStartTime;
        tokenProperties.fundInterest = tokenProps.fundInterest;
        tokenProperties.intialShareValue = tokenProps.intialShareValue;
        tokenProperties.intialPreFundValue = tokenProps.intialPreFundValue;
        tokenProperties.intialEndingFundValue = tokenProps.intialEndingFundValue;
        tokenProperties.depositFeeRate = tokenProps.depositFeeRate;
        return tokenProperties.save();
    }
}

const TokenPropertiesServiceInstance = new TokenPropertiesService();
exports.TokenPropertiesService = TokenPropertiesServiceInstance;