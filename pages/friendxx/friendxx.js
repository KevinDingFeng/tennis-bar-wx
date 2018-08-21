// pages/friendxx/friendxx.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // console.log(options);
      let that = this;
      wx.setNavigationBarTitle({
        title: '球友详情',
      })
      wx.request({
        url: 'http://localhost:6677/api/wx_user_familiarity/' + options.id,
        method: "GET",
        header: {
          "content-Type": "application/json"
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.code = "200") {

            that.setData({
              familiarity: res.data.data.familiarity,
              data: res.data.data.data,
              evaluation: res.data.data.evaluation,
              wxUserInfoId: res.data.data.wxUserInfoId

            })
            if (res.data.data.list){
              that.setData({
                list: res.data.data.list
              })
            }
            console.log(that.data.evaluation.skillLevel);
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})