const SUM_SUB_URL = process.env.SUM_SUB_URL;
const SUM_SUB_PASSWORD = process.env.SUM_SUB_PASSWORD;
const SUM_SUB_USER_NAME = process.env.SUM_SUB_USER_NAME;
const axios = require('axios');
const encode = require('nodejs-base64-encode');
const sumSubInstance = axios.create({
    baseURL: SUM_SUB_URL,
    timeout: 10000,
});
const createAuthToken = () => {
    return sumSubInstance.post('/resources/auth/login', null, {
        headers: {
            Authorization: 'Basic ' + encode.encode(`${SUM_SUB_USER_NAME}:${SUM_SUB_PASSWORD}`, 'base64'),
            'Content-Type': 'application/json'
        }
    });
};
const countriesQuery = require("countries-code");
const createApplicant = (user, authToken) => {
    const params = {
        "externalUserId": user._id,
        "info": {
            "country": countriesQuery.convertAlphaCode(user.address.country),
            "firstName": user.firstName,
            "lastName": user.lastName,
            "phone": user.mobileNo,
            "dob": user.DOB,
        },
        "requiredIdDocs": {
            "docSets": [{
                    "idDocSetType": "IDENTITY",
                    "types": [
                        "PASSPORT",
                        "ID_CARD",
                        "DRIVERS"
                    ]
                },
                {
                    "idDocSetType": "SELFIE",
                    "types": [
                        "SELFIE"
                    ]
                },
                {
                    "idDocSetType": "PROOF_OF_RESIDENCE",
                    "types": [
                        "UTILITY_BILL"
                    ]
                }
            ]
        }
    };
    return sumSubInstance.post('/resources/applicants', params, {
        headers: {
            Authorization: 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
    });
};
exports.createAuthToken = createAuthToken;
exports.createApplicant = createApplicant;
