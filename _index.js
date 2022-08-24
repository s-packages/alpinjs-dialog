import * as _ from "lodash";
if (typeof _ === "undefined") throw Error("Collection.js require lodash.js!");
export default class Collection {
  /**
   *
   * @param {array} data
   */
  constructor(data) {
    this.data = data;
  }

  /**
   *get all or limit item of collection
   * @param {number | undefined} limit
   * @returns
   */
  get(limit) {
    if (typeof limit === "undefined") return this.data;
    return this.data.slice(0, limit) ?? [];
  }

  /**
   *skip item in collection
   * @param {number | undefined} skip
   * @returns
   */
  skip(skip) {
    this.data = this.data.slice(skip, this.count());
    return this;
  }

  /**
   * get first item of collection
   * @returns
   */
  first() {
    return this.data[0] ?? null;
  }

  /**
   * get last item of collection
   * @returns
   */
  last() {
    return this.data[this.data.length - 1];
  }

  /**
   * @param {string | array} field
   * @param {'asc' | 'desc' | array} type
   * @returns
   */
  orderBy(field, type) {
    this.data = _.orderBy(this.data, field, type);
    return this;
  }

  /**
   * @param {string} field
   * @param {string} operator
   * @param {string | number} value
   * @returns
   */
  if(field, operator, value) {
    this.data = _.filter(this.data, (item) => {
      if (typeof value === "undefined") return item[field] == operator;
      switch (operator) {
        case "=":
          return item[field] == value;
        case ">":
          return item[field] > value;
        case "<":
          return item[field] < value;
        case ">=":
          return item[field] >= value;
        case "<=":
          return item[field] <= value;
        case "!=":
          return item[field] != value;
        default:
          return Error("Invalid operator");
      }
    });
    return this;
  }

  /**
   *
   * @param {string} field
   * @param {string | number} value
   * @returns
   */
  ifNot(field, value) {
    this.data = _.filter(this.data, (item) => {
      return item[field] != value;
    });
    return this;
  }

  /**
   *
   * @param {string} field
   * @returns
   */
  ifNull(field) {
    this.data = _.filter(this.data, (item) => {
      return item[field] == null;
    });
    return this;
  }

  /**
   *
   * @param {string} field
   * @returns
   */
  ifNotNull(field) {
    this.data = _.filter(this.data, (item) => {
      return item[field] != null;
    });
    return this;
  }

  /**
   *
   * @param {string} field
   * @param {array} array
   * @returns
   */
  inArray(field, array) {
    this.data = _.filter(this.data, (item) => {
      return array.includes(item[field]);
    });
    return this;
  }

  /**
   *
   * @param {string} field
   * @param {array} array
   * @returns
   */
  notInArray(field, array) {
    this.data = _.filter(this.data, (item) => {
      return !array.includes(item[field]);
    });
    return this;
  }

  /**
   *
   * @param {string} field
   * @param {array} value
   * @returns
   */
  arrayInArray(field, value) {
    this.data = _.filter(this.data, (item) => {
      return item[field].find((item) => {
        return value.includes(item);
      });
    });
    return this;
  }

  /**
   *
   * @param {string} field
   * @param {array} value
   * @returns
   */
  arrayNotInArray(field, value) {
    this.data = _.filter(this.data, (item) => {
      return item[field].find((item) => {
        return !value.includes(item);
      });
    });
    return this;
  }

  /**
   * count length of collection
   * @returns {number}
   */
  count() {
    return this.data.length;
  }

  /**
   *
   * @param {number} perPage
   * @param {number} page
   * @returns
   */
  paginate(perPage, page = 1) {
    return {
      data: this.data.slice((page - 1) * perPage, page * perPage),
      total: this.data.length,
      perPage: perPage,
      currentPage: page,
      lastPage: Math.ceil(this.data.length / perPage),
      go: (page) => {
        return this.paginate(perPage, page);
      },
      next: () => {
        return this.#next(perPage, page);
      },
      prev: () => {
        return this.#prev(perPage, page);
      },
    };
  }

  /**
   * @returns {paginate}
   */
  #next(perPage, prevPage) {
    return this.paginate(perPage, prevPage + 1);
  }

  /**
   * @returns {paginate}
   */
  #prev(perPage, prevPage) {
    return this.paginate(perPage, prevPage - 1);
  }

  /**
   * has many relation
   * @param {array | Collection} collection
   * @param {string} localKey
   * @param {string} foreignKey
   * @param {string} fieldName
   * @returns
   */
  hasMany(collection, localKey, foreignKey = "id", fieldName = "_data") {
    if (collection instanceof Collection) {
      collection = collection.get();
    }
    this.data.forEach((parent) => {
      parent[fieldName] = collection.filter((item) => {
        return item[localKey] == parent[foreignKey];
      });
    });
    return this;
  }

  /**
   * has one relation
   * @param {array | Collection} collection
   * @param {string} localKey
   * @param {string} foreignKey
   * @param {string} fieldName
   * @returns
   */
  hasOne(collection, localKey, foreignKey = "id", fieldName = "_data") {
    if (collection instanceof Collection) {
      collection = collection.get();
    }
    this.data.forEach((parent) => {
      parent[fieldName] =
        collection.find((item) => {
          return item[localKey] == parent[foreignKey];
        }) ?? null;
    });
    return this;
  }
}
