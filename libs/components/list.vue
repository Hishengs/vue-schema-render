<template>
  <div class="vsr_component_list">
    <div v-if="components.length" :style="scrollAreaStyle" ref="listContainer">
      <draggable v-model="components" handle=".draggable-handle">
        <transition-group>
          <!-- 一个列表项一个表单（方便验证） -->
          <el-form
            v-for="(comp, i) in components"
            label-width="0px"
            :id="comp._uid"
            :key="comp._uid"
          >
            <el-form-item label="">
              <el-card>
                <div slot="header" class="header draggable-handle">
                  <span class="title">
                    {{ `# ${i + 1}` }}
                    {{ comp.title ? comp.title : "" }}
                  </span>
                  <div class="actions">
                    <el-button
                      class="el-icon-arrow-up"
                      size="small"
                      @click="up(i)"
                      :disabled="i === 0"
                    ></el-button>
                    <el-button
                      class="el-icon-arrow-down"
                      size="small"
                      @click="down(i)"
                      :disabled="i === components.length - 1"
                    ></el-button>
                    <el-button
                      class="el-icon-delete"
                      size="small"
                      type="danger"
                      @click="remove(i)"
                    ></el-button>
                  </div>
                </div>
                <vsr-dispatcher
                  :ref="comp._uid"
                  :component="comp"
                  @change="onChange"
                >
                </vsr-dispatcher>
              </el-card>
            </el-form-item>
          </el-form>
        </transition-group>
      </draggable>
    </div>
    <el-button
      type="primary"
      @click="add()"
      class="add-btn el-icon-plus"
    ></el-button>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import baseMixin from "./base.mixin.js";
import { COMP_PREFIX, initComponent, isBasicComponent, getUID } from "../utils.ts";

export default {
  name: `${COMP_PREFIX}-list`,
  mixins: [baseMixin],
  components: {
    [`${COMP_PREFIX}-dispatcher`]: () => import('./dispatcher.vue'),
    draggable
  },
  data() {
    return {
      components: []
    };
  },
  computed: {
    scrollAreaStyle () {
      return this.component.maxHeight ? {
        maxHeight: this.component.maxHeight,
        overflowY: 'auto',
      } : {};
    }
  },
  watch: {
    async components(newVal, oldVal) {
      // Do not sync data at once
      setTimeout(async () => {
        await this.syncData();
      }, 0);
    }
  },
  created() {
    // init data
    this.initData();
  },
  methods: {
    getNewComponent() {
      const comp = this.component.component();
      initComponent(comp);
      return comp;
    },
    initData() {
      const { value, _refValue } = this.component;
      if (!value) return;
      for (const [index, val] of Object.entries(value)) {
        const comp = this.getNewComponent();
        comp.value = val;
        if (_refValue) {
          comp._refValue = _refValue[index];
        }
        this.add(comp);
      }
    },
    add(comp) {
      const component = comp || this.getNewComponent();
      this.components.push(component);
      // 自动滑到底部
      this.$nextTick(() => {
        this.$refs.listContainer && this.$refs.listContainer.scrollTo({
          top: this.$refs.listContainer.scrollHeight,
          behavior: 'smooth'
        });
      });
    },
    remove(index) {
      this.components.splice(index, 1);
    },
    move(index, offset) {
      const item = this.components[index];
      const other = this.components[index + offset];
      this.components[index] = other;
      this.components[index + offset] = item;
      // fix array change problem of Vue
      // this.$forceUpdate();
      this.components = this.components.slice(0);
    },
    up(index) {
      this.move(index, -1);
    },
    down(index) {
      this.move(index, +1);
    },
    // gen data from ui components
    async syncData() {
      const data = await this.genData();
      this.component.value = data;
      return data;
    },
    async genData() {
      const data = [];
      // fix: bug 1009692
      // should keep the order when list item swap
      const refComponents = this.components
        .map(comp => {
          const [refComp] = this.$refs[comp._uid];
          return refComp;
        })
        .filter(ref => ref !== undefined);

      for (const refComp of refComponents) {
        const compData = await refComp.genData();
        data.push(compData);
      }

      return data;
    },
    async validate () {
      let hasError = false;
      if (this.components.length) {
        const { key, rules = [] } = this.components[0];
        if (rules.length) {
          for (const comp of this.components) {
            const [refComp] = this.$refs[comp._uid];
            const valid = await refComp.validate();
            if (!valid) {
              hasError = true;
            }
          }
        }
      }
      return !hasError;
    }
  }
};
</script>

<style lang="scss">
.vsr_component_list {
  /* box-shadow: 0 5px 10px rgba(0,0,0,.1);
  padding: 10px; */
  .el-form {
    .el-form-item:last-child {
      margin-bottom: 0;
    }
  }
  .el-card {
    box-shadow: none;
    margin: 10px 0;
    .el-card__header {
      padding: 12px 16px;
      background-color: #eff2f7;
    }
    .draggable-handle {
      cursor: move;
	    // cursor: -webkit-grabbing;
    }
    .header {
      position: relative;
      .title {
        font-weight: bold;
        font-size: 18px;
      }
      .actions {
        position: absolute;
        right: 10px;
        top: 0;
        z-index: 99;
        .el-button {
          margin-left: 5px;
        }
      }
    }
  }
  .add-btn {
    margin: 0 auto;
    width: 100px;
  }
}
</style>
