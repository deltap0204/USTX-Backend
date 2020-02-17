const CommonsService = require('./commons.service.ts').CommonsService;
const TokenPropertiesModel = require('../models/token-properties.model.ts');
const ParameterParser = require('../services/parameter-parser.ts').ParameterParser;

class TokenPropertiesService {
	async updateTokenProperties(tokenProps) {
        if (CommonsService.isNullOrUndefined(tokenProps)) {
        	throw new Error(`token properties cannot be null to update it`);
        } 
        const tokenProperties = await TokenPropertiesModel.findOne({});
        if(tokenProps.tokenTotal != '') {
            tokenProperties.tokenTotal = ParameterParser.getIntegerParameter(tokenProps, 'tokenTotal', true);
        }
        if(tokenProps.tokenStartTime != '') {
            tokenProperties.tokenStartTime = ParameterParser.getDateParameter(tokenProps, 'tokenStartTime', true);
        }
        if(tokenProps.fundInterest != '') {
            tokenProperties.fundInterest = ParameterParser.getFloatParameter(tokenProps, 'fundInterest', true);
        }
        if(tokenProps.intialShareValue != '') {
            tokenProperties.intialShareValue = ParameterParser.getFloatParameter(tokenProps, 'intialShareValue', true);
        }
        if(tokenProps.intialPreFundValue != '') {
            tokenProperties.intialPreFundValue = ParameterParser.getFloatParameter(tokenProps, 'intialPreFundValue', true);
        }
        if(tokenProps.intialEndingFundValue != '') {
            tokenProperties.intialEndingFundValue = ParameterParser.getFloatParameter(tokenProps, 'intialEndingFundValue', true);
        }
        if(tokenProps.depositFeeRate != '') {
            tokenProperties.depositFeeRate = ParameterParser.getFloatParameter(tokenProps, 'depositFeeRate', true);
        }
        return tokenProperties.save();
    }

    async getTokenProperties() {
        const result = await TokenPropertiesModel.findOne({});
        if (result == null) {
            throw new Error(`cannot find token properties`);
        }
        return result;
    }
}

const TokenPropertiesServiceInstance = new TokenPropertiesService();
exports.TokenPropertiesService = TokenPropertiesServiceInstance;