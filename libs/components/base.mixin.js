/* base mixin of all components */
import { COMP_PREFIX } from "../utils.ts";

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
      const call = () => {
        const { on, onChange } = this.component;
        if (on && on[event]) on[event].call(this, { component: this.component });
        if (event === 'change' && onChange) onChange.call(this, { component: this.component });
        this.$emit(event, this.component);
      };
      if (nextTick) {
        this.$nextTick(call);
      } else call();
    }
  }
};
