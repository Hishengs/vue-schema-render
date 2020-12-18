export default {
  components: [
    {
      type: "switch",
      label: "hide text",
      key: "hideText",
      value: false,
      on: {
        change ({ target, root }) {
          console.log('>>> change', { target, root });
          if (root) {
            root.components[1].hidden = target.value;
          }
        }
      }
    },
    {
      type: "text",
      label: "text",
      key: "text",
      value: '',
      hidden: false
    },
  ],
};
