<template>
  <div class="vsr_component_list">
    <div v-if="list.length" :style="scrollAreaStyle" ref="listContainer">
      <draggable v-model="list" handle=".draggable-handle">
        <transition-group>
          <!-- 一个列表项一个表单（方便验证） -->
          <el-form
            v-for="(item, i) in list"
            ref="listItemForm"
            :model="item.formProxy"
            :rules="formRules"
            label-width="0px"
            :id="item.uid"
            :key="item.uid"
          >
            <el-form-item label="" prop="listItem">
              <el-card>
                <div slot="header" class="header draggable-handle">
                  <span class="title">
                    {{ `# ${i + 1}` }}
                    {{ item.component.title ? item.component.title : "" }}
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
                      :disabled="i === list.length - 1"
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
                  :ref="item.uid"
                  :component="item.component"
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
import _cloneDeep from 'lodash/cloneDeep';
import _merge from 'lodash/merge';
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
      list: []
    };
  },
  computed: {
    formRules() {
      return {
        listItem: this.component.component.rules || []
      };
    },
    scrollAreaStyle () {
      return this.component.maxHeight ? {
        maxHeight: this.component.maxHeight,
        overflowY: 'auto',
      } : {};
    }
  },
  watch: {
    async list(newVal, oldVal) {
      // console.info("list watch list", newVal, oldVal);
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
      const comp = _cloneDeep(this.component.component);
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
      this.list.push({
        formProxy: Object.freeze(
          new Proxy(
            {},
            {
              get(target, key, receiver) {
                if (key === "listItem") return component.value;
                else return undefined;
              }
            }
          )
        ),
        component,
        // gen a uid for list item
        uid: getUID()
      });
      this.$nextTick(() => {
        this.$refs.listContainer && this.$refs.listContainer.scrollTo({
          top: this.$refs.listContainer.scrollHeight,
          behavior: 'smooth'
        });
      });
    },
    remove(index) {
      this.list.splice(index, 1);
    },
    move(index, offset) {
      const item = this.list[index];
      const other = this.list[index + offset];
      this.list[index] = other;
      this.list[index + offset] = item;
      // fix array change problem of Vue
      // this.$forceUpdate();
      this.list = this.list.slice(0);
    },
    up(index) {
      this.move(index, -1);
    },
    down(index) {
      this.move(index, +1);
    },
    // gen data from ui components
    async syncData() {
      const [data, lanData] = await this.genData();
      const value = _merge(data, lanData);
      this.component.value = value;
      return value;
    },
    async genData() {
      const data = [];
      // fix: bug 1009692
      // should keep the order when list item swap
      const refComponents = this.list
        .map(item => {
          const itemComps = this.$refs[item.uid];
          return itemComps
            ? Array.isArray(itemComps)
              ? itemComps[0]
              : itemComps
            : undefined;
        })
        .filter(ref => ref !== undefined);

      for (const refComp of refComponents) {
        const compData = await refComp.genData();
        data.push(compData);
      }

      return data;
    },
    validateForm(form) {
      return new Promise((resolve, reject) => {
        try {
          form.validate(valid => {
            resolve(valid);
          });
        } catch (err) {
          reject(err);
        }
      });
    },
    async validate() {
      let _valid = true;
      const refComponents = this.$refs.component || [];
      const { component } = this.component;
      if (!isBasicComponent(component)) {
        for (const comp of refComponents) {
          const isValid = await comp.validate(false);
          if (!isValid) {
            _valid = false;
            break;
          }
        }
      } else {
        // 基础组件验证
        const forms = this.$refs.listItemForm || [];
        for (const form of forms) {
          _valid = await this.validateForm(form);
          if (!_valid) break;
        }
      }
      return _valid;
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
