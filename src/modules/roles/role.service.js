const Role = require("../../db/Role");
const { getMessage } = require("../../utils/constant");

const RoleService = {
  
  // Add a new roles
  add: async (data) => {
    try {
      const record = new Role(data);
      await record.save();

      return {
        data: record,
        statusCode: 201,
        isError: false,
        message: getMessage("en", "success", "createSuccess", "roles"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Role creation failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "createFailed", "roles"),
        errorStack: error,
      };
    }
  },

  // List roles with pagination & search
  list: async (params) => {
    try {
      const { page = 1, limit = 10, search = "", sort = "desc" } = params;

      // Convert limit & page to numbers
      const take = parseInt(limit);
      const skip = (page - 1) * take;

      // Filtering conditions
      let query = {};

      // Apply search if provided
      if (search) {
        query.name = { $regex: search, $options: "i" }; // Case-insensitive search
      }

      // Fetch filtered and paginated records
      const records = await Role.find(query)
        .sort({ createdAt: sort === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(take);

      // Get total count for pagination
      const totalCount = await Role.countDocuments(query);

      return {
        data: records,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "listSuccess", "roles"),
        errorStack: null,
        pagination: {
          total: totalCount,
          page: parseInt(page),
          limit: take,
          totalPages: Math.ceil(totalCount / take),
        },
      };
    } catch (error) {
      console.error("Fetching roles failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "listFailed", "roles"),
        errorStack: error,
      };
    }
  },

  // View a single roles by ID
  view: async (id) => {
    try {
      const record = await Role.findById(id);
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage("en", "error", "recordNotFound", "roles"),
          errorStack: null,
        };
      }

      return {
        data: record,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "viewSuccess", "roles"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Fetching roles failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "viewFailed", "roles"),
        errorStack: error,
      };
    }
  },

  // Update roles by ID
  update: async (id, data) => {
    try {
      const record = await Role.findByIdAndUpdate(id, data, { new: true });
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage("en", "error", "recordNotFound", "roles"),
          errorStack: null,
        };
      }

      return {
        data: record,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "updateSuccess", "roles"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Updating roles failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "updateFailed", "roles"),
        errorStack: error,
      };
    }
  },

  delete: async (id) => {
    try {
      const record = await Role.findByIdAndDelete(id);
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage("en", "error", "recordNotFound", "roles"),
          errorStack: null,
        };
      }

      return {
        data: null,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "deleteSuccess", "roles"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Deleting roles failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "deleteFailed", "roles"),
        errorStack: error,
      };
    }
  },
};

module.exports = RoleService;
