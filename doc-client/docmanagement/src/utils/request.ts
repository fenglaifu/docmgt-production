import axios from "axios";
import { Message } from "element3";
/* import Msgbox from "../../node_modules/element3/types"; */
import store from "../../src/store";

const service = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 360000
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
 
  (response) => {
    response.headers['Content-Type'] = 'application/json';
    response.headers['Access-Control-Allow-Origin'] = '*';
    return response;
  },
  (error) => {
    console.log("err" + error);
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
