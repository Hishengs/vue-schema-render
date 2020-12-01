<template>
  <div class="vsr_component_schema-render">
    <vsr-form ref="form" :component="{
      type: 'form',
      ...schema
    }"></vsr-form>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import form from "./form.vue";
import { getType } from '../utils'

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
    data: Object,
  },
  created () {
    if (this.data) {
      this.schema.value = cloneDeep(this.data);
      // this.setData(this.schema, cloneDeep(this.data));
    }
  },
  methods: {
    setData (form, data) {
      form.value = data;
      for (const comp of form.components) {
        const val = data[comp.key];
        if (val !== undefined) {
          if (comp.type === 'form') {
            if (getType(val) === 'object') {
              this.setData(comp, val);
            }
          } else comp.value = val;
        }
      }
    },
    validate() {
      return this.$refs.form.validate();
    },
    genData() {
      return this.$refs.form.genData();
    }
  }
};
</script>
