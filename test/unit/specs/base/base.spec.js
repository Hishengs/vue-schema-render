import { mount } from '@vue/test-utils';
import { SchemaRender as Render } from '@/index.ts';

const schema = {
  components: [
    {
      type: 'text',
      label: 'test',
      key: 'test',
      value: ''
    }
  ]
};

describe('Base', () => {
  test('default view', () => {
    const wrapper = mount(Render, {
      propsData: {
        schema,
        data: {
          test: 'hello'
        }
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
