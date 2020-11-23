import localDatePicker from "./local-date-picker.vue";

export default {
  // labelPosition: 'right',
  components: [
    {
      type: "text",
      label: "输入框",
      labelTooltip: '刘墉（1720年-1805年1月24日/25日 [1]  ），字崇如，号石庵，出生于山东诸城。清朝政治家、书法家。大学士刘统勋长子。',
      key: "title",
      rules: [{ required: true, message: "一级标题必填", trigger: "blur" }],
      value: "",
      tip: '在这里放一个提示看看',
      i18n: true
    },
    {
      label: "文本输入框",
      type: "textarea",
      key: "textarea",
      value: "",
    },
    {
      type: 'select',
      label: '下拉选择',
      key: 'select',
      value: 'unknown',
      options: ['male', 'female', 'unknown']
    },
    {
      type: 'switch',
      label: '开关',
      key: 'switch',
      value: false,
      /* onChange (this: any, { component, findComponent }: any) {
        const comp = findComponent('title');
        if (component.value) {
          comp.value = '成功选中！';
        } else comp.value = '没有选中！';
      } */
      on: {
        change () {
          console.log('>> switch.on.change', arguments[0]);
        }
      }
    },
    {
      type: 'radio',
      label: '单选框',
      key: 'radio',
      options: ['选择A', '选择B', '选择C'],
      value: '选择A'
    },
    {
      type: 'checkbox',
      label: '复选框',
      key: 'checkbox',
      options: ['选择A', '选择B', '选择C'],
      value: ['选择A'],
      rules: [{ type: 'array', range: { min: 1 }, required: true, message: "至少选择一个", trigger: "change" }],
    },
    {
      label: "证件照",
      type: "upload",
      key: "image",
      value: ""
    },
    {
      label: "短视频",
      type: "upload",
      key: "video",
      value: "",
      resourceType: "video"
    },
    {
      label: "自定义组件",
      type: "custom",
      key: "date",
      component: localDatePicker,
      value: "",
      rules: [{ type: 'date', required: true, message: "请填写日期", trigger: "blur" }],
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
              ],
              on: {
                change () {
                  console.log('>> essay-title.on.change', arguments[0]);
                }
              }
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
          ],
          on: {
            change () {
              console.log('>> essay-list.on.change', arguments[0]);
            }
          }
        }
      },
      rules: [
        { required: true, type: 'array', range: { min: 1 }, message: '至少添加一篇文章' }
      ]
    }
  ],
  rules: {
    title: [{ required: true, message: "一级标题必填", trigger: "blur" }],
  },
  on: {
    change () {
      console.log('>> on.change', arguments[0]);
    }
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
