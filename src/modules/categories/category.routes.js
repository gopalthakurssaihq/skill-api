module.exports = ({
router,
CategoryController,
CategoryValidator,
makeValidatorCallback,
makeExpressCallback,
sessionChecker
}) => {
    router.post('/', 
        sessionChecker, 
        makeValidatorCallback(CategoryValidator.add),
        makeExpressCallback(CategoryController.add)
    );

    router.get('/',
        sessionChecker,
        makeExpressCallback(CategoryController.list)
    );

    router.get('/:id', 
        sessionChecker,
        makeExpressCallback(CategoryController.view)
    );

    router.put('/:id', 
        sessionChecker,
        makeValidatorCallback(CategoryValidator.update),
        makeExpressCallback(CategoryController.update)
    );

    router.delete('/:id',
        sessionChecker,
        makeExpressCallback(CategoryController.delete)
    );

    return router;
};