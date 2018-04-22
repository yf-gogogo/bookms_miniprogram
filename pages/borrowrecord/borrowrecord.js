// pages/borrowrecord/borrowrecord.js
var conf = require('../../config');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    icon60:"../../assets/img/missing_face.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: conf.url+'borrowbook?',
      data:{
        user_id:app.globalData.userInfo.user_id
      },
      method: 'GET',
      success:function(res){
        
        console.log(res.data.msg)
        if (res.data.errorcode == 1){
          wx.showToast({
            title: '记录为空',
            icon: 'success',
            duration: 2000
          })
        }else{
          that.setData({
            bookList: res.data.msg
          });
        }
      }
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