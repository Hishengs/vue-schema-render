<template>
  <RenderWrapper name="自定义布局" :schema="schema" :max-width="1920"></RenderWrapper>
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
