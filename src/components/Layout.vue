<template>
  <div class="layout-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <div class="appname">橙子记账</div>
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
.appname {
  width: 100%;
  height: 64px;
  background-color: rgb(244, 220, 96);
  line-height: 64px;
  text-align: center;
}
.content {
  overflow: auto;
  flex-grow: 1; //尽量把高度都给content
}
</style>