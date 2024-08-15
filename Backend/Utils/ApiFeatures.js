class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keywordFilter = this.queryStr.keyword
      ? {
          $or: [
            { name: { $regex: this.queryStr.keyword, $options: "i" } },
            { description: { $regex: this.queryStr.keyword, $options: "i" } },
          ],
        }
      : {};

    const categoryFilter = this.queryStr.category
      ? {
          category: { $regex: this.queryStr.category, $options: "i" },
        }
      : {};

    const combinedFilters = { ...keywordFilter, ...categoryFilter };
    this.query = this.query.find(combinedFilters);
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit", "category", "sort"];
    removeFields.forEach((key) => delete queryCopy[key]);
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  paginate() {
    const resultsPerPage = Number(this.queryStr.limit) || 7;
    const currentPage = Number(this.queryStr.page) || 1;
    const pagesToSkip = resultsPerPage * (currentPage - 1);
    this.query = this.query.limit(resultsPerPage).skip(pagesToSkip);
    return this;
  }
}

module.exports = ApiFeatures;
