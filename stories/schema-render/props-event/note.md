`schema.js`

```js
{
  title: '',
  components: [
    {
      type: 'text',
      title: '文本框',
      key: 'text',
      value: '',
      props: {
        placeholder: '自定义 placeholder'
      },
      on: {
        input (value) {
          logInput(value);
        }
      }
    }
  ]
};
```