// pages/game/demand/demand.js
var utilJs = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.setNavigationBarTitle({
      title: '发布球局',
    });
    let game = JSON.parse(options.game);
    that.setData({
      game:game
    })
    console.log(game);
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
  formSubmit:function(e){
    var formData = e.detail.value;
    let game = this.data.game;
    game.playAge = formData.playAge;
    game.skillLevel = formData.skillLevel;
    game.totalNum = formData.totalNum;
    game.limitGender = formData.limitGender;
    game.holderNum = formData.holderNum;
    game.deadlineTime = formData.deadlineTime;
    game.remark = formData.remark;
    wx.request({
      url: 'http://localhost:6677/game/create',
      data: JSON.stringify(game),
      method:'POST',
      header:{
        "content-type": "application/json"
      },
      success:function(res){
        if(res.data.code == "200"){
          wx.switchTab({
            url: '/pages/activity/activity',
          })
        }
      }
    })

  }

  
})