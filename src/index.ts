import './element-ui';
import { internalComps, customComps } from '@/utils';
import { Component } from '@/types';

export const layout = {
  Row (cols: Array<Component.Col>, gutter: number = 20): Component.Row {
    return {
      type: 'row',
      cols,
      gutter,
    };
  },
  Col (component: Component.UIComp | Component.Row, span?: number): Component.Col {
    return {
      type: 'col',
      component,
      span,
    };
  }
};

// 支持添加自定义组件
export function addComponent (name: string, comp: Function | Object) {
  if (customComps[name]) {
    console.warn(`已存在同名自定义组件：${name}，无需重复添加`);
    return;
  }
  if (internalComps.includes(name)) {
    console.warn(`已存在同名内部组件：${name}，不允许覆盖添加`);
    return;
  }
  customComps[name] = comp;
}

export { setCloudinaryOptions } from '@/utils';

export { default as SchemaRender } from '@/components/render.vue';
