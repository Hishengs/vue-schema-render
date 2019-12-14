<template>
  <span class="vsr_component_basic">
    <!-- 文本框 -->
    <template v-if="['text', 'textarea'].includes(component.type)">
      <el-input
        v-model="component.value"
        @change="onChange(component)"
        :type="component.type"
        v-bind="component.props"
      ></el-input>
      <!-- 参考语言 -->
      <el-input
        class="reference"
        :placeholder="`${component.props.placeholder} ( Reference Language )`"
        title="reference, read only"
        :value="component._refValue"
        :type="component.type"
        v-if="component.multiLanguage"
        readonly
      ></el-input>
    </template>
    <!-- 下拉框 -->
    <vsr-select
      v-if="component.type === 'select'"
      :component="component"
      @change="onChange(component)"
    ></vsr-select>
    <!-- 开关 -->
    <el-switch
      v-if="component.type === 'switch'"
      v-model="component.value"
      @change="onChange(component, /* nextTick */ true)"
      v-bind="component.props"
    ></el-switch>
    <!-- 单选框 -->
    <el-radio-group
      v-if="component.type === 'radio'"
      v-model="component.value"
      @change="onChange(component, /* nextTick */ true)"
      v-bind="component.props"
    >
      <el-radio
        :label="item.value !== undefined ? item.value : item"
        v-for="(item, i) in component.options"
        :key="i"
      >
        {{ item.label !== undefined ? item.label : item }}
      </el-radio>
    </el-radio-group>
    <!-- 多选框 -->
    <el-checkbox-group
      v-if="component.type === 'checkbox'"
      v-model="component.value"
      @change="onChange(component, /* nextTick */ true)"
      v-bind="component.props"
    >
      <el-checkbox
        :label="item.value !== undefined ? item.value : item"
        v-for="(item, i) in component.options"
        :key="i"
      >
        {{ item.label !== undefined ? item.label : item }}
      </el-checkbox>
    </el-checkbox-group>
    <!-- slider -->
    <el-slider
      v-if="component.type === 'slider'"
      v-model="component.value"
      @change="onChange(component, /* nextTick */ true)"
      v-bind="component.props"
    ></el-slider>
    <!-- upload 上传 -->
    <vsr-upload
      v-if="component.type === 'upload'"
      :component="component"
      @change="onChange(component)"
    ></vsr-upload>
    <!-- markdown -->
    <vsr-markdown
      v-if="component.type === 'markdown'"
      :component="component"
      @change="onChange(component)"
    ></vsr-markdown>
  </span>
</template>

<script>
import select from "./select.vue";
import upload from "./upload.vue";
import markdown from "./markdown.vue";
import baseMixin from "./base.mixin.js";
import { COMP_PREFIX } from "../utils.ts";

export default {
  name: `${COMP_PREFIX}-basic`,
  mixins: [baseMixin],
  components: {
    /* eslint-disable vue/no-unused-components */
    [select.name]: select,
    [upload.name]: upload,
    [markdown.name]: markdown
  },
  mounted() {
    // manually trigger change for first time
    this.onChange(this.component, true);
  }
};
</script>

<style lang="scss">
.vsr_component_basic {
  .el-input,
  .el-select {
    // width: 300px;
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
}
</style>
