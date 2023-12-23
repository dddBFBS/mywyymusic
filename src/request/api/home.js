//首页获取数据
import service from "..";

//获取首页轮播图数据
export function getBanner() {
  return service({
    method: "GET",
    url: "/banner?type=2"
  })
}

//获取发现好歌单数据
export function getMusicList() {
  return service({
    method: "GET",
    url: "/personalized?limit=10"
  })
}

//实现搜索
export function getSearchMusic(data) {
  return service({
    method: "GET",
    url: `/cloudsearch?keywords=${data}`
  })
}

//登录
export function getEmailLogin(data) {
  return service({
    method: "GET",
    url: `/login?email=${data.email}&password=${data.password}`
  })
}

//获取用户详情/user/detail?uid=32953014
export function getUserInfo(data) {
  return service({
    method: "GET",
    url: `/user/detail?uid=${data}`
  })
}