import merge from 'lodash/merge';

import { Component } from './types';

export function initComponent(component: Component.Comp) {
  // which is Component.Base
  if ('key' in component) {
    // set default value
    component.value = component.value === undefined ? null : component.value;
    // set props
    component.props = merge({
      placeholder: component.title,
    }, component.props || {});
    // 是否支持多语言
    if ((component as Component.MultiLanComp).multiLanguage) {
      // 参考语言的值
      component._refValue = "";
    }
    // is options a Function
    // @ts-ignore
    if (typeof component.options === "function") {
      // @ts-ignore
      component.options = component.options();
    }
    // bind context to the event
    if (component.onChange) {
      // 确保 onChange 执行时的上下文是 component 本身
      component.onChange = component.onChange.bind(component);
    }
  }

  // visible
  component.visible = component.visible === undefined ? true : component.visible;

  // which is Component.Row
  if ('cols' in component) {
    component.cols.forEach((col: Component.Comp) => {
      initComponent(col);
    });
  }
  // which is Component.Col
  if (component.type === 'col') {
    initComponent((component as Component.Col).component);
  }
}

export function isBasicComponent(component: Component.Comp): boolean {
  return !["form", "list", "custom", "row", "col"].includes(component.type);
}

export const querystring = {
  parse(url: string) {
    return (url.split("?")[1] || "").split("&").reduce((obj: any, cur: string, index: number) => {
      const [key, value] = cur.split("=");
      if (key !== undefined && value !== undefined) {
        if (obj[key] !== undefined) {
          obj[key] = [obj[key], value];
        } else obj[key] = value;
      }
      return obj;
    }, {});
  },
  stringify(obj: any) {
    return Object.keys(obj)
      .map((key: string) => {
        const type = getType(obj[key]);
        if (!["string", "number", "boolean", "array"].includes(type)) {
          return "";
        } else {
          if (type === "array") {
            return obj[key].map((item: any) => `${key}=${item}`).join("&");
          } else {
            return `${key}=${obj[key]}`;
          }
        }
      })
      .filter(item => item !== "")
      .join("&");
  }
};

export function getType(obj: any): string {
  return Object.prototype.toString
    .call(obj)
    .slice(8, -1)
    .toLowerCase();
}

export function deepAssign(obj: any, source: any) {
  const objType = getType(obj);
  const sourceType = getType(source);
  if (objType !== "object" || sourceType !== "object") return obj;
  const keys = Object.keys(source);
  for (const key of keys) {
    if (obj[key] !== undefined) {
      if (getType(obj[key]) === "object" && getType(source[key]) === "object") {
        obj[key] = deepAssign(obj[key], source[key]);
      } else obj[key] = source[key];
    } else obj[key] = source[key];
  }
  return obj;
}

const DEFAULT_OPTIONS = {
  pages: {
    list: {
      /* filter: {
        schema: Function
      },
      pagination: {
        pageSize: Number,
      },
      columns: Function */
    },
    create: {
      // columns: Function
    },
    edit: {
      // beforeRender: Function
    }
  }
};

export function mergeCMSOptions(options = {}) {
  return merge({}, DEFAULT_OPTIONS, options);
}

export const LAN_STATUS = {
  DRAFT: 0,
  PUBLISH: 1,
  UNPUBLISH: 2
};

export const LAN_STATUS_LABEL = {
  [LAN_STATUS.DRAFT]: "草稿",
  [LAN_STATUS.PUBLISH]: "已发布",
  [LAN_STATUS.UNPUBLISH]: "已取消发布"
};

export const CellRender = {
  name: "cell-render",
  functional: true,
  props: {
    scope: Object,
    render: Function
  },
  render: (h: any, ctx: any) => {
    return ctx.props.render(h, ctx.props.scope);
  }
};

export const COMP_PREFIX = "vsr";
