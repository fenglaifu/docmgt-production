<template>
    <div class="app-container">
        {{fileName}}
        <!-- <pdf src="/public/大型互联网分布式系统架构演进之路.pdf"></pdf> -->
        <iframe class="iframe" :src="filePreview"></iframe>
    </div>
</template>

<script>
/* import pdf from 'vue-pdf'; */
import store from '../store'
import request from '../utils/request'
import { toRefs, watchEffect } from "vue";
import { useRoute } from "vue-router";
export default {
    /* components: {
        pdf
    } */
    setup() {
        const route = useRoute();
        let dirFileDataList = store.state.dirFileDataList;
        let selectedFileData = store.state.selectedFileData;
        console.log('dirFileDataList')
        console.log(dirFileDataList)
        let id = route.params.id;
        let filePreview = '/public/pdf/web/viewer.html?file=' + encodeURIComponent(request.defaults.baseURL + "/preview/" + route.params.id);
        // window.open(request.defaults.baseURL + "/preview/" + selectedFileData.id);
        console.log(filePreview)
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
            // let dirFileDataList = store.state.dirFileDataList;
            console.log('watchEffect findDataById')
            findDataById(dirFileDataList);
        })

        return {
            ...toRefs(selectedFileData),
            filePreview
        }
    }
}
</script>

<style scoped>
    .app-container{
        padding: 0px;
        min-height: calc(100vh - 150px);
    }
    .iframe{
        min-height: calc(100vh - 150px);
        max-width: calc(100vw);
        width: 100%;
    }

</style>