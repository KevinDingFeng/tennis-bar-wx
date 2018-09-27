// pages/my/joinconfirm/joinconfirm.js
var utilJs = require("../../../utils/util.js");
var sliderWidth = 115; // 需要设置slider的宽度，用于计算中间位置
var init_status = "WaitingConfirm";
var pageIndex = 0;
var pageSize = 20;
var isbottom = false;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabs: ["全部", "待确认", "已确认"],
        params: ["All", "WaitingConfirm", "Agree"],
        activeIndex: 1,
        sliderOffset: 0,
        sliderLeft: 0,
        confirms:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        wx.setNavigationBarTitle({
          title: '加入确认',
        })
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
        // 获取加入申请确认列表
        // that.getConfirmJoinGames(init_status);
    },
    tabClick: function (e) {
      let status = e.currentTarget.dataset.status;
      init_status = status;
      let that = this;
      // if (wx.getStorageSync(status)) {
        // that.setData({
        //   confirms: wx.getStorageSync(status)
        // })
      // } else {
        that.setData({confirms:[]});
        pageIndex = 0;
        isbottom = false;
        that.getConfirmJoinGames(status);
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
      pageIndex =0;
      this.setData({ confirms: [] })
      this.getConfirmJoinGames(init_status);
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
      pageIndex = 0;
      this.setData({ confirms: [] })
      this.getConfirmJoinGames(init_status);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      if (!isbottom) {
        this.getConfirmJoinGames(init_status);
      } else {
        wx.showToast({
          title: '已经到底了~',
          icon: 'none'
        })
      }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    /**
     * 发布者获取 球局申请列表
     */
    getConfirmJoinGames: function (status){
      let that = this;
      // 获取加入申请列表
      wx.request({
        url: getApp().globalData.onlineUrl + 'api/join/confirms',
        method: "POST",
        data: {
          "status": status,
          "page": pageIndex,
          "size": pageSize
        },
        header: utilJs.hasTokenGetHeader(), 
        success: function (res) {
          if (res.data.code == "200") {
            let confirm = that.data.confirms;
            confirm =confirm.concat(res.data.data.confirms.content);
            that.setData({
              confirms: confirm
            })
            if(res.data.data.confirms.content.length < pageSize){
              isbottom = true;
            } else {
              pageIndex++;
              isbottom = false;
            }
            // wx.setStorageSync(status, res.data.data.confirms);
          } else {
            wx.showToast({
              title: res.data.data,
              icon: 'none'
            })
          }
        }
      })
    },

    //详情
    viewDetail:function(e){
      let info = e.currentTarget.dataset.info;
      wx.navigateTo({
        url: './joinundetermined/joinundetermined?info=' + JSON.stringify(info),
      })

    }  
})