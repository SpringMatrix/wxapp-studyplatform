// pages/write_note/write_node.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    note_id: 0,
    name: '',
    content: '',
    length: 0,
    contnetNew: '',
    value1: '',
    value2: '',
    value3: '',
    value4: '输入框已禁用',
    value5: '',
    value6: '',
    value7: ''
  },

  userInput: function(e) {
    this.setData({
      length: e.detail.value.length,
      contentNew: e.detail.value
    })
  },

  onEditIt: function() {
    var that = this
    if (this.data.length == 0) {
      wx.showToast({
        title: '输入不能为空!',
        image: '../../resources/images/icon_error.png',
        duration: 3000
      });
    } else {
      var url = 'http://localhost:8080/api/notes/'
      wx.request({
        url: url,
        method: "PUT",
        header: {
          "Content-Type": "application/json"
        },
        data: {
          id: that.data.note_id,
          content: that.data.contentNew
        },
        dataType: 'json',
        success: function(result) {
          console.info(result.data)
          if (result.data == true) {
            wx.showToast({
              title: '更新成功!',
              icon: 'success',
              duration: 3000
            });
          } else {
            wx.showToast({
              title: '更新失败!',
              image: '../../resources/images/icon_error.png',
              duration: 3000
            });
          }
        },
        fail: function() {
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

  onDeleteIt: function() {
    var that = this
    var url = 'http://localhost:8080/api/notes/?id=' + this.data.note_id
    wx.request({
      url: url,
      method: "DELETE",
      header: {
        "Content-Type": "application/json"
      },
      data: {},
      dataType: 'json',
      success: function(result) {
        console.info(result.data)
        if (result.data == true) {
          wx.showToast({
            title: '删除成功!',
            icon: 'success',
            duration: 3000
          });
        } else {
          wx.showToast({
            title: '删除失败!',
            image: '../../resources/images/icon_error.png',
            duration: 3000
          });
        }
      },
      fail: function() {
        wx.showToast({
          title: '发送失败!',
          image: '../../resources/images/icon_error.png',
          duration: 3000
        });
        console.log(" post error")
      }
    })
  },

  onDeleteConfirm: function() {
    var that = this
    wx.showModal({
      title: '确认删除',
      content: '确认删除?删除将无法恢复',
      confirmText: "是",
      cancelText: "否",
      success: function(res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
          that.onDeleteIt()
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var note_id = options.note_id
    var name = options.name
    var content = options.content
    console.info(content)
    this.setData({
      note_id: note_id,
      name: name,
      content: content,
      length: content.length,
      contentNew: content
    })
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

  }
})