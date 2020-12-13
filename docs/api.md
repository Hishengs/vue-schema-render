---
sidebar: auto
---

# API

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

<!-- ### Component 原型

所有的 Component 进入 `vue-schema-render` 后会自动继承如下原型：

```ts
interface ComponentProto {
  getRoot: () => Schema;
  getParent: () => Component;
  getPrevSibling: () => Component;
  getNextSibling: () => Component;
  hide: () => void;
  show: () => void;
};
```

> 通过这些内置方法，可以很方便实现表单组件的关联交互操作 -->

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

### hidden

是否隐藏

> 隐藏仅仅是 `display: none`，且跳过校验，但最终生成数据仍在


### rules

符合 [`async-validator`](https://github.com/yiminghe/async-validator) 的校验规则

## 特定组件相关配置项

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
  findComponent: Function;           // 全局寻找组件的方法
  stopPropagation: Function;         // 阻止事件冒泡
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

### registerComponent

注册一个自定义组件

如：
```js
import { registerComponent } from 'vue-schema-render';
import CitySelector from './city-selector.vue';

registerComponent('city-selector', CitySelector);
```

### getRoot

### getParent

### getChildren

## 组件 Props

`vue-schema-render` 组件支持以下 props:

| Prop        | 说明           | 默认值  |
|:------------- |:-------------|:-----|
| schema      | Schema | - |
| data      | 初始表单数据 | - |

> 初始表单数据，如果给了，将递归覆盖 schema 中 component 的 value 初始值

```html
<vue-schema-render :schema="schema" :data="formData"></vue-schema-render>
```