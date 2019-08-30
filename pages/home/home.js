// pages/home/home.js
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
  }
})