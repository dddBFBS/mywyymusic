<template>
  <div class="itemMusicTop">
    <img :src="playlist.coverImgUrl" alt="" class="bgimg">
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
  </div>
  <div class="itemTopContent">
    <div class="contentLeft">
      <img :src="playlist.coverImgUrl" alt="">
      <div class="playCount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gl-play-copy"></use>
        </svg>
        <span>{{ changeCount(playlist.name) }}</span>
      </div>
    </div>
    <div class="contentRight">
      <p class="rightP_one">{{ playlist.name }}</p>
      <div class="right_img">
        <img :src="playlist.creator.backgroundUrl" alt="">
        <span>{{ playlist.creator.nickname }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
      <p class="rightP_two">
        <span>{{ playlist.description }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </p>
    </div>
  </div>
  <div class="itemTopFooter">
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <span>{{ playlist.commentCount }}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ playlist.shareCount }}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-show_duoxuan"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
</template>

<script>
export default {

  props: ['playlist'],
  setup(props) {

    //通过props进行传值，判断如果数据拿不到，就获取sessionStorage中的数据
    //作者信息层级比较深，可能模板已经渲染但数据还没拿到，就会报错
    if ((props.playlist.creator = "")) {
      props.playlist.creator = JSON.parse(sessionStorage.getItem().playlist).creator;
    }

    //对播放量处理
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return { changeCount }

  },

}
</script>
<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .bgimg {
    width: 100%;
    height: 11rem;
    //固定随页面滚动
    position: fixed;
    z-index: -1; //置于下层
    filter: blur(30px);
  }

  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 .2rem;

    span {
      font-size: .4rem;
      color: #fff;
    }

    .icon {
      fill: #fff //svg填充颜色
    }

  }
}

.itemTopContent {
  width: 100%;
  height: 3rem;
  padding: .2rem;
  margin-top: .4rem;
  display: flex;
  justify-content: space-between;

  .contentLeft {
    width: 36%;
    height: 2.6rem;
    position: relative;

    img {
      width: 2.6rem;
      height: 2.6rem;
      border-radius: .2rem;
      position: absolute;
      z-index: -1;
    }

    .playCount {
      position: absolute;
      right: .1rem;
      margin-top: .1rem;

      .icon {
        width: 0.26rem;
        height: 0.26rem;
        margin-top: -0.02rem;
        vertical-align: middle;
      }

      span {
        font-size: .26rem;
        color: #fff;
      }
    }
  }

  .contentRight {
    width: 60%;
    height: 2.6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .rightP_one {
      font-size: .3rem;
      font-weight: 900;
      color: #fff;
      font-family: "微软雅黑";
    }

    .right_img {
      width: 100%;
      height: 0.6rem;
      line-height: .6rem;
      color: #ccc;

      img {
        width: 0.6rem;
        height: .6rem;
        border-radius: .6rem;
        vertical-align: middle;
      }

      span {
        margin-left: .1rem;
      }

      .icon {
        width: 0.26rem;
        height: 0.26rem;
        margin-top: -0.08rem;
        vertical-align: middle;
      }
    }

    .rightP_two {
      width: 100%;
      height: .6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        display: inline-block;
        width: 95%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: .24rem;
        color: #ccc;
      }

      .icon {
        width: 0.24rem;
        height: 0.24rem;
      }
    }
  }
}

.itemTopFooter {
  width: 100%;
  height: 1.4rem;
  display: flex;
  justify-content: space-around;
  margin-top: .2rem;

  .footerItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;

    .icon {
      fill: #fff;
    }

    span {
      margin-top: .1rem;
    }
  }
}
</style>