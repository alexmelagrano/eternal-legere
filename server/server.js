'use strict';

const HTTP_PORT = 80;

const fs = require('fs');
const os = require('os');
const https = require('https');
const http = require('http');
const express = require('express');
const RoutesConfig = require('./config/routes.conf');
const MainRoutes = require('./routes/main.routes');

const app = express();

RoutesConfig.init(app);
MainRoutes.init(app, express.Router());


http.createServer(app)
    .listen(HTTP_PORT, () => {
        console.log(`HTTP up and running @: ${os.hostname()} on port: ${HTTP_PORT}`);
        console.log(`enviroment: ${process.env.NODE_ENV}`);
    });
