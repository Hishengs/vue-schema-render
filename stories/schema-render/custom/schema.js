import localTimePicker from "./local-time-picker.vue";
import FormModal from './form-modal.vue';

export default {
  components: [
    {
      type: "custom",
      label: "自定义组件",
      key: "localTimePicker",
      value: null,
      component: localTimePicker,
    },
    {
      type: "custom",
      label: "弹窗表单",
      key: "formModal",
      value: null,
      component: FormModal,
    },
  ]
};