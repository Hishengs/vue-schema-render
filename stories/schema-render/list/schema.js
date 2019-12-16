import { layout } from 'vue-schema-render';

function getDragableList (key) {
  return {
    type: 'list',
    title: '列表组件',
    key,
    value: [],
    component: {
      type: 'text',
      title: '拖拽项',
      key: 'dragItem',
      value: '拖拽项',
    },
    maxHeight: '500px'
  };
}

export default {
  title: '',
  components: [
    layout.Row([
      layout.Col(getDragableList('list1'), 14),
      layout.Col(getDragableList('list2'), 10),
    ]),
  ]
};