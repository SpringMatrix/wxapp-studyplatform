// pages/self/myself.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCheckin: 0,
    avatar: "//i0.hdslb.com/bfs/face/0138f6c4c55808f0af148587bf83a9419524757f.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.info("加载中");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.info("加载完毕");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.info("页面已显示");
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

  openCheckin: function() {
    if (this.data.isCheckin==0) {
      this.data.isCheckin=1;
      wx.showToast({
        title: '签到成功!',
        icon: 'success',
        duration: 3000
      });
    } else {
      wx.showToast({
        title: '今日已签到!',
        icon: 'success',
        duration: 3000
      });
    }
  },
})