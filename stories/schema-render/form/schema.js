export default {
  components: [
    {
      type: 'text',
      label: '文本框',
      key: 'text',
      value: '',
    },
    {
      type: 'select',
      label: '下拉框',
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
      label: '开关',
      key: 'switch',
      value: false,
    },
    {
      type: 'form',
      key: 'subForm',
      label: '子表单',
      components: [
        {
          type: 'text',
          label: '文本 A',
          key: 'text-a',
          value: '',
        },
        {
          type: 'radio',
          label: '单选框',
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
          label: '复选框',
          key: 'checkbox',
          options: [
            { label: '清华大学', value: 'qsu' },
            { label: '北京大学', value: 'pku' },
            { label: '深圳大学', value: 'szu' },
          ],
          value: ['szu'],
        }
      ]
    },
  ]
};
