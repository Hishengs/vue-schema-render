/* base mixin of all components */
import { COMP_PREFIX } from "../utils.ts";

function findComponent (key, component) {
  const { _root } = component;
  const root = _root || component;
  let target;
  for (const comp of root.components) {
    if (comp.key === key) {
      target = comp;
      break;
    }
  }
  return target;
}

export default {
  props: {
    component: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      COMP_PREFIX
    };
  },
  computed: {
    isDisabled() {
      const comp = this.component;
      return typeof comp.disabled === 'function' ? comp.disabled() : comp.disabled;
    }
  },
  methods: {
    onChange(nextTick = false) {
      this.emit('change', nextTick);
    },
    emit (event, nextTick = false) {
      const args = {
        component: this.component,
        findComponent: this.findComponent
      };
      const call = () => {
        const { on, onChange } = this.component;
        if (on && on[event]) on[event].call(this, args);
        if (event === 'change' && onChange) onChange.call(this, args);
        this.$emit(event, this.component);
      };
      if (nextTick) {
        this.$nextTick(call);
      } else call();
    },
    findComponent (key) {
      const keys = key.split('.');
      let curComp = this.component;
      for (const k of keys) {
        if (!curComp) break;
        curComp = findComponent(key, curComp);
      }
      return curComp;
    }
  }
};
