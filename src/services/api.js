import { HTTP, HURL } from './xhr/config'
var SESSIONID
let hase = window.location.pathname
if (hase.length > 6) {
  SESSIONID = hase.substring(1,hase.length)
} else {
  SESSIONID = 'c9c0b3c639f6df89ac38ed44a9da09da169d4e9b'
}

class API {
// 获取当天拍卖场列表
  getToday (page) {
    return  `${HTTP}/salesroom/today/${page}/10?session_id=${SESSIONID}`
  }

}

// 实例化后再导出
export default new API()
