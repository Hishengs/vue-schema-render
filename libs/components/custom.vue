<template>
  <div class="vsr_component_custom">
    <component
      :is="component.component"
      :component="component"
      @change="onChange"
      ref="custom"
    ></component>
  </div>
</template>

<script>
import baseMixin from "./base.mixin.js";
import { COMP_PREFIX } from "../utils.ts";

export default {
  name: `${COMP_PREFIX}-custom`,
  mixins: [baseMixin],
  methods: {
    async genData() {
      if (!this.$refs.custom.genData) {
        console.warn('自定义组件必须定义 genData 方法以便获取组件数据：', this.$refs.custom);
        return null;
      } else {
        return await this.$refs.custom.genData();
      }
    },
    validate() {
      if (!this.$refs.custom.validate) {
        console.warn('自定义组件必须定义 validate 方法以便进行数据校验：', this.$refs.custom);
        return Promise.resolve();
      } else {
        return this.$refs.custom.validate();
      }
    },
  },
};
</script>
