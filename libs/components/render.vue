<template>
  <div class="vsr_component_schema-render">
    <vsr-form ref="form" :component="schema"></vsr-form>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import form from "./form.vue";

export default {
  name: "schema-render",
  components: {
    [form.name]: form,
  },
  props: {
    schema: {
      type: Object,
      required: true
    },
    // 表单数据
    value: Object,
  },
  created () {
    if (this.value) {
      this.schema.value = cloneDeep(this.value);
    }
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    genData() {
      return this.$refs.form.genData();
    }
  }
};
</script>
