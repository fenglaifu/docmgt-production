<template>
    <div class="app-container">
      <div class="btn-container">
            <router-link to="/doc/docUpload">
              <el-button type="success" icon="el-icon-upload2">上传文档</el-button>
            </router-link>
      </div>

      <el-tree    
      :props="defaultProps"
      :data="dataTreeList"
      ref="tree"
      node-key="id"
      @node-click="handleNodeClick"
      >
    </el-tree> 
    </div>
</template>

<script lang="ts">
import { toRefs, reactive, watchEffect, onBeforeMount, onMounted, onUpdated } from "vue";
import { useRouter } from "vue-router";
import Pagination from '../../../src/components/Pagination.vue';
import { DocModelData } from './model/docModel';
import request from "../../../src/utils/request";
import store from "../../store";

export default {
  name: "doclist",
  components: {
    Pagination,
  },
  setup() {
    let dataTreeList: any[] = reactive([]);
    const router = useRouter();
    const {state, getPageDataList, getAllDataList, download, getAllDirTreeList} = DocModelData();

    /* onUpdated(()=>{
      dataTreeList = store.state.dirFileDataList;
      console.log('onUpdated')
    });

    onBeforeMount(async ()=>{
      await getAllDataList();
      watchEffect(()=>{
        if(store.state.dirFileDataList && store.state.dirFileDataList.length > 0){
          dataTreeList = store.state.dirFileDataList;
          console.log('onBeforeMount watchEffect dataTreeList')
          console.log(dataTreeList)
          console.log('onBeforeMount watchEffect dataTreeList end')
        }
        
      });
      console.log('onBeforeMount')
    })  
    onMounted(async ()=>{
      await getAllDataList();
      if(store.state.dirFileDataList && store.state.dirFileDataList.length > 0){
        dataTreeList = store.state.dirFileDataList;
        console.log('onMounted')
      }
      
      console.log('onMounted end')
    })  */
    
    watchEffect(() => {
      console.log('watchEffect')
      if(store.state.dirFileDataList && store.state.dirFileDataList.length > 0){
        dataTreeList = store.state.dirFileDataList;console.log('watchEffect value')
        /* store.state.dirFileDataList.forEach((item,idx) => {
          dataTreeList.push(item);
          console.log(dataTreeList)
        }); */
      }
      console.log('dataTreeList')
          console.log(dataTreeList)
      console.log('watchEffect end')
    })
    
    const handleNodeClick = (data:any, Node:any, element:any) => {
        console.log(data);
        console.log(Node);
        console.log(element);
        if(data.isDir){
          return;
        }
        store.state.selectedFileData = data;
        if(data.fileName){
          const suffix = data.fileName.substring(data.fileName.lastIndexOf('.') + 1).toLowerCase();
          if(suffix === 'pdf'){
            router.push({ name: "docdetailPdf", params: { id:  data.id}});
            return;
          }
          else if(suffix === 'doc' || suffix === 'docx'){
            router.push({ name: "docdetailDocx", params: { id:  data.id}});
            return;
          }
          else if(suffix === 'pptx'){
            router.push({ name: "docdetailPpt", params: { id:  data.id}});
            return;
          }
          else if(suffix === 'xls' || suffix === 'xlsx'){
            router.push({ name: "docdetailXlsx", params: { id:  data.id}});
            return;
          }
          else if(suffix === 'txt'){
            router.push({ name: "docdetailText", params: { id:  data.id}});
            return;
          }
          else {
            router.push({ name: "docdetail", params: { id:  data.id}});
            return;
          }
        }
    }


    return {
      ...toRefs(state),
      getPageDataList,
      dataTreeList,
      handleNodeClick
    };
  },
};
</script>

<style scoped>
  .app-container{
    font-size: 30px;
  }
  .btn-container {
    text-align: left;
    padding: 0px 10px 20px 0px;
}
</style>