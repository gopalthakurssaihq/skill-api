const ModuleToRole = require("../../db/ModuleToRole");
const { getMessage } = require("../../utils/constant");

const ModuleToRoleService = {
  
  // Add a new moduletorole
  add: async (data) => {
    try {
      const record = new ModuleToRole(data);
      await record.save();

      return {
        data: record,
        statusCode: 201,
        isError: false,
        message: getMessage("en", "success", "createSuccess", "moduletorole"),
        errorStack: null,
      };
    } catch (error) {
      console.error("ModuleToRole creation failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "createFailed", "moduletorole"),
        errorStack: error,
      };
    }
  },

  // List moduletorole with pagination & search
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
      const records = await ModuleToRole.find(query)
        .sort({ createdAt: sort === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(take);

      // Get total count for pagination
      const totalCount = await ModuleToRole.countDocuments(query);

      return {
        data: records,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "listSuccess", "moduletorole"),
        errorStack: null,
        pagination: {
          total: totalCount,
          page: parseInt(page),
          limit: take,
          totalPages: Math.ceil(totalCount / take),
        },
      };
    } catch (error) {
      console.error("Fetching moduletorole failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "listFailed", "moduletorole"),
        errorStack: error,
      };
    }
  },

  // View a single moduletorole by ID
  view: async (id) => {
    try {
      const record = await ModuleToRole.findById(id);
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage("en", "error", "recordNotFound", "moduletorole"),
          errorStack: null,
        };
      }

      return {
        data: record,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "viewSuccess", "moduletorole"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Fetching moduletorole failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "viewFailed", "moduletorole"),
        errorStack: error,
      };
    }
  },

  // Update moduletorole by ID
  update: async (id, data) => {
    try {
      const record = await ModuleToRole.findByIdAndUpdate(id, data, { new: true });
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage("en", "error", "recordNotFound", "moduletorole"),
          errorStack: null,
        };
      }

      return {
        data: record,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "updateSuccess", "moduletorole"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Updating moduletorole failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "updateFailed", "moduletorole"),
        errorStack: error,
      };
    }
  },

  delete: async (id) => {
    try {
      const record = await ModuleToRole.findByIdAndDelete(id);
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage("en", "error", "recordNotFound", "moduletorole"),
          errorStack: null,
        };
      }

      return {
        data: null,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "deleteSuccess", "moduletorole"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Deleting moduletorole failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "deleteFailed", "moduletorole"),
        errorStack: error,
      };
    }
  },
};

module.exports = ModuleToRoleService;
