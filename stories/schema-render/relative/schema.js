// import { layout } from 'vue-schema-render';
const INVALID_MSG = "请输入一个有效值";

export default {
  components: [
    // show guide
    {
      type: "switch",
      label: "Show Guide",
      key: "show_guide",
      value: false
    },
    // default open
    {
      type: "switch",
      label: "Default Open",
      key: "default_open",
      value: false,
      hidden: true
    },
    // Guide Description
    {
      type: "text",
      label: "Guide Description",
      key: "guide_description",
      value: "",
      hidden: true,
      multiLanguage: true,
      rules: [{ required: true, message: INVALID_MSG, trigger: "blur" }]
    },
    // see how step1
    {
      type: "text",
      label: "See How Step1",
      key: "see_how_step1",
      value: "",
      hidden: true,
      multiLanguage: true,
      rules: [{ required: true, message: INVALID_MSG, trigger: "blur" }]
    },
    // see how step2
    {
      type: "text",
      label: "See How Step2",
      key: "see_how_step2",
      value: "",
      hidden: true,
      multiLanguage: true,
      rules: [{ required: true, message: INVALID_MSG, trigger: "blur" }]
    },
    // see how step3
    {
      type: "text",
      label: "See How Step3",
      key: "see_how_step3",
      value: "",
      hidden: true,
      multiLanguage: true,
      rules: [{ required: true, message: INVALID_MSG, trigger: "blur" }]
    },
  ],
  onChange ({ component }) {
    console.log('>>> onChange', component);
    function onCommonVisibleControl(comp, relativeComp) {
      relativeComp.hidden = !comp.value;
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
