// pages/self/upload/uploadvideo/uploadvideo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unionid: '',
    information: {},
    modalHidden: true
  },

  formSubmit: function(e) {
    console.log(e.detail.value);

    this.setData({
      information: e.detail.value,
      modalHidden: false
    });
  },
  //模态框取消
  modalCancel() {
    wx.showToast({
      title: '取消提交',
      icon: 'none'
    })
    this.setData({
      modalHidden: true,
    })
  },
  //模态框确定
  modalConfirm() {
    var that = this
    var url = 'http://localhost:8080/api/courses/'
    wx.request({
      url: url,
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        unionid: app.globalData.openid,
        name: that.data.information.name,
        image_url: that.data.information.image_url,
        introduction: that.data.information.introduction,
        url: that.data.information.url,
        tag1: that.data.information.tag1,
        tag2: that.data.information.tag2,
        tag3: that.data.information.tag3,
      },
      dataType: 'json',
      success: function(result) {
        if (result.data == true) {
          wx.showToast({
            title: '提交成功',
            icon: 'success'
          })
        } else {
          wx.showToast({
            title: '提交失败!',
            image: '/resources/images/icon_error.png',
            duration: 3000
          });
        }
        console.log(result.data)
      },
      fail: function() {
        console.log(" post error")
      }
    })
    this.setData({
      modalHidden: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      unionid: options.unionid
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

  }
})