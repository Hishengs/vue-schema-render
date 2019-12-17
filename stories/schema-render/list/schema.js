import { layout } from 'vue-schema-render';

function getDragableList (key) {
  return {
    type: 'list',
    label: '列表组件',
    key,
    value: [],
    component () {
      return {
        type: 'text',
        label: '拖拽项',
        key: 'dragItem',
        value: '拖拽项',
        rules: [
          { required: true, trigger: 'blur', message: '此项为必填项' }
        ]
      };
    },
    maxHeight: '500px'
  };
}

export default {
  components: [
    layout.Row([
      layout.Col(getDragableList('list1'), 14),
      layout.Col(getDragableList('list2'), 10),
    ]),
  ]
};