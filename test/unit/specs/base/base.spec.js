import { mount } from '@vue/test-utils';
import { SchemaRender as Render } from '@/index.ts';
import { delay } from '../../utils';

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
  test('default view', async () => {
    const wrapper = mount(Render, {
      propsData: {
        schema,
        data: {
          test: 'hello'
        }
      }
    });
    await delay(0);
    const data = await wrapper.vm.genData();
    expect(data.test).toBe('hello');
    expect(wrapper.html()).toMatchSnapshot();
  });
});
