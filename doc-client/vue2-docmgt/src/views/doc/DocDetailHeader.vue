<template>
    <div class="btn-container">
        <div>文件名称: {{fileInfo.fileName}}</div>
        <el-button type="success" icon="el-icon-download" @click="downloadFile">下载</el-button>
        <hr/>
    </div>
</template>

<script>
import { DocModelData } from './model/docModel';
const { getFileInfo, downloadFile } = DocModelData();

export default {
    name: 'DocDetailHeader',
    data() {
        return {
            fileInfo: {},
        };
    },
    props:{
 		id:{
 			type:[String,Number]
 		},
    },
    async created() {
        this.fileInfo = await getFileInfo(this.id);
    },
    methods: {
        downloadFile: function() {
            downloadFile(this.id);
        }
    },
}
</script>

<style scoped>
.btn-container {
  text-align: left;
  /* padding: 0px 10px 10px 0px; */
}
</style>