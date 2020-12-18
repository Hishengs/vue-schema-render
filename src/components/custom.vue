<template>
  <div class="vsr_component_custom">
    <component
      v-if="compDefine"
      :is="compDefine"
      :component="component"
      @change="onChange"
      ref="custom"
    ></component>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator';
import baseMixin from "./base.mixin.js";
import { COMP_PREFIX, setComponentVM, customComps } from "../utils.ts";

export default {
  name: `${COMP_PREFIX}-custom`,
  mixins: [baseMixin],
  created () {
    setComponentVM(this.component, this);
  },
  computed: {
    compDefine () {
      const { type, component } = this.component;
      return type === 'custom'
        ? component
        : customComps[type]
    }
  },
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
        console.warn('自定义组件建议定义 validate 方法以便进行数据校验：', this.$refs.custom);
        const { key, rules = [], value } = this.component;
        if (rules.length) {
          const validator = new AsyncValidator({
            [key]: rules
          });
          return validator.validate({
            [key]: value
          });
        }
        return Promise.resolve();
      } else {
        return this.$refs.custom.validate();
      }
    },
  },
};
</script>
