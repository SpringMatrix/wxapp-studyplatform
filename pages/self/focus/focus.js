// pages/self/focus/focus.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    followList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var url = 'http://localhost:8080/api/users/unionid/follow'
    wx.request({
      url: url,
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        unionid: app.globalData.openid
      },
      dataType: 'json',
      success: function (result) {
        that.setData({
          followList: result.data.reverse()
        })

        console.log(result.data)
      },
      fail: function () {
        console.error(" post error")
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