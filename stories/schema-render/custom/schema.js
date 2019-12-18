import { addComponent } from 'vue-schema-render';
import localTimePicker from "./local-time-picker.vue";
import FormModal from './form-modal.vue';

addComponent('form-modal', FormModal);

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
      type: "form-modal",
      label: "弹窗表单",
      key: "formModal",
      value: null,
      // component: FormModal,
    },
    {
      type: "form-modal",
      label: "弹窗表单2",
      key: "formModal2",
      value: null,
      // component: FormModal,
    },
  ]
};