import cloneDeep from 'lodash/cloneDeep';
import { layout } from 'vue-schema-render';

const dragableList = {
  type: 'list',
  title: '拖拽测试',
  key: 'drag',
  value: [],
  component: {
    type: 'text',
    title: '拖拽项',
    key: 'dragItem',
    value: '拖拽项',
  },
  maxHeight: '500px'
};

export default {
  title: '',
  components: [
    layout.Row([
      layout.Col(cloneDeep(dragableList), 14),
      layout.Col(cloneDeep(dragableList), 10),
    ]),
  ]
};