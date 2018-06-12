// pages/borrowrecord/borrowrecord.js
var conf = require('../../config');
var app = getApp()
var url1 = conf.url + 'returnapply'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    icon60:"../../assets/img/missing_face.png"
  },
  formSubmit:function(e){
    console.log(e)
    let formid = e.detail.formId
    let that = this
    let index = e.detail.value.index
    let borrowinfo = that.data.bookList[index]
    console.log(borrowinfo)
    //判断是否执行取消借阅还是还书命令
    if(borrowinfo.borrow_status < 2){
      //取消借阅
      wx.request({
        url: conf.url + 'cancelborrow',
        data:{
          borrow_id: borrowinfo.borrow_id,
          book_id:borrowinfo.book_id,
        },
        method: 'DELETE',
        success: function (res) {
          console.log(res.data.msg)
          if (res.data.msg = 1){
            wx.showToast({
              title: '取消借阅',
              icon: 'success',
              duration: 2000
            })
          }
          let refrashbookList = that.data.bookList
          refrashbookList.splice(e.detail.value.index,1)
          
          // that.onLoad()
          console.log(refrashbookList)
          that.setData({
            bookList:refrashbookList
          })
        }
      })
    }else{
      //还书申请
      wx.request({
        url: url1,
        data:{
          borrow_id: borrowinfo.borrow_id,
          book_name: borrowinfo.book.book_name,
          form_id:formid
        },
        method:'PUT',
        success:function(res){
          let refrashbookList = that.data.bookList
          refrashbookList[index].borrow_status = 3
          that.setData({
            bookList: refrashbookList
          })
          console.log(res.data)
          wx.showToast({
            title: '已申请',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.request({
      url: conf.url+'borrowbook',
      data:{
        user_id:app.globalData.userInfo.user_id
      },
      method: 'GET',
      success:function(res){
        //关闭加载 
        wx.hideLoading()
      
        if (res.data.errorcode == 1){
          wx.showToast({
            title: '记录为空',
            icon: 'success',
            duration: 2000
          })
        }else{
          // let reFrash = res.data.msg
          // for (let i=0;i<res.data.msg.length;i++){
          //   reFrash[i].borrow_date = new Date(reFrash[i].borrow_date).toLocaleString()
          // }
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