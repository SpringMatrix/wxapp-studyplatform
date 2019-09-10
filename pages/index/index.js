const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    commodities: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../home/home'
    })
  },
  onLoad: function() {
    var that = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          console.info(app.globalData.userInfo)
        }
      })
    }
    wx.login({
      success: function(r) {
        console.log("code:" + r.code + "\n end")
        if (r.code) {
          app.globalData.code = r.code; //登录凭证  
          var url = 'http://localhost:8080/api/users/login'
          //发起网络请求  
          wx.request({
            url: url,
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              code: app.globalData.code
            },
            dataType: 'json',
            success: function(result) {
              console.log(result.data)
            },
            fail: function() {
              console.log(" post error")
            }
          })
        }
      },
      fail: function() {
        console.log("error")
      }
    })
    //commodities: getCom()
  },
  getUserInfo: function(info) {
    console.log(info)
    app.globalData.userInfo = info.detail.userInfo
    this.setData({
      userInfo: info.detail.userInfo,
      hasUserInfo: true
    })
  }
})