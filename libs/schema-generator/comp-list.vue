<template>
  <draggable
    class="comp-list"
    :list="components"
    :group="{ name: 'type', pull: 'clone', put: false }"
    :clone="onClone"
  >
    <div class="comp" v-for="(comp, i) in components" :key="i">
      {{ comp.name }}
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable
  },
  data() {
    return {
      components: [
        {
          name: "文本输入框",
          type: "text"
        },
        {
          name: "多行文本输入框",
          type: "textarea"
        },
        {
          name: "下拉选择",
          type: "select"
        },
        {
          name: "多选",
          type: "checkbox"
        },
        {
          name: "单选",
          type: "radio"
        },
        {
          name: "开关",
          type: "switch"
        },
        {
          name: "上传",
          type: "upload"
        },
        {
          name: "markdown 编辑器",
          type: "markdown"
        },
        {
          name: "表单",
          type: "form"
        },
        {
          name: "列表",
          type: "list"
        },
        {
          name: "自定义组件",
          type: "custom"
        }
      ]
    };
  },
  methods: {
    onClone(comp) {
      const { type, name } = comp;
      const compDefine = {
        label: name,
        type,
        key: "",
        value: null,
        disabled: false
      };
      if (["text", "textarea"].includes(type)) {
        compDefine.placeholder = "";
        compDefine.value = "";
      } else if (["select", "checkbox", "radio"].includes(type)) {
        compDefine.options = [];
        if (type === "checkbox") {
          compDefine.value = [];
        } else compDefine.value = "";
      } else if (type === "form") {
        compDefine.components = [];
        compDefine.value = {};
      } else if (type === "list") {
        compDefine.value = [];
      }
      return compDefine;
    }
  }
};
</script>

<style lang="scss">
.comp-list {
  .comp {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    border-radius: 4px;
    border: 1px solid #eee;
    margin-bottom: 10px;
    background-color: white;
    font-size: 20px;
    &:hover {
      cursor: move;
    }
  }
}
</style>
