/**
 * @author Hisheng
 * @description
 * 与需求原型相映射的 UI 描述文件，称之为 schema 描述文件，
 * 可以通过描述文件将对应的 UI 界面渲染出来供外部人员操作，从而得到数据
 */
import { Schema, Component } from '@/types';
import localTimePicker from "./local-time-picker.vue";
import { layout } from '@/index';

import {
  regularActivitySchema,
  smallActivitySchema,
  smallArticleSchema,
  smallPhotoSchema,
  articleAndActivitySchema,
  subSectionActivitySchema,
  discountCodeRedemptionBoxSchema,
  fetchData as fetchActivityData
} from "./activity-schema";

const INVALID_MSG = "请输入一个有效值";

const checkDate = {
  type: "string",
  validator(rule: any, value: any, callback: Function) {
    const INVALID_MSG = "请输入一个有效时间";
    const val = typeof value === "object" ? value.valueOf() : value;
    if (!val || typeof val !== "string") {
      callback(new Error(INVALID_MSG));
    } else if (String(new Date(val)) === "Invalid Date") {
      callback(new Error(INVALID_MSG));
    } else callback();
  },
  trigger: "change"
};

function getDragableList (key: string): Component.Comp {
  return {
    type: 'list',
    title: '列表组件',
    key: key,
    value: [],
    component () {
      return {
        type: 'text',
        title: '拖拽项',
        key: 'dragItem',
        value: '拖拽项',
        on: {
          change (val: string) {
            console.log('监听到了：', val);
          }
        }
      };
    },
    maxHeight: '500px'
  };
}

const formComp: Component.Comp = {
  type: 'form',
  title: '嵌套子表单',
  key: 'form',
  components: [
    // promo code
    {
      type: "text",
      title: "Promo Code",
      key: "promo_code",
      value: "",
      visible: true,
      props: {
        disabled: true
      }
    },
    // color tone
    {
      type: "select",
      title: "Color Tone",
      key: "color_tone",
      value: null,
      options: [
        { label: "Regular White", value: "regularWhite" },
        { label: "Pine Green", value: "pineGreen" },
        { label: "Persian Blue", value: "persianBlue" },
        { label: "Brand Orange", value: "brandOrange" },
        { label: "Solid Black", value: "solidBlack" }
      ]
    },
  ]
};

