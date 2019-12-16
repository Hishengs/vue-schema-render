<template>
  <div class="schema-render-demo">
    <h3>Vue Schema Render - Props 和 事件</h3>
    <el-divider></el-divider>
    <schema-render
      v-loading="loading"
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
      loading: true,
    };
  },
  created () {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
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
</style>