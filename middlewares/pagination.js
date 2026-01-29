export const paginationMiddleware = (model, options = {}) => {
  return async (req, res, next) => {
    try {
      const page = Math.max(parseInt(req.query.page) || 1, 1);
      const limit = Math.min(parseInt(req.query.limit) || 10, 100);
      const skip = (page - 1) * limit;

      const {
        searchFields = [],
        populate = "",
        select = "",
        sort = { createdAt: -1 },
        baseQuery = {},
      } = options;

      let query = { ...baseQuery };

      // 🔐 COMPANY FILTER (GLOBAL)
      if (req.user?.companyId) {
        query.companyId = req.user.companyId;
      }

      // 🔍 SEARCH
      if (req.query.search && searchFields.length > 0) {
        query.$or = searchFields.map((field) => ({
          [field]: { $regex: req.query.search, $options: "i" },
        }));
      }

      // 📦 DATA QUERY
      const dataPromise = model
        .find(query)
        .populate(populate)
        .select(select)
        .sort(sort)
        .skip(skip)
        .limit(limit);

      // 📊 COUNT QUERY
      const countPromise = model.countDocuments(query);

      const [data, total] = await Promise.all([dataPromise, countPromise]);

      req.paginatedResult = {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
        data,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};
