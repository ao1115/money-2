<template>
  <Layout>
    <Tabs
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="type"
    />
    <div class="chart-text">
      <span>统计</span>
      <Icon name="slidedown" />
    </div>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart :options="chartOptions" class="chart" />
    </div>
    <div class="details">
      <span>明细</span>
      <Icon name="slidedown" />
    </div>
    <ol v-if="groupedList.length > 0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          {{ beautify(group.title) }} <span>￥{{ group.total }}</span>
        </h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }} </span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">目前没有相关记录</div>
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/money/Tabs.vue";
import recordTypeList from "@/countants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import Chart from "../components/Chart.vue";
const _ = require("lodash");
@Component({
  components: { Tabs, Chart },
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.map((t) => t.name).join("，");
  }
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }
  //将图标滚动到最右边
  mounted() {
    const div = this.$refs.chartWrapper as HTMLDivElement;
    //不要写死9999，等于它的最大宽度
    div.scrollLeft = div.scrollWidth;
  }
  //构造30天的数据，借鉴计数排序
  get keyValueList() {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 29; i++) {
      const dateString = dayjs(today).subtract(i, "day").format("YYYY-MM-DD");
      console.log(dateString);
      const found = _.find(this.groupedList, {
        title: dateString,
      });
      console.log(found);
      array.push({
        date: dateString,
        value: found?.total || 0,
      });
      array.sort((a, b) => {
        if (a.date > b.date) {
          return 1;
        } else if (a.date === b.date) {
          return 0;
        } else {
          return -1;
        }
      });
    }
    console.log(array);

    return array;
  }
  get chartOptions() {
    const keys = this.keyValueList.map((item) => item.date);
    const values = this.keyValueList.map((item) => item.value);
    return {
      //将默认的左右两边空白去掉
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {
        type: "category",
        data: keys,
        axisTick: { alignWithLabel: true },
        axisLine: { lineStyle: { color: "#666" } },
        axisLabel: {
          formatter: function (value: string, index: number) {
            return value.substr(5);
          },
        },
      },
      yAxis: {
        type: "value",
        show: false,
      },
      series: [
        {
          symbol: "circle",
          symbolSize: 12,
          itemStyle: {
            borderWidth: 1,
            color: "#999",
            borderColor: "#999",
          },
          data: values,
          type: "line",
        },
      ],
      tooltip: {
        show: true,
        triggerOn: "click",
        position: "top",
        formatter: "{c}",
      },
    };
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get groupedList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList)
      .filter((r) => r.type === this.type)
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    if (newList.length === 0) {
      return [];
    }
    // if ((newList.length = 0)) {
    //   return [] as Result;
    // }
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    result.map((group) => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return result;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
  type = "-";
  recordTypeList = recordTypeList;
}
</script>

<style scoped lang="scss">
::v-deep {
  .type-tabs-item {
    background: #f5f5f5;
    height: 48px;
    font-size: 16px;
    &.selected {
      color: rgb(244, 220, 96);
      &.selected::after {
        content: "";
        position: absolute;
        bottom: 9px;
        width: 40%;
        height: 2px;
        background: rgb(244, 220, 96);
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
.chart {
  //占五屏
  width: 420%;
  height: 240px;
  &-wrapper {
    // 在外面设置滚动
    overflow: auto;
    &::-webkit-scrollbar {
      //取消滚动条
      display: none;
    }
  }
}
.noResult {
  padding: 16px;
  text-align: center;
}
.chart-text {
  background-color: rgb(248, 235, 170);
  height: 24px;
  margin-top: 8px;
  > span {
    margin-left: 10px;
  }
}
.details {
  background-color: rgb(248, 235, 170);
  height: 24px;
  margin-bottom: 8px;
  > span {
    margin-left: 10px;
  }
}
</style>