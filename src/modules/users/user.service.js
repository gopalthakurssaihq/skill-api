const User = require('../../db/User');
const { getMessage } = require('../../utils/constant');
const bcrypt = require('bcryptjs');

const UserService = {
  // Add a new users
  add: async (data) => {
    try {
      const hashedPassword = bcrypt.hashSync((data.password || 'Test!@#123'), 8);
      const record = new User({ ...data, "password": hashedPassword });
      await record.save();

      return {
        data: record,
        statusCode: 201,
        isError: false,
        message: getMessage('en', 'success', 'createSuccess', 'users'),
        errorStack: null
      };
    } catch (error) {
      console.error('User creation failed:', error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage('en', 'error', 'createFailed', 'users'),
        errorStack: error
      };
    }
  },

  // List users with pagination & search
  list: async (params) => {
    try {
      const { page = 1, limit = 10, search = '', sort = 'desc' } = params;

      // Convert limit & page to numbers
      const take = parseInt(limit);
      const skip = (page - 1) * take;

      // Filtering conditions
      let query = {};

      // Apply search if provided
      if (search) {
        query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
      }

      // Fetch filtered and paginated records
      const records = await User.find(query)
        .sort({ createdAt: sort === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(take);

      // Get total count for pagination
      const totalCount = await User.countDocuments(query);

      return {
        data: records,
        statusCode: 200,
        isError: false,
        message: getMessage('en', 'success', 'listSuccess', 'users'),
        errorStack: null,
        pagination: {
          total: totalCount,
          page: parseInt(page),
          limit: take,
          totalPages: Math.ceil(totalCount / take)
        }
      };
    } catch (error) {
      console.error('Fetching users failed:', error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage('en', 'error', 'listFailed', 'users'),
        errorStack: error
      };
    }
  },

  // View a single users by ID
  view: async (id) => {
    try {
      const record = await User.findById(id);
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage('en', 'error', 'recordNotFound', 'users'),
          errorStack: null
        };
      }

      return {
        data: record,
        statusCode: 200,
        isError: false,
        message: getMessage('en', 'success', 'viewSuccess', 'users'),
        errorStack: null
      };
    } catch (error) {
      console.error('Fetching users failed:', error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage('en', 'error', 'viewFailed', 'users'),
        errorStack: error
      };
    }
  },

  // Update users by ID
  update: async (id, data) => {
    try {
      const record = await User.findByIdAndUpdate(id, data, { new: true });
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage('en', 'error', 'recordNotFound', 'users'),
          errorStack: null
        };
      }

      return {
        data: record,
        statusCode: 200,
        isError: false,
        message: getMessage('en', 'success', 'updateSuccess', 'users'),
        errorStack: null
      };
    } catch (error) {
      console.error('Updating users failed:', error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage('en', 'error', 'updateFailed', 'users'),
        errorStack: error
      };
    }
  },

  delete: async (id) => {
    try {
      const record = await User.findByIdAndDelete(id);
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage('en', 'error', 'recordNotFound', 'users'),
          errorStack: null
        };
      }

      return {
        data: null,
        statusCode: 200,
        isError: false,
        message: getMessage('en', 'success', 'deleteSuccess', 'users'),
        errorStack: null
      };
    } catch (error) {
      console.error('Deleting users failed:', error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage('en', 'error', 'deleteFailed', 'users'),
        errorStack: error
      };
    }
  }
};

module.exports = UserService;
