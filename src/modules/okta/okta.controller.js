const OktaService = require('./okta.service');
const helper = require('../../utils/helper');

const OktaController = {
  getOktaUsers: async (httpRequest) => {
    const response = await OktaService.getOktaUsers(httpRequest);
    return helper.generateResponse(response);
  }
};

module.exports = OktaController;
