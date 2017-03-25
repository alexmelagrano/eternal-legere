"use strict";

const KickAssRoutes = require('../api/kickass/routes/kickass-routes');
const path = require('path');

module.exports = class Routes {
    static init(app, router) {
        KickAssRoutes.init(router);
        router
            .route('/fdafqgaf')
            .get(function (req, res) {
		        res.sendFile(path.join(__dirname, '../../client', 'api', 'index.html'));
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
