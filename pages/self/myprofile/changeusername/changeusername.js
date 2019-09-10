// pages/self/myprofile/changeusername/changeusername.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    length: 0,
    newName: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },
  userInput: function(e) {
    this.setData({
      length: e.detail.value.length,
      newName: e.detail.value
    })
  },
  changeConfirm: function() {
    var that = this;
    if (this.data.length >= 30) {
      wx.showToast({
        title: '不能超过30位!',
        image: '../../../../resources/images/icon_error.png',
        duration: 3000
      });
    }else if (this.data.length != 0) {
      wx.showModal({
        title: '确认更名',
        content: '您已输入新昵称，是否确认修改',
        confirmText: "是",
        cancelText: "否",
        success: function(res) {
          console.log(res);
          if (res.confirm) {
            console.log('用户点击主操作')
            wx.request({
              url: 'http://localhost:8080/api/users/rename',
              method: "POST",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                unionid: app.globalData.openid,
                newName: that.data.newName
              },
              dataType: 'json',
              success: function(result) {
                if (result.data == true) {
                  wx.showToast({
                    title: '修改成功!',
                    icon: 'success',
                    duration: 3000
                  });
                  app.globalData.databaseUserInfo.name = that.data.newName
                } else {
                  wx.showToast({
                    title: '修改失败',
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

          } else {
            console.log('用户点击辅助操作')
          }
        }
      });
    } else {
      wx.showToast({
        title: '输入不能为空!',
        image: '../../../../resources/images/icon_error.png',
        duration: 3000
      });
    }
  }
})