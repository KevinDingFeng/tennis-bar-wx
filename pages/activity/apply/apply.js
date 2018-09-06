// pages/activity/apply/apply.js
var utilJs = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game:'',
    ages: { "LessThree": "3年以下", "LessFive": "3~5年", "LessTen": "5~10年", "MoreTen":"10年以上"},
    levels: { "Entry": "入门(0~1.0)", "Medium": "中级(1.5~3.5)", "Professional":"专业(4.0~7.0)"},
    joiner:'',
    court_img:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '球局详情',
    })
    if (!wx.getStorageSync('tennisToken')){
      wx.redirectTo({
        url: '../../login/login',
      })
    }else{
      let that = this;
      if (options.game) {
        that.setData({
          game: JSON.parse(options.game)
        })
        that.getJoinGamerInfo(JSON.parse(options.game).id);
        that.getCourtImgInfo(JSON.parse(options.game).courtId);
      }
      if (options.id) {
        that.getGameInfo(options.id);
        that.getJoinGamerInfo(options.id);
        that.getCourtImgInfo(that.data.game.courtId);
      }
    }

  },

  onShow: function () {

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
  //获取参加球局的球友  信息
  getJoinGamerInfo:function(id){
    let that = this ;
    wx.request({
      url: getApp().globalData.onlineUrl + 'api/join/info',
      method: 'POST',
      data:{
        "gameId":id
      },
      header: utilJs.hasTokenGetHeader(),
      success: function (res) {
        if (res.data.code == '200') {
          let joiner = res.data.data.list;
          that.setData({ joiner: joiner })
        }
      }
    })
  },
  //获取球场图片信息
  getCourtImgInfo: function (id) {
    let that = this;
    wx.request({
      url: getApp().globalData.onlineUrl + 'api/court_img/list?courtId='+id,
      method: 'GET',
      header: utilJs.hasTokenGetHeader(),
      success: function (res) {
        if (res.data.code == '200') {
          let courtImg = res.data.data;
          that.setData({ court_img: courtImg })
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
      title:"来“一桔”网球吧",
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