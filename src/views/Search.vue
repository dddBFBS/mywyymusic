<template>
  <div class="search">
    <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <!--输入框，给定默认值-->
      <!-- 双向绑定 -->
      <input type="text" placeholder="陈奕迅" v-model="searchKey" @keyup.enter="enterKey">
    </div>
    <div class="searchHistory">
      <!-- 输入框输入的关键字都要保存到这里 -->
      <span class="searchSpan">history</span>
      <span v-for="item in keyWordList" :key="item" class="spanKey" @click="searchHistory(item)">
        {{ item }}
      </span>
      <svg class="icon" aria-hidden="true" @click="delHistory">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>

    <div class="itemList">
      <div class="item" v-for="(item, i) in searchList" :key="i">
        <div class="itemLeft" @click="updateIndex(item)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.ar" :key="index">{{ item1.name }}</span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if='item.mvid != 0'>
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
import { getSearchMusic } from '@/request/api/home.js'
export default {
  data() {
    return {
      keyWordList: [],
      searchKey: "",
      searchList: [],
    }
  },
  mounted() {
    //挂载时获取localStorage中保存的keyWorldList
    this.keyWordList = JSON.parse(localStorage.getItem('keyWordList') || '[]')

  },
  methods: {
    //添加历史记录
    enterKey: async function () {
      if (this.searchKey !== "") {
        this.keyWordList.unshift(this.searchKey);

        //es6方法去重
        this.keyWordList = [...new Set(this.keyWordList)]

        //长度限制,删除很久前的历史记录
        if (this.keyWordList.length > 10) {
          this.keyWordList.splice(this.keyWordList.length - 1, 1)
        }

        // 防止刷新就丢失历史记录数据，需要保存到localStorage中
        localStorage.setItem('keyWordList', JSON.stringify(this.keyWordList));

        //获得搜索结果(异步操作)
        let res = await getSearchMusic(this.searchKey);
        //console.log(res);
        this.searchList = res.data.result.songs;
        console.log(this.searchList);

        this.searchKey = "";
      }

    },

    //删除历史记录
    delHistory: function () {
      localStorage.removeItem("keyWordList");
      this.keyWordList = [];
    },

    //点击历史记录也进行搜索
    searchHistory: async function (item) {
      let res = await getSearchMusic(item);
      //console.log(res);
      this.searchList = res.data.result.songs;
      console.log(this.searchList);
    },

    //播放搜索结果中的某一歌曲
    updateIndex: function (item) {
      this.$store.commit("pushPlayList", item)
      this.$store.commit("updatePlayListIndex", this.$store.state.playList.length - 1)
    }

  }
}  
</script>
<style lang="less" scoped>
.search {
  .searchTop {
    width: 100%;
    height: 1rem;
    padding: 0 .2rem;
    display: flex;
    align-items: center;

    input {
      margin-top: .2rem;
      border: none;
      border-bottom: 1px solid #999;
      width: 90%;
      padding: .1rem;
    }
  }

  .searchHistory {
    width: 100%;
    padding: .2rem;
    position: relative;

    .searchSpan {
      font-weight: 700;
    }

    .spanKey {
      padding: .1rem .2rem;
      border-radius: .4rem;
      margin: .1rem .2rem;
      background-color: #cfcaca;
      display: inline-block;
    }

    .icon {
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      right: .2rem;
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