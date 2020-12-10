<template>
  <el-date-picker
    v-model="component.value"
    type="date"
    placeholder="选择日期"
    @blur="$emit('blur')"
    >
  </el-date-picker>
</template>

<script>
export default {
  name: "local-date-picker",
  props: {
    component: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      //
    };
  },
  methods: {
    //
  }
};
</script>
