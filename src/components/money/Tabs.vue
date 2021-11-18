<template>
  <ul class="tabs" :class="{ [classPrefix + '-tabs']: classPrefix }">
    <li
      v-for="item in dataSource"
      :key="item.value"
      class="tabs-item"
      :class="liClass(item)"
      @click="select(item)"
    >
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
type DataSourceItem = { text: string; value: string };
@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array })
  dataSource!: DataSourceItem[];
  @Prop(String)
  readonly value!: string;
  @Prop(String)
  classPrefix?: string;
  @Prop({ type: String, default: "64px" })
  height!: string;
  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + "-tabs-item"]: this.classPrefix,
      selected: item.value === this.value,
    };
  }
  select(item: DataSourceItem) {
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  // background: rgb(244, 220, 96);
  display: flex;
  text-align: center;
  height: 42px;
  font-size: 16px;
  &-item {
    width: 50%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected {
      color: rgb(244, 220, 96);
    }
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 9px;
      width: 40%;
      height: 2px;
      background: rgb(244, 220, 96);
    }
  }
}
</style>