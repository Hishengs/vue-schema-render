<template>
  <div
    class="schema-tree-node"
    :class="cClass"
    @mouseenter.self="onMouseEnter"
    @mouseleave.self="onMouseLeave"
    @click.self="$emit('edit', comp)"
  >
    <p>{{ comp.label }}</p>
    <template v-if="comp.type === 'form'">
      <SchemaTree
        :form="comp"
        @edit="cp => $emit('edit', cp)"
        :active-comp="activeComp"
      ></SchemaTree>
    </template>
    <template v-else-if="comp.type === 'list'">
      <draggable :list="listComps" group="type" class="schema-tree-node-list">
        <p class="empty-tip" v-if="!comp.component">
          从左侧选择组件拖拽到此处
        </p>
        <SchemaTreeNode
          v-if="comp.component"
          :comp="comp.component"
          :active-comp="activeComp"
          @remove="cp => $emit('remove', cp)"
          @copy="cp => $emit('copy', cp)"
          @edit="cp => $emit('edit', cp)"
        ></SchemaTreeNode>
      </draggable>
    </template>
    <span class="schema-tree-node-actions" v-show="showActions">
      <el-button size="mini" @click="$emit('remove', comp)">删除</el-button>
      <el-button size="mini" @click="$emit('copy', comp)">复制</el-button>
    </span>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "schema-tree-node",
  props: {
    comp: Object,
    activeComp: Object
  },
  components: {
    draggable,
    SchemaTree: () => import("./index.vue"),
    SchemaTreeNode: () => import("./node.vue")
  },
  data() {
    return {
      showActions: false,
      listComps: [],
      hovering: false
    };
  },
  watch: {
    listComps(comps) {
      if (comps.length > 1) {
        this.listComps = [this.listComps.pop()];
      } else {
        if (this.activeComp === this.comp.component) {
          this.$emit("edit", comps[0]);
        }
        this.comp.component = comps[0];
      }
    }
  },
  computed: {
    active() {
      return this.comp === this.activeComp;
    },
    cClass() {
      return {
        "schema-tree-node-active": this.active,
        "schema-tree-node-hover": this.hovering
      };
    }
  },
  methods: {
    onMouseEnter() {
      this.hovering = true;
      this.showActions = true;
    },
    onMouseLeave() {
      this.hovering = false;
      this.showActions = false;
    }
  }
};
</script>

<style lang="scss">
.schema-tree-node {
  position: relative;
  border-radius: 4px;
  border: 1px solid #eee;
  margin-bottom: 10px;
  padding: 15px;
  background-color: white;
  &-hover {
    // cursor: move;
    background-color: #f5f5f5;
  }
  &-active {
    border-color: #ff5722;
    border-width: 2px;
  }
  &-actions {
    position: absolute;
    right: 4px;
    top: 4px;
    .el-button {
      margin-right: 0;
    }
  }
}
</style>
