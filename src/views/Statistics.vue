<template>
  <Layout>
    <Tabs
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="type"
    />
    <Tabs
      class-prefix="interval"
      :data-source="intervalList"
      :value.sync="interval"
    />
    <div>
      <ol>
        <li v-for="(group, index) in result" :key="index">
          <h3>{{ group.title }}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id">
              {{ item.amount }} {{ item.createAt }}
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </Layout>
</template>



<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/money/Tabs.vue";
import recordTypeList from "@/countants/recordTypeList";
import intervalList from "@/countants/intervalList";
@Component({
  components: { Tabs },
  computed: {},
})
export default class Statistics extends Vue {
  get recordList() {
    //必须声明类型，不然$store的类型是any
    return (this.$store.state as RootState).recordList;
  }
  get result() {
    const { recordList } = this;
    type HashTableValue = { title: string; items: RecordItem[] };
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [data, name] = recordList[i].createdAt!.split("T");
      hashTable[data] = hashTable[data] || { title: data, items: [] };
      hashTable[data].items.push(recordList[i]);
    }
    return hashTable;
  }

  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
}
</script>

<style scoped lang="scss">
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
::v-deep .interval-tabs-item {
  height: 48px;
}
</style>