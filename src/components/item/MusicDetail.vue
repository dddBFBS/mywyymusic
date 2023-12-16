<template>
  <div class="detail">
    <img :src="musicList.al.picUrl" alt="" class="bgimg">
    <div class="detailTop">
      <div class="detailTopLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="leftMarquee">
          <Vue3Marquee style="color:#fff">{{ musicList.al.name }}</Vue3Marquee>
          <span v-for="(item, i) in musicList.ar" :key="item">{{ item.name }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou1"></use>
          </svg>
        </div>
      </div>
      <div class="detailTopRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>


  </div>
</template>
<script>
import { Vue3Marquee } from 'vue3-marquee'
export default {
  components: {
    Vue3Marquee,
  },
  props: ['musicList'],
  setup(props) {
    console.log(props);
  }
}
</script>

<style lang="less" scoped>
.detail {
  .bgimg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(70px);
  }

  .detailTop {
    width: 100%;
    height: 1rem;
    display: flex;
    padding: .2rem;
    justify-content: space-between;
    align-items: center;
    fill: #fff;

    .detailTopLeft {
      display: flex;
      align-items: center;

      .leftMarquee {
        width: 3rem;
        height: 100%;
        margin-left: .4rem;

        span {
          color: #999;
        }

        .icon {
          width: 0.3rem;
          height: 0.5rem;
          fill: #999;
        }
      }
    }
  }
}
</style>