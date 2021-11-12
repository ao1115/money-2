
<template>
  <Layout>
    <Icon name="left" />
    <Notes fieldName="备注" placeholder="请输入备注" />
    <div class="createTag-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>
<script lang="ts">
import tagListModel from "@/models/tagListModel";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Notes from "@/components/money/Notes.vue";
import Button from "@/components/Button.vue";
//初始化数据
@Component({ components: { Notes, Button } })
export default class Labels extends Vue {
  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace("/404");
    }
  }
}
</script>

<style lang="scss" scoped>
</style>