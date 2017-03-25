'use strict';

const compose = require('composable-middleware');
const request = require('request');


// TODO :: Monitoring

module.exports = class Auth {
    /**
     * Attaches the user object to the request if authenticated
     * Otherwise returns 403
     */
     static validUser() {
        return compose()
        // Checks to see if API Key + User is valid
            .use(function (req, res, next) {
                try {
                    if (!req.headers.authorization) {
                        return res.status(401).end('Missing authentication headers');
                    }
                    let encoded = req.headers.authorization.split(' ')[1];
                    let decoded = new Buffer(encoded, 'base64').toString('utf8');
                    let user = {
                        user: decoded.split(':')[0],
                        apiKey: decoded.split(':')[1]
                    };
                    verifyUser(user, function (verified) {
                        if (!verified) {
                            return res.status(401).end('Could not verify user');
                        }
                        req.user = user;
                        next();
                    })
                } catch (e) {
                    res.status(500).end('Failed to authenticate user');
                    console.log('FATAL: ' + e.toString());
                }
            });
    }

    /**
     * Checks to see if this request is passing through the correct subdomain router
     */
    static subdomain(sub) {
        return compose()
            .use(function (req, res, next) {
                try {
                    if (req.headers.host.includes(sub + '.')) {
                        next();
                    } else {
                        next('route');
                    }
                } catch (e) {
                    next('route');
                }
            });
    }

};




/**
 * Takes a user and verifies the user
 * Returns a boolean if verified
 */
function verifyUser(user, callback) {
    return callback(true)
}
