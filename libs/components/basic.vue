<template>
  <span class="vsr_component_basic">
    <!-- 文本框 -->
    <template v-if="['text', 'textarea'].includes(component.type)">
      <el-input
        ref="component"
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
    <el-select
      v-if="component.type === 'select'"
      ref="component"
      v-model="component.value"
      @change="onChange(component, /* nextTick */ true)"
      v-bind="component.props"
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
      v-if="component.type === 'switch'"
      ref="component"
      v-model="component.value"
      @change="onChange(component, /* nextTick */ true)"
      v-bind="component.props"
    ></el-switch>
    <!-- 单选框 -->
    <el-radio-group
      v-if="component.type === 'radio'"
      ref="component"
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
      ref="component"
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
      ref="component"
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
import upload from "./upload.vue";
import markdown from "./markdown.vue";
import baseMixin from "./base.mixin.js";
import { COMP_PREFIX } from "../utils.ts";

export default {
  name: `${COMP_PREFIX}-basic`,
  mixins: [baseMixin],
  components: {
    /* eslint-disable vue/no-unused-components */
    [upload.name]: upload,
    [markdown.name]: markdown
  },
  mounted() {
    // manually trigger change for first time
    this.onChange(this.component, true);
    // 绑定自定义监听事件
    if (this.component.on) {
      const keys = Object.keys(this.component.on);
      for (const key of keys) {
        this.$refs.component.$on(key, this.component.on[key]);
      }
    }
  },
  methods: {
    genData () {
      return this.component.value;
    },
    validate () {},
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
