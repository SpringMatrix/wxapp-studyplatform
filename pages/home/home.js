// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    searchContent: "",
    searchList: {},
    baseUrl: "../video/video?id=",
    courseList: {},

    // 推荐课程


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
    var that = this
    var url = 'http://localhost:8080/api/courses/likename?name=' + e.detail.value
    wx.request({
      url: url,
      method: "GET",
      success: function (result) {
        that.setData({
          searchList: result.data
        })
      },
    })
  },

  bindViewTap: function(event) {
    var course_id = event.currentTarget.dataset.courseId
    console.info(event.currentTarget.dataset.courseId)
    wx.navigateTo({
      url: '../video/video?id=' + course_id
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
                        console.error(" post error")
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
          var url = 'http://localhost:8080/api/courses/all'
          wx.request({
            url: url,
            method: "GET",
            header: {
              "Content-Type": "application/json"
            },
            data: {},
            dataType: 'json',
            success: function(result) {
              if (result.data != null) {
                that.setData({
                  courseList: result.data
                })
              } else {
                wx.showToast({
                  title: '获取推荐课程失败!',
                  image: '../../resources/images/icon_error.png',
                  duration: 3000
                })
              }
            },
            fail: function() {
              console.error(" post error")
            }

          })

        }
      }
    })


  }

})