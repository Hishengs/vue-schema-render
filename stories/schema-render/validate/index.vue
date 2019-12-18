<template>
  <div class="schema-render-demo">
    <h3>Vue Schema Render - 表单验证</h3>
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
      await this.$refs.schemaRender.validate()
        .then(async () => {
          const data = await this.$refs.schemaRender.genData();
          action('生成数据')(data);
        })
        .catch(({ errors, fields }) => {
          this.$message.error('请检查你的表单项');
          console.warn('请检查你的表单项', { errors, fields });
          const firstErrorEl = errors[0].$el;
          firstErrorEl.scrollIntoView({
            behavior: 'smooth',
          });
        });
    }
  }
};
</script>

<style lang="css">
.schema-render-demo {
  padding: 20px;
}
</style>