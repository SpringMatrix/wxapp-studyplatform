// pages/userinfo/userinfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    ismark: false
  },

  onFocusTap: function() {
    var that = this
    var url = 'http://localhost:8080/api/follows/'
    if (!this.data.ismark) {
      // 若未关注，点击爱心则添加关注关系
      wx.request({
        url: url,
        method: "POST",
        header: {
          "Content-Type": "application/json",
          "system": "wxapp"
        },
        data: {
          unionid1: app.globalData.openid,
          unionid2: that.data.userInfo.unionid
        },
        dataType: 'json',
        success: function (result) {
          if (result.data == true) {
            wx.showToast({
              title: '关注成功!',
              icon: 'success',
              duration: 3000
            });
            that.setData({
              ismark: !that.data.ismark
            })
          } else {
            wx.showToast({
              title: '关注失败!',
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
    } else {
      // 若已关注，点击爱心取消关注
      wx.request({
        url: url,
        method: "DELETE",
        header: {
          "Content-Type": "application/json"
        },
        data: {
          unionid1: app.globalData.openid,
          unionid2: that.data.userInfo.unionid
        },
        dataType: 'json',
        success: function (result) {
          if (result.data == true) {
            wx.showToast({
              title: '取消关注成功!',
              icon: 'success',
              duration: 3000
            });
            that.setData({
              ismark: !that.data.ismark
            })
          } else {
            wx.showToast({
              title: '取消关注失败!',
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info("当前参数：" + options.id)
    var that = this
    var url = 'http://localhost:8080/api/users/unionid'
    // 获取课程信息
    wx.request({
      url: url,
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        unionid: options.unionid
      },
      dataType: 'json',
      success: function (result) {
        that.setData({
          userInfo: result.data
        })
        wx.setNavigationBarTitle({
          title: result.data.name
        })

        var url = 'http://localhost:8080/api/follows/'
        // 请求是否有收藏关系
        wx.request({
          url: url,
          method: "GET",
          header: {
            "Content-Type": "application/json"
          },
          data: {
            unionid1: app.globalData.openid,
            unionid2: that.data.userInfo.unionid
          },
          dataType: 'json',
          success: function (result) {
            if (result.data != '') {
              that.setData({
                ismark: true
              })
            }
            console.log(result.data)
          },
          fail: function () {
            console.error(" post error")
          }
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