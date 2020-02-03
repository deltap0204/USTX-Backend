const moment = require('moment');

const DATE_FORMAT = 'YYYY-MM-DD';

class CommonsService {

    isNullOrUndefined(object) {
        if (object === undefined || object === null) {
            return true;
        } else {
            return false;
        }
    }

    convertToArray(object) {
        if (!object) {
            return [];
        }
        let array = [];
        array = !Array.isArray(object) ? [object] : object;
        return array;
    }

    getMomentFromDateString(timeString) {
        return moment(timeString, DATE_FORMAT)
            .clone();
    }

    getMomentFromDate(date) {
        return moment(date)
            .clone();
    }

    getDateFromMoment(moment) {
        return moment.toDate();
    }

    getTotalDaysInYear(moment) {
        return moment.isLeapYear() ? 366 : 365;
    }
}

exports.CommonsService = new CommonsService();
