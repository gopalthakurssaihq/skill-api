const router = require('express').Router();

const {
makeExpressCallback,
makeValidatorCallback,
sessionChecker
} = require('../../middlewares');

// validator
const SkillValidator = require('./skill.validator');

// service
const SkillService = require('./skill.service');

// controller
const SkillController = require('./skill.controller');

// routes
const routes = require('./skill.routes')({
    router,
    SkillController,
    SkillValidator,
    makeValidatorCallback,
    makeExpressCallback,
    sessionChecker
});

module.exports = {
    SkillController,
    SkillService,
    SkillRoutes: routes
};