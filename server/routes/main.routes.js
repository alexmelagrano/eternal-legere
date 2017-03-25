"use strict";

const RFRoutes = require('../api/rf/routes/rf-routes');
const path = require('path');

module.exports = class Routes {
    static init(app, router) {
        RFRoutes.init(router);
        router
            .route('/')
            .get(function (req, res) {
                if (req.headers.host.includes('spirited-away.')) {
                    res.sendFile(path.join(__dirname, '../../client', 'subdomain1', 'index.html'));
                } else if (req.headers.host.includes('api.')) {
		    res.sendFile(path.join(__dirname, '../../client', 'api', 'index.html')); 
		} else {
                    res.sendFile(path.join(__dirname, '../../client', 'main', 'index.html'));
                }
            });
        // 404 Handling error
        router
            .route('*')
            .all(function (req, res) {
                res.send('404 Not Found', 404);
            });
        app.use('/', router);
    }
};
