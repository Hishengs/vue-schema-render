import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import Base from './base/index.vue';
import BaseInto from './base/intro.md';
import List from './list/index.vue';
import Custom from './custom/index.vue';
import Relative from './relative/index.vue';
import mdxDoc from './index.mdx';

storiesOf('Vue Schema Render', module)
  .addDecorator(withKnobs)
  .add('基础组件', () => ({
    components: {
      Base,
    },
    props: {
      greet: text('Greet', 'Hi, man')
    },
    template: '<Base :knobs="{ greet }"></Base>'
  }), {
    parameters: { docs: { page: mdxDoc } }
  })
  .add('列表组件', () => List)
  .add('自定义组件', () => Custom)
  .add('组件联动', () => Relative)
  .add('组件事件', () => '');