// pages/dynamic/dynamic.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    length: 0,
    avatar: "//i0.hdslb.com/bfs/face/0138f6c4c55808f0af148587bf83a9419524757f.jpg",
    content: ""

  },
  userInput: function (e) {
    this.setData({
      length: e.detail.value.length,
      content: e.detail.value
    })
  },
  sendDynamic: function(e){
    var that = this
    if (this.data.length==0){
      wx.showToast({
        title: '输入不能为空!',
        image: '../../resources/images/icon_error.png',
        duration: 3000
      });
    }else{
      var url = 'http://localhost:8080/api/news/'
      wx.request({
        url: url,
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        data: {
          content: that.data.content,
          unionid: app.globalData.databaseUserInfo.unionid,
        },
        dataType: 'json',
        success: function (result) {
          if (result.data == true){
            wx.showToast({
              title: '发送成功!',
              icon: 'success',
              duration: 3000
            });
          } else {
            wx.showToast({
              title: '创建失败!',
              image: '../../resources/images/icon_error.png',
              duration: 3000
            });
          }
        },
        fail: function () {
          wx.showToast({
            title: '发送失败!',
            image: '../../resources/images/icon_error.png',
            duration: 3000
          });
          console.log(" post error")
        }
      })
      
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('刷新')
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
      console.log('onPullDownRefresh')
      this.onLoad()
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