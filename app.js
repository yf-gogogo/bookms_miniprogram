//app.js
var conf = require('./config');
App({
  globalData: {
    wx_userInfo: null,
    borrow_status:null,
    userInfo: {
      user_id:null,
      user_name:null
    },
  },
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var storage = wx.getStorageSync('userinfo')||null
    
    that.globalData.userInfo = storage
    let d = new Date()
    console.log(typeof(d))
    console.log(d.toLocaleString())
    console.log('查看本地缓存')
    console.log("log", that.globalData.userInfo)

    if(storage==null){
      wx.showLoading({
        title: '加载中',
      })
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            console.log('code', res.code)
            //发起网络请求
            wx.request({
              url: conf.url+'userauth',
              data: {
                code: res.code
              },
              success: function (res1) {
                console.log('本地缓存为null，登陆认证，获取数据库数据')
                console.log('userinfo',res1.data.msg)
                // wx.setStorageSync('userinfo', res1.data.msg)
                that.globalData.userInfo = res1.data.msg
                wx.hideLoading()
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }else{
      wx.request({
        url: conf.url + 'getuserid',
        data:{
          openid:storage.openid
        },
        success:function(res2){
          that.globalData.userInfo.user_id = res2.data.msg.user_id;
          console.log('更新userid'+res2.data.msg.user_id);
        }
      })
    }
    
  },
  // getWXUserInfo: function (cb) {
  //   var that = this
  //   if (this.globalData.wx_userInfo) {
  //     typeof cb == "function" && cb(this.globalData.wx_userInfo)
  //   } else {
  //     //调用登录接口
  //     wx.login({
  //       success: function () {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             console.log("userinfo",res.userInfo)
  //             that.globalData.wx_userInfo = res.userInfo
  //             typeof cb == "function" && cb(that.globalData.wx_userInfo)
  //           }
  //         })
  //       }
  //     })
  //   }
  // }
})