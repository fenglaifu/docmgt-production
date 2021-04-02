<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template #title>
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path-browserify";
import Link from "./Link.vue";
import Item from "./Item.vue";
import { isExternal } from "../../../utils/validate";

export default {
    name: 'SidebarItem',
    props: ['item', 'isNest', 'basePath'],
    components: {
      'item': Item,
      'app-link': Link,
    },
    data() {
      return {
        onlyOneChild: undefined,
      };
    },
    methods: {
      hasOneShowingChild(children, parent) {
        children = (children == undefined || children == null) ? [] : children;
        const showingChildren = children.filter((item) => {
          if (item.hidden) {
            return false;
          } else {
            this.onlyOneChild = item;
            return true;
          }
        });
        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true;
        }
        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
          return true;
        }
        return false;
      },
      resolvePath(routePath) {
        if (isExternal(routePath)) {
          return routePath;
        }
        let props = this.$props;
        if (isExternal(props.basePath)) {
          return props.basePath;
        }
        return path.resolve(props.basePath, routePath);
      },
  },

}
/* import { defineProps, ref } from "vue"; */

/* const props = defineProps({
  // route object
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: "",
  },
});
const onlyOneChild = ref(null);
const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item;
      return true;
    }
  });
  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true;
  }
  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }
  return false;
};
const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
}; */
</script>
