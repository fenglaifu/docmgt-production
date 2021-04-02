<template>
    <div class="app-container">
        <div v-loading="loading"></div>
        <iframe class="iframe" :src="filePreview"></iframe>
    </div>
</template>

<script>
import { DocModelData } from '../views/doc/model/docModel';
const { previewPdfFile, baseURL } = DocModelData();
export default {
    name: 'PdfComponent',
    props: ['id'],
    data() {
        return {
            loading: true,
            filePreview: '',
        };
    },
    beforeMount() {
        this.filePreview = '/static/pdf/web/viewer.html?file=' + encodeURIComponent(baseURL + "/preview/" + this.id);
    },
    mounted() {
        this.loading = false;
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