<template>
  <div class="container-add">
    <div class="btn-container">
      <el-button @click="submitForm" type="primary">提交</el-button>
    </div>
    <el-form ref="form" :model="state.modelData" :rules="rules">
      <el-form-item prop="title" label="标题">
        <el-input v-model="state.modelData.title"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <el-input type="textarea" :autosize="{ minRows: 10,maxRows: 10}" v-model="state.modelData.content" placeholder=""></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Message } from 'element-ui';
import { WorkNoticeModelData } from './model/worknoticeModel';
const {state, saveNotice } = WorkNoticeModelData();
export default {
    name: 'worknoticeAdd',
    data: () => {
        return {
            rules: {
                title: [{ required: true, message: "标题为必填项" }],
                content: [{ required: true, message: "内容为必填项" }],
            },
            state,
        };
    },
    methods: {
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                saveNotice(state.modelData).then(() => {
                    Message.success({
                        title: "操作成功",
                        message: "新增数据成功",
                        duration: 2000,
                    }); 
                    state.modelData = Object.assign(state.modelData, {content: '', title: ''});
                    this.$router.push({name: "worknoticelist"});
                });
                }
            });
        }
    },
}
</script>