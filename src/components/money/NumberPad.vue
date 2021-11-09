<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="inputContent" class="add">+</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="inputContent" class="subtract">-</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">.</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="remove">删除</button>
      <button @click="ok" class="ok">OK</button>
    </div>
  </div>
</template>

<script lang ="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Types extends Vue {
  output: string = "0";
  input = "";

  inputContent(event: MouseEvent) {
    //点击事件就是一个鼠标事件
    const button = event.target as HTMLButtonElement; //用as HTMLButtonElement强制指定类型
    this.input = button.textContent!; //！表示强制指定input不会是空的  也可以写成as string
    if (this.output.length === 16) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(this.input) >= 0) {
        this.output = this.input;
      } else {
        this.output += this.input;
      }
      return;
    }
    if (this.output.indexOf(".") >= 0) {
      if (this.input === ".") {
        return;
      }
    }
    this.output += this.input;
    //加减按钮的操作
    if (this.output.indexOf("+") >= 0) {
    }
  }

  remove() {
    if (this.output.length === 1) {
      if (this.output === "0") {
        return;
      } else {
        this.output = "0";
      }
    } else {
      this.output = this.output.slice(0, -1);
    }
  }
  clear() {
    this.output = "0";
  }

  add() {}
  subtract() {}
  ok() {}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";
.numberPad {
  .output {
    @extend %innerShadow;
    @extend %clearFix;
    font-size: 36px;
    font-family: Consolas, monospace; //把字体设成计算机等宽字体
    padding: 9px 16px;
    text-align: right;
    height: 72px;
  }
  .buttons {
    @extend %clearFix; //把所有选择器复制到clearFix
    $bg: #f2f2f2; //要声明在外面
    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: $bg;
      border: 1px solid #bdbdbd;
      border-left: none;
      border-bottom: none;
      &.ok {
        // &符号表示上一级选择器
        background: $color-highlight;
      }
      &:nth-child(4),
      &:nth-child(8),
      &:nth-child(12) {
        border-right: none;
      }
    }
  }
}
</style>