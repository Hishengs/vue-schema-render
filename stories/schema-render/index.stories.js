import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import Base from './base/index.vue';
import baseNote from './base/note.md';
import Form from './form/index.vue';
import List from './list/index.vue';
import Nest from './nest/index.vue';
import nestNote from './nest/note.md';
import Layout from './layout/index.vue';
import layoutNote from './layout/note.md';
import Validate from './validate/index.vue';
import validateNote from './validate/note.md';
import PropsAndEvent from './props-event/index.vue';
import propsAndEventNote from './props-event/note.md';
import Relative from './relative/index.vue';
import Custom from './custom/index.vue';
import Tip from './tip/index.vue';
import tipNote from './tip/note.md';

export default {
  title: 'vue schema render',
  component: Base,
  // includeStories: []
};

// ===== 基础组件 =====
export const base = () => ({
  render (h) {
    return <Base></Base>;
  }
});

base.story = {
  name: '基础组件',
  parameters: {
    notes: baseNote
  }
};

// ===== 表单组件 =====
export const form = () => ({
  render (h) {
    return <Form></Form>;
  }
});

form.story = {
  name: '表单组件',
};

// ===== 列表组件 =====
export const list = () => ({
  render (h) {
    return <List></List>;
  }
});

list.story = {
  name: '列表组件',
};

// ===== 表单嵌套 =====
export const nest = () => ({
  render (h) {
    return <Nest></Nest>;
  }
});

nest.story = {
  name: '表单嵌套',
  parameters: {
    notes: nestNote
  }
};

// ===== 自定义布局 =====
export const layout = () => ({
  render (h) {
    return <Layout></Layout>;
  }
});

layout.story = {
  name: '自定义布局',
  parameters: { notes: layoutNote },
};

// ===== 表单验证 =====
export const validate = () => ({
  render (h) {
    return <Validate></Validate>;
  }
});

validate.story = {
  name: '表单验证',
  parameters: { notes: validateNote },
};

// ===== Props and Event =====
export const propsAndEvent = () => ({
  render (h) {
    return <PropsAndEvent></PropsAndEvent>;
  }
});

propsAndEvent.story = {
  name: '属性和事件',
  parameters: {
    notes: propsAndEventNote
  }
};

// ===== 组件联动 =====
export const relative = () => ({
  render (h) {
    return <Relative></Relative>;
  }
});

relative.story = {
  name: '组件联动',
};

// ===== 自定义组件 =====
export const custom = () => ({
  render (h) {
    return <Custom></Custom>;
  }
});

custom.story = {
  name: '自定义组件',
};

// ===== 组件提示 =====
export const tip = () => ({
  render (h) {
    return <Tip></Tip>;
  }
});

tip.story = {
  name: '组件提示',
  parameters: {
    notes: tipNote
  }
};
