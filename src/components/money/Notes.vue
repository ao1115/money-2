<template>
  <div>
    {{ value }}
    <label for="" class="notes">
      <span class="name">{{ this.fieldName }}</span>
      <input type="text" v-model="value" :placeholder="this.placeholder" />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  value = "";
  //用Watch来监听value的变化，语法如下，第一个参数是新的值，第二个参数是旧值，当变化时触发update:value
  @Watch("value")
  onValueChanged(value: string, oldvalue: string) {
    this.$emit("update:value", value);
  }
  @Prop({ required: true }) fieldName!: string; //required:true表示这是必填项
  @Prop() placeholder?: string; //？表示可以不存在
}
</script>

<style lang="scss" scoped>
.notes {
  background: #f5f5f5;
  display: block;
  font-size: 14px;
  padding-left: 16px;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
</style>