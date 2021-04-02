<template>
    <div class="main-wraper">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'Worknotice',
};
</script>
<style>
.main-wraper {
    height: calc(100vh - 70px);
    overflow:auto;
}
</style>