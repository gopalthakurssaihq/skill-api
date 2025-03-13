const Category = require("../../db/Category");
const { getMessage } = require("../../utils/constant");

const CategoryService = {
  
  // Add a new category
  add: async (data) => {
    try {
      const record = new Category(data);
      await record.save();

      return {
        data: record,
        statusCode: 201,
        isError: false,
        message: getMessage("en", "success", "createSuccess", "categories"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Category creation failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "createFailed", "categories"),
        errorStack: error,
      };
    }
  },

  // List categories with pagination & search
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
      const records = await Category.find(query)
        .sort({ createdAt: sort === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(take);

      // Get total count for pagination
      const totalCount = await Category.countDocuments(query);

      return {
        data: records,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "listSuccess", "categories"),
        errorStack: null,
        pagination: {
          total: totalCount,
          page: parseInt(page),
          limit: take,
          totalPages: Math.ceil(totalCount / take),
        },
      };
    } catch (error) {
      console.error("Fetching categories failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "listFailed", "categories"),
        errorStack: error,
      };
    }
  },

  // View a single category by ID
  view: async (id) => {
    try {
      const record = await Category.findById(id);
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage("en", "error", "recordNotFound", "categories"),
          errorStack: null,
        };
      }

      return {
        data: record,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "viewSuccess", "categories"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Fetching category failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "viewFailed", "categories"),
        errorStack: error,
      };
    }
  },

  // Update category by ID
  update: async (id, data) => {
    try {
      const record = await Category.findByIdAndUpdate(id, data, { new: true });
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage("en", "error", "recordNotFound", "categories"),
          errorStack: null,
        };
      }

      return {
        data: record,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "updateSuccess", "categories"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Updating category failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "updateFailed", "categories"),
        errorStack: error,
      };
    }
  },

  delete: async (id) => {
    try {
      const record = await Category.findByIdAndDelete(id);
      if (!record) {
        return {
          data: null,
          statusCode: 404,
          isError: true,
          message: getMessage("en", "error", "recordNotFound", "categories"),
          errorStack: null,
        };
      }

      return {
        data: null,
        statusCode: 200,
        isError: false,
        message: getMessage("en", "success", "deleteSuccess", "categories"),
        errorStack: null,
      };
    } catch (error) {
      console.error("Deleting category failed:", error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage("en", "error", "deleteFailed", "categories"),
        errorStack: error,
      };
    }
  },
};

module.exports = CategoryService;
