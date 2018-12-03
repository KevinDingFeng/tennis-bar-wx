// pages/friendxx/friendxx.js
var utilJs = require("../../utils/util.js");
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: "1"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        wx.setNavigationBarTitle({
            title: '球友详情',
        })
        wx.request({
            url: getApp().globalData.onlineUrl + 'api/wx_user_familiarity/' + options.id,
            method: "GET",
            header: utilJs.hasTokenGetHeader(),
            success: function (res) {
                console.log(res.data);
                if (res.data.code == "200") {
                    that.setData({
                        familiarity: res.data.data.familiarity,
                        data: res.data.data.data,
                        evaluation: res.data.data.evaluation,
                        wxUserInfoId: res.data.data.wxUserInfoId,
                        playAges: res.data.data.playAges,
                        playFrequencies: res.data.data.playFrequencies,
                        skillLevels: res.data.data.skillLevels
                    })
                    let _list = res.data.data.list
                    if (_list) {
                        for (var i = 0; i < _list.length; i++) {
                            _list[i].game.startTime = _list[i].game.startTime.substr(0, 13);
                            _list[i].game.endTime = _list[i].game.endTime.substr(0, 13);
                        }
                        that.setData({
                            list: _list
                        })
                    } else {
                        that.setData({
                            show: "2"
                        })
                    }
                    console.log(that.data.evaluation.skillLevel);
                }
            }
        })
    },
    applyJoinGame: function (event) {
        let game = event.currentTarget.dataset.game;
        debugger
        wx.navigateTo({
            url: '../activity/apply/apply?game=' + JSON.stringify(game)+"&cc=1",
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