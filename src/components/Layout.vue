<template>
  <div class="layout-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <!-- 先判断是不是有classPrefix -->
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script>
export default {
  props: ["classPrefix"], //准备一个带有前缀的class名,可以单独设置
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  overflow: auto;
  flex-grow: 1; //尽量把高度都给content
}
</style>