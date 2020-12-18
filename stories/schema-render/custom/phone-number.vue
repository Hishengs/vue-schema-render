<template>
  <div class="phone-number">
    <el-input placeholder="请输入手机号码" v-model="phone" style="width: 400px;">
      <el-select v-model="prefix" slot="prepend" placeholder="请选择" class="input-with-select">
        <el-option label="+86 中国" value="86"></el-option>
        <el-option label="+852 中国香港" value="852"></el-option>
        <el-option label="+886 中国台湾" value="886"></el-option>
      </el-select>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "phone-number",
  props: {
    component: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      phone: '',
      prefix: '86'
    };
  },
  methods: {
    validate() {
      return true;
    },
    genData() {
      return [this.prefix, this.phone];
    }
  }
};
</script>

<style lang="scss">
.phone-number {
  .el-select .el-input {
    width: 130px;
  }
}
</style>
