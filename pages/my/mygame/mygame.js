// pages/my/mygame/mygame.js
var utilJs = require("../../../utils/util.js");
var init_type = "join";
var pageIndex = 0;
var pageSize = 20;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // tab切换
        currentTab: 0,
        joinGame: '',
        releaseGame: '',
        games:'',
        keyword:'',
        inputVal:''

    },
    showInput: function() {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function() {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function() {
        this.setData({
            inputVal: ""
        });
        this.getMyGames(init_type);
    },
    inputTyping: function(e) {
        this.setData({
            inputVal: e.detail.value
        });
        this.getMyGames(init_type);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      wx.setNavigationBarTitle({
        title: '我的球局',
      })
      this.getMyGames(init_type);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
    },

    /**
     * 获取我的球局数据
     */
    getMyGames:function(types){
      let that = this;
      wx.request({
        url: getApp().globalData.onlineUrl + 'api/join/query?type=' + types + '&keyword=' + this.data.inputVal,
        method: "GET",
        data:{
          "page": pageIndex,
          "value": pageSize
        },
        header: utilJs.hasTokenGetHeader(),
        success: function (res) {
          if (res.data.code == "200") {
            that.setData({
              games: res.data.data.page,
            })
            // wx.setStorageSync(types, res.data.data.page);
          }else{
            wx.showToast({
              title: res.data.data,
              icon:'none'
            })
          }
        }
      })
    },

    /**
     * 点击tab切换
     */
    swichNav: function(e) {
        let that = this;
        let types = e.target.dataset.type;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
          // if(wx.getStorageSync(types)){
            that.setData({
              games: wx.getStorageSync(types)
            })
          // }else{
            this.getMyGames(types);
          // }
          that.setData({
              currentTab: e.target.dataset.current
          })
        }
        init_type = types;
    },

    /**
     * 参与球局
     */
    joinGameDetail:function(e){
      let game = e.currentTarget.dataset.game;
      wx.navigateTo({
        url: './joingame/joingame?game=' + JSON.stringify(game),
      })
    },

    /**
     * 发布球局
     */
    releaseGameDetail:function(e){
      let game = e.currentTarget.dataset.game;
      wx.navigateTo({
        url: './releasegame/releasegame?game='+JSON.stringify(game),
      })
    },

    // 查看球场地址详情
    openLocation: function (event) {
      let latitude = event.currentTarget.dataset.latitude;
      let longitude = event.currentTarget.dataset.longitude;
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
      })
    },

})