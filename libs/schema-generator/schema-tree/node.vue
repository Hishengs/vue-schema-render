<template>
  <div
    class="schema-tree-node"
    :class="cClass"
    @mouseenter.self="showActions = true"
    @mouseleave.self="showActions = false"
    @click.self="$emit('edit')"
  >
    <p>{{ comp.label }}</p>
    <template v-if="comp.type === 'form'">
      <SchemaTree
        :form="comp"
        @edit="cp => $emit('edit', cp)"
        :active-comp="activeComp"
      ></SchemaTree>
    </template>
    <span class="schema-tree-node-actions" v-show="showActions">
      <el-button size="mini" @click="$emit('remove')">删除</el-button>
      <el-button size="mini" @click="$emit('copy')">复制</el-button>
      <el-button size="mini" @click="$emit('edit')">配置</el-button>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    comp: Object,
    activeComp: Object
  },
  components: {
    SchemaTree: () => import("./index.vue")
  },
  data() {
    return {
      showActions: false
    };
  },
  computed: {
    active() {
      return this.comp === this.activeComp;
    },
    cClass() {
      return {
        "schema-tree-node-active": this.active
      };
    }
  }
};
</script>

<style lang="scss">
.schema-tree-node {
  position: relative;
  // text-align: center;
  border-radius: 4px;
  border: 1px solid #eee;
  margin-bottom: 10px;
  padding: 15px;
  background-color: white;
  &-active {
    border-color: #ff5722;
  }
  &-actions {
    position: absolute;
    right: 4px;
    top: 4px;
    .el-button {
      // margin-right: 5px;
    }
  }
}
</style>
