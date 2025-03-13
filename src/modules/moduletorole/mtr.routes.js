module.exports = ({
  router,
  ModuleToRoleController,
  ModuleToRoleValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
  }) => {
      router.post('/', 
          sessionChecker, 
          makeValidatorCallback(ModuleToRoleValidator.add),
          makeExpressCallback(ModuleToRoleController.add)
      );
  
      router.get('/',
          sessionChecker,
          makeExpressCallback(ModuleToRoleController.list)
      );
  
      router.get('/:id', 
          sessionChecker,
          makeExpressCallback(ModuleToRoleController.view)
      );
  
      router.put('/:id', 
          sessionChecker,
          makeValidatorCallback(ModuleToRoleValidator.update),
          makeExpressCallback(ModuleToRoleController.update)
      );
  
      router.delete('/:id',
          sessionChecker,
          makeExpressCallback(ModuleToRoleController.delete)
      );
  
      return router;
  };