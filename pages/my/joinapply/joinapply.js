// pages/my/joinapply/joinapply.js
var utilJs = require("../../../utils/util.js");
var sliderWidth = 115; // 需要设置slider的宽度，用于计算中间位置
var init_status ="Agree";
var pageIndex = 0;
var pageSize = 20;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabs: ["全部", "已同意", "已拒绝"],
        params:["All","Agree","Refuse"],
        activeIndex: 1,
        sliderOffset: 0,
        sliderLeft: 0,
        applys:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        let that = this;
        wx.setNavigationBarTitle({
          title: '加入申请',
        })
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
      // 获取加入申请列表
      this.getApplyJoinmGames(2, init_status);
    },

    tabClick: function (e) {
        let status = e.currentTarget.dataset.status;
        let that = this;
        // if (wx.getStorageSync(status)) {
          that.setData({
            applys: wx.getStorageSync(status)
          })
        // } else {
          that.getApplyJoinmGames(2, status);
        // }
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
      * 获取 加入申请列表
      */
    getApplyJoinmGames: function (wxUserInfoId, status) {
      let that = this;
      // 获取加入申请列表
      wx.request({
        url: getApp().globalData.onlineUrl + 'api/join/applys',
        method: "POST",
        data: {
          // "wxUserInfoId": wxUserInfoId,
          "status": status,
          "page": pageIndex,
          "value": pageSize
        },
        header: utilJs.hasTokenGetHeader(),
        success: function (res) {
          if (res.data.code == "200") {
            that.setData({
              applys: res.data.data.applys
            })
            // wx.setStorageSync(status, res.data.data.applys);
          }else{
            wx.showToast({
              title: res.data.data,
              icon:'none'
            })
          }
        }
      })
    },

    //申请详情
    gameDetail:function(e){
      let data = e.currentTarget.dataset.apply;
      wx.navigateTo({
        url: '../../application/application?data='+JSON.stringify(data),
      })
    }  

})