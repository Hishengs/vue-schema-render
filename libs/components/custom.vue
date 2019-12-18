<template>
  <div class="vsr_component_custom">
    <custom-render
      :component="component"
    ></custom-render>
  </div>
</template>

<script>
import baseMixin from "./base.mixin.js";
import { COMP_PREFIX } from "../utils.ts";

const CustomRender = {
  name: "custom-render",
  functional: true,
  props: {
    component: Object,
  },
  render: (h, ctx) => {
    const { component } = ctx.props;
    const customComp = component.component;
    return h(customComp, {
      props: {
        component,
      },
      on: {
        change (component) {
          ctx.parent.onChange(component);
        }
      }
    });
  }
};

export default {
  name: `${COMP_PREFIX}-custom`,
  mixins: [baseMixin],
  components: {
    CustomRender
  },
  data () {
    return {
      customComp: null,
    };
  },
  mounted () {
    [this.customComp] = this.$children;
  },
  methods: {
    async genData() {
      if (!this.customComp.genData) {
        console.warn('自定义组件必须定义 genData 方法以便获取组件数据：', this.customComp);
        return null;
      } else {
        return await this.customComp.genData();
      }
    },
    validate() {
      if (!this.customComp.validate) {
        console.warn('自定义组件必须定义 validate 方法以便进行数据校验：', this.customComp);
        return Promise.resolve();
      } else {
        return this.customComp.validate();
      }
    },
  },
};
</script>
