<template>
    <div>
        <docdetailheader :id="id"></docdetailheader>
        <designerView :id="id"></designerView>
    </div>
</template>

<script>
import DocDetailHeader from './DocDetailHeader';
import DesignerView from '../SpreadSheet/DesignerView.vue';
export default {
    name: 'docdetailXlsx',
    components: {
        'docdetailheader': DocDetailHeader,
        'designerView': DesignerView,
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