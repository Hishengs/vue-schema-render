<template>
  <div class="schema-render-wrapper">
    <div class="schema-editor">
      <textarea v-model="schemaVal"></textarea>
    </div>
    <div class="form-render">
      <schema-render v-if="showRender" :schema="schema"></schema-render>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import { SchemaRender } from '../../../dist/vue-schema-render.common.js';

Vue.use(ElementUI);

const schema = {
  components: [
    {
      type: 'text',
      label: '用户名',
      key: 'userName',
      value: ''
    },
  ]
};

const formData = {
  userName: 'Hisheng'
};

export default {
  name: 'schema-render-wrapper',
  components: {
    SchemaRender
  },
  data () {
    return {
      showRender: true,
      schema,
      formData,
      schemaVal: JSON.stringify(schema, null, 2)
    };
  },
  watch: {
    schemaVal (val) {
      try {
        this.showRender = false;
        const newSchema = JSON.parse(val);
        this.schema = newSchema;
        setTimeout(() => {
          this.showRender = true;
        }, 0);
      } catch (e) {
        console.warn('>>> 无效的 schema: ', val);
      }
    }
  }
}
</script>

<style lang="scss">
.schema-render-wrapper {
  height: 100%;
  display: flex;
  .schema-editor {
    flex-basis: 800px;
    flex-shrink: 0;
    border-right: 1px solid #eee;
    height: 100%;
    textarea {
      display: block;
      width: 800px;
      height: 100%;
      border: none;
      padding: 10px;
      background-color: #444;
      color: white;
    }
  }
  .form-render {
    flex-grow: 1;
    height: 100%;
    padding: 0 20px;
  }
}
</style>
