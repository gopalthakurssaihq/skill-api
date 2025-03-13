const router = require('express').Router();

const {
makeExpressCallback,
makeValidatorCallback,
sessionChecker
} = require('../../middlewares');

// validator
const EmployeeSkillValidator = require('./employeeskill.validator');

// service
const EmployeeSkillService = require('./employeeskill.service');

// controller
const EmployeeSkillController = require('./employeeskill.controller');

// routes
const routes = require('./employeeskill.routes')({
    router,
    EmployeeSkillController,
    EmployeeSkillValidator,
    makeValidatorCallback,
    makeExpressCallback,
    sessionChecker
});

module.exports = {
    EmployeeSkillController,
    EmployeeSkillService,
    EmployeeSkillRoutes: routes
};