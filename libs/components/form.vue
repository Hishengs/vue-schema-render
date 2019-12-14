<template>
  <div class="vsr_component_form">
    <el-form
      v-if="form"
      ref="form"
      :model="form"
      :rules="rules"
      :label-width="labelWidth"
      :label-position="labelPosition"
      :inline="inlineForm"
    >
      <template v-for="component in component.components">
        <el-form-item
          :key="component.key"
          :prop="component.key"
          :label="component.title"
          v-if="component.visible"
        >
          <vsr-dispatcher :component="component" :ref="component.key" @change="onChange">
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
    // extended from el-form
    labelPosition: {
      type: String,
      validator(type) {
        return ["left", "right", "top"].includes(type);
      },
      default: "right"
    },
    labelWidth: {
      type: String,
      default: "176px"
    },
    inlineForm: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: null
    };
  },
  computed: {
    // collect components rules for ElementUI's async-validator
    rules() {
      return this.component.components.reduce((rules, comp) => {
        if (!comp.visible) return rules;
        rules[comp.key] = (rules[comp.key] || []).concat(comp.rules || []);
        return rules;
      }, {});
    }
  },
  created() {
    // init components
    for (const component of this.component.components) {
      initComponent(component);
    }
    // fix the limitation of ElementUI's async-validator
    this.setFormProxy();
    this.initData();
  },
  methods: {
    // fix the limitation of ElementUI's async-validator
    setFormProxy() {
      this.form = Object.freeze(
        new Proxy(
          {},
          {
            get: (target, key, receiver) => {
              const comp = this.component.components.find(cp => cp.key === key);
              return comp ? comp.value : undefined;
            },
            set: (target, key, value, receiver) => {
              const comp = this.component.components.find(cp => cp.key === key);
              if (comp) comp.value = value;
            }
          }
        )
      );
    },
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
    async genData() {
      const data = {};
      const lanData = {};
      for (const comp of this.component.components) {
        const refComps = this.$refs[comp.key];
        if (isBasicComponent(comp)) {
          if (comp.multiLanguage) {
            lanData[comp.key] = comp.value;
          } else data[comp.key] = comp.value;
        } else {
          if (refComps && refComps.length) {
            const [refComp] = refComps;
            if (refComp) {
              const [_data, _lanData] = await refComp.genData();
              data[comp.key] = _data;
              lanData[comp.key] = _lanData;
            }
          }
        }
      }
      return [data, lanData];
    },
    // 表单校验
    async validate() {
      return new Promise(async (resolve, reject) => {
        try {
          let _valid = true;
          if (!this.$refs.form) resolve(false);
          // validate higher components
          for (const comp of this.component.components) {
            if (!isBasicComponent(comp)) {
              const [compRef] = this.$refs[comp.key] || [];
              if (compRef) {
                const isValid = await compRef.validate();
                if (!isValid) {
                  _valid = false;
                  break;
                } else {
                  // update component value
                  const [data, lanData] = await compRef.genData();
                  comp.value = _merge(data, lanData);
                }
              }
            }
          }
          if (!_valid) {
            resolve(_valid);
            return;
          }
          // validate form
          this.$refs.form.validate(async valid => {
            const _valid = valid;
            resolve(_valid);
          });
        } catch (e) {
          reject(e);
        }
      });
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
