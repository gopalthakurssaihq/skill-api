module.exports = ({
router,
SkillController,
SkillValidator,
makeValidatorCallback,
makeExpressCallback,
sessionChecker
}) => {
    router.post('/', 
        sessionChecker, 
        makeValidatorCallback(SkillValidator.add),
        makeExpressCallback(SkillController.add)
    );

    router.get('/',
        sessionChecker,
        makeExpressCallback(SkillController.list)
    );

    router.get('/:id', 
        sessionChecker,
        makeExpressCallback(SkillController.view)
    );

    router.put('/:id', 
        sessionChecker,
        makeValidatorCallback(SkillValidator.update),
        makeExpressCallback(SkillController.update)
    );

    router.delete('/:id',
        sessionChecker,
        makeExpressCallback(SkillController.delete)
    );

    return router;
};