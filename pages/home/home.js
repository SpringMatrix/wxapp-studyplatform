// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",

    // 推荐课程
    courses: ['../../resources/home_images/course1.jpg', '../../resources/home_images/course2.jpg', '../../resources/home_images/course3.jpg', '../../resources/home_images/course4.jpg', '../../resources/home_images/course5.jpg', '../../resources/home_images/course6.jpg', '../../resources/home_images/course7.jpg', '../../resources/home_images/course8.jpg'],

    course_name: ['数学', '物理', '学科辅导', '奥数', 'Book', 'School', '1v1辅导', '学科辅导'],


    mess1: 'Liu Ming Mei',
    mess2: '刘明媚',
    background: ['../../resources/home_images/1.jpg', '../../resources/home_images/2.jpg', '../../resources/home_images/3.jpg', '../../resources/home_images/4.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
  },

  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../voide/voide'
    })
  },
  onLoad: function() {
    var that = this
    // DEBUG 发送http请求需要获取微信userinfo，但由于网络延迟获取userinfo会在发送http之后

  },
  onReady: function() {
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '../index/index'
          })
        } else {
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
              that.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
              console.info(app.globalData.userInfo)
              wx.login({
                success: function(r) {
                  console.log("code:" + r.code + "\n end")
                  if (r.code) {
                    app.globalData.code = r.code; //登录凭证  
                    var url = 'http://localhost:8080/api/users/login'
                    //发起网络请求  
                    //console.info("????")
                    wx.request({
                      url: url,
                      method: "POST",
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      data: {
                        code: app.globalData.code,
                        name: app.globalData.userInfo.nickName,
                        avatar: app.globalData.userInfo.avatarUrl
                      },
                      dataType: 'json',
                      success: function(result) {
                        app.globalData.databaseUserInfo = result.data //数据库中的信息
                        app.globalData.openid = result.data.unionid
                        app.globalData.isLogin = true
                        console.log(app.globalData.databaseUserInfo)
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
            }
          })

        }
      }
    })


  }

})