<template>
  <div class="vsr_component_platform">
    <!-- <el-tree
        :data="platforms"
        default-expand-all
        show-checkbox
        node-key="value"
        @check-change="onChange"
        >
        </el-tree> -->
    <el-checkbox-group v-model="ids">
      <div
        v-for="platform in platforms"
        :key="platform.value"
        style="border-bottom: 1px solid #eee;"
      >
        <el-checkbox :label="platform.value" :disabled="platform.disabled">{{
          platform.label
        }}</el-checkbox>
        <div v-if="platform.children" style="padding-left: 30px;">
          <el-checkbox
            v-for="child in platform.children"
            :key="child.value"
            :label="child.value"
            :disabled="child.disabled"
            >{{ child.label }}</el-checkbox
          >
        </div>
      </div>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "platform",
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      platforms: [
        {
          label: "小程序",
          value: 4000,
          disabled: true,
          children: [
            { label: "微信小程序", value: 4001, disabled: true },
            { label: "支付宝小程序", value: 4002, disabled: true },
            { label: "百度小程序", value: 4003, disabled: true },
            { label: "字节跳动小程序", value: 4004, disabled: true }
          ]
        }
        /* {
                        label: 'Web',
                        value: 1000,
                        disabled: true,
                    },
                    {
                        label: 'App',
                        value: 2000,
                        disabled: true,
                        children: [
                            { label: 'iOS', value: 2001, disabled: true, },
                            { label: 'Android', value: 2002, disabled: true, },
                        ],
                    }, */
      ],
      ids: []
    };
  },
  watch: {
    ids(val) {
      this.$emit("input", val);
    }
  },
  mounted() {
    this.ids.push(4001);
  },
  methods: {
    onChange(node, checked) {
      if (checked) {
        this.ids.push(node.value);
        this.ids = Array.from(new Set(this.ids));
        this.$emit("input", this.ids);
      } else {
        this.ids = this.ids.filter(id => id !== node.value);
      }
      console.log(this.ids);
    }
  }
};
</script>

<style lang="css">
.vsr_component_platform .el-tree {
    border: none;
}
</style>
