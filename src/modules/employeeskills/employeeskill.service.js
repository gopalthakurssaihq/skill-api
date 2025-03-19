const EmployeeSkill = require('../../db/EmployeeSkill');
const { getMessage } = require('../../utils/constant');

const EmployeeSkillService = {
  // Add a new employeeskill
  add: async (data) => {
    try {
      const record = new EmployeeSkill(data);
      await record.save();

      return {
        data: record,
        statusCode: 201,
        isError: false,
        message: getMessage('en', 'success', 'createSuccess', 'employeeskills'),
        errorStack: null
      };
    } catch (error) {
      console.error('EmployeeSkill creation failed:', error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage('en', 'error', 'createFailed', 'employeeskills'),
        errorStack: error
      };
    }
  },

  // Add or update an EmployeeSkill record
  addorupdate: async (data) => {
    try {
      const existingRecord = await EmployeeSkill.findOne({ email: data.email });

      if (existingRecord) {
        // Update the existing record
        const updatedRecord = await EmployeeSkill.findOneAndUpdate(
          { email: data.email },
          { $set: data },
          { new: true } // Return the updated document
        );

        return {
          data: updatedRecord,
          statusCode: 200,
          isError: false,
          message: getMessage('en', 'success', 'updateSuccess', 'employeeskills'),
          errorStack: null
        };
      } else {
        // Create a new record
        const newRecord = new EmployeeSkill(data);
        await newRecord.save();

        return {
          data: newRecord,
          statusCode: 201,
          isError: false,
          message: getMessage('en', 'success', 'createSuccess', 'employeeskills'),
          errorStack: null
        };
      }
    } catch (error) {
      console.error('EmployeeSkill operation failed:', error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage('en', 'error', 'operationFailed', 'employeeskills'),
        errorStack: error
      };
    }
  },

  // List employeeskills with pagination & search
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
      const records = await EmployeeSkill.find(query)
        .sort({ createdAt: sort === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(take);

      // Get total count for pagination
      const totalCount = await EmployeeSkill.countDocuments(query);

      return {
        data: records,
        statusCode: 200,
        isError: false,
        message: getMessage('en', 'success', 'listSuccess', 'employeeskills'),
        errorStack: null,
        pagination: {
          total: totalCount,
          page: parseInt(page),
          limit: take,
          totalPages: Math.ceil(totalCount / take)
        }
      };
    } catch (error) {
      console.error('Fetching employeeskills failed:', error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage('en', 'error', 'listFailed', 'employeeskills'),
        errorStack: error
      };
    }
  },

  // View a single employeeskill by ID
  view: async (id) => {
    try {
      const record = await EmployeeSkill.findById(id);
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage('en', 'error', 'recordNotFound', 'employeeskills'),
          errorStack: null
        };
      }

      return {
        data: record,
        statusCode: 200,
        isError: false,
        message: getMessage('en', 'success', 'viewSuccess', 'employeeskills'),
        errorStack: null
      };
    } catch (error) {
      console.error('Fetching employeeskill failed:', error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage('en', 'error', 'viewFailed', 'employeeskills'),
        errorStack: error
      };
    }
  },

  // Update employeeskill by ID
  update: async (id, data) => {
    try {
      const record = await EmployeeSkill.findByIdAndUpdate(id, data, { new: true });
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage('en', 'error', 'recordNotFound', 'employeeskills'),
          errorStack: null
        };
      }

      return {
        data: record,
        statusCode: 200,
        isError: false,
        message: getMessage('en', 'success', 'updateSuccess', 'employeeskills'),
        errorStack: null
      };
    } catch (error) {
      console.error('Updating employeeskill failed:', error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage('en', 'error', 'updateFailed', 'employeeskills'),
        errorStack: error
      };
    }
  },

  // Permanently delete employeeskill by ID
  delete: async (id) => {
    try {
      const record = await EmployeeSkill.findByIdAndDelete(id); // Directly delete from DB

      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage('en', 'error', 'recordNotFound', 'employeeskills'),
          errorStack: null
        };
      }

      return {
        data: null,
        statusCode: 200,
        isError: false,
        message: getMessage('en', 'success', 'deleteSuccess', 'employeeskills'),
        errorStack: null
      };
    } catch (error) {
      console.error('Deleting employeeskill failed:', error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage('en', 'error', 'deleteFailed', 'employeeskills'),
        errorStack: error
      };
    }
  },

  getbyname: async (data) => {
    try {
      const record = await EmployeeSkill.find({ email: data.email });
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage('en', 'error', 'recordNotFound', 'employeeskills'),
          errorStack: null
        };
      }

      return {
        data: record,
        statusCode: 200,
        isError: false,
        message: getMessage('en', 'success', 'viewSuccess', 'employeeskills'),
        errorStack: null
      };
    } catch (error) {
      console.error('Fetching employeeskill failed:', error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage('en', 'error', 'viewFailed', 'employeeskills'),
        errorStack: error
      };
    }
  }
};

module.exports = EmployeeSkillService;
