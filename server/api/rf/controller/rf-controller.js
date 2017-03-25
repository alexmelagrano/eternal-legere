"use strict";
const request = require('request');

module.exports = class RFController {

    static rfOptions(req, res) {
        res.status(200).json({upload_file: false})
    }

    static rfError(req, res) {
        res.status(500).end('Unknown error occurred while processing your request.')
    }

    static rfGetReq(req, res) {

    }

    static rfSearch(req, res) {

    }

};
