<template>
  <div class="schema-render-demo">
    <h3>Vue Schema Render - 列表组件</h3>
    <el-divider></el-divider>
    <schema-render
      :schema="schema"
      label-position="top"
      ref="schemaRender"
    ></schema-render>
    <el-divider></el-divider>
    <el-button type="primary" @click="genData">生成数据</el-button>
  </div>
</template>

<script>
import { SchemaRender } from 'vue-schema-render';
import schema from './schema.js';

export default {
  components: {
    SchemaRender,
  },
  data () {
    return {
      schema,
      loading: true,
    };
  },
  created () {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },
  methods: {
    async genData () {
      const data = await this.$refs.schemaRender.genData();
      console.log('>>> genData', data);
    }
  }
};
</script>

<style lang="css">
.schema-render-demo {
  padding: 20px;
}
</style>