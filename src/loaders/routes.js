// Routes
const { SkillRoutes } = require('../modules/skills/skill.module');
const { ExpertiseRoutes } = require('../modules/expertise/expertise.module');
const { EmployeeSkillRoutes } = require('../modules/employeeskills/employeeskill.module');
const { RoleRoutes } = require('../modules/roles/role.module');
const { ModuleToRoleRoutes } = require('../modules/moduletorole/mtr.module');
const { UserRoutes } = require('../modules/users/user.module');
const { AuthRoutes } = require('../modules/auth/auth.module');
const { CategoryRoutes } = require('../modules/categories/category.module');
const { OktaRoutes } = require('../modules/okta/okta.module');

const API_PREFIX  = '/api/v1';
const routes = [
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    path: '/users',
    route: UserRoutes
  },
  {
    path: '/roles',
    route: RoleRoutes
  },
  {
    path: '/mtr',
    route: ModuleToRoleRoutes
  },
  {
    path: '/skills',
    route: SkillRoutes
  },
  {
    path: '/expertise',
    route: ExpertiseRoutes
  },
  {
    path: '/employeeskills',
    route: EmployeeSkillRoutes
  },
  {
    path: '/categories',
    route: CategoryRoutes
  },
  {
    path: '/okta',
    route: OktaRoutes
  },
];

/**
 * Register routes with the app
 * @param {object} app - The Express app object
 */
module.exports = (app) => {
  routes.forEach(({ path, route, excludeAPIPrefix }) => {
    // If excludeAPIPrefix is true, use the path as is.
    // Otherwise, prepend the API_PREFIX to the path.
    const routePath = excludeAPIPrefix ? path : API_PREFIX + path;
    // Mount the route on the app using the determined route path.
    app.use(routePath, route);
  });
};
