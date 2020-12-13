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
      label: '一级子表单',
      components: [
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
        },
        {
          type: 'form',
          label: '二级子表单',
          key: 'subSubForm',
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
              component () {
                return {
                  type: 'form',
                  label: '第三级表单',
                  key: 'form',
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
                  ]
                };
              },
              maxHeight: '500px'
            },
          ]
        }
      ]
    },
  ]
};