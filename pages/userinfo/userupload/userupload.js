// pages/userinfo/userupload/userupload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: "../../../video/video?id=",
    uploadList: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var url = 'http://localhost:8080/api/courses/unionid?unionid=' + options.unionid
    wx.request({
      url: url,
      method: "GET",
      header: {
        "Content-Type": "application/json"
      },
      data: {
      },
      dataType: 'json',
      success: function (result) {
        that.setData({
          uploadList: result.data.reverse()
        })
        wx.setNavigationBarTitle({
          title: options.name + "的上传"
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