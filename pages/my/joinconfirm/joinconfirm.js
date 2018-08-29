// pages/my/joinconfirm/joinconfirm.js
var sliderWidth = 115; // 需要设置slider的宽度，用于计算中间位置
var init_status = "WaitingConfirm";
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
        confirms:''
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
        that.getConfirmJoinGames(1,init_status);
    },
    tabClick: function (e) {
      let status = e.currentTarget.dataset.status;
      let that = this;
      // if (wx.getStorageSync(status)) {
        that.setData({
          confirms: wx.getStorageSync(status)
        })
      // } else {
        that.getConfirmJoinGames(1, status);
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    /**
     * 发布者获取 球局申请列表
     */
    getConfirmJoinGames: function (organizerId,status){
      let that = this;
      // 获取加入申请列表
      wx.request({
        url: 'http://localhost:6677/join/confirms',
        method: "POST",
        data: {
          "organizerId": organizerId,
          "status": status
        },
        header: {
          "content-Type": "application/json"
        },
        success: function (res) {
          if (res.data.code == "200") {
            console.log(res.data.data.confirms);
            that.setData({
              confirms: res.data.data.confirms
            })
            // wx.setStorageSync(status, res.data.data.confirms);
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