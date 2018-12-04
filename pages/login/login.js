// pages/login/login.js
const app = getApp()
var utilJs = require('../../utils/util.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
    },
    onGotUserInfo: function (e) {
        var _this = this;
        debugger
        if (e.detail.errMsg == "getUserInfo:ok") {
            if (!wx.getStorageSync('tennisToken')) {//!app.globalData.userInfo || 
                //获取用户数据
                app.login();

            } else {
                console.log("已经完成授权");
                app.globalData.tennisToken = wx.getStorageSync('tennisToken')
                wx.switchTab({
                    url: '../index/index',
                })
            }
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        debugger
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        }
        if (wx.getStorageSync('tennisToken')) {
            let _Token = wx.getStorageSync('tennisToken');
            console.log('token' + _Token);
            console.log(getApp().globalData.onlineUrl)
            debugger
            wx.request({
                url: getApp().globalData.onlineUrl + 'game/checktoken',
                method:"GET",
                header: {
                    "content-Type": "application/x-www-form-urlencoded",
                    "tennisToken": _Token
                },
                success: function (res) {
                    console.log("成功")
                    if (res.data.code == "200") {
                        wx.setStorageSync('tennisToken', _Token);
                        app.globalData.tennisToken = _Token
                        wx.switchTab({
                            url: '../index/index',
                        })
                    } else if (res.data.code == "201") {
                        let _Token = wx.clearStorage('tennisToken');
                        wx.showToast({
                            title: '暂未登陆，跳转中',
                            icon: 'none'
                        })
                        wx.redirectTo({
                            url: '../login/login',
                        })
                    }
                },
                fail: function () {
                    console.log("失败")
                }
            })
        }
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
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
    onShow: function (e) {
        console.log(e)
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