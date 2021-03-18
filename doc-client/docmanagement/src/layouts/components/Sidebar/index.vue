<template>
<el-aside :width="store.state.sideBarWidth" class="menuleft">
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
  <div class="toggleButton" @click="togleCollapse">
    <i :class="store.state.sideBarArrow"></i>
  </div>
</el-aside>
</template>

<script setup>
import store from '../../../../src/store'
import SidebarItem from "./SidebarItem.vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { routes } from "/@/router";
import variables from "styles/variables.module.scss";

const activeMenu = computed(() => {
  const route = useRoute();
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});

/* let isCollapse = ref(false); */
const togleCollapse = () =>{
  console.log('togleCollapse')
  /* isCollapse.value = !isCollapse.value; */
  store.state.isCollapse = !store.state.isCollapse;
  if(store.state.isCollapse){
    store.state.sideBarWidth = store.state.sideBarWidthFolded;
    store.state.sideBarArrow = store.state.sideBarArrowRight;
  }
  else{
    store.state.sideBarWidth = store.state.sideBarWidthExpand;
    store.state.sideBarArrow = store.state.sideBarArrowLeft;
  }
  console.log('store.state.sideBarWidth: ' + store.state.sideBarWidth)
}
</script>
<style scoped>
  .menuleft{
      width: 210px;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  #app .sidebar-container .el-scrollbar {
        border-right: 1px solid #535a53;
        width: 100%;
  }
  .toggleButton{
    font-size: 30px;
    width: 14px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -1px;
  }
</style>

