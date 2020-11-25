<template>
  <div class="schema-generator">
    <div class="schema-generator-left">
      <CompList></CompList>
    </div>
    <div class="schema-generator-main">
      <div class="schema-generator-main-header">
        <el-button type="primary" size="small" @click="showSchema = true">
          查看生成的 Schema
        </el-button>
        <el-button type="primary" size="small">表单预览</el-button>
        <el-button type="primary" size="small">清空</el-button>
      </div>
      <p class="info-text">从左侧选择组件拖动到下方</p>
      <SchemaTree
        :form="curSchema"
        @edit="onEdit"
        :active-comp="editComp"
      ></SchemaTree>
    </div>
    <div class="schema-generator-right">
      <p class="info-text" v-if="!editComp">从左侧选择组件点击配置</p>
      <SchemaEdit :edit-comp="editComp" :empty="!isEmpty"></SchemaEdit>
    </div>
    <el-dialog title="Schema" :visible.sync="showSchema" width="40%" top="8vh">
      <div class="schema-source">
        <pre><code>{{ JSON.stringify(this.curSchema, null, 2) }}</code></pre>
      </div>
      <el-button type="primary" size="small" style="margin-top: 10px;">
        复制
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import CompList from "./comp-list.vue";
import SchemaTree from "./schema-tree/index.vue";
import SchemaEdit from "./schema-edit.vue";

export default {
  name: "schema-generator",
  components: {
    CompList,
    SchemaTree,
    SchemaEdit
  },
  data() {
    return {
      curSchema: {
        components: []
      },
      editComp: null,
      showSchema: false
    };
  },
  computed: {
    isEmpty() {
      return this.curSchema.components.length;
    }
  },
  watch: {
    isEmpty(val) {
      if (val) {
        this.editComp = null;
      }
    }
  },
  methods: {
    onEdit(comp) {
      this.editComp = comp;
    }
  }
};
</script>

<style lang="scss">
.schema-generator {
  display: flex;
  height: 100%;
  &-left {
    flex: 1;
    border-right: 1px solid #eee;
  }
  &-main {
    flex: 3;
    background-color: #f5f5f5;
    &-header {
      margin-bottom: 10px;
      .el-button {
        // margin-right: 10px;
      }
    }
  }
  &-right {
    flex: 1;
    border-left: 1px solid #eee;
  }
  &-left,
  &-main,
  &-right {
    padding: 20px;
    max-height: 100%;
    overflow: auto;
  }
  .info-text {
    color: #999;
  }
  .schema-source {
    background-color: #444;
    color: white;
    padding: 20px;
    border-radius: 4px;
    max-height: 700px;
    overflow: auto;
  }
}
</style>
