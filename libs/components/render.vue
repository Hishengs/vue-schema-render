<template>
  <div class="vsr_component_schema-render">
    <vsr-form
      :component="form"
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
  data () {
    return {
      form: null
    };
  },
  created () {
    this.form = Object.assign({
      type: 'form'
    }, this.schema);
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
