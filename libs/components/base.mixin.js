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
  methods: {
    _onChange(component) {
      if (this.component.onChange) {
        this.component.onChange({
          component
        });
      }
      this.$emit("change", component);
    },
    onChange(component, nextTick = false) {
      if (nextTick) {
        // emit at next tick, make sure value has changed.
        this.$nextTick(() => {
          this._onChange(component);
        });
      } else this._onChange(component);
    }
  }
};
