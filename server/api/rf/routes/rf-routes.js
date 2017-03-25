"use strict";

const RFController = require('../controller/rf-controller');
const auth = require('../../../auth/auth.service');

module.exports = class RFRoutes {
    static init(router) {
        router
            .route('/api/rf')
            .post(auth.validUser(), RFController.rfSearch)
            .options(auth.validUser(), RFController.rfOptions);

        router
            .route('/api/rf/:id')
            .get(auth.validUser(), RFController.rfGetReq)
    }
};
