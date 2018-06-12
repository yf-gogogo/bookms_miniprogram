var util = require('../../utils/util');
var conf = require('../../config');
var app = getApp();

Page({
  data: {
    userInfo: null,
    bookMsg: {},
    borrow: {},
    order: {},
    otherborrow: [],
    otheroder: [],

    showBorrowBtn: false, //是否显示 借阅 按钮
    showOrderBtn: false, //是否显示 预约 按钮
    showBorrowedBtn: false, //是否显示 借阅 按钮
    showOrderedBtn: false, //是否显示 预约 按钮
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    // 页面初始化 options为页面跳转所带来的参数
    console.log('options',options)
    // console.log('bookid',JSON.parse(options.book_id))
    var book_id = options.info
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo
    })
    wx.request({
      url: conf.url + 'bookallinfo',
      data:{
        book_id:book_id,
        user_id: that.data.userInfo.user_id
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        that.setData({
          bookMsg: res.data.info,
          borrow:res.data.borrow,
          order:res.data.order,
          otherborrow:res.data.otherborrow,
          otherorder:res.data.otherorder
        })
        console.log(res.data)
        //判断显示哪个按钮
        if (that.data.bookMsg.current_num > 0 && that.data.borrow == null){
          that.setData({
            showBorrowBtn:"ture"
          })
        }
        if (that.data.bookMsg.current_num > 0 && that.data.borrow != null) {
          that.setData({
            showBorrowedBtn: "ture"
          })
        }
        if (that.data.bookMsg.current_num == 0 && that.data.order == null) {
          that.setData({
            showOrderBtn: "ture"
          })
        }
        if (that.data.bookMsg.current_num == 0 && that.data.order != null) {
          that.setData({
            showOrderedBtn: "ture"
          })
        }
        //关闭加载 
        wx.hideLoading()
      }
    })
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示
    
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  formSubmit: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(e)
    var that = this
    let userInfo = app.globalData.userInfo
    console.log('从全局变量获取用户详细信息')
    console.log('userInfo', userInfo)
    if ( userInfo == null
    ||userInfo.user_name == null){
      wx.hideLoading()
      wx.showToast({
        title: '请到个人界面完善你的信息',
        icon: 'none',
        duration: 3000
      });
      wx.navigateTo({
        url: '../medetail/medetail',
      })
    }else{
      wx.request({
        url: conf.url + 'borrowingbook',
        data:{
          user_id:userInfo.user_id
        },
        method:'GET',
        success:(res)=>{
          console.log(res)
          if (res.data.msg.length != 0) {
            wx.hideLoading()
            wx.showToast({
              title: '按照规定，每人只能借一本书',
              icon: 'none',
              duration: 3000
            });
           
          } else {
            wx.request({
              url: conf.url + 'borrowbook',
              data:
              {
                user_id: userInfo.user_id,
                book_id: that.data.bookMsg.book_id,
                form_id: e.detail.formId,
              },
              method: "POST",
              success: function (res) {
                console.log('添加借书记录')
                wx.hideLoading()
                wx.showToast({
                  title: '借阅申请已提交',
                  icon: 'success',
                  duration: 3000
                });
                that.setData({
                  showBorrowBtn: false,
                  showBorrowedBtn: true,
                })
                wx.navigateTo({
                  url: '../msg_success/msg_success?info=借阅申请已提交',
                })
              }
            })
          }
        }
      })
    }
  },
  orderBook: function () {
    var that = this;
    let userInfo = app.globalData.userInfo
    console.log('从全局变量获取用户详细信息')
    console.log('userInfo', userInfo)
    if (userInfo == null
      ||userInfo.user_name == null){
      wx.showToast({
        title: '请到个人界面完善你的信息',
        icon: 'none',
        duration: 3000
      });
    }else{
      wx.request({
        url: conf.url + 'orderbook',
        data:
        {
          user_id: userInfo.user_id,
          // book_id: that.bookMag.book_id
        },
        method: 'GET',

        success: function (res) {
          console.log('获取该用户预约数量')
          console.log('num', res.data)
          if (res.data.msg.length < 3) {
            wx.request({
              url: conf.url + 'orderbook',
              data:
              {
                user_id: userInfo.user_id,
                book_id: that.data.bookMsg.book_id
              },
              method: 'POST',
              success: function (res) {
                wx.showToast({
                  title: '预约成功',
                  icon: 'success',
                  duration: 3000
                });
                that.setData({
                  showOrderedBtn:true,
                  showOrderBtn:false
                })
              }
            })
          } else {
            wx.showToast({
              title: '预约数已达上限',
              icon: 'success',
              duration: 3000
            });
          }
        }
      })
    }
  }
})