<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Notes
      @update:value="onUpdateNotes"
      fieldName="备注"
      placeholder="请输入备注"
    />
    <Tags />
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
  </Layout>
</template>

<script lang = "ts">
import Vue from "vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Notes from "@/components/money/Notes.vue";
import Tags from "@/components/money/Tags.vue";
import { Component } from "vue-property-decorator";
import recordTypeList from "@/countants/recordTypeList";
import Tabs from "@/components/money/Tabs.vue";

@Component({
  components: { NumberPad, Tabs, Tags, Notes },
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  recordTypeList = recordTypeList;
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record);
  }
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