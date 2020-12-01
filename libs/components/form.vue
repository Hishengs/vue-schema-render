<template>
  <div class="vsr_component_form">
    <el-form
      ref="form"
      :label-width="component.labelWidth || defaultLabelWidth"
      :label-position="component.labelPosition || defaultLabelPos"
    >
      <template v-for="comp in component.components">
        <el-form-item
          :class="{
            'is-required': isRequired(comp)
          }"
          :key="comp.key"
          :prop="comp.key"
          v-if="!comp.hidden"
        >
          <span slot="label" v-if="comp.label">
            {{ comp.label }}
            <el-tooltip effect="dark" :content="comp.labelTooltip" placement="right" v-if="comp.labelTooltip">
              <el-button type="text" icon="el-icon-info" size="medium"></el-button>
            </el-tooltip>
          </span>
          <vsr-dispatcher
            :component="comp"
            :ref="comp._vsr_uid"
          >
          </vsr-dispatcher>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import baseMixin from "./base.mixin.js";
import { COMP_PREFIX, initComponent, isBasicComponent, setComponentVM } from "../utils.ts";

export default {
  name: `${COMP_PREFIX}-form`,
  mixins: [baseMixin],
  components: {
    // 防止组件循环引用问题：
    // https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
    [`${COMP_PREFIX}-dispatcher`]: () => import('./dispatcher.vue')
  },
  data () {
    return {
      defaultLabelWidth: '100px',
      defaultLabelPos: 'top'
    };
  },
  created() {
    initComponent(this.component, null);
    setComponentVM(this.component, this);
    this.initData();
  },
  methods: {
    // set data of current component
    initData() {
      const { value, components } = this.component;
      if (!value) return;
      for (const comp of components) {
        if (value[comp.key] !== undefined) {
          comp.value = value[comp.key];
        }
      }
    },
    // generate data of current component, including common data and language relative data
    async genData () {
      let data = {};
      for (const comp of this.component.components) {
        const { _vsr_uid, type, key } = comp;
        const [refComp] = this.$refs[_vsr_uid];
        const compData = await refComp.genData();
        if (type === 'row') {
          data = {
            ...data,
            ...compData
          };
        } else data[key] = compData;
      }
      this.component.value = data;
      return data;
    },
    // 表单校验
    async validate() {
      let errs = [];
      let flds = {};
      let firstErrorEl;

      for (const comp of this.component.components) {
        const { _vsr_uid, type, key, hidden } = comp;
        if (hidden) continue;
        const [refComp] = this.$refs[_vsr_uid]; 
        await refComp.validate()
          .catch(({ errors, fields }) => {
            if (!firstErrorEl) firstErrorEl = refComp.$el;
            // console.info('>>> form.validate: catch', { errors, fields });
            errs = [...errs, ...errors];
            if (type === 'row') {
              flds = {
                ...flds,
                ...fields
              };
            } else flds[key] = fields;
          });
        // console.info('>>> form.validate', { comp, errs, flds });
      }

      if (errs.length) {
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({
            behavior: 'smooth'
          });
        }
        return Promise.reject({
          errors: errs,
          fields: flds
        });
      } else return Promise.resolve();
    },
    isRequired (comp) {
      return (comp.rules || []).some(rule => rule.required);
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
