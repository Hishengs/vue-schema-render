<template>
  <div class="vsr_component_basic">
    <!-- slot: prepend -->
    <slot name="component-prepend"></slot>
    <!-- 文本框 -->
    <template v-if="['text', 'textarea'].includes(component.type)">
      <el-input
        ref="component"
        v-model="component.value"
        :type="component.type"
        :placeholder="component.placeholder || component.label"
        :disabled="isDisabled"
        :rows="5"
        v-bind="component.props"
        @change="onChange()"
      ></el-input>
    </template>
    <!-- 下拉框 -->
    <el-select
      ref="component"
      v-if="component.type === 'select'"
      v-model="component.value"
      :placeholder="component.placeholder"
      :disabled="isDisabled"
      v-bind="component.props"
      @change="onChange(/* nextTick */ true)"
    >
      <el-option
        v-for="(item, i) in component.options"
        :key="i"
        :label="item.label !== undefined ? item.label : item"
        :value="item.value !== undefined ? item.value : item"
      >
      </el-option>
    </el-select>
    <!-- 开关 -->
    <el-switch
      ref="component"
      v-if="component.type === 'switch'"
      v-model="component.value"
      active-text=""
      inactive-text=""
      :disabled="isDisabled"
      v-bind="component.props"
      @change="onChange(/* nextTick */ true)"
    ></el-switch>
    <!-- 单选框 -->
    <el-radio-group
      ref="component"
      v-if="component.type === 'radio'"
      v-model="component.value"
      :disabled="isDisabled"
      v-bind="component.props"
      @change="onChange(/* nextTick */ true)"
    >
      <el-radio
        v-for="(item, i) in component.options"
        :label="item.value !== undefined ? item.value : item"
        :key="i"
      >
        {{ item.label !== undefined ? item.label : item }}
      </el-radio>
    </el-radio-group>
    <!-- 多选框 -->
    <el-checkbox-group
      ref="component"
      v-if="component.type === 'checkbox'"
      v-model="component.value"
      :disabled="isDisabled"
      v-bind="component.props"
      @change="onChange(/* nextTick */ true)"
    >
      <el-checkbox
        v-for="(item, i) in component.options"
        :label="item.value !== undefined ? item.value : item"
        :key="i"
      >
        {{ item.label !== undefined ? item.label : item }}
      </el-checkbox>
    </el-checkbox-group>
    <!-- 滑块 -->
    <el-slider
      ref="component"
      v-if="component.type === 'slider'"
      v-model="component.value"
      :disabled="isDisabled"
      v-bind="component.props"
      @change="onChange(/* nextTick */ true)"
    ></el-slider>
    <!-- upload -->
    <vsr-upload
      v-if="component.type === 'upload'"
      :component="component"
      v-bind="component.props"
      @change="onChange()"
    ></vsr-upload>
    <!-- markdown -->
    <vsr-markdown
      v-if="component.type === 'markdown'"
      :component="component"
      v-bind="component.props"
      @change="onChange()"
    ></vsr-markdown>
    <!-- tip -->
    <el-alert
      v-if="component.tip"
      :title="component.tip"
      type="info"
      show-icon
      :closable="false"
      >
    </el-alert>
    <!-- slot: append -->
    <slot name="component-append"></slot>
  </div>
</template>

<script>
import baseMixin from "./base.mixin.js";
import upload from "./upload.vue";
import markdown from "./markdown.vue";
import { COMP_PREFIX, setComponentVM } from "../utils.ts";

export default {
  name: `${COMP_PREFIX}-basic`,
  mixins: [baseMixin],
  components: {
    /* eslint-disable vue/no-unused-components */
    [upload.name]: upload,
    [markdown.name]: markdown
  },
  created () {
    setComponentVM(this.component, this);
  },
  mounted() {
    // manually trigger change for first time
    this.onChange(true);
  },
  methods: {
    genData () {
      return this.component.value;
    },
  }
};
</script>

<style lang="scss">
.vsr_component_basic {
  .el-input,
  .el-select {
    // max-width: 300px;
  }
  .el-textarea {
    // max-width: 500px;
  }
  .el-slider {
    // max-width: 400px;
  }
  .reference {
    margin-top: 10px;
    display: block;
    input {
      border-color: #eee !important;
    }
  }
  .el-alert {
    margin-top: 10px;
    line-height: normal;
  }
}
</style>
