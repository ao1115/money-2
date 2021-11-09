<template>
  <Layout class-prefix="layout">
    <NumberPad />
    <Notes />
    <Tags :data-source.sync="tags" />
    <Types />
  </Layout>
</template>

<script>
import NumberPad from "@/components/money/NumberPad.vue";
import Types from "@/components/money/Types.vue";
import Notes from "@/components/money/Notes.vue";
import Tags from "@/components/money/Tags.vue";
export default {
  name: "Money",
  components: { NumberPad, Types, Tags, Notes },
  data() {
    return {
      tags: ["衣", "食", "住", "行"],
    };
  },
};
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