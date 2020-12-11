<template>
  <div class="schema-render-demo">
    <h3>Vue Schema Render - {{ name }}</h3>
    <el-divider></el-divider>
    <schema-render
      class="schema-render"
      v-loading="loading"
      :schema="schema"
      label-position="top"
      ref="schemaRender"
      :style="schemaRenderStyle"
    ></schema-render>
    <el-divider></el-divider>
    <el-button type="primary" @click="genData">生成数据</el-button>
  </div>
</template>

<script>
import { SchemaRender } from 'vue-schema-render';
import { action } from '@storybook/addon-actions';

export default {
  components: {
    SchemaRender,
  },
  props: {
    name: String,
    maxWidth: {
      type: Number,
      default: 600
    },
    schema: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
      loading: true,
    };
  },
  computed: {
    schemaRenderStyle () {
      return {
        maxWidth: `${this.maxWidth}px`
      };
    }
  },
  created () {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  },
  methods: {
    async genData () {
      const data = await this.$refs.schemaRender.genData();
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
