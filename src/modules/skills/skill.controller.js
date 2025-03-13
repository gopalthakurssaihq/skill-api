const SkillService = require('./skill.service');
const helper = require('../../utils/helper');

const SkillController = {

  add: async (httpRequest) => {
    const response = await SkillService.add(httpRequest.body);
    return helper.generateResponse(response);
  },

  list: async (httpRequest) => {
    const response = await SkillService.list(httpRequest.query);
    return helper.generateResponse(response);
  },

  view: async (httpRequest) => {
    const response = await SkillService.view(httpRequest.params.id);
    return helper.generateResponse(response);
  },

  update: async (httpRequest) => {
    const response = await SkillService.update(httpRequest.params.id, httpRequest.body);
    return helper.generateResponse(response);
  },

  delete: async (httpRequest) => {
    const response = await SkillService.delete(httpRequest.params.id);
    return helper.generateResponse(response);
  }
};

module.exports = SkillController;
