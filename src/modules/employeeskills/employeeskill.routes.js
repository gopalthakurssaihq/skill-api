module.exports = ({
  router,
  EmployeeSkillController,
  EmployeeSkillValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
}) => {
  router.post(
    '/',
    sessionChecker,
    makeValidatorCallback(EmployeeSkillValidator.add),
    makeExpressCallback(EmployeeSkillController.add)
  );

  router.post(
    '/record',
    sessionChecker,
    makeValidatorCallback(EmployeeSkillValidator.add),
    makeExpressCallback(EmployeeSkillController.addorupdate)
  );
  router.get('/', sessionChecker, makeExpressCallback(EmployeeSkillController.list));
  router.get('/:id', sessionChecker, makeExpressCallback(EmployeeSkillController.view));

  router.put(
    '/:id',
    sessionChecker,
    makeValidatorCallback(EmployeeSkillValidator.update),
    makeExpressCallback(EmployeeSkillController.update)
  );

  router.delete('/:id', sessionChecker, makeExpressCallback(EmployeeSkillController.delete));


  return router;
};
