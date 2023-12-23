<template>
  <router-view />
  <footer-music v-show="$store.state.isFooterMusicShow"></footer-music>
</template>

<script>
import FooterMusic from '@/components/item/FooterMusic.vue';
export default {
  components: {
    FooterMusic,
  }
}
</script>

<style lang="less">
//通配符
* {
  margin: 0;
  padding: 0;
  // 设置为怪异盒子，这样内边距不会撑开盒子
  box-sizing: border-box;
}

.icon {
  width: .5rem;
  height: 0.5rem;
}

a {
  color: black;
}
</style>
