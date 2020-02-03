const CommonsService = require('./commons.service.ts').CommonsService;

const ParameterParser = {

    parseJson: function (json) {
        if (typeof json === 'string') {
            return JSON.parse(json);
        }
        if (CommonsService.isNullOrUndefined(json)) {
            return {};
        }
        return json;
    },
    stringify: function (json) {
        if (typeof json === 'string') {
            return json;
        }
        return JSON.stringify(json);
    },

    getStringParameter: function (json, name, required) {
        const stringValue = (json || {})[name];
        this.throwErrorIfUndefined(stringValue, name, required);
        return stringValue;
    },

    getArrayParameter: function (json, name, required) {
        const array = json[name];
        this.throwErrorIfUndefined(array, name, required);
        return CommonsService.convertToArray(array);
    },

    getIntegerParameter: function (json, name, required) {
        const stringValue = json[name];
        this.throwErrorIfUndefined(stringValue, name, required);
        return parseInt(stringValue, 10);
    },

    getFloatParameter: function (json, name, required) {
        const stringValue = json[name];
        this.throwErrorIfUndefined(stringValue, name, required);
        return parseFloat(stringValue);
    },

    getDateParameter: function (json, name, required) {
        const stringValue = this.getStringParameter(json, name, required);
        return CommonsService.getDateFromMoment(CommonsService.getMomentFromDateString(stringValue));
    },

    throwErrorIfUndefined: function (object, name, required) {
        if (CommonsService.isNullOrUndefined(object) && required) {
            throw new Error(`${name} is empty`);
        }
    }

}

exports.ParameterParser = ParameterParser;
