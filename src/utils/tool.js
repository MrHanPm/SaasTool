
const Tool = {}

window.AlertTimeOut = ''

// Tool.ga = () => {
//         let nac = JSON.parse(Tool.localItem('vipLodData'))
//         let users = '员工'
//         if(nac.usercategory == '2'){
//             users = '老板'
//         }
//         let delname = nac.dealersalesallbrandsname.replace(/\,/g, "|")

//         ga('send','event','首页加载','首页加载',{
//             dimension2:users,
//             dimension3:nac.dealername,
//             dimension4:delname,
//             dimension5: nac.userid
//         })
// }

// Tool.gaTo = (txt, name, lab) => {
//     ga('send','event', txt, name, lab)
// }

/**
 * 格式化时间
 * 
 * @param {any} t
 * @returns
 */

/**
 * 本地数据存储或读取
 * 
 * @param {any} key
 * @param {any} value
 * @returns
 */
Tool.localItem = function (key, value) {
    if (arguments.length == 1) {
        return localStorage.getItem(key)
    } else {
        return localStorage.setItem(key, value)
    }
}

/**
 * 删除本地数据
 * 
 * @param {any} key
 * @returns
 */
Tool.removeLocalItem = function (key) {
    if (key) {
        return localStorage.removeItem(key)
    }
    return localStorage.removeItem()
}


//弹窗提示的封装
const Alert = {}
Alert.to = function(val) {
        clearTimeout(AlertTimeOut)
        let AlertCont = document.getElementById("AlertCont")
        let AlertTxt = document.getElementById("AlertTxt")
        AlertTxt.innerHTML = val
        AlertCont.setAttribute('class','notification notification-in')
        AlertTimeOut = setTimeout(() => Alert.out(),4000)
}
Alert.out = function(){
    let AlertCont = document.getElementById("AlertCont")
    AlertCont.setAttribute('class','notification')
}
//弹窗提示的封装
const AllMsgToast = {}
AllMsgToast.to = function(val) {
        let AlertTxt = document.getElementById("AllMsg")
        AlertTxt.innerHTML = val
        AlertTxt.setAttribute('class','active')
        let AllMsgToastOut = setTimeout(() => AllMsgToast.out(),2000)
}
AllMsgToast.out = function(){
    let AlertCont = document.getElementById("AllMsg")
    AlertCont.removeAttribute('class')
}

export {Tool , Alert, AllMsgToast}
