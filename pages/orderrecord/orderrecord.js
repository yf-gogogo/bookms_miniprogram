// pages/orderrecord/orderrecord.js
var conf = require('../../config');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
  },
  formSubmit:function(e){
    let that = this
    let index = e.detail.value.index
    let orderinfo = that.data.bookList[index]
    wx.request({
      url: conf.url + 'cancelorder',
      data:{
        order_id:orderinfo.order_id
      },
      method:'DELETE',
      success:(res)=>{
        wx.showToast({
          title: '取消预约',
          icon: 'success',
          duration: 2000
        })
        let refrashbookList = that.data.bookList
        refrashbookList.splice(e.detail.value.index, 1)
        // that.onLoad()
        console.log(refrashbookList)
        that.setData({
          bookList: refrashbookList
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: conf.url+'orderbook',
      data:{
        user_id: app.globalData.userInfo.user_id
      },
      method: 'GET',
      success: function (res) {

        console.log(res.data.msg)
        if (res.data.errorcode == 1) {
          wx.showToast({
            title: '记录为空',
            icon: 'success',
            duration: 2000
          })
        } else {
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