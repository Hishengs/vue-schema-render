<template>
  <div class="schema-render-demo">
    <h3>Vue Schema Render - 组件提示</h3>
    <el-divider></el-divider>
    <schema-render
      class="schema-render"
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
import { action } from '@storybook/addon-actions';

export default {
  components: {
    SchemaRender,
  },
  data () {
    return {
      schema,
    };
  },
  methods: {
    async genData () {
      const data = await this.$refs.schemaRender.genData();
      // console.log('>>> genData', data);
      action('生成数据')(data);
    }
  }
};
</script>

<style lang="css">
.schema-render-demo {
  padding: 20px;
}
.schema-render-demo .schema-render {
  max-width: 600px;
}
</style>