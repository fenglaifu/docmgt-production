<template>
    <div class="app-container">
        <el-row>
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
                    :props="defaultProps"
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
import { ref, toRefs, watchEffect } from "vue";
import { DocModelData } from './model/docModel';
import { Message } from "element3";
import store from "../../store";
export default {
    name: 'docUpload',
    emits: ['uploadFile'],
    setup(prop, { emit }){
        const {state, getAllDataList, uploadSingle, uploadMulti, baseURL, getAllDirTreeList} = DocModelData();
        getAllDirTreeList();
        let actionUrl = baseURL + '/uploadSingle';
        let dataTreeList: any[] = [];
        const removeData = (data: any[]) => {
            let newDataTree:any[] = [];
            if(data && data.length > 0){
                console.log('data')
                console.log(data)
                data.forEach(item => {
                    if(item.isDir){
                        newDataTree.push(item);
                        if(item.children && item.children.length > 0){
                            removeData(item.children);
                        }
                    }
                })
            }
            return newDataTree;
        }
        dataTreeList = removeData(Object.assign([], store.state.dirFileDataList));

        watchEffect(() => {
            console.log('watchEffect')
            if(store.state.dirTreeDatalist && store.state.dirTreeDatalist.length > 0){
                // dataTreeList = store.state.dirFileDataList;
                /* store.state.dirFileDataList.forEach((item,idx) => {
                dataTreeList.push(item);
                console.log(dataTreeList)
                }); */
                dataTreeList = removeData(Object.assign([], store.state.dirTreeDatalist));
                console.log(dataTreeList)
                console.log('new dataTreeList')
            }
            console.log('dataTreeList')
            console.log(dataTreeList)
            console.log('watchEffect end')
        })

        let filePath = ref();
        let parentId = ref();
        let fileList:any[] = [];
        const submitUpload = (item) => {
            console.log('submitUpload')
            console.log(item)
            emit('uploadFile')
        }
        const uploadFile = (param) => {
            console.log('uploadFile')
            console.log(param)
            // uploadSingle(null)
            var file = param.file;
            var file_form = new FormData();
            file_form.append("file", file);
            file_form.append("filePath", filePath.value);
            file_form.append("parentId", parentId.value);
            uploadSingle(file_form).then(result => {
                Message({
                    message: '文件上传成功',
                    type: "success",
                    duration: 3 * 1000,
                });
            });
            return;
        }
        
        const handleSuccess = () => {

        }
        const handleError = () => {

        }
        const onUploadChange = () => {

        }
        

        const handleNodeClick = (data:any, Node:any, element:any) => {
            console.log(data)
            if(data.isDir){
                if(data.parentId > 0){
                    filePath.value = data.filePath + '/' + data.fileName;
                }
                else {
                    filePath.value = data.filePath;
                }
                parentId.value = data.id;
            }
            
        }

        const beforeUpload = (file) => {
            if(filePath.value == undefined || filePath.value == '' || filePath.value ==null){
                console.log('.value')
                Message({
                    message: '请选择文件上传目录',
                    type: "error",
                    duration: 5 * 1000,
                });
                return false;
            }
            console.log('true')
            return true;
        }
        return {
            ...toRefs(state),
            actionUrl,
            fileList,
            uploadFile,
            handleSuccess,
            handleError,
            onUploadChange,
            submitUpload,
            dataTreeList,
            handleNodeClick,
            beforeUpload,
            filePath,
            parentId
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
.dir-div{
    width:  100%;
    display: flex;
    align-items: center;
}
.dir-label{
    width:  100px;
}
</style>