// pages/borrowtip/borrowtip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        current: false,
        done: true,
        text: '步骤一：',
        desc: '查询图书'
      },
      {
        done: true,
        current: false,
        text: '步骤二：',
        desc: '点击申请借阅(若信息不完整，需完善个人信息)'
      },
      {
        done: true,
        current: false,
        text: '步骤三：',
        desc: '取书'
      },
      {
        done: true,
        current: false,
        text: '步骤四：',
        desc: '待管理员确认'
      },
      {
        done: true,
        current: true,
        text: '步骤五：',
        desc: '借书完成'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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