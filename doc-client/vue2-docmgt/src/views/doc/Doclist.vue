<template>
    <div class="container-doc">
      <div class="btn-container">
            <router-link to="/doc/docupload">
              <el-button type="success" icon="el-icon-upload2">上传文档</el-button>
            </router-link>
      </div>
      <hr/>
      <el-tree    
      :props="state.defaultProps"
      :data="dataTreeList"
      ref="tree"
      node-key="id"
      @node-click="handleNodeClick"
      >
    </el-tree> 
    </div>
</template>

<script lang="ts">
import { DocModelData } from './model/docModel';
import { Message } from 'element-ui';
const {state, getAllDataList} = DocModelData();

export default {
  name: "Doclist",
  data: () => {
    return {
      state,
      dataTreeList: [],
    };
  },
  watch: {
      dataTreeList: function(){
        return this.$store.state.dirFileDataList;
      },
  },
  async beforeMount() {
      let data = await getAllDataList(this);
      this.$store.state.dirFileDataList = [];
      this.$store.state.dirFileDataList = this.dataTreeList = data;
  },
  methods: {
      handleNodeClick(data:any, Node:any, element:any) {
        if(data.isDir){
          return;
        }
        this.$store.state.selectedFileData = data;
        if(data.fileName){
          const suffix = data.fileName.substring(data.fileName.lastIndexOf('.') + 1).toLowerCase();
          if(suffix === 'pdf'){
            this.$router.push({ name: "docdetailPdf", params: { id:  data.id}});
            return;
          }
          else if(suffix === 'doc' || suffix === 'docx'){
            this.$router.push({ name: "docdetailDocx", params: { id:  data.id}});
            return;
          }
          else if(suffix === 'pptx'){
            this.$router.push({ name: "docdetailPpt", params: { id:  data.id}});
            return;
          }
          else if(suffix === 'xls' || suffix === 'xlsx'){
            this.$router.push({ name: "docdetailXlsx", params: { id:  data.id}});
            return;
          }
          else if(suffix === 'txt'){
            this.$router.push({ name: "docdetailText", params: { id:  data.id}});
            return;
          }
          else {
            Message({
                    message: `不支持文件类型[${suffix}]的预览`,
                    type: "error",
                    duration: 3 * 1000,
                });
            return;
          }
        }
    },
  },

};
</script>

<style scoped>
  .btn-container {
    text-align: left;
}
</style>