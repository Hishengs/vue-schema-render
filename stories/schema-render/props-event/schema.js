import { action } from '@storybook/addon-actions';

const logInput = action('on.input');

export default {
  components: [
    {
      type: 'text',
      label: '文本框',
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