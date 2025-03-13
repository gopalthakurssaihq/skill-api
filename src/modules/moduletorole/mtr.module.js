const router = require('express').Router();

const {
  makeExpressCallback,
  makeValidatorCallback,
  sessionChecker
} = require('../../middlewares');

// validator
const ModuleToRoleValidator = require('./mtr.validator');

// service
const ModuleToRoleService = require('./mtr.service');

// controller
const ModuleToRoleController = require('./mtr.controller');

// routes
const routes = require('./mtr.routes')({
  router,
  ModuleToRoleController,
  ModuleToRoleValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
});

module.exports = {
  ModuleToRoleController,
  ModuleToRoleService,
  ModuleToRoleRoutes: routes
};
