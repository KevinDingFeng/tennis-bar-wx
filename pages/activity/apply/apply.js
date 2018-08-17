// pages/activity/apply/apply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game:'',
    position:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '球局详情',
    })
    let that = this;
    let game = JSON.parse(options.game);
    that.setData({
      game : game
    })
    // this.getGameInfo(options.id);
    // this.getPosition(game.organizerId);
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

  getPosition:function(organizerId){
    let that = this;
    wx.request({
      url: 'http://localhost:6677/',
    })
  },
  joinGame:function(event){
    let game = event.currentTarget.dataset.game;
    wx.navigateTo({
      url: '../join/join?game='+JSON.stringify(game),
    })

  }
  


})