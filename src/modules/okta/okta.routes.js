module.exports = ({
  router,
  OktaController,
  OktaValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
}) => {
  router.get('/', makeExpressCallback(OktaController.getOktaUsers));
  return router;
};
