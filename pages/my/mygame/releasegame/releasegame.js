// pages/my/mygame/releasegame/releasegame.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game:'',
    ages: { "LessThree": "3年以下", "LessFive": "3~5年", "LessTen": "5~10年", "MoreTen": "10年以上" },
    levels: { "Entry": "入门(0~1.0)", "Medium": "中级(1.5~3.5)", "Professional": "专业(4.0~7.0)" }
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
    wx.showModal({
      title: '取消球局',
      content: '是否取消球局',
      success:function(res){
        if(res.confirm){
          wx.request({
            url: 'http://localhost:6677/game/cancel',
            method: "POST",
            data: { "id": id },
            header: {
              "content-type": "application/json"
            },
            success: function (res) {
              if (res.data.code == "200") {
                wx.navigateBack({})
              }else{
                wx.showToast({
                  title: res.data.data,
                  icon:'none',
                })
              }
            }
          })
        }
      },
    })
  },
  
})