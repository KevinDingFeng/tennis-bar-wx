// pages/my/my.js
var utilJs = require("../../utils/util.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        wx.setNavigationBarTitle({
            title: '我的',
        })
        wx.request({
          url: getApp().globalData.onlineUrl + 'api/wx_user_info',
            method: "GET",
          header: utilJs.hasTokenGetHeader(),
            success: function(res) {
                console.log(res.data);
                if (res.data.code = "200") {

                    that.setData({
                        userInfo: res.data.data
                    })

                }
            }
        })
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    /**
     * 我的球局
     */
    myGame: function() {
        wx.navigateTo({
            url: './mygame/mygame',
        })
    },
    /**
     * 基本信息
     */
    baseMsg: function() {
        wx.navigateTo({
            url: './myXX/myXX',
        })
    },
    joinapply: function() {
        wx.navigateTo({
            url: './joinapply/joinapply',
        })
    },
    joinconfirm: function() {
        wx.navigateTo({
            url: './joinconfirm/joinconfirm',
        })
    },

    // 跳转基本信息
    my_xx: function() {
        wx.navigateTo({
            url: './myXX/myXX',
        })
    },
    //跳转自我评价
    my_grade: function () {
        wx.navigateTo({
            url: './myevaluate/myevaluate',
        })
    },
    my_news:function(){
        wx.navigateTo({
            url: './mynews/mynews',
        })
    }
})