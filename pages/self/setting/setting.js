// pages/self/setting/setting.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    privacy: 0,
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
    this.setData({
      privacy: app.globalData.databaseUserInfo.privacy
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

  },

  privacyChange: function(e){
    var that = this
    console.log('switch 发生 change 事件，携带值为', e.detail.value)

    wx.request({
      url: 'http://localhost:8080/api/users/reprivacy',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        unionid: app.globalData.openid
      },
      dataType: 'json',
      success: function (result) {
        if (result.data == true) {
          wx.showToast({
            title: '修改成功!',
            icon: 'success',
            duration: 3000
          });
          app.globalData.databaseUserInfo.privacy = !app.globalData.databaseUserInfo.privacy
          that.setData({
            privacy: app.globalData.databaseUserInfo.privacy
          })
        } else {
          wx.showToast({
            title: '修改失败!',
            image: '../../resources/images/icon_error.png',
            duration: 3000
          });
        }
        console.log(result.data)
      },
      fail: function () {
        console.log(" post error")
      }
    })

  }
})