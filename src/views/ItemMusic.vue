<template>
  <div>
    <item-music-top :playlist="playlist"></item-music-top>
    <item-music-list :itemlist="itemlist" :subscribedCount="playlist.subscribedCount"></item-music-list>
  </div>
</template>
<script>
import { onMounted, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { getMusicItemList, getItemList } from '@/request/api/item';

import ItemMusicTop from '@/components/item/ItemMusicTop';
import ItemMusicList from '@/components/item/ItemMusicList';
export default {
  setup() {
    const state = reactive({
      playlist: {},//歌单详情页数据
      itemlist: [],//歌单的数据
    });
    onMounted(async () => {
      let id = useRoute().query.id
      //console.log(id);
      //歌单详情页
      let res = await getMusicItemList(id);
      //console.log(res);
      state.playlist = res.data.playlist;
      //state.itemlist = res.data.playlist.tracks;
      //console.log(state.playlist);
      //歌单的歌曲
      let result = await getItemList(id);
      //console.log(result);
      state.itemlist = result.data.songs;
      //console.log(state.itemlist);
      //防止页面刷新数据丢失，把数据保存到sessionStorage或localStorage
      //state 的对象转换为字符串，并存储在 sessionStorage 中的名为 'itemDetail' 的键下
      sessionStorage.setItem('itemDetail', JSON.stringify(state))
    });

    return {
      ...toRefs(state)
    }
  },

  components: {
    ItemMusicTop,
    ItemMusicList
  }
}
</script>