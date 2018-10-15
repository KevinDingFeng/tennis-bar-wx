// pages/my/joinapply/joinapply.js
var utilJs = require("../../../utils/util.js");
var sliderWidth = 115; // 需要设置slider的宽度，用于计算中间位置
var init_status ="Agree";
var pageIndex = 0;
var pageSize = 20;
var isbottom = false;
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
        applys:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        let that = this;
        wx.setNavigationBarTitle({
          title: '加入申请',
        })
        //初始化查询状态
        init_status = "Agree";
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
      
    },

    tabClick: function (e) {
        let status = e.currentTarget.dataset.status;
        init_status = status ;
        let that = this;
        // if (wx.getStorageSync(status)) {
          // that.setData({
          //   applys: wx.getStorageSync(status)
          // })
        // } else {
          that.setData({ applys: [] })
          pageIndex = 0;
          isbottom = false;
          that.getApplyJoinmGames(status);
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
      // 获取加入申请列表
      pageIndex = 0;
      this.setData({ applys: [] });
      this.getApplyJoinmGames(init_status);
    },


    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
      pageIndex = 0;
      this.setData({applys:[]});
      this.getApplyJoinmGames(init_status);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      if (!isbottom) {
        this.getApplyJoinmGames(init_status);
      } else {
        wx.showToast({
          title: '已经到底了~',
          icon: 'none'
        })
      }
    },

    /**
      * 获取 加入申请列表
      */
    getApplyJoinmGames: function (status) {
      let that = this;
      // 获取加入申请列表
      wx.request({
        url: getApp().globalData.onlineUrl + 'api/join/applys',
        method: "POST",
        data: {
          // "wxUserInfoId": wxUserInfoId,
          "status": status,
          "page": pageIndex,
          "size": pageSize
        },
        header: utilJs.hasTokenGetHeader(),
        success: function (res) {
          if (res.data.code == "200") {
            let apply = that.data.applys;
            apply = apply.concat(res.data.data.applys.content);
            that.setData({
              applys: apply
            })
            if(res.data.data.applys.content.length < pageSize){
              isbottom = true;
            } else {
              pageIndex++;
              isbottom = false;
            }
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