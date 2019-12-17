template:

```jsx
<schema-render
  v-loading="loading"
  :schema="schema"
  label-position="top"
  ref="schemaRender"
></schema-render>
```

`schema.js`

```js
import { layout } from 'vue-schema-render';

export default {
  components: [
    // 使用布局组件对组件进行自定义布局
    layout.Row([
      layout.Col({
        type: 'text',
        label: '文本框',
        key: 'text',
        value: '',
      }, 10),
      layout.Col({
        type: 'select',
        label: '下拉框',
        key: 'select',
        options: [
          { label: '清华大学', value: 'qsu' },
          { label: '北京大学', value: 'pku' },
          { label: '深圳大学', value: 'szu' },
        ],
        value: null,
      }, 6),
      layout.Col({
        type: 'slider',
        label: '滑块',
        key: 'progress',
        value: 20,
      }, 8),
    ]),
    layout.Row([
      layout.Col({
        type: 'radio',
        label: '单选框',
        key: 'radio',
        options: [
          { label: '清华大学', value: 'qsu' },
          { label: '北京大学', value: 'pku' },
          { label: '深圳大学', value: 'szu' },
        ],
        value: null,
      }, 10),
      layout.Col({
        type: 'switch',
        label: '开关',
        key: 'switch',
        value: false,
      }, 6),
      layout.Col({
        type: 'checkbox',
        label: '复选框',
        key: 'checkbox',
        options: [
          { label: '清华大学', value: 'qsu' },
          { label: '北京大学', value: 'pku' },
          { label: '深圳大学', value: 'szu' },
        ],
        value: ['szu'],
      }, 8),
    ])
  ]
};
```