import localTimePicker from "./local-time-picker.vue";
// import { layout } from 'vue-schema-render';

export default {
  title: '',
  components: [
    {
      type: "custom",
      title: "自定义组件",
      key: "custom",
      value: null,
      component: localTimePicker,
    },
  ]
};