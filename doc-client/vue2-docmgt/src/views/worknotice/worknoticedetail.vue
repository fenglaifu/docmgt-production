
<template>
    <div class="container-detail">
        <div class="btn-container">
            <router-link to="/worknotice">
                <el-button type="primary">返回</el-button>
            </router-link>
        </div>
        <el-form :model="state.modelData">
            <el-form-item prop="title" label="标题">
                <el-input v-model="state.modelData.title" readonly></el-input>
            </el-form-item>
            <el-form-item prop="content" label="内容">
                <el-input type="textarea" :autosize="{ minRows: 10,maxRows: 10}" v-model="state.modelData.content" readonly></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { WorkNoticeModelData } from './model/worknoticeModel';

const {state, getDetail } = WorkNoticeModelData();
export default {
    name: 'worknoticedetail',
    data: () => {
        return {
            state,
        }
    },
    props:{
 		id:{
 			type:[String,Number]
 		},
    },
    async mounted() {
        await getDetail(this.id);
    },
}
</script>

<style scoped>

</style>