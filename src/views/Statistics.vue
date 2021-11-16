
<template>
  <div>
    <Layout>
      <Types classPrefix="xxx" :type.sync="yyy" />
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Types from "@/components/money/Types.vue";
import { Component } from "vue-property-decorator";

@Component({
  components: { Types },
})
export default class Statistics extends Vue {
  yyy = "-";
}
</script>

<style lang="scss" scoped>
::v-deep .xxx-item {
  background-color: #fff;
  &.selected {
    background-color: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
</style>