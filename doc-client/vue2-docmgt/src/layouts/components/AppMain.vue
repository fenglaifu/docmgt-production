<template>
    <div class="app-container app-main">
        <router-view></router-view>
    </div>
    
</template>

<script>
export default {
  name: 'AppMain',
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  height: calc(100vh - 50px);
  width: 100%;
  /* position: relative;
  overflow: hidden; */
}
</style>