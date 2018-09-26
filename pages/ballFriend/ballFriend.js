// pages/ballFriend/ballFriend.js
var utilJs = require("../../utils/util.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
      inputShowed: false,
      inputVal: "",
      ballFriend: "",
      pageNum: "",
      wxUserInfoId: "",
      wx_show:"1"
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.init();
    },
    init: function(){
      let that = this;
      wx.request({
        url: getApp().globalData.onlineUrl + 'api/wx_user_familiarity',
        method: "GET",
        header: utilJs.hasTokenGetHeader(),
        success: function (res) {
          if (res.data.code == "200") {
            if (res.data.data.list){
              that.setData({
                ballFriend: res.data.data.list,
                pageNum: res.data.data.pageNum,
                inputVal: res.data.data.keyword,
                wxUserInfoId: res.data.data.wxUserInfoId
              })
            }else{
              console.log("没有好友");
            
            }

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
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      this.addList();
    },
    addList: function(){
      var url = getApp().globalData.onlineUrl + 'api/wx_user_familiarity?';
    var pageNum = this.data.pageNum;
      pageNum = pageNum ? pageNum + 1 : 1;
      this.setData({
        pageNum: pageNum
      });
      url += "pageNum=" + pageNum;
      if(this.data.keyword){
        url += "keyword=" + this.data.keyword;
      }
      let that = this;
      wx.request({
        url: url,
        method: "GET",
        header: utilJs.hasTokenGetHeader(),
        success: function (res) {
          if (res.data.code == "200") {
            if (res.data.data.list){
              var ballFriend = that.data.ballFriend;
              console.log(ballFriend);
              ballFriend = ballFriend.concat(res.data.data.list);
              that.setData({
                ballFriend: ballFriend,
                pageNum: res.data.data.pageNum
              })
            }else{
              console.log("别拉了~没有了~");
            }

          }
        }
      })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
      return {
        title: "分享测试",
        path: "/pages/my/my",
        success: function(res){
          console.log(res.shareTickets);
        },
        fail: function(res){
          
        }
      };
    },
    friend_xx:function(e){
      wx.navigateTo({
        url: '../friendxx/friendxx?id=' + e.currentTarget.dataset.ballfriend
      })
    },
  search: function(){
    var keyword = this.data.inputVal;
    let that = this;
    wx.request({
      url: getApp().globalData.onlineUrl + 'api/wx_user_familiarity',
      method: "GET",
      header: utilJs.hasTokenGetHeader(),
      data:{
        keyword: keyword
      },
      success: function (res) {
        //console.log(res.data);
        if (res.data.code == "200") {
            debugger
          that.setData({
            ballFriend: res.data.data.list,
            pageNum: res.data.data.pageNum,
            inputVal: res.data.data.keyword,
            wxUserInfoId: res.data.data.wxUserInfoId
          })

        }
      }
    })
  }
})