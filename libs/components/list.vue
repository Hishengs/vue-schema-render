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
                    {{ comp.label ? comp.label : "" }}
                  </span>
                  <div class="actions">
                    <el-button
                      class="el-icon-arrow-up"
                      size="mini"
                      @click="up(i)"
                      :disabled="i === 0"
                    ></el-button>
                    <el-button
                      class="el-icon-arrow-down"
                      size="mini"
                      @click="down(i)"
                      :disabled="i === components.length - 1"
                    ></el-button>
                    <el-button
                      class="el-icon-delete"
                      size="mini"
                      type="danger"
                      @click="remove(i)"
                    ></el-button>
                    <el-button
                      :class="comp.expanded ? 'el-icon-plus' : 'el-icon-minus'"
                      size="mini"
                      @click="comp.expanded = !comp.expanded"
                    ></el-button>
                  </div>
                </div>
                <vsr-dispatcher
                  v-show="comp.expanded"
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
      size="small"
    >
      新增列表项
    </el-button>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import AsyncValidator from 'async-validator';
import _cloneDeep from 'lodash/cloneDeep';
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
      components: [],
    };
  },
  computed: {
    scrollAreaStyle () {
      return this.component.maxHeight ? {
        maxHeight: this.component.maxHeight,
        overflowY: 'auto',
        paddingRight: '12px'
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
    getNewComponent(fromUser = false) {
      let comp;
      if (typeof this.component.component === 'function') {
        comp = this.component.component();
      } else comp = _cloneDeep(this.component.component);
      initComponent(comp, this.component);
      comp.expanded = true;
      if (fromUser) {
        this.scrollToComp(comp);
      }
      return comp;
    },
    initData() {
      const { value, refValue } = this.component;
      if (!value) return;
      for (const [index, val] of Object.entries(value)) {
        const comp = this.getNewComponent();
        comp.value = val;
        if (refValue) {
          comp.refValue = refValue[index];
        }
        this.add(comp);
      }
    },
    add(comp) {
      const component = comp || this.getNewComponent(true);
      this.components.push(component);
    },
    scrollToComp (comp) {
      setTimeout(() => {
        const el = document.querySelector(`#${comp._uid}`);
        el && el.scrollIntoView({
          behavior: 'smooth'
        });
      }, 50);
    },
    remove(index) {
      const confirm = window.confirm('Are you sure to delete this item ?');
      if (!confirm) return;
      this.components.splice(index, 1);
      // manually trigger @change
      this.onChange();
    },
    move(index, offset) {
      const item = this.components[index];
      const other = this.components[index + offset];
      this.components[index] = other;
      this.components[index + offset] = item;
      // fix array change problem of Vue
      // this.$forceUpdate();
      this.components = this.components.slice(0);
      // manually trigger @change
      this.onChange();
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
      let errs = [];
      let flds = [];

      // 先验证列表项
      if (this.components.length) {
        const [subComponent] = this.components;
        const { key, rules = [] } = subComponent;
        if (rules.length || !isBasicComponent(subComponent)) {
          for (const comp of this.components) {
            const [refComp] = this.$refs[comp._uid];
            await refComp.validate()
              .catch(({ errors, fields }) => {
                errs = [...errs, ...errors];
                flds.push(fields);
              });
          }
        }
      }
      // 列表项没问题再验证列表组件本身
      if (!errs.length) {
        const { key, value, rules = [] } = this.component;
        if (rules.length) {
          const validator = new AsyncValidator({
            [key]: rules
          });
          await validator.validate({
            [key]: value
          }).catch(({ errors, fields }) => {
            errs = [...errs, ...errors];
            flds = fields;
          });
        }
      }

      return errs.length ? Promise.reject({
        errors: errs,
        fields: flds
      }) : Promise.resolve();
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
      padding: 8px 15px;
      background-color: #eff2f7;
    }
    .el-card__body {
      padding: 10px 15px;
    }
    .draggable-handle {
      cursor: move;
	    // cursor: -webkit-grabbing;
    }
    .header {
      position: relative;
      .title {
        font-weight: bold;
        font-size: 16px;
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
