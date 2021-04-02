<template>
    <div class="app-wrapper">
        <el-row  :gutter="20"  class="el-row home" type="flex">
            <el-col :span="8">
                <el-card shadow="always">
                <router-link to="/worknotice/worknoticelist">工作通知</router-link>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always">
                <router-link to="/doc/doclist">文档</router-link>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
import { Vue } from 'vue-property-decorator';
export default class Home extends Vue {}
</script>
<style lang='scss' scoped>
@import '../assets/styles/index.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.home {
    margin-top: 20px;
    height: 100%;
    width: 100%;
}
</style>