<template>
  <div class="detail">
    <img :src="musicList.al.picUrl" alt="" class="bgimg">
    <div class="detailTop">
      <div class="detailTopLeft">
        <svg class="icon" aria-hidden="true" @click="updateDetailShow">
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
    <div class="musicLyric" v-show="isLyricShow">
      {{ lyric }}
    </div>
    <div class="detailContent" v-show="!isLyricShow">
      <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{ img_needle_active: !isbtnShow }">
      <img src="@/assets/cd.png" alt="" class="img_cd">
      <img :src="musicList.al.picUrl" alt="" class="img_ar"
        :class="{ img_ar_active: !isbtnShow, img_ar_paused: isbtnShow }">
    </div>

    <div class="detailFooter">
      <div class="footerTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinlechangpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-"></use>
        </svg>

      </div>
      <div class="footerContent">
      </div>
      <div class="footer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg class="icon bofang" aria-hidden="true" @click="play" v-if="isbtnShow">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <svg class="icon bofang" aria-hidden="true" @click="play" v-else>
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </div>


  </div>
</template>
<script>
import { computed } from 'vue';
import { Vue3Marquee } from 'vue3-marquee';
import { mapMutations, mapState, useStore } from 'vuex';
export default {
  components: {
    Vue3Marquee,
  },
  props: ['musicList', 'play', 'isbtnShow'],
  setup(props) {
    console.log(props);
    let isLyricShow = true;
    const store = useStore();
    // 复杂对象和数组不能直接使用插值语法，使用计算属性将其转化为可以渲染的形式
    const lyric = computed(() => {
      return store.state.lyricList.lyric;
    });
    return {
      ...mapMutations(['updateDetailShow']),
      lyric,
      isLyricShow,

    }
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

  .detailContent {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .img_needle {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(-13deg);
      transition: all 2s;
    }

    .img_needle_active {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(0deg);
      transition: all 2s;
    }

    .img_cd {
      width: 5rem;
      height: 5rem;
      position: absolute;
      bottom: 2.3rem;
      z-index: -1;
    }

    .img_ar {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      position: absolute;
      bottom: 3.14rem;
      animation: rotate_ar 10s linear infinite;
    }

    .img_ar_active {
      animation-play-state: running;
    }

    .img_ar_paused {
      animation-play-state: paused;
    }

    @keyframes rotate_ar {
      0% {
        transform: rotateZ(0deg);
      }

      100% {
        transform: rotateZ(360deg);
      }
    }
  }

  .detailFooter {
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .footerTop {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .icon {
        width: 0.36rem;
        height: 0.36rem;
        fill: rgb(245, 234, 234);
      }

      .icon {
        width: 0.6rem;
        height: 0.6rem;
      }
    }

    .range {
      width: 100%;
      height: 0.06rem;
    }

    .footer {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .icon {
        fill: rgb(245, 234, 234);
      }

      .bofang {
        width: 1rem;
        height: 1rem;
      }
    }
  }

}
</style>