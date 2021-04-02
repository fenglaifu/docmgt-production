<template>
<aside :style="{ 'width' : $store.state.sideBarWidth}" class="menuleft">
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
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
  <div class="toggleButton">
    <i :class="$store.state.sideBarArrow" @click="$store.commit('togleCollapse')"></i>
  </div>
</aside>
</template>
<script>
import SidebarItem from './SidebarItem.vue';
import { Component, Vue } from 'vue-property-decorator';
import {RouteData} from "../../../router/routes";
export default {
  name: 'Sidebar',
  components: {
    'sidebar-item': SidebarItem,
  },
  data() {
    const {routes} = new RouteData();
    return {
      routes: routes,
    };
  },
  created() {
  },
  computed: {
    activeMenu: function() {
      const { meta, path } = this.$route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
  },
}

</script>
<style lang='scss' >
@import '../../../assets/styles/variables.scss';
 .menuleft{
      width: $sideBarWidth;
      display: flex;
      justify-content: flex-start;
      align-items: center;
  }
  #app .sidebar-container .el-scrollbar {
        border-right: 1px solid #535a53;
        width: 100%;
  }
  .toggleButton{
    font-size: 30px;
    /* width: 14px; */
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -10px;
  }
</style>
