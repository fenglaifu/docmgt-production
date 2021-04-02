<template>
    <div>
        <div v-loading="loading"></div>
        <div v-html="viewHtml"></div>
    </div>
</template>
<script>
import mammoth from 'mammoth';
import { DocModelData } from '../views/doc/model/docModel';
const { previewDocxFile } = DocModelData();
export default {
    name: 'WordDocx',
    props: ['id'],
    data() {
        return {
            viewHtml: '',
            loading: true,
        };
    },
    async mounted() {
        const data = await previewDocxFile(this.id);
        this.loading = false;
        mammoth.convertToHtml({arrayBuffer: data})
                .then(result=>{
                    this.viewHtml=result.value
                })
                .done();
    },
}
</script>
