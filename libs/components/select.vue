<template>
  <div class="vsr_component_select">
    <el-select
      v-bind="component.props"
      :multiple="component.props.multiple ? true : undefined"
      :filterable="component.props.filterable ? true : undefined"
      :remote="component.props.remote ? true : undefined"
      :remote-method="search"
      :loading="component.props.loading"
      v-model="component.value"
      :placeholder="component.props.placeholder"
      :disabled="isDisabled"
      @change="onChange(component, /* nextTick */ true)"
      @visible-change="onVisibleChange"
    >
      <el-option
        v-for="(item, i) in component.options"
        :key="i"
        :label="item.label !== undefined ? item.label : item"
        :value="item.value !== undefined ? item.value : item"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import baseMixin from "./base.mixin.js";
import { COMP_PREFIX } from "../utils.ts";

const DEFAULT_PROPS = {
  loading: false,
  multiple: false,
  filterable: false,
  remote: false,
  // remoteMethod () {},
  placeholder: ""
};

export default {
  name: `${COMP_PREFIX}-select`,
  mixins: [baseMixin],
  data() {
    return {
      // prev options
      prevOptions: []
    };
  },
  watch: {
    "component.value": function () {
      this.prevOptions = this.component.options;
    }
  },
  created() {
    // set default props
    this.component.props = Object.assign(
      {},
      DEFAULT_PROPS,
      this.component.props || {}
    );
  },
  methods: {
    async search(query) {
      if (query) {
        const { remoteMethod } = this.component.props;
        if (remoteMethod) {
          await remoteMethod(query, this.component);
        }
      }
    },
    onVisibleChange(visible) {
      if (!visible && this.prevOptions.length) {
        this.component.options = this.prevOptions;
      }
    }
  }
};
</script>
