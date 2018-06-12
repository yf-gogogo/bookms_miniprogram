// pages/medetail/medetail.js
var conf = require('../../config');
var util = require('../../utils/util');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '陌生人',
    countryCodes: ["+86", "+86", "+86", "+86"],
    countryCodeIndex: 0,
    focus:false,
    user_name:null,
    user_cardid:null,
    user_email:null,
    user_phone:null,
    isChecked:false,
  },
  bindKeyInput:function(e){
    if(e.detail.value == '123'){
      this.setData({
        isChecked: true
      })
    }else{
      this.setData({
        isChecked: false
      })
    }
  },
  formSubmit: function (e) {
    var that = this
    console.log('form发生了submit事件，携带数据为：', e.detail)
    console.log(app.globalData.userInfo)
    var data = e.detail.value
    data.user_id = app.globalData.userInfo.user_id
    if(util.checkinput(e.detail.value.user_name, e.detail.value.user_cardid, e.detail.value.user_email))
    {
      wx.request({
        url: conf.url+'userinfo',
        data:data,
        method:'PUT',
        success:function(res){
          console.log('update',res.data)
          
          app.globalData.userInfo.user_name= e.detail.value.user_name,
          app.globalData.userInfo.user_cardid= e.detail.value.user_cardid,
          app.globalData.userInfo.user_email= e.detail.value.user_email,
          app.globalData.userInfo.user_phone= e.detail.value.user_phone
          if(e.detail.value.switch){
            app.globalData.userInfo.is_admin = '1'
          }else{
            app.globalData.userInfo.is_admin = '0'
          }
          console.log('globaldata',app.globalData.userInfo)
          try{
            wx.setStorageSync('userinfo', app.globalData.userInfo)
          }catch(e){
            console.log(e)
          }
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            focus: true
          })
          wx.navigateTo({
            url: '../msg_success/msg_success?info=修改成功',
          })
        },
        fail:function(e){
          console.log(e)
        }
      })
    }else{
      wx.showToast({
        title: '信息不完整,修改失败',
        icon: 'none',
        duration: 3000
      });
    }
  },
  getfocus:function(){
    var that = this
    that.setData({
      focus:false
    })
  },
  back: function () {
    wx.navigateBack({
      delta:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.wx_userInfo!=null){
      console.log(app.globalData.wx_userInfo.nickName)
      this.setData({
        nickName: app.globalData.wx_userInfo.nickName
      })
    } 
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: conf.url+'userinfo',
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        that.setData({
          user_name: res.data.msg.user_name,
          user_cardid: res.data.msg.user_cardid,
          user_email: res.data.msg.user_email,
          user_phone: res.data.msg.user_phone
        })
        console.log(res.data.msg)
      },
      fail: function (e) {
        console.log(e)
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
    let that = this
    that.setData({
      focus: true
    })
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