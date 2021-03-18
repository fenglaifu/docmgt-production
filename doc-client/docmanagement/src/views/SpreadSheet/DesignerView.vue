<template>
    <div>
        <excel-designer v-on:designerInitialized="designerInitialized"></excel-designer>
    </div>
</template>

<script>
import ExcelDesigner from '../../components/ExcelDesigner.vue'
import {ref, toRefs, watchEffect} from "vue"
import { useRoute } from "vue-router";
import axios from "axios"
import GC from '@grapecity/spread-sheets'
import ExcelIO from '@grapecity/spread-excelio'
import { DocModelData } from '../../views/doc/model/docModel';
export default {
    name: 'DesignerView',
    components: {
        ExcelDesigner
    },
    setup() {
        let designer = undefined;
        let workbook = undefined;
        const route = useRoute();
        let id = route.params.id;
        const {previewFile} = DocModelData();
        

        let designerInitialized=(wb)=>{
            designer = wb;
            workbook = designer.getWorkbook();
            previewFile(id).then(response => {
                console.log('previewFile DesignerView response');
                console.log(response);
                let blobdata = new Blob([response.data], { type: "application/octet-stream" });
                let excelIO = new GC.Spread.Excel.IO();
                excelIO.open(blobdata, function (json) {
                    var workbookObj = json;
                    console.log('DesignerView workbookObj')
                    console.log(workbookObj)
                    workbook.fromJSON(workbookObj);
                }, function (e) {
                    console.log(e);
                });
            })
            .catch(error => {
                console.log('DesignerView error');
                console.log(error);
            });
        }

        return {designerInitialized}
    }
}
</script>

<style scoped>

</style>