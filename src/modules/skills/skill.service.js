const Skill = require("../../db/Skill");
const { getMessage } = require("../../utils/constant");

const SkillService = {
  
  // Add a new skill
  add: async (data) => {
    try {
      const record = new Skill(data);
      await record.save();

      return {
        data: record,
        statusCode: 201,
        isError: false,
        message: getMessage("en", "success", "createSuccess", "skills"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Skill creation failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "createFailed", "skills"),
        errorStack: error,
      };
    }
  },

  // List skills with pagination & search
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
      const records = await Skill.find(query)
        .sort({ createdAt: sort === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(take);

      // Get total count for pagination
      const totalCount = await Skill.countDocuments(query);

      return {
        data: records,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "listSuccess", "skills"),
        errorStack: null,
        pagination: {
          total: totalCount,
          page: parseInt(page),
          limit: take,
          totalPages: Math.ceil(totalCount / take),
        },
      };
    } catch (error) {
      console.error("Fetching skills failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "listFailed", "skills"),
        errorStack: error,
      };
    }
  },

  // View a single skill by ID
  view: async (id) => {
    try {
      const record = await Skill.findById(id);
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage("en", "error", "recordNotFound", "skills"),
          errorStack: null,
        };
      }

      return {
        data: record,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "viewSuccess", "skills"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Fetching skill failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "viewFailed", "skills"),
        errorStack: error,
      };
    }
  },

  // Update skill by ID
  update: async (id, data) => {
    try {
      const record = await Skill.findByIdAndUpdate(id, data, { new: true });
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage("en", "error", "recordNotFound", "skills"),
          errorStack: null,
        };
      }

      return {
        data: record,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "updateSuccess", "skills"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Updating skill failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "updateFailed", "skills"),
        errorStack: error,
      };
    }
  },

  delete: async (id) => {
    try {
      const record = await Skill.findByIdAndDelete(id);
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage("en", "error", "recordNotFound", "skills"),
          errorStack: null,
        };
      }

      return {
        data: null,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "deleteSuccess", "skills"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Deleting skill failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "deleteFailed", "skills"),
        errorStack: error,
      };
    }
  },
};

module.exports = SkillService;
