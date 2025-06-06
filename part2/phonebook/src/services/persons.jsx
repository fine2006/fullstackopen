import axios from "axios";
import { useState, useEffect } from "react";

const url = "/api/persons";

const getAll = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(url, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteObject = (id) => {
  const request = axios.delete(`${url}/${id}`);
  return request.then((response) => response.data);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  deleteObject: deleteObject,
};
