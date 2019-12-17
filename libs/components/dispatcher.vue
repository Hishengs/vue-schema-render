<template>
  <div class="vsr-dispatcher" :class="{
    'is-sub-form': component.type === 'form',
    'has-error': hasError
  }">
    <!-- form -->
    <vsr-form
      v-if="component.type === 'form'"
      :component="component"
      @change="onChange"
      ref="comp"
    ></vsr-form>
    <!-- list -->
    <vsr-list
      v-else-if="component.type === 'list'"
      :component="component"
      @change="onChange"
      ref="comp"
    ></vsr-list>
    <!-- custom -->
    <vsr-custom
      v-else-if="component.type === 'custom'"
      :component="component"
      @change="onChange"
      ref="comp"
    ></vsr-custom>
    <!-- row -->
    <vsr-row
      v-else-if="component.type === 'row'"
      :component="component"
      @change="onChange"
      ref="comp"
    ></vsr-row>
    <!-- basic components -->
    <vsr-basic
      v-else-if="isBasicComponent(component)"
      :component="component"
      @change="onChange"
      ref="comp"
    >
      <slot-render slot="component-prepend" :render="component.slot['component-prepend']"></slot-render>
      <slot-render slot="component-append" :render="component.slot['component-append']"></slot-render>
    </vsr-basic>
    <div class="validate-error" v-if="showError">{{ errorMsg }}</div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator';
import row from "./row.vue";
import basic from "./basic.vue";
import list from "./list.vue";
import form from "./form.vue";
import custom from "./custom.vue";
import baseMixin from "./base.mixin.js";
import { COMP_PREFIX, isBasicComponent, isLayoutComponent } from "../utils.ts";

const SlotRender = {
  name: 'slot-render',
  functional: true,
  props: {
    render: Function
  },
  render (h, ctx) {
    return (
      <template>
        { ctx.props.render ? ctx.props.render(h) : null }
      </template>
    );
  }
};

export default {
  name: `${COMP_PREFIX}-dispatcher`,
  components: {
    [row.name]: row,
    [basic.name]: basic,
    [list.name]: list,
    [form.name]: form,
    [custom.name]: custom,
    [SlotRender.name]: SlotRender,
  },
  mixins: [baseMixin],
  data () {
    return {
      hasError: false,
      errorMsg: '军机大臣，俗称“大军机”，又称“枢臣”，是军机处的长官。',
    };
  },
  computed: {
    showError () {
      return this.hasError && !['row', 'form'].includes(this.component.type);
    }
  },
  mounted () {
    this.setTriggerValidate();
  },
  methods: {
    isBasicComponent,
    async genData () {
      return await this.$refs.comp.genData();
    },
    async validate () {
      this.hasError = false;
      this.errorMsg = '';
      // console.log('>>> dispatcher.validate', this.component);
      if (isBasicComponent(this.component)) {
        const { key, rules = [], value } = this.component;
        if (rules.length) {
          const validator = new AsyncValidator({
            [key]: rules
          });
          await validator.validate({
            [key]: value
          }).catch(({ errors, fields }) => {
            this.hasError = true;
            // console.log('hasError', { errors, fields });
            this.errorMsg = errors[0].message;
          });
        }
      } else {
        const valid = await this.$refs.comp.validate();
        this.hasError = !valid;
      }
      // console.log('>>> dispatcher.validate: hasError', this.hasError);
      return !this.hasError;
    },
    setTriggerValidate () {
      if (isBasicComponent(this.component)) {
        // rules trigger
        const rulesHasTrigger = (this.component.rules || []).filter(rule => rule.trigger !== undefined);
        for (const rule of rulesHasTrigger) {
          // TODO: 这种调用方式不优雅
          this.$refs.comp.$refs.component.$on(rule.trigger, this.validate);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.vsr-dispatcher {
  &.is-sub-form {
    border: 1px solid #eee;
    padding: 0 20px;
  }
  .validate-error {
    font-size: 13px;
    margin-top: 5px;
    color: #F56C6C;
    line-height: 1.5;
  }
  &.has-error {
    .el-input > input {
      border-color: #f5222d;
    }
  }
}
</style>