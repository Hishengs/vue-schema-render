<template>
  <div class="form-modal">
    <el-button type="primary" @click="show=true">填写表单</el-button>
    <el-dialog title="表单弹窗" :visible.sync="show">
      <schema-render
        :schema="schema"
        ref="schemaRender"
      ></schema-render>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue';
import { Dialog } from 'element-ui';
import { SchemaRender } from 'vue-schema-render';

Vue.use(Dialog);

const schema = {
  components: [
    {
      type: 'text',
      title: '文本框',
      key: 'text',
      value: '',
    },
    {
      type: 'select',
      title: '下拉框',
      key: 'select',
      options: [
        { label: '清华大学', value: 'qsu' },
        { label: '北京大学', value: 'pku' },
        { label: '深圳大学', value: 'szu' },
      ],
      value: null,
    },
    {
      type: 'slider',
      title: '滑块',
      key: 'progress',
      value: 20,
    },
    {
      type: 'radio',
      title: '单选框',
      key: 'radio',
      options: [
        { label: '清华大学', value: 'qsu' },
        { label: '北京大学', value: 'pku' },
        { label: '深圳大学', value: 'szu' },
      ],
      value: null,
    },
    {
      type: 'switch',
      title: '开关',
      key: 'switch',
      value: false,
    },
    {
      type: 'checkbox',
      title: '复选框',
      key: 'checkbox',
      options: [
        { label: '清华大学', value: 'qsu' },
        { label: '北京大学', value: 'pku' },
        { label: '深圳大学', value: 'szu' },
      ],
      value: ['szu'],
    }
  ]
};

export default {
  name: 'form-modal',
  components: {
    SchemaRender,
  },
  data () {
    return {
      show: false,
      schema,
    };
  },
  methods: {
    async genData () {
      return await this.$refs.schemaRender
        ? this.$refs.schemaRender.genData()
        : null;
    }
  }
};
</script>