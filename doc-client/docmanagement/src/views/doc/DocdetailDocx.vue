<template>
    <div>
        
        <div class="btn-container">
            <el-button type="success" icon="el-icon-download" @click="downloadFile">下载</el-button>
            <div>{{fileName}}</div>
        </div>
       <word></word>
    </div>
</template>

<script>
import Word from '../../components/Word.vue';
import { useRouter, useRoute } from "vue-router";
import { toRefs, watchEffect } from "vue";
import { DocModelData } from './model/docModel';
import store from "../../store";
export default {
    name: 'docdetailDocx',
    components: {
        Word
    },
    setup(){
        const {state, download} = DocModelData();
        const router = useRouter();
        const route = useRoute();
        let id = route.params.id;
        let selectedFileData = store.state.selectedFileData;
        const findDataById = (dirFileDataAllList) => {
            if(dirFileDataAllList){
                dirFileDataAllList.forEach((item, idx) => {
                    console.log('findDataById')
                    if(item.id == id){

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
            let dirFileDataList = store.state.dirFileDataList;
            console.log('watchEffect findDataById')
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
            downloadFile
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