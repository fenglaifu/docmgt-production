<template>
    <div>
        <div v-html="vHtml" />
        
    </div>
</template>

<script>
import mammoth from 'mammoth';
import {convertToHtml} from "mammoth";
import { useRoute } from "vue-router";
import request from '../utils/request'
import { DocModelData } from '../../src/views/doc/model/docModel';
import Buffer from 'Buffer'
export default {
    name: 'Word',
    setup(){
        const {previewFile} = DocModelData();
        let vHtml = '11';
        const route = useRoute();
        let id = route.params.id;
        // window.Buffer = Buffer;
        previewFile(id).then(response => {
            console.log('previewFile response');
            console.log(response);
            let blob = new Blob([response.data], { type: "application/octet-stream" });
            let reader = new FileReader();
            reader.onload = (loadEvent) => {
                console.log('reader.onload')
                if(loadEvent && loadEvent.target){
                    var arrayBuffer = loadEvent.target.result;
                
                    mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
                        .then(result => {
                            vHtml = result.value; // The generated HTML
                            var messages = result.messages; // Any messages, such as warnings during conversion
                            console.log('messages')
                            console.log(messages)
                        })
                        .done();
                }
                
            }
            reader.readAsArrayBuffer(blob);
            
        })
        .catch(error => {
            console.log('getAllDirTreeList error');
            console.log(error);
        });
        

        return {
            vHtml
        }
    }
}

</script>

<style scoped>

</style>