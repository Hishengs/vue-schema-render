<template>
  <div class="schema-edit" v-if="editComp && !empty">
    <el-form :model="editComp" :rules="rules" label-position="top">
      <el-form-item label="标题" prop="label">
        <el-input v-model="editComp.label" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="字段名" prop="key">
        <el-input v-model="editComp.key" placeholder="字段名"></el-input>
      </el-form-item>
      <el-form-item
        v-if="!['list', 'form'].includes(editComp.type)"
        label="默认值"
        prop="value"
      >
        <el-switch
          v-model="editComp.value"
          v-if="editComp.type === 'switch'"
        ></el-switch>
        <el-input v-model="model" placeholder="默认值" v-else></el-input>
      </el-form-item>
      <el-form-item
        v-if="
          ['text', 'textarea', 'select', 'markdown'].includes(editComp.type)
        "
        label="占位提示"
        prop="placeholder"
      >
        <el-input
          v-model="editComp.placeholder"
          placeholder="占位提示"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="['select', 'checkbox', 'radio'].includes(editComp.type)"
        label="选项"
      >
        <div>
          <el-row v-for="(option, i) in editComp.options" :key="i">
            <el-col :span="10">
              <el-input
                v-model="option.label"
                size="small"
                placeholder="label"
                style="width: 95%;"
              ></el-input>
            </el-col>
            <el-col :span="10">
              <el-input
                v-model="option.value"
                size="small"
                placeholder="value"
                style="width: 95%;"
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-button
                type="primary"
                size="small"
                @click="removeOption(i)"
                icon="el-icon-delete"
              >
              </el-button>
            </el-col>
          </el-row>
          <el-button
            type="primary"
            size="small"
            @click="addOption"
            style="width: 100%;"
          >
            新增选项
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="是否禁用" v-if="editComp.type !== 'form'">
        <el-switch v-model="editComp.disabled"></el-switch>
      </el-form-item>
      <el-form-item label="是否必填">
        <el-switch v-model="isRequired"></el-switch>
      </el-form-item>
    </el-form>
    <div class="schema-edit-footer">
      <el-button
        @click="copy"
        type="primary"
        size="small"
        style="margin-top: 10px; width: 100%;"
      >
        复制该组件 Schema
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "schema-edit",
  props: {
    editComp: Object,
    empty: Boolean
  },
  data() {
    // const { type } = this.editComp;
    return {
      rules: {
        label: [
          {
            type: "string",
            required: true,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
        key: [
          {
            type: "string",
            required: true,
            message: "字段名不能为空",
            trigger: "blur"
          }
        ]
      },
      isRequired: false
    };
  },
  computed: {
    model: {
      get() {
        const { type, value } = this.editComp;
        if (type === "checkbox") {
          return value.join(",");
        } else return value;
      },
      set(val) {
        const { type } = this.editComp;
        if (type === "checkbox") {
          this.editComp.value = val.split(",");
        } else return (this.editComp.value = val);
      }
    }
  },
  watch: {
    isRequired(val) {
      let { rules = [] } = this.editComp;
      rules = rules.filter(r => !r.required);
      if (val) {
        rules.push({ required: true });
      }
      this.editComp.rules = rules;
    }
  },
  methods: {
    copy() {
      console.log(this.editComp);
    },
    addOption() {
      this.editComp.options.push({
        label: "label",
        value: ""
      });
    },
    removeOption(index) {
      this.editComp.options.splice(index, 1);
    }
  }
};
</script>

<style lang="scss">
.schema-edit {
  &-footer {
    border-top: 1px solid #eee;
  }
}
</style>
