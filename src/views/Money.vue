<template>
  <Layout class-prefix="layout">
    <NumberPad />
    <Notes />
    <Tags :data-source.sync="tags" />
    <Types />
  </Layout>
</template>

<script lang = "ts">
import Vue from "vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Types from "@/components/money/Types.vue";
import Notes from "@/components/money/Notes.vue";
import Tags from "@/components/money/Tags.vue";
import { Component } from "vue-property-decorator";

@Component({ components: { NumberPad, Types, Tags, Notes } })
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
}
</script>
<style lang = "scss">
/* 写前缀的class名 */
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";
</style>