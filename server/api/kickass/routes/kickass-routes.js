"use strict";

const KickAssController = require('../controller/kickass-controller');
const Webhooks = require('../controller/webhooks-controller');
const auth = require('../../../auth/auth.service');

module.exports = class KickAssRoutes {
    static init(router) {
        router
            .route('/api/kickass')
            .get(KickAssController.kickAssTest);
        router
            .route('/api/slash/torrents')
            .post(auth.isValidWebhook(), Webhooks.slackRequest)
    }
};
