const EmployeeSkillService = require('./employeeskill.service');
const helper = require('../../utils/helper');

const EmployeeSkillController = {

  add: async (httpRequest) => {
    const response = await EmployeeSkillService.add(httpRequest.body);
    return helper.generateResponse(response);
  },

  getbyname: async (httpRequest) => {
    const response = await EmployeeSkillService.getbyname(httpRequest.body);
    return helper.generateResponse(response);
  },

  addorupdate: async (httpRequest) => {
    const response = await EmployeeSkillService.addorupdate(httpRequest.body);
    return helper.generateResponse(response);
  },

  list: async (httpRequest) => {
    const response = await EmployeeSkillService.list(httpRequest.query);
    return helper.generateResponse(response);
  },

  view: async (httpRequest) => {
    const response = await EmployeeSkillService.view(httpRequest.params.id);
    return helper.generateResponse(response);
  },

  update: async (httpRequest) => {
    const response = await EmployeeSkillService.update(httpRequest.params.id, httpRequest.body);
    return helper.generateResponse(response);
  },

  delete: async (httpRequest) => {
    const response = await EmployeeSkillService.delete(httpRequest.params.id);
    return helper.generateResponse(response);
  }
};

module.exports = EmployeeSkillController;
