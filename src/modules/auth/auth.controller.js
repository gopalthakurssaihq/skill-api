const AuthService = require('./auth.service');
const helper = require('../../utils/helper');

const AuthController = {

  login: async (httpRequest) => {
    const loginData = await AuthService.doLogin(httpRequest.body);
    httpRequest.headers.Authorization = loginData.accessToken;
    return helper.generateResponse(loginData);
  },

  register: async (httpRequest) => {
    const registerData = await AuthService.doRegistration({
      ...httpRequest.body,
      selfReferralCode: helper.generateReferralCode(),
    });
    return helper.generateResponse(registerData);
  },

  resetPassword: async (httpRequest) => {
    const passwordData = await AuthService.resetPassword({
      password: helper.generatePassword(),
      ...httpRequest.body,
    });
    return helper.generateResponse(passwordData);
  },

  logout: async (httpRequest) => {
    const logoutData = await AuthService.doLogout(httpRequest);
    return helper.generateResponse(logoutData);
  },

  getProfile: async (httpRequest) => {
    const data = await AuthService.getProfile({
      ...httpRequest,
    });
    return helper.generateResponse(data);
  },

  authMe: async (httpRequest) => {
    const data = await AuthService.authMe(httpRequest);
    return helper.generateResponse(data);
  },

  loginUsingAccessToken: async (httpRequest) => {
    const payload = await AuthService.loginUsingAccessToken({
      ...httpRequest,
    });
    return helper.generateResponse(payload);
  },
};

module.exports = AuthController;
