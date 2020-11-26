<template>
  <draggable
    class="comp-list"
    :list="components"
    :group="{ name: 'type', pull: 'clone', put: false }"
    :clone="onClone"
  >
    <div
      class="comp"
      v-for="(comp, i) in components"
      :key="i"
      @click="addComp(comp)"
    >
      {{ comp.name }}
    </div>
  </draggable>
</template>

<script>
import { nanoid } from "nanoid";
import draggable from "vuedraggable";

export default {
  props: {
    schema: Object,
    activeComp: Object
  },
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
      let compDefine = {
        label: name,
        labelTooltip: "",
        type,
        key: nanoid(8),
        value: null
      };
      if (["text", "textarea", "markdown"].includes(type)) {
        compDefine = {
          ...compDefine,
          ...this.getTextLike(type)
        };
      } else if (type === "switch") {
        compDefine.value = false;
        compDefine.disabled = false;
      } else if (["select", "checkbox", "radio"].includes(type)) {
        compDefine = {
          ...compDefine,
          ...this.getOptionLike(type)
        };
        if (type === "select") {
          compDefine.placeholder = "";
        }
      } else if (["upload"].includes(type)) {
        compDefine.value = "";
        compDefine.disabled = false;
      } else if (type === "form") {
        compDefine.components = [];
        compDefine.value = {};
      } else if (type === "list") {
        compDefine.value = [];
      }
      return compDefine;
    },
    getTextLike(type) {
      let comp = {
        value: "",
        placeholder: "",
        disabled: false
      };
      if (type !== "markdown") {
        comp = {
          ...comp,
          minlength: undefined,
          maxlength: undefined
        };
      }
      if (type === "textarea") {
        comp = {
          ...comp,
          minRows: 1,
          maxRows: 5
        };
      } else if (type === "text") {
        comp = {
          ...comp,
          prefixText: "",
          appendText: ""
        };
      }
      return comp;
    },
    getOptionLike(type) {
      const comp = {
        options: [],
        disabled: false
      };
      if (type === "checkbox") {
        comp.value = [];
      } else comp.value = "";
      return comp;
    },
    addComp(comp) {
      const newComp = this.onClone(comp);
      if (this.activeComp && this.activeComp.components) {
        this.activeComp.components.push(newComp);
      } else this.schema.components.push(newComp);
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
    height: 70px;
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
