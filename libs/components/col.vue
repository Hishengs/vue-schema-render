<template>
  <el-col class="vsr_component_col" :span="component.span || span">
    <el-form-item
      v-if="!component.component.hidden"
      :class="component.component.type"
      :label="component.component.label"
    >
      <span slot="label" v-if="component.component.label">
        {{ component.component.label }}
        <el-tooltip effect="dark" :content="component.component.labelTooltip" placement="right" v-if="component.component.labelTooltip">
          <el-button type="text" icon="el-icon-info" size="medium"></el-button>
        </el-tooltip>
      </span>
      <vsr-dispatcher
        ref="comp"
        :component="component.component"
        @change="onChange"
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
  },
  methods: {
    async genData () {
      return await this.$refs.comp.genData();
    },
    async validate () {
      return await this.$refs.comp.validate();
    }
  }
};
</script>
