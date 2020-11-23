/* base mixin of all components */
import { COMP_PREFIX } from "../utils.ts";

function findComponent (key, component) {
  const { _vsr_root } = component;
  const root = _vsr_root || component;
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
    emit (event, nextTick = false, target) {
      const args = {
        target: target || this.component, // 事件触发的组件
        currentTarget: this.component,    // 事件绑定的组件
        findComponent: this.findComponent
      };
      const call = () => {
        const { on, onChange, _vsr_parent } = this.component;
        if (on && on[event]) on[event].call(this, args);
        if (event === 'change' && onChange) onChange.call(this, args);
        // propagation 冒泡
        if (_vsr_parent && _vsr_parent._vsr_vm) {
          _vsr_parent._vsr_vm.emit(event, false, args.target);
        }
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
