import * as _ from "lodash";
if (typeof _ === "undefined")
  throw Error("Collection.js require lodash.js!");
export default class Collection {
  constructor(data) {
    this.query = new Object({
      if: [],
      ifNot: [],
      ifNull: [],
      ifNotNull: [],
      inArray: [],
      notInArray: [],
      arrayInArray: [],
      arrayNotInArray: [],
      hasField: [],
      hasNotField: []
    });
    this.data = data;
  }
  _exec() {
    return this.data?.filter((item) => {
      return Object.keys(this.query).map((key) => {
        return this.query[key].map((query) => {
          return !!this._condition(item, query);
        }).every((value) => value === true);
      }).every((value) => value === true);
    });
  }
  _condition(obj, query) {
    const { field, operator, value } = query;
    const fieldValue = obj[field];
    switch (operator) {
      case "=":
        return fieldValue === value;
      case "!=":
        return fieldValue !== value;
      case ">":
        return fieldValue > value;
      case "<":
        return fieldValue < value;
      case ">=":
        return fieldValue >= value;
      case "<=":
        return fieldValue <= value;
      case "in_array":
        return value?.includes(fieldValue);
      case "not_in_array":
        return !value?.includes(fieldValue);
      case "array_in_array":
        return fieldValue?.find((item) => {
          return value.includes(item);
        });
      case "array_not_in_array":
        return fieldValue?.map((item) => {
          return value.includes(item);
        }).every((value2) => value2 === false);
      case "has_field":
        return obj.hasOwnProperty(field);
      case "has_not_field":
        return !obj.hasOwnProperty(field);
      default:
        return false;
    }
  }
  get(limit) {
    if (typeof limit === "undefined")
      return this._exec() ?? [];
    return this._exec().slice(0, limit) ?? [];
  }
  skip(skip) {
    this.data = this._exec().slice(skip, this.count());
    return this;
  }
  first() {
    return this._exec()[0] ?? null;
  }
  last() {
    return this._exec()[this._exec().length - 1];
  }
  orderBy(field, type) {
    this.data = _.orderBy(this.data, field, type);
    return this;
  }
  hasField(field) {
    let obj = new Object();
    obj["field"] = field;
    obj["operator"] = "has_field";
    this.query.hasField.push(obj);
    return this;
  }
  hasNotField(field) {
    let obj = new Object();
    obj["field"] = field;
    obj["operator"] = "has_not_field";
    this.query.hasNotField.push(obj);
    return this;
  }
  if(field, operator, value) {
    let obj = new Object();
    obj["field"] = field;
    obj["operator"] = typeof value !== "undefined" ? operator : "=";
    obj["value"] = typeof value !== "undefined" ? value : operator;
    this.query.if.push(obj);
    return this;
  }
  ifNot(field, value) {
    let obj = new Object();
    obj["field"] = field;
    obj["operator"] = "!=";
    obj["value"] = value;
    this.query.ifNot.push(obj);
    return this;
  }
  ifNull(field) {
    let obj = new Object();
    obj["field"] = field;
    obj["operator"] = "=";
    obj["value"] = null;
    this.query.ifNull.push(obj);
    return this;
  }
  ifNotNull(field) {
    let obj = new Object();
    obj["field"] = field;
    obj["operator"] = "!=";
    obj["value"] = null;
    this.query.ifNotNull.push(obj);
    return this;
  }
  inArray(field, array) {
    let obj = new Object();
    obj["field"] = field;
    obj["operator"] = "in_array";
    obj["value"] = array;
    this.query.inArray.push(obj);
    return this;
  }
  notInArray(field, array) {
    let obj = new Object();
    obj["field"] = field;
    obj["operator"] = "not_in_array";
    obj["value"] = array;
    this.query.notInArray.push(obj);
    return this;
  }
  arrayInArray(field, value) {
    let obj = new Object();
    obj["field"] = field;
    obj["operator"] = "array_in_array";
    obj["value"] = value;
    this.query.arrayInArray.push(obj);
    return this;
  }
  arrayNotInArray(field, value) {
    let obj = new Object();
    obj["field"] = field;
    obj["operator"] = "array_not_in_array";
    obj["value"] = value;
    this.query.arrayNotInArray.push(obj);
    return this;
  }
  count() {
    return this._exec().length;
  }
  paginate(perPage, page = 1) {
    return {
      data: this._exec().slice((page - 1) * perPage, page * perPage),
      total: this._exec().length,
      perPage,
      currentPage: page,
      lastPage: Math.ceil(this._exec().length / perPage),
      go: (page2) => {
        return this.paginate(perPage, page2);
      },
      next: () => {
        return this._next(perPage, page);
      },
      prev: () => {
        return this._prev(perPage, page);
      }
    };
  }
  _next(perPage, prevPage) {
    return this.paginate(perPage, prevPage + 1);
  }
  _prev(perPage, prevPage) {
    return this.paginate(perPage, prevPage - 1);
  }
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
  hasOne(collection, localKey, foreignKey = "id", fieldName = "_data") {
    if (collection instanceof Collection) {
      collection = collection.get();
    }
    this.data.forEach((parent) => {
      parent[fieldName] = collection.find((item) => {
        return item[localKey] == parent[foreignKey];
      }) ?? null;
    });
    return this;
  }
  push(data) {
    this.data.push(data instanceof Collection ? data.data : data);
  }
  delete() {
    return this.data?.filter((item, index) => {
      return !Object.keys(this.query).map((key) => {
        return this.query[key].map((query) => {
          return !!this._condition(item, query);
        }).every((value) => value === true);
      }).every((value) => value === true);
    });
  }
  margeLeft(data) {
    this.data = data instanceof Collection ? data.data.concat(this.data) : data.concat(this.data);
  }
  margeRight(data) {
    this.data = this.data.concat(data instanceof Collection ? data.data : data);
  }
  groupBy(field) {
    let data = new Object();
    this._exec().map((item, index) => {
      const fieldName = item[field] ?? index;
      Array.isArray(data[fieldName]) ? data[fieldName].push(item) : data[fieldName] = [item];
    });
    return data;
  }
}
