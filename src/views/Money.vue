<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Notes
      @update:value="onUpdateNotes"
      fieldName="备注"
      placeholder="请输入备注"
    />
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    <Types :type.sync="record.type" />
  </Layout>
</template>

<script lang = "ts">
import Vue from "vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Types from "@/components/money/Types.vue";
import Notes from "@/components/money/Notes.vue";
import Tags from "@/components/money/Tags.vue";
import recordListModel from "@/models/recordListModel";
import { Component, Watch } from "vue-property-decorator";
import store from "@/store/index2";

@Component({ components: { NumberPad, Types, Tags, Notes } })
export default class Money extends Vue {
  tags = store.tagList;
  recordList = store.recordList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  saveRecord() {
    store.createRecord(this.record);
  }
  //当recordList变化时，将值传到localStorage
  // @Watch("recordList")
  // onRecordListChanged() {
  //   recordListModel.save();
  // }
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