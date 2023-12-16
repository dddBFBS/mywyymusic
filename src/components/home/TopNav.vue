<template>
  <div class="topNav">
    <!-- 列表图标 -->
    <div class="topleft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>

    <!-- 文字选项 -->
    <div class="topContent">
      <span>我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>

    <!-- 搜索图标 -->
    <div class="topright">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>

  </div>
</template>  

<style lang="less" scoped>
.topNav {
  width: 100%;
  height: 1rem;
  padding: .2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .topContent {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    font-size: .36rem;

    .active {
      font-weight: 900;
    }
  }
}
</style>