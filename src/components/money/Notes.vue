<template>
  <div>
    <label for="" class="notes">
      <span class="name">{{ this.fieldName }}</span>
      <template v-if="type === 'date'">
        <input
          :type="type || 'text'"
          :value="x(value)"
          @input="onValueChanged($event.target.value)"
          :placeholder="this.placeholder"
        />
      </template>
      <template v-else>
        <input
          :type="type || 'text'"
          :value="value"
          @input="onValueChanged($event.target.value)"
          :placeholder="this.placeholder"
        />
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  //用Watch来监听value的变化，语法如下，第一个参数是新的值，第二个参数是旧值，当变化时触发update:value
  @Watch("value")
  onValueChanged(value: string, oldvalue: string) {
    this.$emit("update:value", value);
  }
  @Prop({ required: true }) fieldName!: string; //required:true表示这是必填项
  @Prop() placeholder?: string; //？表示可以不存在
  @Prop() type?: string;
  x(isoString: string) {
    return dayjs(isoString).format("YYYY-MM-DD");
  }
}
</script>

<style lang="scss" scoped>
.notes {
  display: block;
  font-size: 14px;
  padding-left: 16px;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
</style>