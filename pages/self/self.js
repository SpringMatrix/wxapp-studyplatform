// pages/self/myself.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAvatar: "//i0.hdslb.com/bfs/face/0138f6c4c55808f0af148587bf83a9419524757f.jpg",
    userInfo: {},
    userNickName: '',
    userPoint: 0,
    userFollow: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userNickName: app.globalData.databaseUserInfo.name,
      userAvatar: app.globalData.userInfo.avatarUrl,
      userPoint: app.globalData.databaseUserInfo.point,
      userFollow: app.globalData.databaseUserInfo.follow_num
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      userNickName: app.globalData.databaseUserInfo.name,
      userAvatar: app.globalData.userInfo.avatarUrl,
      userPoint: app.globalData.databaseUserInfo.point,
      userFollow: app.globalData.databaseUserInfo.follow_num
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  openCheckin: function() {
    var that = this
    wx.request({
      url: 'http://localhost:8080/api/users/punch',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        unionid: app.globalData.openid
      },
      dataType: 'json',
      success: function(result) {
        if (result.data == true) {
          wx.showToast({
            title: '签到成功!',
            icon: 'success',
            duration: 3000
          });
          app.globalData.databaseUserInfo.point = app.globalData.databaseUserInfo.point + 1
          that.setData({
            userPoint: app.globalData.databaseUserInfo.point
          })
        } else {
          wx.showToast({
            title: '今日已签到!',
            image: '../../resources/images/icon_error.png',
            duration: 3000
          });
        }
        console.log(result.data)
      },
      fail: function() {
        console.log(" post error")
      }
    })

  },
})