<template>
  <div class="schema-render-demo">
    <h3>Vue Schema Render</h3>
    <el-divider></el-divider>
    <schema-render
      v-loading.fullscreen.lock="loading"
      :schema="schema"
      label-position="top"
      ref="schemaRender"
    ></schema-render>
    <el-divider></el-divider>
    <el-button type="primary" @click="genData">生成数据</el-button>
  </div>
</template>

<script>
import { SchemaRender } from '@/index.ts';
import schema from './schema.ts';

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
    }, 1000);
  },
  methods: {
    async genData () {
      const data = await this.$refs.schemaRender.genData();
      console.log('>>> genData', data);
    }
  }
};
</script>