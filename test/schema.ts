import localTimePicker from "./local-time-picker.vue";

export default {
  components: [
    {
      type: "text",
      label: "一级标题",
      labelTooltip: '刘墉（1720年-1805年1月24日/25日 [1]  ），字崇如，号石庵，出生于山东诸城。清朝政治家、书法家。大学士刘统勋长子。',
      key: "title",
      rules: [{ required: true, message: "一级标题必填", trigger: "blur" }],
      value: "",
      tip: '在这里放一个提示看看'
    },
    {
      type: 'select',
      label: '性别',
      key: 'sex',
      value: 'unknown',
      options: ['male', 'female', 'unknown'],
      slot: {
        'component-prepend' (h: any) {
          return h('div', 'component-prepend');
        }
      },
    },
    {
      label: "出发时间",
      type: "custom",
      key: "time",
      component: localTimePicker,
      value: ""
    },
    {
      label: "文章列表",
      type: "list",
      key: "essays",
      component: () => {
        return {
          label: "文章",
          type: "form",
          components: [
            {
              label: "文章标题",
              type: "text",
              key: "title",
              value: "",
              rules: [
                { required: true, message: "文章标题必填", trigger: "blur" }
              ]
            },
            {
              label: "文章摘要",
              type: "textarea",
              key: "desc",
              value: "",
              rules: [
                { required: true, message: "文章摘要必填", trigger: "blur" }
              ]
            },
            {
              label: "文章链接",
              type: "text",
              key: "link",
              value: "",
              rules: [
                { required: true, message: "文章链接必填", trigger: "blur" }
              ]
            },
            {
              label: "打开方式",
              type: "radio",
              key: "target",
              options: [
                { label: "当前页打开", value: "_self" },
                { label: "新标签页打开", value: "_blank" }
              ],
              value: "_blank"
            }
          ]
        }
      },
      rules: [
        { required: true, type: 'array', range: { min: 1 }, message: '至少添加一篇文章' }
      ]
    }
  ],
  rules: {
    title: [{ required: true, message: "一级标题必填", trigger: "blur" }],
  }
};

export const mockData = {
  "title": "测试标题",
  "sex": "male",
  "essays": [
    {
      "title": "测试文章",
      "desc": "描述文字",
      "link": "https://baidu.com",
      "target": "_blank"
    }
  ]
};
