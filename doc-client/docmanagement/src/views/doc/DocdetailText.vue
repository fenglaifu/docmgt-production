<template>
    <div>
        
        <div class="btn-container">
            <el-button type="success" icon="el-icon-download" @click="downloadFile">下载</el-button>
            <div>{{fileName}}</div>
            <div v-html="vHtml" />
        </div>
        
    </div>
</template>

<script>
/* import PdfComponent from '../../components/PdfComponent.vue';
import Word from '../../components/Word.vue';
import DesignerView from '../SpreadSheet/DesignerView.vue'; */
import { useRouter, useRoute } from "vue-router";
import { ref, toRefs, watchEffect } from "vue";
import { DocModelData } from './model/docModel';
import store from "../../store";
export default {
    name: 'docdetailText',
    /* components: {
        PdfComponent,
        DesignerView,
        Word
    }, */
    setup(){
        const {previewFile, download} = DocModelData();
        const router = useRouter();
        const route = useRoute();
        let id = route.params.id;
        let selectedFileData = store.state.selectedFileData;
        let dirFileDataList = store.state.dirFileDataList;

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

        let fileName = ref(null)
        let vHtml = ref(null);
        previewFile(id).then(response => {
            console.log('previewFile response');
            console.log(response);
            let blob = new Blob([response.data], { type: "application/octet-stream" });
            let reader = new FileReader();
            reader.onload = (loadEvent) => {
                console.log('reader.onload')
                if(loadEvent && loadEvent.target && loadEvent.target.result){
                    vHtml.value = loadEvent.target.result.replace(/\n|\r\n/g,"<br/>");
                
                }
                
            }
            reader.readAsText(blob);
            
        })
        .catch(error => {
            console.log('getAllDirTreeList error');
            console.log(error);
        });
        
        watchEffect(() => {
            console.log('watchEffect')
            selectedFileData = store.state.selectedFileData;
            console.log(selectedFileData)
            findDataById(dirFileDataList);
        })
        const downloadFile = () => {
            download(route.params.id);
        }
        return {
            download, 
            router,
            fileName,
            selectedFileData,
            downloadFile,
            vHtml
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