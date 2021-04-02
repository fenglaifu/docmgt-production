<template>
    <div>
        <docdetailheader :id="id"></docdetailheader>
        <pdfComponent :id="id"></pdfComponent>
    </div>
</template>

<script>
import DocDetailHeader from './DocDetailHeader';
import PdfComponent from '../../components/PdfComponent.vue';
export default {
    name: 'docdetailPdf',
    components: {
        'docdetailheader': DocDetailHeader,
        'pdfComponent': PdfComponent
    },
    props:{
 		id:{
 			type:[String,Number]
 		},
    },
}
</script>

<style scoped>

</style>