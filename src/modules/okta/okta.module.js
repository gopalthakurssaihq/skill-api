const router = require('express').Router();

const { makeExpressCallback, makeValidatorCallback, sessionChecker } = require('../../middlewares');

// validator
const OktaValidator = require('./okta.validator');

// service
const OktaService = require('./okta.service');

// controller
const OktaController = require('./okta.controller');

// routes
const routes = require('./okta.routes')({
  router,
  OktaController,
  OktaValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
});

module.exports = {
  OktaController,
  OktaService,
  OktaRoutes: routes
};
