// pages/self/myprofile/myprofile.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: ['男', '女', '保密'],
    index: 2,
    userNickName: "",
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
      userNickName: app.globalData.databaseUserInfo.name
    })
    console.info("wsl!!!!")
    if (app.globalData.databaseUserInfo.sex == "保密") {
      this.setData({
        index: 2
      })
    } else if (app.globalData.databaseUserInfo.sex == "男") {
      this.setData({
        index: 0
      })
    } else if (app.globalData.databaseUserInfo.sex == "女") {
      this.setData({
        index: 1
      })
    }
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

  bindPickerChange(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    wx.request({
      url: 'http://localhost:8080/api/users/regender',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        unionid: app.globalData.openid,
        newSex: that.data.gender[that.data.index]
      },
      dataType: 'json',
      success: function (result) {
        if (result.data == true) {
          wx.showToast({
            title: '修改成功!',
            icon: 'success',
            duration: 3000
          });
          app.globalData.databaseUserInfo.sex = that.data.gender[that.data.index]
        } else {
          wx.showToast({
            title: '修改失败',
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
  },

})