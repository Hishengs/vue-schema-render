import { layout } from 'vue-schema-render';

export default {
  title: '',
  components: [
    layout.Row([
      layout.Col({
        type: 'text',
        title: '文本框',
        key: 'text',
        value: '',
      }, 10),
      layout.Col({
        type: 'select',
        title: '下拉框',
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
        title: '滑块',
        key: 'progress',
        value: 20,
      }, 8),
    ]),
    layout.Row([
      layout.Col({
        type: 'radio',
        title: '单选框',
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
        title: '开关',
        key: 'switch',
        value: false,
      }, 6),
      layout.Col({
        type: 'checkbox',
        title: '复选框',
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