//把新建标签也提取成一个组件
<template>
  <div>
    <button @click="$emit('click', $event)" class="button">
      <slot />
    </button>
  </div>
</template>


<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.button {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>