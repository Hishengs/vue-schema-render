<template>
  <div class="schema-tree">
    <draggable
      class="schema-tree-node-list"
      :list="form.components"
      group="type"
    >
      <p class="empty-tip" v-if="!form.components.length">
        从左侧选择组件拖拽到此处
      </p>
      <SchemaTreeNode
        v-for="(comp, i) in form.components"
        :key="i"
        :comp="comp"
        :active-comp="activeComp"
        @remove="cp => remove(cp)"
        @copy="cp => copy(cp)"
        @edit="cp => edit(cp)"
      ></SchemaTreeNode>
    </draggable>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
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
    copy(comp) {
      const { components } = this.form;
      const index = components.indexOf(comp);
      if (index !== -1) {
        const newComp = JSON.parse(JSON.stringify(comp));
        newComp.key = nanoid(8);
        this.form.components = [
          ...components.slice(0, index + 1),
          newComp,
          ...components.slice(index + 1)
        ];
      }
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
    .empty-tip {
      color: #ababab;
      text-align: center;
      margin-top: 30px;
    }
  }
}
</style>
