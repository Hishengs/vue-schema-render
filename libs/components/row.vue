<template>
  <div class="vsr_component_row">
    <el-row :gutter="20">
      <vsr-col
        v-for="(col, i) in component.cols"
        :key="i"
        :component="col"
        :span="span"
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
  }
};
</script>