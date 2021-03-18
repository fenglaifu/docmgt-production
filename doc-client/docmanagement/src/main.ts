import { createApp } from 'vue'
import App from './App.vue'
import router from "../src/router"
import store from '../src/store'

import element3 from "element3";
import "element3/lib/theme-chalk/index.css";

import ElementPlus from 'element-plus' 
import 'element-plus/lib/theme-chalk/index.css'
// 全局样式
import "styles/index.scss";

import { DocModelData } from './views/doc/model/docModel'
const { getAllDataList, getAllDirTreeList} = DocModelData();
getAllDataList();getAllDirTreeList();

createApp(App).use(router).use(store).use(element3).use(ElementPlus).mount('#app')
