module.exports = ({
router,
ExpertiseController,
ExpertiseValidator,
makeValidatorCallback,
makeExpressCallback,
sessionChecker
}) => {
    router.post('/', 
        sessionChecker, 
        makeValidatorCallback(ExpertiseValidator.add),
        makeExpressCallback(ExpertiseController.add)
    );

    router.get('/',
        sessionChecker,
        makeExpressCallback(ExpertiseController.list)
    );

    router.get('/:id', 
        sessionChecker,
        makeExpressCallback(ExpertiseController.view)
    );

    router.put('/:id', 
        sessionChecker,
        makeValidatorCallback(ExpertiseValidator.update),
        makeExpressCallback(ExpertiseController.update)
    );

    router.delete('/:id',
        sessionChecker,
        makeExpressCallback(ExpertiseController.delete)
    );

    return router;
};