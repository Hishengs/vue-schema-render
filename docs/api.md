---
sidebar: auto
---

# API

## Schema

schema 是 `vue-schema-render` 约定的一种用于描述表单结构的格式

> 当然，你已经无需手动去写 schema，可使用 [Schema 生成器](./schema-generator) 快速生成你的 schema

一个典型的 schema 定义如下：

```ts
interface Schema {
  components: Array<Component>
}
```

其中，components 指明了表单中包含的表单项，表单项结构类似：

```js
{
  type: 'text',
  label: '用户名',
  key: 'userName',
  value: 'Hishenng'
  ... // 其他属性
}
```

## SchemaRender

`schema-render` 是 `vue-schema-render` 暴露出的一个 Vue 组件，用于将 schema 渲染成表单

| Prop        | 说明           | 类型  | 默认值  |
|:------------- |:-------------|:-----|:-----|
| schema      | 表单的 schema 定义 | Object | - |
| data      | 表单的初始数据 | Object | - |

> 初始表单数据，如果给了，将递归覆盖 schema 中 component 的 value 初始值

使用 `schema` 渲染表单：

```vue
<template>
  <schema-render :schema="schema" :data="formData"></schema-render>
</template>

<script>
import { SchemaRender } from 'vue-schema-render';

const schema = {
  components: [
    {
      type: 'text',
      label: '用户名',
      key: 'userName',
      value: ''
    },
    ... // 其他表单项定义
  ]
};

const formData = {
  userName: 'Hisheng'
};

export default {
  components: {
    SchemaRender
  },
  data () {
    return {
      schema,
      formData
    };
  }
};
</script>
```

## Component

表单项组件定义：

```ts
interface Component {
  type: CompType;
  label: string;
  labelTooltip?: string;
  key: string;
  value: any;
  tip?: string;
  disabled?: boolean;
  hidden?: boolean;
  rules?: Array<Rule>;
}

type CompType = 
  | 'text'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'upload'
  | 'markdown'
  | 'form'
  | 'list'
  | 'custom';
```

> `Rule` 是符合 [`async-validator`](https://github.com/yiminghe/async-validator) 的校验规则

## 通用配置项

| 配置项        | 说明           | 可选值  | 默认值  |
|:------------- |:-------------|:-----|:-----|
| type      | 声明组件类型 | - | - |
| label      | 表单项标题 | - | - |
| labelTooltip | 表单项标题提示文字 | - | - |
| key | 表单项键名 | - | - |
| value | 表单项绑定值 | - | - |
| tip | 表单项提示信息 | - | - |
| disabled | 是否禁用 | - | false |
| hidden | 是否隐藏 | - | false |
| remove | 是否移除 | 隐藏表单项且在最终生成的数据中移除 | false |
| rules | [`async-validator`](https://github.com/yiminghe/async-validator) 的校验规则 | - | - |

### type

`type` 指定了组件的类型，目前支持以下组件类型：

- text
- textarea
- select
- checkbox
- radio
- switch
- upload
- markdown
- form
- list
- custom

### label

表单项标题

### labelTooltip

表单项标题提示文字

### key

表单项字段名

### value

表单项初始值

### tip

提示文字

### disabled

是否禁用

### hidden

是否隐藏

> 隐藏仅仅是 `display: none`，且跳过校验，但最终生成数据仍在


### rules

符合 [`async-validator`](https://github.com/yiminghe/async-validator) 的校验规则

## 特定组件相关配置项

| 配置项        | 说明           | 默认值  | 支持的组件  |
|:------------- |:-------------|:-----|:-----|
| placeholder | 占位符 | - | text, textarea, select, markdown |
| options | 可选项 | - | select, checkbox, radio |
| minlength | 最小文字长度 | - | text, textarea |
| maxlength | 最大文字长度 | - | text, textarea |
| cloudinaryOptions | 上传组件，markdown 图片 cloudinary 配置 | - | upload, markdown |
| components | 表单包含的表单项组件 | - | form |
| component | 列表所使用的组件 | - | list |

### placeholder

`text`, `textarea`, `select`, `markdown` 等文字输入类组件支持此配置项

### options

`select`, `checkbox`, `radio` 组件支持此配置项

### minlength, maxlength

`text`, `textarea` 组件支持此配置项

### cloudinaryOptions

`upload`, `markdown` 组件支持此配置项，用于传递 cloudinary 配置项

### components

`form` 组件支持此配置项，用于指定所有表单项组件

> 支持嵌套，但建议不要嵌套过深，否则会有展示问题

### component

`list` 组件支持此配置项，用于指定列表项使用的组件

## 事件

所有事件均支持以下接口定义：
```ts
interface EventCallback {
  (e: SchemaEvent): void;
};

interface SchemaEvent {
  target: Component;                 // 事件发生的组件
  currentTarget: Component;          // 事件绑定的组件
};
```

> 事件支持冒泡，所以如果在 `form` 监听事件时，其底下的组件事件均会被监听到

### change

所有内置组件均支持此事件，自定义组件需自行 `$emit` 出 `change` 事件

```js
{
  title: "是否自动轮播",
  type: "switch",
  key: "autoplay",
  value: true,
  on: {
    change ({ target, currentTarget }) {
      console.log(target === currentTarget); // true
      console.log(target.title); // "是否自动轮播"
    }
  }
}
```

> 更多事件计划开放中...

## API

### addComponent

注册一个自定义组件

如：
```js
import { addComponent } from 'vue-schema-render';
import CitySelector from './city-selector.vue';

addComponent('city-selector', CitySelector);
```

