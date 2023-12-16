import { Swipe, SwipeItem, Button, Popup } from "vant";

//放入数组
let plugins = [
  Swipe, SwipeItem, Button, Popup
]

//导出函数，app循环使用组件
export default function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item)
  })
}