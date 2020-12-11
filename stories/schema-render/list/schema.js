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
      type: 'list',
      label: '列表组件',
      key: 'list',
      value: [],
      component () {
        return {
          type: 'text',
          label: '拖拽项',
          key: 'dragItem',
          value: '拖拽项',
          rules: [
            { required: true, trigger: 'blur', message: '此项为必填项' }
          ]
        };
      },
      maxHeight: '500px'
    }
  ]
};
