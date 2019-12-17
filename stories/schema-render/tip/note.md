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
const tip = '刘墉（1720年-1805年1月24日/25日 [1]  ），字崇如，号石庵，出生于山东诸城。清朝政治家、书法家。大学士刘统勋长子。';

export default {
  components: [
    {
      type: 'text',
      label: '无提示',
      key: 'text',
      value: '',
    },
    {
      type: 'text',
      label: '有提示',
      labelTooltip: tip,
      key: 'text',
      value: '',
    },
    {
      type: 'text',
      label: '有提示',
      labelTooltip: tip,
      key: 'text',
      value: '',
      tip,
    },
  ]
};
```