declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
declare module 'path-to-regexp'

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter,
    $route: Route
  }
}

import {HttpService} from './utils/HttpService';
declare module 'vue/types/vue' {
  interface Vue {
    $httpService: HttpService;
  }
}