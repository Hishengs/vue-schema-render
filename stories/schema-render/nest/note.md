`template`

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
export default {
  title: '',
  components: [
    {
      type: 'text',
      title: '文本框',
      key: 'text',
      value: '',
    },
    {
      type: 'select',
      title: '下拉框',
      key: 'select',
      options: [
        { label: '清华大学', value: 'qsu' },
        { label: '北京大学', value: 'pku' },
        { label: '深圳大学', value: 'szu' },
      ],
      value: null,
    },
    {
      type: 'switch',
      title: '开关',
      key: 'switch',
      value: false,
    },
    {
      type: 'form',
      key: 'subForm',
      title: '一级子表单',
      components: [
        {
          type: 'slider',
          title: '滑块',
          key: 'progress',
          value: 20,
        },
        {
          type: 'radio',
          title: '单选框',
          key: 'radio',
          options: [
            { label: '清华大学', value: 'qsu' },
            { label: '北京大学', value: 'pku' },
            { label: '深圳大学', value: 'szu' },
          ],
          value: null,
        },
        {
          type: 'checkbox',
          title: '复选框',
          key: 'checkbox',
          options: [
            { label: '清华大学', value: 'qsu' },
            { label: '北京大学', value: 'pku' },
            { label: '深圳大学', value: 'szu' },
          ],
          value: ['szu'],
        },
        {
          type: 'form',
          title: '二级子表单',
          key: 'subSubForm',
          components: [
            {
              type: 'text',
              title: '文本框',
              key: 'text',
              value: '',
            },
            {
              type: 'select',
              title: '下拉框',
              key: 'select',
              options: [
                { label: '清华大学', value: 'qsu' },
                { label: '北京大学', value: 'pku' },
                { label: '深圳大学', value: 'szu' },
              ],
              value: null,
            },
            {
              type: 'list',
              title: '列表组件',
              key: 'list',
              component: {
                type: 'text',
                title: '文本框',
                key: 'text',
                value: '',
              },
              maxHeight: '500px'
            },
          ]
        }
      ]
    },
  ]
};
```