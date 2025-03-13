const Expertise = require("../../db/ExpertiseLevel");
const { getMessage } = require("../../utils/constant");

const ExpertiseService = {
  
  // Add a new expertise
  add: async (data) => {
    try {
      const record = new Expertise(data);
      await record.save();

      return {
        data: record,
        statusCode: 201,
        isError: false,
        message: getMessage("en", "success", "createSuccess", "expertise"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Expertise creation failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "createFailed", "expertise"),
        errorStack: error,
      };
    }
  },

  // List expertise with pagination & search
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
      const records = await Expertise.find(query)
        .sort({ createdAt: sort === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(take);

      // Get total count for pagination
      const totalCount = await Expertise.countDocuments(query);

      return {
        data: records,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "listSuccess", "expertise"),
        errorStack: null,
        pagination: {
          total: totalCount,
          page: parseInt(page),
          limit: take,
          totalPages: Math.ceil(totalCount / take),
        },
      };
    } catch (error) {
      console.error("Fetching expertise failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "listFailed", "expertise"),
        errorStack: error,
      };
    }
  },

  // View a single expertise by ID
  view: async (id) => {
    try {
      const record = await Expertise.findById(id);
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage("en", "error", "recordNotFound", "expertise"),
          errorStack: null,
        };
      }

      return {
        data: record,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "viewSuccess", "expertise"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Fetching expertise failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "viewFailed", "expertise"),
        errorStack: error,
      };
    }
  },

  // Update expertise by ID
  update: async (id, data) => {
    try {
      const record = await Expertise.findByIdAndUpdate(id, data, { new: true });
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage("en", "error", "recordNotFound", "expertise"),
          errorStack: null,
        };
      }

      return {
        data: record,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "updateSuccess", "expertise"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Updating expertise failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "updateFailed", "expertise"),
        errorStack: error,
      };
    }
  },

  delete: async (id) => {
    try {
      const record = await Expertise.findByIdAndDelete(id);
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage("en", "error", "recordNotFound", "expertise"),
          errorStack: null,
        };
      }

      return {
        data: null,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "deleteSuccess", "expertise"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Deleting expertise failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "deleteFailed", "expertise"),
        errorStack: error,
      };
    }
  },
};

module.exports = ExpertiseService;
