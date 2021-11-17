
<template>
  <Layout>
    <div class="tags">
      <router-link
        class="tag"
        v-for="tag in tags"
        :key="tag.id"
        :to="`/labels/edit/${tag.id}`"
      >
        <div class="tagname">
          <Icon name="taobao" v-if="tag.id === '1'" />
          <Icon name="tongxun" v-else-if="tag.id === '2'" />
          <Icon name="canyin" v-else-if="tag.id === '3'" />
          <Icon name="bus" v-else-if="tag.id === '4'" />
          <Icon name="gouwu" v-else-if="tag.id === '5'" />
          <Icon name="shucai" v-else-if="tag.id === '6'" />
          <Icon name="shuiguo" v-else-if="tag.id === '7'" />
          <Icon name="yule" v-else-if="tag.id === '8'" />
          <Icon name="tianjia" v-else />
          <span>{{ tag.name }}</span>
        </div>

        <Icon name="right" />
      </router-link>
    </div>

    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import { mixins } from "vue-class-component";
import TagHelper from "@/mixins/TagHelper";
import Tags from "@/components/money/Tags.vue";
import Money from "./Money.vue";
//初始化数据

@Component({ components: { Button } })
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }
  beforeCreate() {
    this.$store.commit("fetchTags");
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    > .tagname {
      > svg {
        width: 24px;
        height: 24px;
        vertical-align: -6px;
      }
      > span {
        margin-left: 5px;
      }
    }
    > svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>
