<template>
    <div class="container-upload">
        <el-row class="row-upload-button">
            <el-col>
                <el-upload
                :action="actionUrl"
                multiple
                :auto-upload="true"
                :on-change="onUploadChange"
                :http-request="uploadFile"
                :before-upload="beforeUpload"
                :show-file-list="true">
                    <el-button slot="trigger" size="small" type="primary">选取上传</el-button>
                </el-upload>
            </el-col>
        </el-row>
        <el-row>
          <el-col>
              <div class="dir-div">
              <div class="dir-label">上传目录:</div>
                <el-input class="dir-input" type="text" v-model="filePath" placeholder=""></el-input>
              </div>
              <el-tree    
                    :props="state.defaultProps"
                    :data="dataTreeList"
                    ref="tree"
                    node-key="id"
                    @node-click="handleNodeClick">
            </el-tree> 
          </el-col>
        </el-row>
    </div>
</template>
<script lang="ts">
import { DocModelData } from './model/docModel';
import { Message } from 'element-ui';

const {state, baseURL, uploadSingle, getAllDirTree } = DocModelData();

export default {
    name: 'Docupload',
    data() {
        return {
            state,
            actionUrl: baseURL + '/uploadSingle',
            dataTreeList: [],
            filePath: '',
            parentId: '',
        };
    },
    async mounted() {
       const data:any = await getAllDirTree();
       this.dataTreeList = data ? data : [];
    },
    methods: {
        onUploadChange: () => {

        },
        uploadFile: function(param:any) {
            var file = param.file;
            var file_form = new FormData();
            file_form.append("file", file);
            file_form.append("filePath", this.filePath);
            file_form.append("parentId", this.parentId);
            uploadSingle(file_form).then(result => {
                Message({
                    message: '文件上传成功',
                    type: "success",
                    duration: 3 * 1000,
                });
            });
            return;
        },
        beforeUpload: function() {
            if(this.filePath == undefined || this.filePath == '' || this.filePath ==null){
                Message({
                    message: '请选择文件上传目录',
                    type: "error",
                    duration: 3 * 1000,
                });
                return false;
            }
            return true;
        },
        handleNodeClick: function(data:any, Node:any, element:any) {
            if(data.isDir){
                if(data.parentId > 0){
                    this.filePath = data.filePath + '/' + data.fileName;
                }
                else {
                    this.filePath = data.filePath;
                }
                this.parentId = data.id;
            }
        }
    }
}
    
</script>


<style scoped>
.btn-container {
  text-align: left;
  padding: 0px 10px 20px 0px;
}
.el-row{
    margin-top: 20px;
}
.row-upload-button{
    margin-top: 0px;
}
.dir-div{
    width:  100%;
    display: flex;
    align-items: center;
}
.dir-label{
    width:  100px;
}
</style>