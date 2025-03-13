const ModuleToRoleService = require('./mtr.service');
const helper = require('../../utils/helper');

const ModuleToRoleController = {

  add: async (httpRequest) => {
    const response = await ModuleToRoleService.add(httpRequest.body);
    return helper.generateResponse(response);
  },

  list: async (httpRequest) => {
    const response = await ModuleToRoleService.list(httpRequest.query);
    return helper.generateResponse(response);
  },

  view: async (httpRequest) => {
    const response = await ModuleToRoleService.view(httpRequest.params.id);
    return helper.generateResponse(response);
  },

  update: async (httpRequest) => {
    const response = await ModuleToRoleService.update(httpRequest.params.id, httpRequest.body);
    return helper.generateResponse(response);
  },

  delete: async (httpRequest) => {
    const response = await ModuleToRoleService.delete(httpRequest.params.id);
    return helper.generateResponse(response);
  }

};

module.exports = ModuleToRoleController;