// pages/note/note.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myNoteList: {}
  },

  bindViewTap: function(event) {
    var note_id = event.currentTarget.dataset.noteId
    var name = event.currentTarget.dataset.name

    var content = event.currentTarget.dataset.content
    console.info(event.currentTarget.dataset.noteId)
    wx.navigateTo({
      url: '../write_note/write_note?note_id=' + note_id + '&name=' + name + '&content=' + content
    })
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
    var url = 'http://localhost:8080/api/notes/unionid'
    var that = this
    wx.request({
      url: url,
      method: "GET",
      header: {
        "Content-Type": "application/json"
      },
      data: {
        unionid: app.globalData.openid
      },
      dataType: 'json',
      success: function (result) {
        if (result.data != null) {
          that.setData({
            myNoteList: result.data.reverse()
          })
        } else {
          wx.showToast({
            title: '获取笔记失败!',
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