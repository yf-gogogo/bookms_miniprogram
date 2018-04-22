var util = require('../../utils/util');
var conf = require('../../config');
var app = getApp();
var url = app.url;

Page({
  data: {
    userInfo: null,
    bookMsg: {},
    windowWidth: '',
    windowHeight: '',
    pixelRatio: '',

    showBorrowBtn: false, //是否显示 借阅 按钮
    showOrderBtn: false, //是否显示 预约 按钮
    showBorrowedBtn: false, //是否显示 借阅 按钮
    showOrderedBtn: false, //是否显示 预约 按钮
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('options',options)
    // console.log('bookid',JSON.parse(options.book_id))
    var book_info = JSON.parse(options.info)
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo
    })
    //1.动态获取设备屏幕的高度，然后计算scroll view的高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          pixelRatio: res.pixelRatio
        });
      }
    });
    console.log('从读书列表获取详细信息')
      // 获取点击图书的详细信息
      that.setData({
        bookMsg: book_info
      })
    console.log('bookmsg',that.data.bookMsg)
    console.log('根据剩余书本数量显示按钮')
    if(book_info.current_num>0){
      that.setData({
        showBorrowBtn:true
      })
    }else{
      that.setData({
        showOrderBtn: true
      })
    }
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
  borrowBook: function () {
    var that = this
    let userInfo = app.globalData.userInfo
    console.log('从全局变量获取用户详细信息')
    console.log('userInfo', userInfo)
    if ( userInfo == null
    ||userInfo.user_name == null){
      wx.showToast({
        title: '请到个人界面完善你的信息',
        icon: 'none',
        duration: 3000
      });
    }else{
      wx.request({
        url: conf.url+'borrowbook?',
        method: 'GET',
        data:
        {
          user_id: userInfo.user_id,
          // book_id: that.data.bookMsg.book_id,
        },
        success: function (res) {
          console.log('获取该用户借书数量')
          console.log('num',res.data.msg.length)
          if (res.data.msg.length > 0) {
            wx.showToast({
              title: '按照规定，每人只能借一本书',
              icon: 'none',
              duration: 3000
            });

          } else {
            wx.request({
              url: conf.url+'borrowbook?',
              data:
              {
                user_id: userInfo.user_id,
                book_id: that.data.bookMsg.book_id,
              },
              method: "POST",
              success: function (res) {
                console.log('添加借书记录')
                wx.navigateTo({
                  url: '../../borrowtip/borrowtip'
                });
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
      ||userInfo.user_id == null){
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