import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Component } from '@/types';

Vue.use(ElementUI);

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