const schema: Schema = {
  title: "Campaign Page Settings",
  components: [
    layout.Row([
      layout.Col({
        type: 'text',
        title: '单行文本1（放个提示看看）',
        key: 'text1',
        value: 'This is Text',
        multiLanguage: true,
        on: {
          input (val: any) {
            console.log('>>> on.input', val);
          },
          change (val: any) {
            console.log('>>> on.change', val);
          }
        },
        rules: [
          { required: true, trigger: 'blur' }
        ]
      }, 18),
      layout.Col({
        type: 'text',
        title: '单行文本2',
        key: 'text2',
        value: 'This is Text2',
        multiLanguage: true
      }, 6)
    ]),
    layout.Row([
      layout.Col({
        type: 'slider',
        title: 'Slider1',
        key: 'slider1',
        value: 20,
      }, 10),
      layout.Col({
        type: 'text',
        title: '单行文本3',
        key: 'text3',
        value: '',
        props: {
          placeholder: '自定义的 placeholder'
        }
      }, 14)
    ]),
    layout.Row([
      layout.Col(getDragableList('list1'), 14),
      layout.Col(getDragableList('list2'), 10),
    ]),
    {
      type: 'slider',
      title: 'Slider2',
      key: 'slider2',
      value: 20,
    },
    {
      type: "text",
      title: "Page Title",
      key: "page_title",
      value: "",
      multiLanguage: true,
      rules: [{ required: true, message: INVALID_MSG, trigger: "blur" }]
    },
    formComp,
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
    // step 1 icon
    {
      type: "upload",
      title: "Step1 Icon (110 * 110)",
      key: "step1_icon",
      value: "",
      visible: false
    },
    // step 2 icon
    {
      type: "upload",
      title: "Step2 Icon (110 * 110)",
      key: "step2_icon",
      value: "",
      visible: false
    },
    // step 3 icon
    {
      type: "upload",
      title: "Step3 Icon (110 * 110)",
      key: "step3_icon",
      value: "",
      visible: false
    },
    // show price tag
    {
      type: "switch",
      title: "Show Price Tag",
      key: "show_price_tag",
      value: false
    },
    // enable countdown clock
    {
      type: "switch",
      title: "Enable Countdown Clock",
      key: "enable_countdown_clock",
      value: false
    },
    // countdown clock start date
    {
      type: "custom",
      title: "Countdown Clock Start Date",
      key: "countdown_clock_start_date",
      value: null,
      component: localTimePicker,
      visible: false,
      rules: [checkDate]
    },
    // countdown clock end date
    {
      type: "custom",
      title: "Countdown Clock End Date",
      key: "countdown_clock_end_date",
      value: null,
      component: localTimePicker,
      visible: false,
      rules: [checkDate]
    },
    // slogan
    {
      type: "text",
      title: "Slogan",
      key: "slogan",
      value: "",
      visible: false,
      multiLanguage: true
    },
    // show hide clock
    {
      type: "radio",
      title: "Show Hide Clock",
      key: "show_hide_clock",
      options: [
        {
          label: "Keep Clock When Finish",
          value: true
        },
        {
          label: "Hide Clock When Finish",
          value: false
        }
      ],
      value: null,
      visible: false,
      rules: [
        {
          type: "boolean",
          required: true,
          message: INVALID_MSG,
          trigger: "change"
        }
      ]
    },
    // keep change banner
    {
      type: "radio",
      title: "Keep Change Banner",
      key: "keep_change_banner",
      options: [
        {
          label: "Keep Same Banner When Ended",
          value: true
        },
        {
          label: "Change Banner When Ended",
          value: false
        }
      ],
      value: null,
      visible: false,
      rules: [
        {
          type: "boolean",
          required: true,
          message: INVALID_MSG,
          trigger: "change"
        }
      ]
    },
    // mobile countdown end banner
    {
      type: "upload",
      title: "Mobile Countdown End Banner (1000 * 1000)",
      key: "mobile_countdown_end_banner",
      value: "",
      visible: false
    },
    // show menu bar
    {
      type: "switch",
      title: "Show Menu Bar",
      key: "show_menu_bar",
      value: false
    },
    // show Coupon on activity
    {
      type: "switch",
      title: "Show Coupon On Activity",
      key: "show_coupon_on_activity",
      value: false
    },
    // show video on banner
    {
      type: "switch",
      title: "Show Video On Banner",
      key: "show_video_on_banner",
      value: false
    },
    // banner video
    {
      type: "upload",
      title: "Banner Video",
      key: "banner_video",
      value: "",
      visible: false,
      rules: [{ required: true, message: INVALID_MSG, trigger: "change" }],
      props: {
        type: "video"
      }
    },
    // search bar on banner
    {
      type: "switch",
      title: "Search Bar On Banner",
      key: "search_bar_on_banner",
      value: false
    },
    // show section banner
    {
      type: "switch",
      title: "Show Section Banner",
      key: "show_section_banner",
      value: false
    },
    // mobile section banner
    {
      type: "upload",
      title: "Mobile Section Banner (1000 * 428)",
      key: "mobile_section_banner",
      value: "",
      visible: false,
      rules: [{ required: true, message: INVALID_MSG, trigger: "change" }]
    },
    // Section Banner Url
    {
      type: "text",
      title: "Section Banner Url",
      key: "section_banner_url",
      value: "",
      visible: false,
      multiLanguage: true,
      rules: [{ required: true, message: INVALID_MSG, trigger: "blur" }]
    },
    // show bottom banner
    {
      type: "switch",
      title: "Show Bottom Banner",
      key: "show_bottom_banner",
      value: false
    },
    // mobile Bottom banner
    {
      type: "upload",
      title: "Mobile Bottom Banner (1000 * 428)",
      key: "mobile_bottom_banner",
      value: "",
      visible: false,
      rules: [{ required: true, message: INVALID_MSG, trigger: "change" }]
    },
    // Bottom Banner Url
    {
      type: "text",
      title: "Bottom Banner Url",
      key: "bottom_banner_url",
      value: "",
      visible: false,
      multiLanguage: true,
      rules: [{ required: true, message: INVALID_MSG, trigger: "blur" }]
    },
    // show logo
    {
      type: "switch",
      title: "Show Logo",
      key: "show_logo",
      value: false
    },
    // mobile logo
    {
      type: "upload",
      title: "Mobile Logo (510 * 66)",
      key: "mobile_logo",
      value: "",
      visible: false,
      rules: [{ required: true, message: INVALID_MSG, trigger: "change" }]
    },
    // show terms and conditions
    {
      type: "switch",
      title: "Show Terms And Conditions",
      key: "show_terms_and_conditions",
      value: false
    },
    // Terms And Conditions
    {
      type: "markdown",
      title: "Terms And Conditions",
      key: "terms_and_conditions",
      value: "",
      visible: false,
      rules: [{ required: true, message: INVALID_MSG, trigger: "change" }]
    },
    // banner type
    {
      type: "select",
      title: "Banner Type",
      key: "banner_type",
      value: "regular_banner",
      options: [
        { label: "Regular Banner", value: "regular_banner" },
        { label: "Whole Page Banner", value: "whole_page_banner" }
      ],
      rules: [{ required: true, message: INVALID_MSG, trigger: "change" }]
    },
    // Regular Banner
    {
      type: "list",
      title: "Banner List",
      key: "regular_banner",
      component () {
        return {
          type: "upload",
          title: "Banner(1000 * 666)",
          key: "banner",
          value: "",
          multiLanguage: true,
          rules: [
            {
              type: "string",
              required: true,
              message: INVALID_MSG,
              trigger: "change"
            }
          ]
        };
      },
      value: [],
      rules: [
        {
          type: "array",
          required: true,
          message: "Banner List 不能为空",
          trigger: "change"
        }
      ]
    },
    // Whole Page Banner
    {
      type: "upload",
      title: "Mobile Banner(1000 * 1000)",
      key: "whole_page_banner",
      value: "",
      rules: [{ required: true, message: INVALID_MSG }],
      visible: false
    },
    // Mobile Short Text
    {
      type: "text",
      title: "Mobile Short Text",
      key: "mobile_short_text",
      value: "",
      multiLanguage: true
    },
    // Mobile Short Text
    {
      type: "text",
      title: "Mobile Short Text Promocode",
      key: "mobile_short_text_promo_code",
      value: "",
      multiLanguage: true
    },
    // Section List
    {
      type: "list",
      title: "Section List",
      key: "section_list",
      component () {
        return {
          title: "Activity",
          type: "form",
          components: [
            {
              type: "text",
              title: "Title",
              key: "title",
              value: "",
              multiLanguage: true,
              rules: [{ required: true, message: INVALID_MSG, trigger: "blur" }]
            },
            {
              type: "text",
              title: "Subtitle",
              key: "sub_title",
              value: "",
              multiLanguage: true
            },
            {
              type: "text",
              title: "Anchor Link Text",
              key: "anchor_link_text",
              value: ""
            },
            {
              type: "select",
              title: "Section Type",
              key: "section_type",
              value: "regular_activity_display",
              options: [
                {
                  value: "regular_activity_display",
                  label: "Regular Activity Display"
                },
                {
                  value: "small_activity_display",
                  label: "Small Activity Display"
                },
                {
                  value: "sub_section_activity_display",
                  label: "Sub Section Activity Display"
                },
                {
                  value: "article_and_activity_display",
                  label: "Article & Activity Display"
                },
                {
                  value: "small_article_display",
                  label: "Small Article Display"
                },
                {
                  value: "small_photo_display",
                  label: "Small Photo Display"
                },
                {
                  value: "discount_code_redemption_box",
                  label: "Discount Code Redemption Box"
                }
              ],
              rules: [{ required: true, message: INVALID_MSG, trigger: "change" }]
            },
            // regularActivityDisplay
            {
              type: "list",
              title: "Regular Activity Display",
              key: "regular_activity_display",
              component () {
                return regularActivitySchema;
              },
              value: null,
              rules: [
                {
                  type: "array",
                  required: true,
                  message: "请至少添加一个",
                  trigger: "change"
                }
              ],
              visible: true
            },
            // smallActivityDisplay
            {
              type: "list",
              title: "Small Activity Display(No less than four)",
              key: "small_activity_display",
              component () {
                return smallActivitySchema;
              },
              value: null,
              rules: [
                {
                  type: "array",
                  required: true,
                  min: 4,
                  message: "请至少提供4个或以上活动",
                  trigger: "change"
                }
              ],
              visible: false
            },
            // subSectionActivityDisplay
            {
              type: "list",
              title: "Sub Section Activity Display",
              key: "sub_section_activity_display",
              component () {
                return subSectionActivitySchema;
              },
              value: null,
              rules: [
                {
                  type: "array",
                  required: true,
                  message: INVALID_MSG,
                  trigger: "change"
                }
              ],
              visible: false
            },
            // articleAndActivityDisplay
            {
              type: "list",
              title: "Article & Activity Display",
              key: "article_and_activity_display",
              component () {
                return articleAndActivitySchema;
              },
              value: null,
              rules: [
                {
                  type: "array",
                  required: true,
                  message: INVALID_MSG,
                  trigger: "change"
                }
              ],
              visible: false
            },
            // smallArticleDisplay
            {
              type: "list",
              title: "Small Article Display",
              key: "small_article_display",
              component () {
                return smallArticleSchema;
              },
              value: null,
              rules: [
                {
                  type: "array",
                  required: true,
                  message: INVALID_MSG,
                  trigger: "change"
                }
              ],
              visible: false
            },
            // smallPhotoDisplay
            {
              type: "list",
              title: "Small Photo Display",
              key: "small_photo_display",
              component () {
                return smallPhotoSchema;
              },
              value: null,
              rules: [
                {
                  type: "array",
                  required: true,
                  message: INVALID_MSG,
                  trigger: "change"
                }
              ],
              visible: false
            },
            // discountCodeRedemptionBox
            {
              type: "list",
              title: "Discount Code Redemption Box",
              key: "discount_code_redemption_box",
              component () {
                return discountCodeRedemptionBoxSchema;
              },
              value: null,
              rules: [
                {
                  type: "array",
                  required: true,
                  message: INVALID_MSG,
                  trigger: "change"
                }
              ],
              visible: false
            }
          ],
          onChange({ component }: any) {
            if (component.type === "select" && component.key === "section_type") {
              const selectedOption = component.options.find(
                (item: any) => item.value === component.value
              );
              this.title = selectedOption ? selectedOption.label : this.title;
              for (const comp of this.components) {
                if (comp.type === "array") {
                  comp.visible = (comp.key === component.value);
                }
              }
            }
          }
        };
      },
      value: null
    }
  ],
  onChange({ component }: any) {
    console.log("onComponentChange", component, component.key);

    function onCommonVisibleControl(comp: any, relativeComp: any) {
      relativeComp.visible = comp.value;
    }
    // 处理组件之间的关联关系
    const keyRelativeControls: any = {
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
      enable_countdown_clock: [
        [
          "countdown_clock_start_date",
          "countdown_clock_end_date",
          "slogan",
          "show_hide_clock",
          "keep_change_banner",
          "mobile_countdown_end_banner"
        ],
        onCommonVisibleControl
      ],
      banner_type: [
        ["regular_banner", "whole_page_banner"],
        (comp: any, relativeComp: any) => {
          if (comp.value === relativeComp.key) {
            relativeComp.visible = true;
          } else relativeComp.visible = false;
        }
      ],
      show_video_on_banner: [["banner_video"], onCommonVisibleControl],
      show_section_banner: [
        ["mobile_section_banner", "section_banner_url"],
        onCommonVisibleControl
      ],
      show_bottom_banner: [
        ["mobile_bottom_banner", "bottom_banner_url"],
        onCommonVisibleControl
      ],
      show_logo: [["mobile_logo"], onCommonVisibleControl],
      show_terms_and_conditions: [
        ["terms_and_conditions"],
        onCommonVisibleControl
      ]
    };

    if (keyRelativeControls[component.key]) {
      const [relativeKeys, callback] = keyRelativeControls[component.key];
      this.components.forEach((comp: any) => {
        if (relativeKeys.includes(comp.key)) {
          callback(component, comp);
        }
      });
    }
  }
};

export async function fetchData() {
  await fetchActivityData();
}

export default schema;
