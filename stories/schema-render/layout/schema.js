import { layout } from 'vue-schema-render';

export default {
  components: [
    layout.Row([
      layout.Col({
        type: 'text',
        label: '文本框(10)',
        key: 'text',
        value: '',
      }, 10),
      layout.Col({
        type: 'select',
        label: '下拉框(6)',
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
        label: '滑块(8)',
        key: 'progress',
        value: 20,
      }, 8),
    ]),
    layout.Row([
      layout.Col({
        type: 'radio',
        label: '单选框(10)',
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
        label: '开关(6)',
        key: 'switch',
        value: false,
      }, 6),
      layout.Col({
        type: 'checkbox',
        label: '复选框(8)',
        key: 'checkbox',
        options: [
          { label: '清华大学', value: 'qsu' },
          { label: '北京大学', value: 'pku' },
          { label: '深圳大学', value: 'szu' },
        ],
        value: ['szu'],
      }, 8),
    ]),
    layout.Row([
      layout.Col({
        type: 'form',
        key: 'subForm',
        label: '放一个表单(14)',
        components: [
          {
            type: 'slider',
            label: '滑块',
            key: 'progress',
            value: 20,
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
      }, 14),
      layout.Col({
        type: 'list',
        label: '放一个列表(10)',
        key: 'list',
        component () {
          return {
            type: 'text',
            label: '文本',
            key: 'text',
          };
        },
        maxHeight: '400px'
      }, 10)
    ])
  ]
};