const router = require('express').Router();

const {
makeExpressCallback,
makeValidatorCallback,
sessionChecker
} = require('../../middlewares');

// validator
const CategoryValidator = require('./category.validator');

// service
const CategoryService = require('./category.service');

// controller
const CategoryController = require('./category.controller');

// routes
const routes = require('./category.routes')({
    router,
    CategoryController,
    CategoryValidator,
    makeValidatorCallback,
    makeExpressCallback,
    sessionChecker
});

module.exports = {
    CategoryController,
    CategoryService,
    CategoryRoutes: routes
};