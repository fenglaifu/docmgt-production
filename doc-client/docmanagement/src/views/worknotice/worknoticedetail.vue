<template>
    <div class="app-container">
        <el-form ref="form" :model="modelData">
            <el-form-item prop="title" label="标题">
                <el-input v-model="modelData.title" readonly=true></el-input>
            </el-form-item>
            <el-form-item prop="content" label="内容">
                <el-input type="textarea" :autosize="{ minRows: 10,maxRows: 10}" v-model="modelData.content" readonly=true></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { reactive, ref,toRefs, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { WorkNoticeModelData } from './model/worknoticeModel';

export default {
    name: 'worknoticedetail',
    setup(props) {
        // 路由
        const route = useRoute();
        const { state, getDetail } = WorkNoticeModelData();

        getDetail(route.params.id);

        watchEffect(() => {
            console.log('watchEffect')
        });
        return { 
            ...toRefs(state)
        };
    }
}
</script>

<style scoped>

</style>