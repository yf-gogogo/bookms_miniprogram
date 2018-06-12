// pages/allborrowrecord/allborrowrecord.js
var conf = require('../../config');
var app = getApp()
var url1 = conf.url + 'borrowcomplete' 
var url2 = conf.url + 'agreeborrow'
var url3 = conf.url + 'allborrowbook'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookList:[],
  },
  formSubmit:function(e){

    wx.showLoading({
      title: '加载中',
    })

    let index = e.detail.value.index
    let that = this
    let borrowinfo = that.data.bookList[index]
    
    if(borrowinfo.borrow_status == 1){

      //借书完成
      wx.request({
        url: url1,
        data: {
          borrow_id: borrowinfo.borrow_id
        },
        method: 'PUT',
        success: function (res) {
          //关闭加载 
          wx.hideLoading()

          console.log(res.data)
          let reFreshbookList = that.data.bookList
          reFreshbookList[index].borrow_status = 2
          that.setData({
            bookList: reFreshbookList
          });
            wx.showToast({
              title: '借书完成',
              icon: 'success',
              duration: 2000
            })
            wx.navigateTo({
              url: '../msg_success/msg_success?info=借书完成',
            })
          }
      })
    }else{
      //同意借书
      wx.request({
        url: url2,
        data:{
          form_id: e.detail.formId,
          openid:borrowinfo.user.openid,
          book_name:borrowinfo.book.book_name,
          borrow_id:borrowinfo.borrow_id
        },
        method:'PUT',
        success:function(res){
          //关闭加载 
          wx.hideLoading()
          
          console.log(res.data)
          if(res.data.errcode == 0){
            let reFreshbookList = that.data.bookList
            reFreshbookList[index].borrow_status = 1
            that.setData({
              bookList: reFreshbookList
            });
            wx.showToast({
              title: '已同意',
              icon: 'success',
              duration: 2000
            })
            wx.navigateTo({
              url: '../msg_success/msg_success?info=已发送同意借书通知',
            })
          }
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
      url: url3,
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