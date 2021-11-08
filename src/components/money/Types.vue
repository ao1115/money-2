<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang = "ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Types extends Vue {
  type = "-";
  @Prop(Number) xxx: number | undefined;
  //Prop告诉vue xxx是属性名
  //Number是运行时的类型
  //number是编译时的类型
  //可以写成number | undefined  也可以直接给number一个初始值
  selectType(type: string) {
    if (type !== "-" && type !== "+") {
      throw new Error("type is unkown");
    }
    this.type = type;
  }
  mounted() {
    if (this.xxx === undefined) {
      console.log("undefined");
    } else {
      console.log(this.xxx);
    }
  }
}
</script>


<style lang="scss" scoped>
.types {
  background: #c4c4c4;

  display: flex;
  text-align: center;
  font-size: 24px;
  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4px;
      width: 100%;
      background: #333;
    }
  }
}
</style>