import localTimePicker from "./local-time-picker.vue";
import FormModal from './form-modal.vue';

export default {
  title: '',
  components: [
    {
      type: "custom",
      title: "自定义组件",
      key: "localTimePicker",
      value: null,
      component: localTimePicker,
    },
    {
      type: "custom",
      title: "弹窗表单",
      key: "formModal",
      value: null,
      component: FormModal,
    },
  ]
};