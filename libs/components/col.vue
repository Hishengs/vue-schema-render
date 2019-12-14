<template>
  <el-col class="vsr_component_col" :span="component.span || span">
    <el-form-item
      :label="component.component.title"
      v-if="component.component.visible"
    >
      <vsr-dispatcher
        :component="component.component"
      ></vsr-dispatcher>
    </el-form-item>
  </el-col>
</template>

<script>
import baseMixin from "./base.mixin";
import { COMP_PREFIX } from "../utils";

export default {
  name: `${COMP_PREFIX}-col`,
  mixins: [baseMixin],
  components: {
    [`${COMP_PREFIX}-dispatcher`]: () => import('./dispatcher.vue')
  },
  props: {
    span: Number,
  }
};
</script>