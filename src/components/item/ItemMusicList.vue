<template>
  <div class="itemMusicList">
    <div class="itemListTop">
      <div class="listLeft" @click="playMusic()">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofanganniu"></use>
        </svg>
        <span>播放全部
          <span>(共{{ itemlist.length }}首)</span>
        </span>
      </div>
      <div class="listRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <span>收藏({{ subscribedCount }})</span>
      </div>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in itemlist" :key="i">
        <div class="itemLeft" @click="playMusic(i)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.ar" :key="index">{{ item1.name }}</span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if='item.mv != 0'>
            <use xlink:href="#icon-shipin"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  props: ['itemlist', 'subscribedCount'],
  setup(props) {
    //console.log(props);
  },
  methods: {
    playMusic: function (i) {
      this.updatePlayList(this.itemlist)
      this.updatePlayListIndex(i)
    },
    //将指定的 mutations 映射为组件的方法，并使其在组件中可直接调用
    ...mapMutations(['updatePlayList', 'updatePlayListIndex'])
  }
};
</script>

<style lang="less" scoped>
.itemMusicList {
  width: 100%;
  height: 10rem;
  background-color: #fff;
  padding: 0 .2rem;
  margin-top: .2rem;
  border-top-left-radius: .4rem;
  border-top-right-radius: .4rem;

  .itemListTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .listLeft {
      width: 3rem;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .icon {
        stroke: #333333;
        stroke-width: 20;

      }

      span {
        font-weight: 700;

        span {
          font-weight: 400;
          font-size: .24rem;
          color: #999;
        }
      }
    }

    .listRight {
      display: flex;
      align-items: center;
      background-color: red;
      padding: .2rem;
      border-radius: .4rem;
      color: #fff;

      .icon {
        widows: 0.3rem;
        height: 0.3rem;
        fill: #fff;
        margin-right: .1rem;
        stroke: #fff;
        stroke-width: 50;
      }
    }
  }

  .itemList {
    width: 100%;

    .item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .itemLeft {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;

        .leftSpan {
          display: inline-block;
          width: .2rem;
          text-align: center;
        }
      }

      div {
        margin-left: .3rem;

        p {
          width: 4.54rem;
          height: 0.4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
        }

        span {
          font-weight: 400;
          font-size: .24rem;
          color: #999
        }
      }

      .itemRight {
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;

        .icon {
          fill: #999;
        }

        .bofang {
          position: absolute;
          left: 0;
        }

        .liebiao {
          position: absolute;
          right: 0;
        }
      }
    }
  }

}
</style>