const ExpertiseService = require('./expertise.service');
const helper = require('../../utils/helper');

const ExpertiseController = {

  add: async (httpRequest) => {
    const response = await ExpertiseService.add(httpRequest.body);
    return helper.generateResponse(response);
  },

  list: async (httpRequest) => {
    const response = await ExpertiseService.list(httpRequest.query);
    return helper.generateResponse(response);
  },

  view: async (httpRequest) => {
    const response = await ExpertiseService.view(httpRequest.params.id);
    return helper.generateResponse(response);
  },

  update: async (httpRequest) => {
    const response = await ExpertiseService.update(httpRequest.params.id, httpRequest.body);
    return helper.generateResponse(response);
  },

  delete: async (httpRequest) => {
    const response = await ExpertiseService.delete(httpRequest.params.id);
    return helper.generateResponse(response);
  }
};

module.exports = ExpertiseController;
