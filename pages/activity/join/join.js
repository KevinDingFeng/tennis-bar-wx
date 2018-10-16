// pages/activity/join/join.js
var utilJs = require("../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    game :'',
    joiner:'',
    checked:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我要加入球局',
    })
    let game = JSON.parse(options.game);
    let types = options.type;
    let that = this;
    that.setData({
      game : game, types : types == null ? '':types
    })
    that.getJoinGamerInfo(game.id);
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
  checkSelected:function(e){
    if (e.detail.value == ''){
      this.setData({checked:false})
    }else{
      this.setData({checked:true})
    }
  },
  /**
   * 加入球局
   */
  addGame:function(event){
    if(!this.data.checked){
      wx.showToast({
        title: '请勾选协议',
        icon:'none'
      })
      return false;
    }
    let id = event.currentTarget.dataset.id;
    let data = new Object();
    data.gameId = id;
    // data.wxUserInfoId = 2;
    wx.request({
      url: getApp().globalData.onlineUrl + 'api/join/create?types='+ this.data.types,
      method :"POST",
      data:data,
      header: utilJs.hasTokenGetHeader(),
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