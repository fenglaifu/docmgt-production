<template>
  <div class="app-container">
    <el-form ref="form" :model="modelData" :rules="rules">
      <el-form-item prop="title" label="标题">
        <el-input v-model="modelData.title"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <el-input type="textarea" :autosize="{ minRows: 10,maxRows: 10}" v-model="modelData.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Message } from "element3";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { WorkNoticeModelData } from './model/worknoticeModel';

export default {
    name: 'worknoticeAdd',
    setup(props) {
        // 路由
    const route = useRoute();
    const { saveNotice, modelData } = WorkNoticeModelData();
    const rules = reactive({
      // 校验规则
      title: [{ required: true, message: "标题为必填项" }],
      content: [{ required: true, message: "内容为必填项" }]
    });

    // 表单实例
    const form = ref(null);
    // 提交表单
    function submitForm() {
      // 校验
      form.value.validate((valid) => {
        if (valid) {
          // 提交
          saveNotice(modelData).then(() => {
              // 操作成功提示信息
              Message.success({
                title: "操作成功",
                message: "新增数据成功",
                duration: 2000,
              }); 
        });
        }
      });
    }

    return {
      modelData,
      rules,
      form,
      submitForm,
    };
    }
}
</script>