<template>
  <div id="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import axios from 'axios';
import { getBanner } from '@/request/api/home.js';
import { reactive, toRefs, onMounted } from 'vue';
export default {
  setup() {
    //图片数据修改成响应式,可以修改state对象的属性images
    const state = reactive({
      images: [
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
      ]
    });
    //Mounted时获取数据，引入生命周期钩子
    //加async await 异步请求等待
    onMounted(async () => {
      // //实际开发中上线要更换域名，为了方便更改，封装axios，抽取域名（基础路径）
      // //集中获取数据，也进行封装
      // axios.get('http://localhost:3000/banner?type=2')
      //   .then((res) => {
      //     //console.log(res);
      //     //渲染数据
      //     state.images = res.data.banners
      //     //console.log(state.images);
      //   })

      let res = await getBanner();
      //console.log(res);
      state.images = res.data.banners;
    })
    return { ...toRefs(state) };
  },
};

</script>

<style lang="less">
#swiperTop {

  //需要在上面自己添加一个id
  .van-swipe {
    width: 100%;
    height: 3rem;

    .van-swipe-item {
      padding: 0 0.2rem;

      img {
        width: 100%;
        height: 100%;
        //圆角边距
        border-radius: 0.2rem;
      }
    }

    .van-swipe__indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>