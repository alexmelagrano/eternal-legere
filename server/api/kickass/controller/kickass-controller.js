"use strict";
const request = require('request');

module.exports = class KickAssController {

    static rfError(req, res) {
        res.status(500).end('Unknown error occurred while processing your request.')
    }

    static rfGetReq(req, res) {

    }

    static kickAssTest(req, res) {
        res.status(200).send('The Web Server is live!!!!')
    }

};
