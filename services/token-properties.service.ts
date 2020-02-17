const CommonsService = require('./commons.service.ts').CommonsService;
const TokenPropertiesModel = require('../models/token-properties.model.ts');
const ParameterParser = require('../services/parameter-parser.ts').ParameterParser;

class TokenPropertiesService {
	async updateTokenProperties(tokenProps) {
        if (CommonsService.isNullOrUndefined(tokenProps)) {
        	throw new Error(`token properties cannot be null to update it`);
        }        
        return tokenProps.save();
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