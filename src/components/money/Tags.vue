<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag"><Icon name="tianjia" />新建标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
        @click="toggle(tag)"
      >
        <Icon name="taobao" v-if="tag.id === '1'" />
        <Icon name="tongxun" v-else-if="tag.id === '2'" />
        <Icon name="canyin" v-else-if="tag.id === '3'" />
        <Icon name="bus" v-else-if="tag.id === '4'" />
        <Icon name="gouwu" v-else-if="tag.id === '5'" />
        <Icon name="shucai" v-else-if="tag.id === '6'" />
        <Icon name="shuiguo" v-else-if="tag.id === '7'" />
        <Icon name="yule" v-else-if="tag.id === '8'" />
        <Icon name="tianjia" v-else />
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang = "ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import TagHelper from "@/mixins/TagHelper";
@Component
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];
  get tagList() {
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit("fetchTags");
  }
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags);
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