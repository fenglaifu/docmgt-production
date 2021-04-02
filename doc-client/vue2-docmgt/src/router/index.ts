import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import {RouteData} from './routes';

Vue.use(VueRouter);

const routeData = RouteData();
const routes = routeData.routes;

const router = new VueRouter({
  mode: 'history',
 /*  base: publicPath.process.env.BASE_URL, */
 routes,
});

export default router;
