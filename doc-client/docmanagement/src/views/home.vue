<template>
    <div>
        <el-row :gutter="12" class="home">
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
        
        
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
    .home {
        margin-top: 20px;
    }
</style>