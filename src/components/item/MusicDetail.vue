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
    <div class="detailContent" v-show="!isLyricShow">
      <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{ img_needle_active: !isbtnShow }">
      <img src="@/assets/cd.png" alt="" class="img_cd">
      <img :src="musicList.al.picUrl" alt="" @click="toggleLyricShow" class="img_ar"
        :class="{ img_ar_active: !isbtnShow, img_ar_paused: isbtnShow }">
    </div>
    <div class="musicLyric" @click="toggleLyricShow" v-show="isLyricShow" ref="musicLyric">
      <!-- 使用循环显示每句歌词 -->
      <p v-for="item in lyric" :key="item" :class="{
        active:
          currentTime * 1000 >= item.time && currentTime * 1000 < item.nextTime,
      }">
        {{ item.lrc }}
      </p>
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
        <!-- H5新增表单range 双向绑定当前时间 -->
        <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05" ref="range">
      </div>
      <div class="footer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg class="icon bofang" aria-hidden="true" @click="play" v-if="isbtnShow">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <svg class="icon bofang" aria-hidden="true" @click="play" v-else>
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
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
import { computed, ref } from 'vue';
import { Vue3Marquee } from 'vue3-marquee';
import { mapState, mapMutations, useStore } from 'vuex';
export default {
  components: {
    Vue3Marquee,
  },
  props: ['musicList', 'play', 'isbtnShow', 'addDuration'],
  setup(props) {
    //console.log(props);

    //磁盘和歌词切换，响应式数据的创建
    let isLyricShow = ref(false);
    function toggleLyricShow() {
      isLyricShow.value = !isLyricShow.value;
    }


    const store = useStore();

    //使用计算属性进行双向绑定当前时间
    // const now = computed(() => {
    //   return store.state.currentTime;
    // })

    //duration也需要转换为计算属性后绑定
    // const max = computed(() => {
    //   return store.state.duration;
    // })

    //歌词处理
    // 复杂对象和数组不能直接使用插值语法，使用计算属性将其转化为可以渲染的形式
    const lyric = computed(() => {
      let arr;
      if (store.state.lyricList.lyric) {
        //先分割，再调用map循环返回新数组，arr接收
        arr = store.state.lyricList.lyric.split(/\r?\n/).map((item, i) => {
          //slice包头不包尾
          let min = item.slice(item.indexOf('[') + 1, item.indexOf(':'));
          let sec = item.slice(item.indexOf(':') + 1, item.indexOf('.'));
          let mill = item.slice(item.indexOf('.') + 1, item.indexOf(']'));
          let lrc = item.slice(item.indexOf(']') + 1, item.length);
          let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          //console.log(min, sec, mill, lrc);
          //以对象形式返回，切割的每个部分作为对象的属性
          return { min, sec, mill, lrc, time }
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.nextTime = 1000000;
          } else {
            item.nextTime = arr[i + 1].time;
          }
        });


      }
      //console.log(arr);
      return arr;
    });



    return {
      lyric,
      isLyricShow,
      toggleLyricShow,
      //now,
      //max
    }
  },

  computed: {
    ...mapState(["currentTime", "playListIndex", "playList", 'duration'])
  },

  methods: {
    //歌曲上下一首的切换
    goPlay: function (num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    ...mapMutations(['updateDetailShow', 'updatePlayListIndex']),
  },

  //挂载就更新歌曲时长
  mounted() {
    this.addDuration();

  },
  updated() {
    this.addDuration();
  },

  //歌词随时间显示样式,到最后时长自动进入下一首
  watch: {
    currentTime: function (newValue) {
      let p = document.querySelector("p.active");
      // console.log([p]);
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
      if (newValue === this.duration) {
        this.goPlay(1);
      }

    },



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

  .musicLyric {
    width: 100%;
    height: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: .4rem;
    // 有溢出，设置滚动条
    overflow: scroll;

    p {
      width: 80%;
      color: #cac7c7;
      margin-bottom: .4rem;
      margin-left: 10%;
      margin-right: 10%;
      text-align: center;
    }

    .active {
      color: #fff;
      font-size: .5rem;
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