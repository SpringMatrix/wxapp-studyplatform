// pages/voide/voide.js
var app = getApp()

function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}




Page({

  data: {
    ismark: false,
    courseInfo: {},
    src: '',
    danmuList: [{
      text: '第 1s 出现的弹幕',
      color: '#ff0000',
      time: 1
    }, {
      text: '第 3s 出现的弹幕',
      color: '#ff00ff',
      time: 3
    }],
  },

  onShareAppMessage() {
    return {
      title: 'video',
      path: 'page/component/pages/video/video'
    }
  },

  onLoad: function(options) {
    console.info("当前参数：" + options.id)
    var that = this
    var url = 'http://localhost:8080/api/courses/id'
    // 获取课程信息
    wx.request({
      url: url,
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        course_id: options.id
      },
      dataType: 'json',
      success: function(result) {
        that.setData({
          courseInfo: result.data
        })
        wx.setNavigationBarTitle({
          title: result.data.name
        })
        var url = 'http://localhost:8080/api/bookmarks/'
        // 请求是否有收藏关系
        wx.request({
          url: url,
          method: "GET",
          header: {
            "Content-Type": "application/json"
          },
          data: {
            course_id: that.data.courseInfo.course_id,
            unionid: app.globalData.openid
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
      fail: function() {
        console.error(" post error")
      }
    })

    
  },

  onReady() {
    this.videoContext = wx.createVideoContext('myVideo')
  },

  inputValue: '',

  bindInputBlur(e) {
    this.inputValue = e.detail.value
  },

  onBookmarkTap: function(event) {
    var that = this
    var url = 'http://localhost:8080/api/bookmarks/'
    if (!this.data.ismark) {
      // 若未收藏，点击爱心则添加收藏关系
      wx.request({
        url: url,
        method: "POST",
        header: {
          "Content-Type": "application/json",
          "system": "wxapp"
        },
        data: {
          course_id: that.data.courseInfo.course_id,
          unionid: app.globalData.openid
        },
        dataType: 'json',
        success: function (result) {
          if (result.data == true) {
            wx.showToast({
              title: '收藏成功!',
              icon: 'success',
              duration: 3000
            });
            that.setData({
              ismark: !that.data.ismark
            })
          } else {
            wx.showToast({
              title: '收藏失败!',
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
      // 若已收藏，点击爱心取消收藏
      wx.request({
        url: url,
        method: "DELETE",
        header: {
          "Content-Type": "application/json"
        },
        data: {
          course_id: that.data.courseInfo.course_id,
          unionid: app.globalData.openid
        },
        dataType: 'json',
        success: function (result) {
          if (result.data == true) {
            wx.showToast({
              title: '取消收藏成功!',
              icon: 'success',
              duration: 3000
            });
            that.setData({
              ismark: !that.data.ismark
            })
          } else {
            wx.showToast({
              title: '取消收藏失败!',
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

  bindButtonTap() {
    const that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },

  bindSendDanmu() {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },

  videoErrorCallback(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  }
})