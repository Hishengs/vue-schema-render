<template>
  <div class="vsr_component_form">
    <el-form
      ref="form"
      :label-width="component.labelWidth || '100px'"
      :label-position="component.labelPosition || 'top'"
      :inline="inlineForm"
    >
      <template v-for="component in component.components">
        <el-form-item
          :key="component.key"
          :prop="component.key"
          :label="component.title"
          v-if="component.visible"
        >
          <vsr-dispatcher
            :component="component"
            :ref="component._uid"
            @change="onChange"
          >
          </vsr-dispatcher>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import _merge from 'lodash/merge';
import baseMixin from "./base.mixin.js";
import { COMP_PREFIX, initComponent, isBasicComponent } from "../utils.ts";

export default {
  name: `${COMP_PREFIX}-form`,
  mixins: [baseMixin],
  components: {
    // 防止组件循环引用问题：
    // https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
    [`${COMP_PREFIX}-dispatcher`]: () => import('./dispatcher.vue')
  },
  props: {
    inlineForm: {
      type: Boolean,
      default: false
    }
  },
  created() {
    // init components
    for (const component of this.component.components) {
      initComponent(component);
    }
    this.initData();
  },
  methods: {
    // set data of current component
    initData() {
      const { value, _refValue, components } = this.component;
      if (!value) return;
      for (const comp of components) {
        comp.value = value[comp.key] === undefined ? comp.value : value[comp.key];
        if (_refValue) {
          comp._refValue = _refValue[comp.key];
        }
      }
    },
    // generate data of current component, including common data and language relative data
    async genData () {
      let data = {};
      for (const comp of this.component.components) {
        const { _uid, type, key, visible } = comp;
        if (!visible) continue;
        const [refComp] = this.$refs[_uid];
        const compData = await refComp.genData();
        if (type === 'row') {
          data = {
            ...data,
            ...compData
          };
        } else data[key] = compData;
      }
      return data;
    },
    // 表单校验
    async validate() {
      let valid = true;
      for (const comp of this.component.components) {
        console.log('>>> form.validate', comp);
        const { _uid, type, key, visible } = comp;
        const [refComp] = this.$refs[_uid];
        valid = await refComp.validate();
        console.log('>>> form.validate: valid', valid);
        if (!valid) break;
      }
      return valid;
    }
  }
};
</script>

<style lang="scss">
.vsr_component_form {
  padding: 10px 0;
  .component-block {
    display: inline-block;
  }
  .component-block label {
    display: block;
  }
  .el-form-item__label {
    font-weight: normal;
  }
  .el-form-item .el-form-item {
    margin-bottom: 22px;
  }
  .el-form-item > .el-form-item__label:before {
    content: "";
  }
  .el-form-item.is-required > .el-form-item__label:before {
    content: "*";
  }
}
</style>

<style lang="scss" scoped>
// TODO: 解决 el-from 嵌套适用时的样式问题
// .vsr_component_form {
//   /deep/ .el-form {
//     .el-form-item input {
//       border-color: #c0ccda;
//     }
//     .el-form-item.is-error input {
//       border-color: #ff4949;
//     }
//   }
// }
</style>
