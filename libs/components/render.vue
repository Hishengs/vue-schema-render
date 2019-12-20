<template>
  <div class="vsr_component_schema-render">
    <vsr-form
      :component="form"
      :label-width="labelWidth"
      :label-position="labelPosition"
      :inline-form="inlineForm"
      :i18n="i18n"
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
    i18n: Boolean,
    schema: {
      type: Object,
      required: true
    },
    data: Object,
    refData: Object,
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

    if (this.data) {
      this.form.value = this.data;
    }
    if (this.i18n && this.refData) {
      this.form.refValue = this.refData;
    }
  },
  methods: {
    setData (data, components) {
      if (!data) return;
      for (const comp of components) {
        comp.value = data[comp.key];
        
        if (comp.type === 'form') {
          this.setRefData(refData[comp.key], comp.components);
        }
      }
    },
    setRefData (refData, components) {
      if (!refData) return;
      for (const comp of components) {
        if (comp.i18n) {
          comp.refValue = refData[comp.key];
        }
        if (comp.type === 'form') {
          this.setRefData(refData[comp.key], comp.components);
        }
      }
    },
    validate() {
      return this.$refs.comp.validate();
    },
    async genData() {
      return await this.$refs.comp.genData();
    }
  }
};
</script>
