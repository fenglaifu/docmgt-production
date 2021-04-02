<template>
    <div>
        <div v-loading="loading"></div>
        <excelDesigner @designerInitialized="designerInitialized"></excelDesigner>
    </div>
</template>

<script>
import ExcelDesigner from '../../components/ExcelDesigner.vue';
import GC from '@grapecity/spread-sheets';
import ExcelIO from '@grapecity/spread-excelio';
import { DocModelData } from '../doc/model/docModel';
const { previewFile, previewXlsxFile } = DocModelData();

export default {
    name: 'DesignerView',
    props: ['id'],
    components: {
        'excelDesigner': ExcelDesigner,
    },
    data() {
        return {
            designer: undefined,
            workbook: undefined,
            loading: true,
        };
    },
    methods: {
        designerInitialized: function(wb) {
            this.designer = wb;
            this.workbook = this.designer.getWorkbook();
            /* previewFile(this.id).then(result => {
                console.log('previewFile');
                console.log(result);
                let blobdata = new Blob([result.data], { type: "application/octet-stream" });
                let excelIO = new GC.Spread.Excel.IO();
                excelIO.open(blobdata, function (json) {
                    var workbookObj = json;
                    console.log('DesignerView workbookObj')
                    console.log(workbookObj)
                    this.workbook.fromJSON(workbookObj);
                }, function (e) {
                    console.log(e);
                });
            })
            .catch(error => {
                console.log('DesignerView error');
                console.log(error);
            }); */
            let this_ = this;
            previewXlsxFile(this.id).then(result => {
                console.log('previewFile DesignerView response');
                // console.log(data);
                
                let blobdata = new Blob([result.data], { type: "application/octet-stream" });
                let excelIO = new GC.Spread.Excel.IO();
                excelIO.open(blobdata, function (json) {
                    var workbookObj = json;
                    console.log('DesignerView workbookObj')
                    console.log(workbookObj)
                    this_.workbook.fromJSON(workbookObj);
                    this_.loading = false;
                }, function (e) {
                    console.log(e);
                    this_.loading = false;
                });
            })
            .catch(error => {
                console.log('DesignerView error');
                console.log(error);
                this_.loading = false;
            });
        },
    },
}
</script>

<style scoped>

</style>