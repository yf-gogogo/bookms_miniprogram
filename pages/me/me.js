// pages/me/me.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickName:"点击登录",
      avatarUrl:"../../assets/img/missing_face.png"
    },
    login_status:false,
    showBadge: true,
    meList: [
      {
        text: '借阅的图书',
        icon: '../../assets/img/iconfont-dingdan.png',
        url: '../borrowrecord/borrowrecord'
      },
      {
        text: '预约的图书',
        icon: '../../assets/img/iconfont-icontuan.png',
        url: '../orderrecord/orderrecord'
      },
      {
        text: '我的信息',
        icon: '../../assets/img/footer-icon-04.png',
        url: '../medetail/medetail'
      }
    ]
  },
  getDetailUserInfo:function(event){
    console.log(event)
    if(this.data.login_status){
      wx.navigateTo({
        url: '../medetail/medetail?uid=1',
        success: function (e) {
          
        }
      })
    }else{
      wx.openSetting({
        success: (res) => {
          console.log(res)
          var that = this
          //调用应用实例的方法获取全局数据
          app.getWXUserInfo(function (userInfo) {
            //更新数据
            that.setData({
              userInfo: userInfo,
              login_status: true
            })
          })
        }
      })
    }  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getWXUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        login_status: true
      })
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})