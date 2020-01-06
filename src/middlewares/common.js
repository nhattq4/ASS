const cors = require('cors');
const compression = require('compression');
var express = require('express');

const registerMiddleware = app => {
    app.use(cors());
    app.options('*', cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(compression());
};

module.exports = {
    name: 'Common',
    register: registerMiddleware
};
