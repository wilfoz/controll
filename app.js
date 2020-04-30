const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./app_api/models/db');

const routerProductions = require('./app_api/routes/productions');
const routerLeader = require('./app_api/routes/leaders');
const routerTowers = require('./app_api/routes/towers');
const routerActivities = require('./app_api/routes/activities');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api', routerProductions);
app.use('/api', routerLeader);
app.use('/api', routerTowers);
app.use('/api', routerActivities);

module.exports = app;
