// import { layout } from 'vue-schema-render';
const INVALID_MSG = "请输入一个有效值";

export default {
  title: '',
  components: [
    // show guide
    {
      type: "switch",
      title: "Show Guide",
      key: "show_guide",
      value: false
    },
    // default open
    {
      type: "switch",
      title: "Default Open",
      key: "default_open",
      value: false,
      visible: false
    },
    // Guide Description
    {
      type: "text",
      title: "Guide Description",
      key: "guide_description",
      value: "",
      visible: false,
      multiLanguage: true,
      rules: [{ required: true, message: INVALID_MSG, trigger: "blur" }]
    },
    // see how step1
    {
      type: "text",
      title: "See How Step1",
      key: "see_how_step1",
      value: "",
      visible: false,
      multiLanguage: true,
      rules: [{ required: true, message: INVALID_MSG, trigger: "blur" }]
    },
    // see how step2
    {
      type: "text",
      title: "See How Step2",
      key: "see_how_step2",
      value: "",
      visible: false,
      multiLanguage: true,
      rules: [{ required: true, message: INVALID_MSG, trigger: "blur" }]
    },
    // see how step3
    {
      type: "text",
      title: "See How Step3",
      key: "see_how_step3",
      value: "",
      visible: false,
      multiLanguage: true,
      rules: [{ required: true, message: INVALID_MSG, trigger: "blur" }]
    },
  ],
  onChange ({ component }) {
    function onCommonVisibleControl(comp, relativeComp) {
      relativeComp.visible = comp.value;
    }

    const keyRelativeControls = {
      show_guide: [
        [
          "default_open",
          "guide_description",
          "see_how_step1",
          "see_how_step2",
          "see_how_step3",
          "step1_icon",
          "step2_icon",
          "step3_icon"
        ],
        onCommonVisibleControl
      ],
      guide_description: [
        [
          'see_how_step1',
          'see_how_step2',
          'see_how_step3',
        ],
        function (comp, relativeComp) {
          relativeComp.value = comp.value;
        }
      ]
    };

    if (keyRelativeControls[component.key]) {
      const [relativeKeys, callback] = keyRelativeControls[component.key];
      this.components.forEach((comp) => {
        if (relativeKeys.includes(comp.key)) {
          callback(component, comp);
        }
      });
    }
  }
};