/**
 * @description section list relative schemas
 */
import { debounce } from 'lodash';

const CMSAsyncData = {
  ACTIVITIES: [], // 活动列表
  COUPONS: [] // 优惠券列表
};

export async function fetchData() {
  // 先获取异步数据
  return Promise.resolve();
}

function getActivityLable(act: any) {
  return `${act.activity_id} - ${act.activity_name} @${act.city_name}`;
}

function activityMapper(act: any) {
  return {
    label: getActivityLable(act),
    value: act.activity_id
  };
}

const MAX_SHOWN_ACTIVITY_NUM = 50;

// activity remote search method
const activityRemoteMethod = debounce((query: any, comp: any) => {
  if (query) {
    comp.props.loading = true;
    const options = CMSAsyncData.ACTIVITIES
      // match activity id or name
      .filter(act => {
        const label = getActivityLable(act);
        return label.includes(query);
      })
      // can not be too much which causes performance problems.
      .slice(0, MAX_SHOWN_ACTIVITY_NUM)
      .map(activityMapper);
    comp.props.loading = false;
    comp.options = options;
  }
}, 300);

const getActivityComponent = () => {
  const component = {
    type: "select",
    title: "Activity",
    key: "id",
    value: null,
    options() {
      return CMSAsyncData.ACTIVITIES.slice(0, MAX_SHOWN_ACTIVITY_NUM).map(
        activityMapper
      );
    },
    rules: [
      {
        type: "number",
        required: true,
        message: "请输入一个有效值",
        trigger: "change"
      }
    ],
    props: {
      placeholder: "请输入关键词精确搜索活动",
      filterable: true,
      remote: true,
      loading: false,
      remoteMethod: activityRemoteMethod
    },
    onChange({ component }: any) {
      if (component === this) {
        // set selected options if value exists
        // @ts-ignore
        if (this.value && !this.__selectedOptions) {
          // @ts-ignore
          this.__selectedOptions = true;
          // @ts-ignore
          this.options = CMSAsyncData.ACTIVITIES.filter(
            // @ts-ignore
            (act: any) => act.activity_id === parseInt(this.value, 10)
          ).map(activityMapper);
        }
      }
    }
  };

  return component;
};

export const regularActivitySchema = {
  type: "form",
  components: [
    getActivityComponent(),
    {
      type: "text",
      title: "Description",
      key: "description",
      value: "",
      multiLanguage: true
    }
  ]
};

// Small Activity
export const smallActivitySchema = {
  type: "form",
  components: [
    getActivityComponent(),
    {
      type: "text",
      title: "Description",
      key: "description",
      value: "",
      multiLanguage: true
    }
  ]
};

// Small Article
export const smallArticleSchema = {
  type: "form",
  components: [
    {
      type: "text",
      title: "Article Title",
      key: "article_title",
      value: "",
      multiLanguage: true,
      rules: [{ required: true, message: "请输入一个有效值", trigger: "blur" }]
    },
    {
      type: "upload",
      title: "Article Image (190 * 152)",
      key: "article_image",
      value: "",
      rules: [{ required: true, message: "请输入一个有效值", trigger: "blur" }]
    },
    {
      type: "text",
      title: "Article Link",
      key: "article_link",
      value: "",
      multiLanguage: true,
      rules: [{ required: true, message: "请输入一个有效值", trigger: "blur" }]
    }
  ]
};

// Small Photo
export const smallPhotoSchema = {
  type: "form",
  components: [
    {
      type: "upload",
      title: "Article Image (274 * 342)",
      key: "article_image",
      value: "",
      rules: [{ required: true, message: "请输入一个有效值", trigger: "blur" }]
    },
    {
      type: "text",
      title: "Article Link",
      key: "article_link",
      value: "",
      multiLanguage: true
    }
  ]
};

// Article and Activity
export const articleAndActivitySchema = {
  type: "form",
  components: [
    {
      type: "text",
      title: "Article Title",
      key: "article_title",
      value: "",
      multiLanguage: true,
      rules: [{ required: true, message: "请输入一个有效值", trigger: "blur" }]
    },
    {
      type: "markdown",
      title: "Article Contents",
      key: "article_contents",
      value: "",
      rules: [{ required: true, message: "请输入一个有效值", trigger: "blur" }]
    },
    {
      type: "text",
      title: "Button Text",
      key: "button_text",
      value: "",
      multiLanguage: true,
      rules: [{ required: true, message: "请输入一个有效值", trigger: "blur" }]
    },
    {
      type: "upload",
      title: "Article Image (558 * 314)",
      key: "article_image",
      value: "",
      rules: [{ required: true, message: "请输入一个有效值", trigger: "blur" }]
    },
    {
      type: "text",
      title: "Article Link",
      key: "article_link",
      value: "",
      multiLanguage: true,
      rules: [{ required: true, message: "请输入一个有效值", trigger: "blur" }]
    },
    {
      type: "list",
      title: "Activity List",
      key: "list",
      component: regularActivitySchema
    }
  ]
};

// Sub Section Activity
export const subSectionActivitySchema = {
  type: "form",
  components: [
    {
      type: "text",
      title: "Sub Category Name",
      key: "sub_category_name",
      value: "",
      multiLanguage: true,
      rules: [{ required: true, message: "请输入一个有效值", trigger: "blur" }]
    },
    {
      type: "list",
      title: "Sub Category Activity List",
      key: "list",
      component: regularActivitySchema
    }
  ]
};

// Discount Code Redemption Box

function getCouponComponent() {
  const component = {
    type: "select",
    title: "Promo Code Batch ID",
    key: "id",
    value: null,
    options() {
      return CMSAsyncData.COUPONS.map((item: any) => {
        return {
          label: `${item.id} ${item.name}`,
          value: item.id
        };
      });
    },
    rules: [
      {
        type: "number",
        required: true,
        message: "请输入一个有效值",
        trigger: "change"
      }
    ],
    props: {
      filterable: true
    }
  };

  return component;
}

export const discountCodeRedemptionBoxSchema = {
  type: "form",
  components: [
    getCouponComponent(),
    {
      type: "text",
      title: "Discount Description",
      key: "discount_description",
      value: "",
      multiLanguage: true,
      rules: [{ required: true, message: "请输入一个有效值", trigger: "blur" }]
    },
    {
      type: "textarea",
      title: "Redemption Description",
      key: "redemption_description",
      value: "",
      multiLanguage: true
    }
  ]
};
