import merge from 'lodash/merge';

import { Component } from './types';

export function getUID () {
  return Date.now().toString().slice(7) + '_' + Math.random().toString().slice(2, 8);
}

function setProperty (obj: Object, key: string, value: any) {
  Object.defineProperty(obj, key, {
    value,
    configurable: false,
    enumerable: false,
  });
}

// check if has dunplicate key in Form
function hasDunplicateKey (comp: Component.Comp, parent: Component.FormComp): boolean {
  let targetCompCount: number = 0;

  const targetComp: Array<Component.Base> | Component.Base = isLayoutComponent(comp)
    ? comp.type === 'row'
      ? (comp as Component.Row).cols.map(cp => cp.component)
      : (comp as Component.Col).component
    : comp as Component.Base;

  if (Array.isArray(targetComp)) {
    return targetComp.some(cp => hasDunplicateKey(cp, parent));
  }

  for (const sub of parent.components) {
    if (targetCompCount > 1) break;
    if (isLayoutComponent(sub)) {
      const comps: Array<Component.Base> = sub.type === 'row'
        ? (sub as Component.Row).cols.map(cp => cp.component)
        : [(sub as Component.Col).component];
      const keys = comps.map((cp: Component.Base) => cp.key);
      for (const key of keys) {
        if (key === targetComp.key) {
          targetCompCount++;
        }
      }
    } else {
      if (targetComp.key === (sub as Component.Base).key) {
        targetCompCount++;
      }
    }
  }

  if (targetCompCount > 1) {
    console.warn(`存在重复 key: ${targetComp.key} 的子组件`, targetComp, parent);
  }
  return targetCompCount > 1;
}

function setCompParent (comp: Component.Comp, parent: Component.Comp) {
  if (comp._parent) return;
  setProperty(comp, '_parent', parent);
  parent._children && parent._children.push(comp);
}

export function getUnLayoutParentComp (comp: Component.UIComp): Component.UIComp | undefined {
  let parent: Component.Comp | undefined = comp._parent;
  while (parent && parent.type !== 'form') {
    parent = parent._parent;
  }
  return parent as Component.UIComp;
}

export function setComponentVM (comp: Component.Comp, vm: Vue) {
  if (comp._vm) return;
  setProperty(comp, '_vm', vm);
}

export function initComponent(component: Component.Comp, parent?: Component.Comp, vm?: Vue) {
  if ('_uid' in component) return;
  // set a unique id
  setProperty(component, '_uid', `${component.type}_${getUID()}`);

  if (parent) {
    setCompParent(component, parent);
    setProperty(component, '_root', parent._root || parent);
  }

  if (vm && !('_vm' in component)) {
    setProperty(component, '_vm', vm);
  }

  const { type } = component;

  // which is Component.Base
  if ('key' in component) {
    // set default value
    component.value = component.value === undefined ? null : component.value;
    // bind context to the event
    /* if (component.onChange) {
      // 确保 onChange 执行时的上下文是 component 本身
      component.onChange = component.onChange.bind(component);
    } */
  }

  // init slot
  if (isBasicComponent(component) && !(component as Component.Base).slot) {
    (component as Component.Base).slot = {};
  }

  // init sub components
  if (type === 'form') {
    component._children = [];
    for (const comp of (component as Component.FormComp).components) {
      if (!hasDunplicateKey(comp, component as Component.FormComp)) {
        initComponent(comp, component);
      }
    }
  } else if (type === 'row') {
    component._children = [];
    for (const comp of (component as Component.Row).cols) {
      if (comp.type !== 'col') {
        console.error(`Row 组件包含的子组件只能是 Col`, component, comp);
        continue;
      }
      initComponent(comp, component);
    }
  } else if (type === 'col') {
    if (!component._parent || component._parent.type !== 'row') {
      console.error(`Col 组件只能作为 Row 组件的子组件使用`, component);
    } else initComponent((component as Component.Col).component, component);
  }
}

export function isBasicComponent(component: Component.Comp): boolean {
  return [
    'text',
    'textarea',
    'select',
    'checkbox',
    'radio',
    'switch',
    'slider',
    'upload',
    'markdown'
  ].includes(component.type);
}

export function isLayoutComponent(component: Component.Comp): boolean {
  return ["row", "col"].includes(component.type);
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

export const internalComps = [
  'text',
  'select',
  'checkbox',
  'radio',
  'switch',
  'slider',
  'form',
  'list',
  'custom',
  'row',
  'col',
];

export const COMP_PREFIX = "vsr";
