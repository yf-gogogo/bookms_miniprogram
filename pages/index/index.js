var app = getApp();
// import Rx from 'rxjs';
var conf = require('../../config');
Page({
  data: {
    bookList: [],
    inputShowed: false,
    inputVal: ""
  },
  inputChange: function (e) {
    this.data.inputVal = e.detail.value;
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal:e.detail.value
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //console.log('onload index')
    var that = this;

    wx.request({
      url: conf.url+'booklist',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res){
      
        that.setData({
          bookList:res.data
        });
      }
    })
  },
  onShow: function () {
    // 页面显示
    console.log('页面显示')
    var that = this;

    wx.request({
      url: conf.url + 'booklist',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {

        that.setData({
          bookList: res.data
        });
      }
    })
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    var that = this 
    wx.request({
      url: conf.url + 'booklist',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {

        that.setData({
          bookList: res.data
        });
        wx.showToast({
          title: '刷新成功',
          icon: 'success',
          duration: 2000
        })
        wx.stopPullDownRefresh()
      }
    })
  },

  inputTyping: function (e) {
    var that = this;
    this.setData({
      inputVal: e.detail.value
    })

    console.log(that.data.inputVal)
    wx.request({
      url: conf.url+'searchbook',
      header: {},
      data:
      {
        book_name: e.detail.value,
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data['msg'] != 'not find') {
          console.log("hello")
          var books = [];
          for (var i = 0; i < res.data['msg'].length; i++) {
            books.push(res.data['msg'][i]);
          }
          that.setData({
            bookList: books
          });
        }
        console.log(that.data.bookList);
      }
    })
  },
  goToDetailPage: function (e) {
    
    var info = e.currentTarget.dataset.info;
    console.log('页面跳转', info)
    wx.navigateTo({
      
      url: '../bookdetail/bookdetail?info=' + JSON.stringify(info)
    });
  },
})