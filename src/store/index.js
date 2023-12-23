import { getMusicLyric } from '@/request/api/item';
import { getEmailLogin } from '@/request/api/home';
import { createStore } from 'vuex'

export default createStore({
  state: {
    playList: [{ //播放列表
      al: {
        id: 139403243,
        name: "BABYDOLL",
        pic: 109951167195846340,
        picUrl: "https://p1.music.126.net/DL0wQx0nvqtEDRk6UTR_Tw==/109951167195846340.jpg",
        pic_str: "109951167195846340"
      },
      id: 1914893736,
      name: "BABYDOLL",
      ar: [{ name: "Ari Abdul" }]

    }],
    playListIndex: 0, //默认下标为0
    isFooterMusic: true,//判断底部组件是否需要显示
    isbtnShow: true,//暂停按钮的显示
    detailShow: false,//点击底部组件，歌曲详情页的显示
    lyricList: {},//歌词
    currentTime: 0,//当前播放时间
    duration: 0,//歌曲总时长
    isLogin: false,//判断是否登录
    isFooterMusicShow: true,//判断底部组件是否显示 
    token: "",//保存token
    user: {},//用户信息
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value;
    },
    updatePlayList: function (state, value) {
      state.playList = value;
      console.log(state.playList);
    },
    pushPlayList: function (state, value) {
      state.playList.push(value)
    },
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value;
    },
    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow;
    },
    updateLyricList: function (state, value) {
      state.lyricList = value;
    },
    updateCurrentTime: function (state, value) {
      //console.log(state.currentTime);
      state.currentTime = value;
    },
    updateDuration: function (state, value) {
      state.duration = value;
      //console.log(state.duration);
    },
    updateIsLogin: function (state, value) {
      state.isLogin = value;
    },
    updateToken: function (state, value) {
      state.token = value;
      //保存到sessionStorage中
      sessionStorage.setItem('token', state.token);
    },
    updateUserInfo: function (state, value) {
      state.user = value;
    }
  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value)
      //console.log(res)
      context.commit("updateLyricList", res.data.lrc)
    },
    getLogin: async function (context, value) {
      let res = await getEmailLogin(value);
      //console.log(res);
      return res;
    }
  },
  modules: {
  }
})
