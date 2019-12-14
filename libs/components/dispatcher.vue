<template>
  <div class="vsr-dispatcher">
    <!-- form -->
    <vsr-form
      v-if="component.type === 'form'"
      :component="component"
      @change="onChange"
    ></vsr-form>
    <!-- list -->
    <vsr-list
      v-else-if="component.type === 'list'"
      :component="component"
      @change="onChange"
    ></vsr-list>
    <!-- custom -->
    <vsr-custom
      v-else-if="component.type === 'custom'"
      :component="component"
      @change="onChange"
    ></vsr-custom>
    <!-- row -->
    <vsr-row
      v-else-if="component.type === 'row'"
      :component="component"
      @change="onChange"
    ></vsr-row>
    <!-- basic components -->
    <vsr-basic
      v-else-if="isBasicComponent(component)"
      :component="component"
      @change="onChange"
    ></vsr-basic>
  </div>
</template>

<script>
import row from "./row.vue";
import basic from "./basic.vue";
import list from "./list.vue";
import form from "./form.vue";
import custom from "./custom.vue";
import baseMixin from "./base.mixin.js";
import { COMP_PREFIX, isBasicComponent } from "../utils.ts";

export default {
  name: `${COMP_PREFIX}-dispatcher`,
  components: {
    [row.name]: row,
    [basic.name]: basic,
    [list.name]: list,
    [form.name]: form,
    [custom.name]: custom,
  },
  mixins: [baseMixin],
  methods: {
    isBasicComponent,
  }
};
</script>