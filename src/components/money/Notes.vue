<template>
  <div>
    <label for="" class="notes">
      <span class="name">备注</span>
      <input
        type="text"
        :value="value"
        @input="oninput"
        placeholder="这里是备注"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  value = "";
  oninput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
  }
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