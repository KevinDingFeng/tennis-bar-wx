// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 我的球局
   */
  myGame:function(){
    wx.navigateTo({
      url: './mygame/mygame',
    })
  },

  /**
   * 加入确认 
   */
  joinconfirm:function(){
    wx.navigateTo({
      url: './joinconfirm/joinconfirm',
    })
  },

  /**
   * 加入申请
   */
  joinapply:function(){
    wx.navigateTo({
      url: './joinapply/joinapply',
    })
  }

})