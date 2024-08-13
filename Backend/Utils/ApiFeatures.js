class ApiFeatures {
  constructor(query, reviewQuery, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    this.reviewQuery = reviewQuery;
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
    console.log("this search", this);

    return this;
  }

  async filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit", "category"];
    removeFields.forEach((key) => delete queryCopy[key]);
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    queryStr = JSON.parse(queryStr);

    // rating filter
    const ratingFilter = queryStr.ratings;

    delete queryStr["ratings"];
    this.query = this.query.find(queryStr);

    // all reviews
    this.reviewQuery = await this.reviewQuery;

    // filtered products [excluding ratings filter]
    this.query = this.query.find(queryStr);
    this.query = await this.query;

    const maxRating = ratingFilter.$lte;
    const minRating = ratingFilter.$gte;
    this.query = this.query.filter((product) =>
      this.reviewQuery.some((r) => {
        return (
          r.reviewedProduct.toString() == product._id.toString() &&
          r.ratings >= minRating &&
          r.ratings <= maxRating
        );
      })
    );
    console.log("this filter", this);
    return this;
  }

  paginate() {
    console.log(2);
    console.log("this.query before", this.query);
    const resultsPerPage = Number(this.queryStr.limit) || 7;
    const currentPage = Number(this.queryStr.page) || 1;
    const pagesToSkip = resultsPerPage * (currentPage - 1);
    this.query = this.query.limit(resultsPerPage).skip(pagesToSkip);
    console.log("this.query after", this.query);
    return this;
  }
}

module.exports = ApiFeatures;
