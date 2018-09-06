// pages/application/application.js
var utilJs = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apply:'',
    joiner: '', //参与人
    court_img:'', //球场图片
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
    this.getJoinGamerInfo(data.gameId);
    this.getCourtImgInfo(data.game.courtId);
  },
  //获取参加球局的球友  信息
  getJoinGamerInfo: function (id) {
    let that = this;
    wx.request({
      url: getApp().globalData.onlineUrl + 'api/join/info',
      method: 'POST',
      data: {
        "gameId": id
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
      url: getApp().globalData.onlineUrl + 'api/court_img/list?courtId=' + id,
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
      header: utilJs.hasTokenGetHeader(),
      success: function (res) {
        if (res.data.code == "200") {
          console.log(res);
        }
      }
    })
  }
  

  
})