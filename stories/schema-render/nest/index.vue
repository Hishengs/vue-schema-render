<template>
  <RenderWrapper name="表单嵌套" :schema="schema"></RenderWrapper>
</template>

<script>
import schema from './schema.js';
import RenderWrapper from '../common/render-wrapper.vue';

export default {
  components: {
    RenderWrapper,
  },
  data () {
    return {
      schema,
    };
  },
};
</script>
