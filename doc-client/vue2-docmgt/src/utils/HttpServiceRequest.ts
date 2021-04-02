import axios from 'axios';
/* import { Message } from 'element3'; */
import ElementUI, { Message } from 'element-ui';
/* import Msgbox from '../../node_modules/element3/types'; */
export class HttpServiceRequest {

  public instance: any;
  public baseURL = 'http://localhost:5000/api';
  constructor() {
      // 创建axios实例
      this.instance = axios.create({
        baseURL: this.baseURL,
        timeout: 360000,
      });
      // 初始化拦截器
      this.initInterceptors();
  } 

  public getInstance() {
      return this.instance;
  }

  public getBaseURL() {
    return this.baseURL;
  }

  public initInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      (response) => {
        response.headers['Content-Type'] = 'application/json';
        response.headers['Access-Control-Allow-Origin'] = '*';
        return response;
      },
      (error) => {
        console.log('err' + error);
        Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000,
        });
        return Promise.reject(error);
      },
    );
  }

}

