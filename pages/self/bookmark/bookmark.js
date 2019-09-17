var app = getApp()

Page({
  data: {
    icon: "../../../resources/images/icon_ai_20px.png",
    bookmarkList: {},
    inputShowed: false,
    inputVal: "",
    baseUrl: "../../video/video?id="
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  onLoad: function(){
    var that = this
    var url = 'http://localhost:8080/api/courses/unionid/bookmark'
    wx.request({
      url: url,
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        unionid: app.globalData.openid
      },
      dataType: 'json',
      success: function (result) {
        that.setData({
          bookmarkList: result.data.reverse()
        })

        console.log(result.data)
      },
      fail: function () {
        console.error(" post error")
      }
    })
  },

  onShow: function() {
    var that = this
    var url = 'http://localhost:8080/api/courses/unionid/bookmark'
    wx.request({
      url: url,
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        unionid: app.globalData.openid
      },
      dataType: 'json',
      success: function (result) {
        that.setData({
          bookmarkList: result.data.reverse()
        })

        console.log(result.data)
      },
      fail: function () {
        console.error(" post error")
      }
    })
  }
});