---
sidebar: auto
---

# Schema API

schema 是 `vue-schema-render` 约定的一种用于描述表单结构的格式

> 当然，你已经无需手动去写 schema，可使用 [Schema 生成器](./schema-generator) 快速生成你的 schema

## Schema

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

## Component
```ts
interface Component {
  type: CompType;
  label: string;
  labelTooptip?: string;
  key: string;
  value: any;
  tip?: string;
  disabled?: boolean;
  show?: boolean;
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

### show

是否显示

### rules

符合 [`async-validator`](https://github.com/yiminghe/async-validator) 的校验规则

## 组件相关配置项

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