// pages/application/application.js
var utilJs = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apply:'',
    status: {"agree":"已同意", "refuse":"已拒绝"},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '申请详情',
    })
    let data =JSON.parse(options.data);
    this.setData({
      apply:data
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

  //退出球局
  quitGame:function(e){
    let applyId = e.currentTarget.dataset.id;
    let that = this;
    // 获取加入申请列表
    wx.request({
      url: getApp().globalData.onlineUrl + 'api/join/quit',
      method: "POST",
      data: {
        "applyId": applyId
      },
      header: utilJs.hasTokenPostHeader,
      success: function (res) {
        if (res.data.code == "200") {
          console.log(res);
        }
      }
    })
  }
  

  
})