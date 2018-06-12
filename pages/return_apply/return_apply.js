// pages/return_apply/return_apply.js
var conf = require('../../config');
var app = getApp()
var url1 = conf.url + 'agreereturn' 
var url2 = conf.url + 'returncomplete'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
  },
  formSubmit:function(e){
    let index = e.detail.value.index
    let that = this
    let borrowinfo = that.data.bookList[index]
    if(borrowinfo.borrow_status == 3){
      //同意还书
      wx.request({
        url: url1,
        data: {
          openid: borrowinfo.user.openid,
          book_name: borrowinfo.book.book_name,
          borrow_id: borrowinfo.borrow_id
        },
        method: 'PUT',
        success: function (res) {
          console.log(res.data)
          if (res.data.errcode == 0) {
            let reFreshbookList = that.data.bookList
            reFreshbookList[index].borrow_status = 4
            that.setData({
              bookList: reFreshbookList
            });
            wx.showToast({
              title: '已同意',
              icon: 'success',
              duration: 2000
            })
            wx.navigateTo({
              url: '../msg_success/msg_success?info=已发出同意还书消息',
            })
          }
        }
      })
    }else{
      //还书完成
      wx.request({
        url: url2,
        data: {
          borrow_id: borrowinfo.borrow_id,
          book_id:borrowinfo.book_id
        },
        method: 'PUT',
        success: function (res) {
          console.log(res.data)
          let reFreshbookList = that.data.bookList
          reFreshbookList[index].borrow_status = 5
          that.setData({
            bookList: reFreshbookList
          });
          wx.showToast({
            title: '还书完成',
            icon: 'success',
            duration: 2000
          })
          wx.navigateTo({
            url: '../msg_success/msg_success?info=还书完成',
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: conf.url + 'allreturnbook',
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