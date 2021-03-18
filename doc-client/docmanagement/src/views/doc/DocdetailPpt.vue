<template>
    <div>
        
        <div class="btn-container">
            <el-button type="success" icon="el-icon-download" @click="downloadFile">下载</el-button>
            <div>{{fileName}}</div>
        </div>
        <ppt-component></ppt-component>
    </div>
</template>

<script>
import PptComponent from '../../components/PptComponent.vue';
import { useRouter, useRoute } from "vue-router";
import { toRefs, watchEffect } from "vue";
import { DocModelData } from './model/docModel';
import store from "../../store";
export default {
    name: 'docdetailPpt',
    components: {
        PptComponent
    },
    setup(){
        const {state, getPageDataList, getAllDataList, download} = DocModelData();
        const router = useRouter();
        const route = useRoute();
        let selectedFileData = store.state.selectedFileData;
        watchEffect(() => {
            console.log('watchEffect')
            selectedFileData = store.state.selectedFileData;
            console.log(selectedFileData.fileName)
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