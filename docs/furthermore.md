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

你还可以注册一个自定义组件，使用时直接指定 type 即可：

```js
import { addComponent } from 'vue-schema-render';
import CitySelector from './city-selector.vue';

addComponent('city-selector', CitySelector);
```

schema
```js
export default {
  components: [
    {
      type: 'city-selector',
      label: '城市选择',
      key: 'city',
      value: '',
    }
  ]
};
```

自定义组件将会接收到的 props:

| Prop        | 说明           | 默认值  |
|:------------- |:-------------|:-----|
| component      | 当前组件的 schema 定义 | - |

## 组件事件

`vue-schema-render` 均可通过 `on` 接受组件抛出的事件：

```js
{
  type: 'text',
  label: '',
  key: '',
  value: '',
  on: {
    change ({ target }) {
      // do something
    }
  }
}
```

组件事件支持可在 API 中查询，都可通过 `on` 接受事件回调

## 组件联动

假设有这么一份 schema 定义，第一个组件控制第二个组件的显示/隐藏：

```js
export default {
  components: [
    {
      title: "是否显示用户名",
      type: "switch",
      key: "displayUserName",
      value: true,
      on: {
        change ({ target, root }) {
          root.components[1].hidden = true;
        }
      }
    },
    {
      title: "用户名",
      type: "text",
      key: "userName",
      value: ""
    }
  ]
};
```

## 表单校验

`vue-schema-render` 使用的是 [`async-validator`](https://github.com/yiminghe/async-validator) 来实现表单的校验，因此你可以在 schema 中通过 rules 指定校验规则：

```js
export default {
  components: [
    {
      title: "用户名",
      type: "text",
      key: "userName",
      value: "",
      rules: [
        { type: 'string', required: true, message: '用户名必填' }
      ]
    }
  ]
};
```

然后调用校验方法：

```html
<vue-schema-render :schema="schema" :data="formData" ref="schemaRender"></vue-schema-render>
```

```js
this.$refs.schemaRender.validate()
  .then(() => {
    // validation passed or without error message
  }).catch(({ errors, fields }) => {
    return handleErrors(errors, fields);
  });
```