import { action } from '@storybook/addon-actions';

const logInput = action('log');

export default {
  components: [
    {
      type: 'text',
      label: '文本框',
      key: 'text',
      value: '',
      placeholder: '自定义 placeholder',
      on: {
        input (value) {
          logInput(value);
        }
      }
    },
    {
      type: 'text',
      label: '监听 blur',
      key: 'text',
      value: '',
      on: {
        blur (value) {
          logInput('监听到 blur');
        }
      }
    },
    {
      type: 'select',
      label: '支持 filter 和多选',
      key: 'select',
      options: [
        { label: '清华大学', value: 'qsu' },
        { label: '北京大学', value: 'pku' },
        { label: '深圳大学', value: 'szu' },
      ],
      value: null,
      props: {
        filterable: true,
        multiple: true
      },
      on: {
        change (value) {
          logInput(value);
        }
      }
    }
  ]
};