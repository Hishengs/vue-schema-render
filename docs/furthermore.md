---
sidebar: auto
---

# 深入 Vue Schema Render

## 自定义组件

尽管 `vue-schema-render` 已经内置了大多数表单常用组件，但并不能满足百分百的场景，因此扩展了自定义组件的能力。

首先，准备好你的自定义组件，例如 `city-selector.vue`，然后在 schema 中引入使用即可：

```js
import CitySelector from './city-selector.vue';

export default {
  components: [
    {
      type: 'custom',
      label: '城市选择',
      key: 'city',
      value: '',
      component: CitySelector
    }
  ]
};
```

> 注意：自定义组件的 type 为 `custom`

## 组件事件

`vue-schema-render` 均可通过 `on` 接受组件抛出的事件：

```js
{
  type: 'text',
  label: '',
  key: '',
  value: '',
  on: {
    change () {
      // do something
    }
  }
}
```

组件支持可在 API 中查询，都可通过 `on` 接受事件回调

## 组件关联