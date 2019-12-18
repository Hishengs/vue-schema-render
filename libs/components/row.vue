<template>
  <div class="vsr_component_row">
    <el-row :gutter="component.gutter">
      <vsr-col
        v-for="(col, i) in component.cols"
        :key="i"
        :component="col"
        :span="span"
        @change="onChange"
        :ref="col._uid"
      ></vsr-col>
    </el-row>
  </div>
</template>

<script>
import baseMixin from "./base.mixin";
import { COMP_PREFIX } from "../utils";
import Col from './col.vue';

export default {
  name: `${COMP_PREFIX}-row`,
  mixins: [baseMixin],
  components: {
    [Col.name]: Col,
  },
  props: {
    component: {
      type: Object,
      required: true,
      validator: comp => {
        if (!comp.cols.every(col => col.type === 'col')) {
          console.warn('every cols in row should be a Col.');
          return false;
        } else return true;
      }
    }
  },
  computed: {
    span () {
      const num = this.component.cols.length;
      return num ? 24 / num : 24;
    }
  },
  methods: {
    async genData () {
      const data = {};
      for (const colComp of this.component.cols) {
        const [refColComp] = this.$refs[colComp._uid];
        data[colComp.component.key] = await refColComp.genData();
      }
      return data;
    },
    async validate () {
      let errs = [];
      let flds = {};

      for (const colComp of this.component.cols) {
        const [refColComp] = this.$refs[colComp._uid];
        try {
          await refColComp.validate();
        } catch ({ errors, fields }) {
          errs = [...errs, ...errors];
          flds[colComp.component.key] = fields;
        }
      }

      return errs.length ? Promise.reject({
        errors: errs,
        fields: flds
      }) : Promise.resolve();
    }
  }
};
</script>