<template>
    <div>
        <div class="btn-container">
            <el-button type="success" icon="el-icon-download" @click="downloadFile">下载</el-button>
            <div>{{fileName}}</div>
        </div>
       <designer-view></designer-view>
    </div>
</template>

<script>
import DesignerView from '../SpreadSheet/DesignerView.vue';
import { useRouter, useRoute } from "vue-router";
import { ref, toRefs, watchEffect } from "vue";
import { DocModelData } from './model/docModel';
import store from "../../store";
export default {
    name: 'docdetailXlsx',
    components: {
        DesignerView
    },
    setup(){
        const {state, previewFile, download} = DocModelData();
        let dirFileDataList = store.state.dirFileDataList;
        const router = useRouter();
        const route = useRoute();
        let id = route.params.id;
        let fileName = ref(null)
        let selectedFileData = store.state.selectedFileData;

        const findDataById = (dirFileDataAllList) => {
            if(dirFileDataAllList){
                dirFileDataAllList.forEach((item, idx) => {
                    console.log('findDataById')
                    if(item.id == id){
                        fileName.value = item.fileName;
                        selectedFileData = item;
                        return;
                    }
                    if(item.children && item.children.length > 0){
                        findDataById(item.children);
                    }
                })
            }
        }

        watchEffect(() => {
            console.log('watchEffect')
            selectedFileData = store.state.selectedFileData;
            console.log(selectedFileData.fileName)
            findDataById(dirFileDataList);
        })

        const downloadFile = () => {
            download(route.params.id);
        }

        return {
            ...toRefs(state),
            download, 
            router,
            ...toRefs(selectedFileData),
            downloadFile,
            fileName
        }
    }
}
</script>

<style scoped>
.btn-container {
  text-align: left;
  padding: 0px 10px 20px 0px;
}
</style>