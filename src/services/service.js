import xhr from './xhr/'
import API from './api'

class XHR {

// 获取当天拍卖场列表
  getToday (page) {
    return xhr({ 
              url: API.getToday(page),
              type: 'get'
          })
    }
  
}

// 实例化后再导出
export default new XHR()
