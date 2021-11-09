import { default } from '../../views/Money.vue';
<template>
  <div class="tags">
    <div class="new">
      <button>新增按钮</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in dataSource"
        :key="tag"
        @click="select(tag)"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
      >
        <!-- selected: selectedTags.indexOf(tag)>=0判断选中状态，如果有tag就是selected -->
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script lang = "ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  //从外部获取数据，用v-for遍历数组
  text = "111";
  @Prop() dataSource: string[] | undefined;
  selectedTags: string[] = [];
  select(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }
}
</script>


<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      background: #d9d9d9;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: $color-highlight;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>