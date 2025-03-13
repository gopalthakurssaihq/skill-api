const { getMessage } = require('../../utils/constant');
const axios = require('axios');
const OktaService = {
  // Getting Okta Users
  getOktaUsers: async (request) => {
    const searchParam = request.query.search;
    let response = [];
    try {
      // Make GET request to Okta API to retrieve users
      if (typeof searchParam != 'undefined' && searchParam != '') {
        response = await axios.get(`https://ssaihq.okta.com/api/v1/users?q=${searchParam}`, {
          headers: {
            Authorization: `SSWS 00ylr422Lq9cHaBva83AJ_gu_SjOel18KZPa5HCJU8`
          }
        });
      } else {
        response = await axios.get(
          `https://ssaihq.okta.com/api/v1/users?limit=100&filter=status+eq+%22ACTIVE%22+or+status+eq+%22RECOVERY%22`,
          {
            headers: {
              Authorization: `SSWS 00ylr422Lq9cHaBva83AJ_gu_SjOel18KZPa5HCJU8`
            }
          }
        );
      }

      // Return the list of users as JSON
      const filterUsers = response.data.map((user) => {
        if (user.profile !== undefined && user.profile !== null) {
          return user.profile;
        }
      });
      return {
        data: filterUsers,
        statusCode: 200,
        isError: false,
        message: getMessage('en', 'success', 'oktaUsersSuccess', 'okta'),
        errorStack: null
      };
    } catch (error) {
      console.error('Getting Okta users failed:', error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage('en', 'error', 'oktaUsersFailed', 'okta'),
        errorStack: error
      };
    }
  }
};

module.exports = OktaService;
