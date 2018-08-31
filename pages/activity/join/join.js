// pages/activity/join/join.js
var utilJs = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game :''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我要加入球局',
    })
    let game = JSON.parse(options.game);
    let that = this;
    that.setData({
      game : game
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
   * 加入球局
   */
  addGame:function(event){
    let id = event.currentTarget.dataset.id;
    let data = new Object();
    data.gameId = id;
    // data.wxUserInfoId = 2;
    wx.request({
      url: "http://localhost:6677/join/create",
      method :"POST",
      data:data,
      header: {
        "content-type": "application/json"
      },
      success:function(res){
        if (res.data.code == "200") {
          wx.showToast({
            title: '',
            icon:"success",
            success:function(){
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          })
        }else{
          wx.showToast({
            icon:"none",
            title: res.data.data,
          })
        }
      }
    })

  }

  
})