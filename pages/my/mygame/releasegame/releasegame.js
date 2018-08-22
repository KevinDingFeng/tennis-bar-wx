// pages/my/mygame/releasegame/releasegame.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game:'',
    currentTab:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发布球局信息',
    })
    let that = this;
    let game = JSON.parse(options.game);
    that.setData({
      game: game
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
   * 发布人 取消球局
   */
  cancelGame:function(e){
    let id = e.currentTarget.dataset.id;
    wx.request({
      url: '',
      method:"POST",
      data:{

      },
      header: {
        "content-type": "application/x-www-form-urlencodedn"
      },
    })


  }
})