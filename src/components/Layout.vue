<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script>
export default {
  name: "Layout",
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  overflow: auto;
  flex-grow: 1; //把高度尽量的给它，剩下的是Nav的
}
</style>