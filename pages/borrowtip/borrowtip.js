// pages/borrowtip/borrowtip.js
var conf = require('../../config');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        done: true,
        current: true,
        text: '步骤一：',
        desc: '查询图书'
      },
      {
        done: false,
        current: false,
        text: '步骤二：',
        desc: '申请借阅(若信息不完整，需完善个人信息)'
      },
      {
        done: false,
        current: false,
        text: '步骤三：',
        desc: '等待管理员处理'
      },
      {
        done: false,
        current: false,
        text: '步骤四：',
        desc: '取书'
      },
      {
        done: false,
        current: false,
        text: '步骤五：',
        desc: '借书完成'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('pages/tip onload')
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
    console.log('onShow')
    let reFreshsteps = this.data.steps
    wx.request({
      url: conf.url + 'borrowingbook',
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      method: 'GET',
      success: (res) => {
        if (res.data.msg.length == 1) {
          console.log(res.data.msg)
          
          switch (res.data.msg[0].borrow_status) {
            case '0':
              reFreshsteps[1].done = true
              reFreshsteps[1].current = true
              reFreshsteps[2].done = true
              this.setData({
                steps: reFreshsteps
              })
              break;
            case '1':
              
              reFreshsteps[1].done = true
              reFreshsteps[1].current = true
              reFreshsteps[2].done = true
              reFreshsteps[2].current = true
              reFreshsteps[3].done = true
              this.setData({
                steps: reFreshsteps
              })
              break;
            case '2':
              
              reFreshsteps[1].done = true
              reFreshsteps[1].current = true
              reFreshsteps[2].done = true
              reFreshsteps[2].current = true
              reFreshsteps[3].done = true
              reFreshsteps[3].current = true
              reFreshsteps[4].done = true
              reFreshsteps[4].current = true
              this.setData({
                steps: reFreshsteps
              })
              break;
          }
        }else{
          reFreshsteps[1].done = false
          reFreshsteps[1].current = false
          reFreshsteps[2].done = false
          reFreshsteps[2].current = false
          reFreshsteps[3].done = false
          reFreshsteps[3].current = false
          reFreshsteps[4].done = false
          reFreshsteps[4].current = false
          this.setData({
            steps: reFreshsteps
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
    
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