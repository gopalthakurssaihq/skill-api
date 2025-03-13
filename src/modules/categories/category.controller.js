const CategoryService = require('./category.service');
const helper = require('../../utils/helper');

const CategoryController = {

  add: async (httpRequest) => {
    const response = await CategoryService.add(httpRequest.body);
    return helper.generateResponse(response);
  },

  list: async (httpRequest) => {
    const response = await CategoryService.list(httpRequest.query);
    return helper.generateResponse(response);
  },

  view: async (httpRequest) => {
    const response = await CategoryService.view(httpRequest.params.id);
    return helper.generateResponse(response);
  },

  update: async (httpRequest) => {
    const response = await CategoryService.update(httpRequest.params.id, httpRequest.body);
    return helper.generateResponse(response);
  },

  delete: async (httpRequest) => {
    const response = await CategoryService.delete(httpRequest.params.id);
    return helper.generateResponse(response);
  }
};

module.exports = CategoryController;
