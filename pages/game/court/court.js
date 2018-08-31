// pages/game/court/court.js
var utilJs = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courts:{},
    game:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发布球局',
    })
    let that = this;
    let game =JSON.parse(options.game);
    that.setData({
      game:game
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
   * 搜索球场信息
   */
  querySubmit:function(e){
    let that = this;
    let courtName = e.detail.value.courtName;
    wx.request({
      url: "http://localhost:6677/game/courts?courtName="+courtName,
      method:"GET",
      header:{
        "content-type": "application/x-www-form-urlencodedn"
      },
      success:function(res){
        if(res.data.code == "200"){
          that.setData({
            courts:res.data.data.page
          })
        }
      }
    })
  },

  /**
   * 查看球场地址信息
   */
  openLocation:function(event){
    let latitude = event.currentTarget.dataset.latitude;
    let longitude = event.currentTarget.dataset.longitude;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
    })
  },

  /**
   * 选择球场 进入下一步
   */
  selectCourt:function(event){
    let game = this.data.game;
    let cid = event.currentTarget.dataset.id;
    game.courtId =cid;
    console.log(game);
    wx.navigateTo({
      url: '../demand/demand?game='+JSON.stringify(game),
    })
  },

  
})