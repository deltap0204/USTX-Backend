const supertest = require("supertest");
const assert = require('assert');
const app = require("../index.tsx");
import {expect} from 'chai';
import {agent as request} from 'supertest';

const session = require('supertest-session');


describe("Index Test", () => {
    it('should always pass', function () {
        expect(true).to.equal(true);
    });
});

let testSession = null;
let authenticatedSession;
let loggedAccount :any= null;
describe("Login buy and sell tests", () => {
    beforeEach(function (done) {
        var testSession = session(app);
        testSession
            .post('/api/login').send({email: "rakeshgudipudi@gmail.com", password: 'Work@123', token: 'token'})
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                loggedAccount = res.body;
                authenticatedSession = testSession;
                return done();
            });
    });
    it('should execute succesful buy', async function () {
        const etherScan = request('https://api.etherscan.io/api');
        // @ts-ignore
        const res = await authenticatedSession.post('/api/buy').send({
            "type": false,
            "UserId": loggedAccount!._id,
            "USD": "2",
            "USTX": "0.1",
            "Name": loggedAccount!.firstName,
            "Email": loggedAccount!.email,
            "Address": "0xCAE6e8d58CEc241243D50bEDb5632AC9f652C5AE",
            "CardName": loggedAccount!.firstName,
            "CardNum": "4242424242424242",
            "EXP": "10/21",
            "CVC": "111"
        });

        // expect(res.status).to.equal(200);
        const transactionId=res.body.transaction.Unique_ID;
        const transactionResult = await etherScan.get(`/?module=transaction&action=getstatus&txhash=${transactionId}&apikey=RD6112E7FSISSVD9TWXXTMK8YJKEY9PDWK`);
        console.log(transactionResult.body);
        console.log(transactionResult.body.result);
        expect(transactionResult.body.result.isError).to.equal('0');

    });
});