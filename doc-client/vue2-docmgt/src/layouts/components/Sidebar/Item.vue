<template>
    <div>
        <i v-if="icon" class="sub-el-icon" :class="icon"></i>
        <span v-if="title">{{ title }}</span>
    </div>
</template>
<script>

export default {
    name: 'Item',
    props: ['icon', 'title'],
    
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
