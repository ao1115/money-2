<template>
  <Layout class-prefix="layout">
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
    <Tags @update:value="record.tags = $event" />
    <Notes
      :value.sync="record.notes"
      fieldName="备注"
      placeholder="请输入备注"
    />
    <Notes
      fieldName="日期"
      placeholder="请输入备注"
      type="date"
      :value.sync="record.createdAt"
    />
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
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
    createdAt: new Date().toISOString(),
  };
  recordTypeList = recordTypeList;
  created() {
    this.$store.commit("fetchRecords");
  }
  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert("请至少选择一个标签");
    }
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert("已保存");
      this.record.notes = "";
    }
  }
}
</script>
<style lang = "scss">
/* 写前缀的class名 */
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";
</style>