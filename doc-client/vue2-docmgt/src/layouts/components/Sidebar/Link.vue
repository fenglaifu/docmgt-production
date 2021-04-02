<template>
  <!-- <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component> -->
  <div><router-link :to="to"><slot /></router-link></div>
</template>

<script setup>

export default {
  name: 'Link',
  props: ['to'],
}
</script>
