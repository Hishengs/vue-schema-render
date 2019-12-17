import Vue from 'vue';
import './element-ui';
import { COMP_PREFIX, internalComps } from '@/utils';
import { Component } from '@/types';

export const layout = {
  Row (cols: Array<Component.Col>) {
    return {
      type: 'row',
      cols,
    } as Component.Row;
  },
  Col (component: Component.Comp, span?: number) {
    return {
      type: 'col',
      component,
      span,
    } as Component.Col;
  },
};

// 支持添加自定义组件
export const registeredCustomComps: {
  [key: string]: Vue
} = {};

export function addComponent (name: string, comp: Vue) {
  if (registeredCustomComps[name]) {
    console.warn(`已存在同名自定义组件：${name}，无需重复添加`);
    return;
  }
  if (internalComps.includes(name)) {
    console.warn(`已存在同名内部组件：${name}，不允许覆盖添加`);
    return;
  }
  Vue.component(`${COMP_PREFIX}-${name}`, comp);
  registeredCustomComps[name] = comp;
}

export { default as SchemaRender } from '@/components/render.vue';