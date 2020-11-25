<template>
  <div class="schema-generator-wrapper">
    <SchemaGenerator></SchemaGenerator>
  </div>
</template>

<script>
import Vue from "vue";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import SchemaGenerator from '../../../libs/schema-generator';

Vue.use(ElementUI);

export default {
  name: 'schema-generator-wrapper',
  components: {
    SchemaGenerator
  }
}
</script>
