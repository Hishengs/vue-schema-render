<template>
  <div class="vsr_component_list">
    <div v-if="items.length" :style="scrollAreaStyle" ref="listContainer">
      <draggable v-model="items" handle=".draggable-handle">
        <transition-group>
          <!-- 一个列表项一个表单（方便验证） -->
          <el-form
            v-for="(comp, i) in items"
            label-width="0px"
            :id="comp._vsr_uid"
            :key="comp._vsr_uid"
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
                      class="el-icon-top"
                      size="mini"
                      :disabled="i === 0 || isDisabled"
                      @click="up(i)"
                    ></el-button>
                    <el-button
                      class="el-icon-bottom"
                      size="mini"
                      :disabled="i === items.length - 1 || isDisabled"
                      @click="down(i)"
                    ></el-button>
                    <el-button
                      class="el-icon-delete"
                      size="mini"
                      type="danger"
                      :disabled="isDisabled"
                      @click="remove(i)"
                    ></el-button>
                    <el-button
                      :class="comp.collapsed ? 'el-icon-arrow-right' : 'el-icon-arrow-down'"
                      size="mini"
                      @click="comp.collapsed = !comp.collapsed"
                    ></el-button>
                  </div>
                </div>
                <vsr-dispatcher
                  v-show="!comp.collapsed"
                  :ref="comp._vsr_uid"
                  :component="comp"
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
      size="small"
      :disabled="isDisabled || !addable"
      @click="add()"
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
import { COMP_PREFIX, initComponent, isBasicComponent, getUID, setComponentVM } from "../utils.ts";

export default {
  name: `${COMP_PREFIX}-list`,
  mixins: [baseMixin],
  components: {
    [`${COMP_PREFIX}-dispatcher`]: () => import('./dispatcher.vue'),
    draggable
  },
  data() {
    return {
      items: [],
    };
  },
  computed: {
    scrollAreaStyle () {
      return this.component.maxHeight ? {
        maxHeight: this.component.maxHeight,
        overflowY: 'auto',
        paddingRight: '12px'
      } : {};
    },
    addable () {
      const { max = Infinity } = this.component;
      return this.items.length < max;
    },
    cRules () {
      const { rules = [], min, max } = this.component;
      const rs = [...rules];
      if (min) {
        rs.push({
          type: 'array',
          // range: { min },
          validator (rules, value) {
            return Array.isArray(value) && value.length >= min;
          },
          message: `至少添加${min}个列表项`
        });
      }
      if (max) {
        rs.push({
          type: 'array',
          // range: { max },
          validator (rules, value) {
            return Array.isArray(value) && value.length <= max;
          },
          message: `最多添加${max}个列表项`
        });
      }
      return rs;
    }
  },
  watch: {
    async items(newVal, oldVal) {
      // Do not sync data at once
      setTimeout(async () => {
        await this.syncData();
      }, 0);
    }
  },
  created() {
    setComponentVM(this.component, this);
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
      if (comp.collapsed === undefined) {
        comp.collapsed = false;
      }
      if (fromUser) {
        this.scrollToComp(comp);
      }
      return comp;
    },
    initData() {
      const { value } = this.component;
      if (!value) return;
      for (const [index, val] of Object.entries(value)) {
        const comp = this.getNewComponent();
        comp.value = val;
        this.add(comp);
      }
    },
    add(comp) {
      const component = comp || this.getNewComponent(true);
      this.items.push(component);
    },
    scrollToComp (comp) {
      setTimeout(() => {
        const el = document.querySelector(`#${comp._vsr_uid}`);
        el && el.scrollIntoView({
          behavior: 'smooth'
        });
      }, 50);
    },
    remove(index) {
      const confirm = window.confirm('Are you sure to delete this item ?');
      if (!confirm) return;
      this.items.splice(index, 1);
      // manually trigger @change
      this.onChange();
    },
    move(index, offset) {
      const item = this.items[index];
      const other = this.items[index + offset];
      this.items[index] = other;
      this.items[index + offset] = item;
      // fix array change problem of Vue
      // this.$forceUpdate();
      this.items = this.items.slice(0);
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
      const refComponents = this.items
        .map(comp => {
          const [refComp] = this.$refs[comp._vsr_uid];
          return refComp;
        })
        .filter(ref => ref !== undefined);

      for (const refComp of refComponents) {
        const compData = await refComp.genData();
        data.push(compData);
      }

      this.component.value = data;

      return data;
    },
    async validate () {
      let errs = [];
      let flds = [];

      // 先验证列表项
      if (this.items.length) {
        const [subComponent] = this.items;
        const { key, rules = [] } = subComponent;
        if (rules.length || !isBasicComponent(subComponent)) {
          for (const comp of this.items) {
            const [refComp] = this.$refs[comp._vsr_uid];
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
        const { key, value } = this.component;
        if (this.cRules.length) {
          const validator = new AsyncValidator({
            [key]: this.cRules
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
