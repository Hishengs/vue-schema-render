<template>
  <div class="vsr_component_schema-render">
    <vsr-form
      :component="schema"
      :label-width="labelWidth"
      :label-position="labelPosition"
      :inline-form="inlineForm"
      ref="comp"
    ></vsr-form>
  </div>
</template>

<script>
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
    labelWidth: {
      type: String,
      default: "176px"
    },
    labelPosition: {
      type: String,
      validator(type) {
        return ["left", "right", "top"].includes(type);
      },
      default: "right"
    },
    inlineForm: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    validate() {
      return this.$refs.comp.validate();
    },
    async genData() {
      return await this.$refs.comp.genData();
    }
  }
};
</script>
