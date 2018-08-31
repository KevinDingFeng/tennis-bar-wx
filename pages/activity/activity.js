// pages/activity/activity.js
var utilJs = require("../../utils/util.js");
var pageIndex = 0;
var pageSize = 20;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    games:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.setNavigationBarTitle({
      title: '球局',
    })
    wx.request({
      url: getApp().globalData.onlineUrl + 'api/game',
      method:"GET",
      data:{
        "page": pageIndex,
        "value": pageSize
      },
      header: utilJs.hasTokenGetHeader(),
      success:function(res){
        console.log(res.data);
        if(res.data.code == "200"){
          that.setData({
            games: res.data.data.page
          })
        }
      }
    })

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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  
  // 查看球场地址详情
  openLocation: function (event) {
    let latitude = event.currentTarget.dataset.latitude;
    let longitude = event.currentTarget.dataset.longitude;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
    })
  },

  // 申请加入球局
  applyJoinGame:function(event){
    let game = event.currentTarget.dataset.game;
    wx.navigateTo({
      url: './apply/apply?game='+JSON.stringify(game),
    })
  }
})