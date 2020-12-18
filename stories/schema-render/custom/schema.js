import { addComponent } from 'vue-schema-render';
import phoneNumber from "./phone-number.vue";
import FormModal from './form-modal.vue';

addComponent('form-modal', FormModal);

export default {
  components: [
    {
      type: "custom",
      label: "自定义组件",
      key: "phoneNumber",
      value: null,
      component: phoneNumber,
    },
    {
      type: "form-modal",
      label: "弹窗表单",
      key: "formModal",
      value: null
    },
    {
      type: "form-modal",
      label: "弹窗表单2",
      key: "formModal2",
      value: null
    },
  ]
};
