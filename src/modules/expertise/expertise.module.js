const router = require('express').Router();

const {
makeExpressCallback,
makeValidatorCallback,
sessionChecker
} = require('../../middlewares');

// validator
const ExpertiseValidator = require('./expertise.validator');

// service
const ExpertiseService = require('./expertise.service');

// controller
const ExpertiseController = require('./expertise.controller');

// routes
const routes = require('./expertise.routes')({
    router,
    ExpertiseController,
    ExpertiseValidator,
    makeValidatorCallback,
    makeExpressCallback,
    sessionChecker
});

module.exports = {
    ExpertiseController,
    ExpertiseService,
    ExpertiseRoutes: routes
};