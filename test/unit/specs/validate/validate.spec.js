import { mount } from '@vue/test-utils';
import { SchemaRender as Render } from '@/index.ts';
import { delay } from '../../utils';

const schema = {
  components: [
    {
      type: 'text',
      label: 'test',
      key: 'test',
      value: '',
      rules: [
        { required: true, message: 'test is required' }
      ]
    }
  ]
};

describe('Validate', () => {
  test('default view', async () => {
    const wrapper = mount(Render, {
      propsData: {
        schema,
        data: {
          test: ''
        }
      }
    });
    await delay(0);
    const data = await wrapper.vm.genData();
    expect(data.test).toBe('');
    let hasError = false;
    await wrapper.vm.validate().catch(({ errors, fields }) => {
      // console.log({ errors, fields });
      hasError = true;
    });
    expect(hasError).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
