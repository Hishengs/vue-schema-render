<template>
  <div class="schema-render-demo">
    <h3>Vue Schema Render</h3>
    <!-- <el-divider></el-divider> -->
    <!-- <div class="fill-progress">
      <span>填写进度</span>
      <el-progress :text-inside="true" :show-text="false" :percentage="50"></el-progress>
    </div> -->
    <schema-render
      v-loading.fullscreen.lock="loading"
      :schema="schema"
      :data="schemaData"
      label-position="left"
      ref="schemaRender"
    ></schema-render>
    <el-divider></el-divider>
    <el-button @click="validate">校验数据</el-button>
    <el-button type="primary" @click="genData">生成数据</el-button>
    <el-button type="primary" @click="genLanData">生成语言相关数据</el-button>
  </div>
</template>

<script>
import { SchemaRender } from '@/index.ts';
import schema, { mockData } from './schema.ts';

export default {
  components: {
    SchemaRender,
  },
  data () {
    return {
      schema,
      schemaData: mockData,
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
    },
    async genLanData () {
      const data = await this.$refs.schemaRender.genLanData();
      console.log('>>> genLanData', data);
    },
    async validate () {
      await this.$refs.schemaRender.validate()
        .then(() => {
          console.log('验证成功');
        })
        .catch(({ errors, fields }) => {
          this.$message.error('请检查你的表单项');
          console.warn('请检查你的表单项', { errors, fields });
          /* const firstErrorEl = errors[0].$el;
          firstErrorEl.scrollIntoView({
            behavior: 'smooth'
          }); */
        });
    }
  }
};
</script>

<style lang="scss">
.schema-render-demo {
  width: 800px;
  margin: 0 auto;
}
.fill-progress {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  span {
    flex-grow: 0;
    margin-right: 10px;
    font-size: 13px;
    color: #666;
    font-weight: normal;
  }
  .el-progress {
    flex-grow: 1;
  }
}
</style>
