<template>
  <div class="schema-tree">
    <draggable
      :list="form.components"
      group="type"
      class="schema-tree-node-list"
    >
      <SchemaTreeNode
        v-for="(comp, i) in form.components"
        :key="i"
        :comp="comp"
        :active-comp="activeComp"
        @remove="remove(comp)"
        @copy="copy(comp)"
        @edit="edit(comp)"
      ></SchemaTreeNode>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import SchemaTreeNode from "./node.vue";

export default {
  components: {
    draggable,
    SchemaTreeNode
  },
  props: {
    form: Object,
    activeComp: Object
  },
  methods: {
    remove(comp) {
      const index = this.form.components.indexOf(comp);
      if (index !== -1) {
        this.form.components.splice(index, 1);
      }
    },
    copy() {
      //
    },
    edit(comp) {
      this.$emit("edit", comp);
    }
  }
};
</script>

<style lang="scss">
.schema-tree {
  .schema-tree-node-list {
    min-height: 100px;
    border-radius: 4px;
    border: 1px solid #eee;
    padding: 10px;
    background-color: white;
    .schema-tree-node {
      //
    }
  }
}
</style>
