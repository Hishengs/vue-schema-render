import './element-ui';
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

export { default as SchemaRender } from '@/components/render.vue';