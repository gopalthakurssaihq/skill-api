/**
 *
 * @param {object} AuthRouter
 * @param {ExpressRouter} AuthRouter.router
 * @param {AuthController} AuthRouter.AuthController
 * @param {AuthValidator} AuthRouter.AuthValidator
 * @param {makeExpressCallback} AuthRouter.makeExpressCallback
 * @param {makeValidatorCallback} AuthRouter.makeValidatorCallback
 * @returns {ExpressRouter}
 */

module.exports = ({
  router,
  AuthController,
  AuthValidator,
  makeValidatorCallback,
  makeExpressCallback,
}) => {
  // Public routes
  router.post('/login', makeExpressCallback(AuthController.login));
  router.post('/login-sso', makeExpressCallback(AuthController.loginUsingAccessToken));

  router.post('/register', 
    makeExpressCallback(AuthController.register)
  );
  router.post('/reset', 
    makeValidatorCallback(AuthValidator.validateReset), 
    makeExpressCallback(AuthController.resetPassword)
  );
  router.get('/logout', makeExpressCallback(AuthController.logout));
  router.get('/me', makeExpressCallback(AuthController.authMe));

  return router;
};
