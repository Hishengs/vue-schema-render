<template>
  <div class="vsr_component_schema-render">
    <vsr-form
      :component="form"
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
    // 当前语言的数据
    data: Object,
    // 参考语言的数据
    refData: Object,
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
    validate() {
      return this.$refs.comp.validate();
    },
    genData() {
      return this.$refs.comp.genData();
    }
  }
};
</script>
