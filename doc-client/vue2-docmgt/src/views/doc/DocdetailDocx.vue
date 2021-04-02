<template>
    <div>
        <docdetailheader :id="id"></docdetailheader>
        <wordDocx :id="id"></wordDocx>
    </div>
</template>

<script>
import DocDetailHeader from './DocDetailHeader';
import WordDocx from '../../../src/components/WordDocx.vue';

export default {
    name: 'docdetailDocx',
    components: {
        'docdetailheader': DocDetailHeader,
        'wordDocx': WordDocx,
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