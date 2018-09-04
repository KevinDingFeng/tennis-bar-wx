// pages/activity/apply/apply.js
var utilJs = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game:'',
    ages: { "LessThree": "3年以下", "LessFive": "3~5年", "LessTen": "5~10年", "MoreTen":"10年以上"},
    levels: { "Entry": "入门(0~1.0)", "Medium": "中级(1.5~3.5)", "Professional":"专业(4.0~7.0)"}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '球局详情',
    })
    let that = this;
    if(options.game){
      that.setData({
        game: JSON.parse(options.game)
      })
    }
    if(options.id){
      that.getGameInfo(options.id);
    }
  },
  onShow:function(){

  },
  //获取球局信息  分享步骤
  getGameInfo:function(id){
    let that = this ;
    wx.request({
      url: getApp().globalData.onlineUrl + 'api/game/' + id,
      method:'GET',
      header: utilJs.hasTokenGetHeader(),
      success:function(res){
        if(res.data.code == '200'){
          let game = res.data.data.game;
          that.setData({game:game})
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
   * 分享
   */
  onShareAppMessage:function(){
    return {
      title:"网球吧",
      path: "/pages/activity/apply/apply?id="+this.data.game.id,
    };
  },

  joinGame:function(event){
    let game = event.currentTarget.dataset.game;
    wx.navigateTo({
      url: '../join/join?game='+JSON.stringify(game),
    })
  },

})