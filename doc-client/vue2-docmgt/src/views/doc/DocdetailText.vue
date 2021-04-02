<template>
    <div>
        <docdetailheader :id="id"></docdetailheader>
        <div v-html="vHtml" />
    </div>
</template>

<script>
import DocDetailHeader from './DocDetailHeader';
import { DocModelData } from './model/docModel';
const { previewFile } = DocModelData();
export default {
    name: 'docdetailText',
    data() {
        return {
            vHtml: '',
        };
    },
    components: {
        'docdetailheader': DocDetailHeader,
    },
    props:{
 		id:{
 			type:[String,Number]
 		},
    },
    mounted() {
        let this_ = this;
        previewFile(this.id).then(response => {
            let blob = new Blob([response.data], { type: "application/octet-stream" });
            let reader = new FileReader();
            reader.onload = (loadEvent) => {
                console.log('reader.onload')
                if(loadEvent && loadEvent.target && loadEvent.target.result){
                    this_.vHtml = loadEvent.target.result.replace(/\n|\r\n/g,"<br/>");
                }
            }
            reader.readAsText(blob);
        })
        .catch(error => {
            console.log(error);
        });
    },
}
</script>

<style scoped>

</style>