// pages/my/myXX/phone/phone.js
var utilJs = require("../../../../utils/util.js");
var interval = null //倒计时函数
Page({

    /**
     * 页面的初始数据
     */
    data: {
        subText: "确认绑定",
        time: "获取验证码",
        currentTime: 90
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //t 是用来在 phoneNext 页面标识该请求来自 基础信息页面，还是修改手机号页面，从而分别显示不同的提示文字
        if (options.t) {
            wx.setNavigationBarTitle({
                title: '修改手机号',
            })
            this.setData({
                subText: "确认修改"
            });
        }
        let that = this;

        wx.request({
            url: getApp().globalData.onlineUrl + 'api/wx_user_info',
            method: "GET",
            header: utilJs.hasTokenGetHeader(),
            success: function (res) {
                console.log(res.data);
                if (res.data.code == "200") {
                    that.setData({
                        wxUserInfo: res.data.data
                    });
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

    },
    inputPhone: function (e) {
        this.setData({
            phone: e.detail.value
        });
    },
    inputCode: function (e) {
        console.log(e.detail.value);
        this.setData({
            code: e.detail.value
        });
    },
    sendCode: function () {
        var that = this;
        var p = that.data.phone;
        if (p) {
            wx.request({
                url: getApp().globalData.onlineUrl + 'api/sms_code/send',
                method: "GET",
                header: utilJs.hasTokenGetHeader(),
                data: {
                    cellphone: p
                },
                success: function (res) {
                    var title = res.data.code == 200 ? '发送成功' : res.data.data;
                    var currentTime = that.data.currentTime
                    interval = setInterval(function () {
                        currentTime--;
                        that.setData({
                            time: currentTime + '秒'
                        })
                        if (currentTime <= 0) {
                            clearInterval(interval)
                            that.setData({
                                time: '重新发送',
                                currentTime: 90,
                                disabled: false
                            })
                        }
                    }, 1000)
                    wx.showToast({
                        title: title,
                        icon: 'none'
                    })
                }
            })
        } else {
            wx.showToast({
                title: '请输入手机号',
                icon: 'none'
            })
        }
    },
    save: function () {
        // console.log("asdfasdf");
        // wx.navigateTo({
        //   url: '../myXX'

        // })

        var p = this.data.phone;
        var c = this.data.code;
        if (p && c) {
            wx.request({
                url: getApp().globalData.onlineUrl + 'api/wx_user_info/update/cellphone',
                method: "POST",
                header: utilJs.hasTokenPostHeader(),
                data: {
                    cellphone: p,
                    code: c
                },
                success: function (res) {
                    console.log(res.data);
                    if (res.data.code == "200") {
                        //保存成功，返回基础信息
                        wx.navigateTo({
                            url: '../myXX'
                        })
                    } else {
                        wx.showToast({
                            title: res.data.data,
                            icon: 'none'
                        })
                    }
                }
            })
        } else {
            wx.showToast({
                title: '信息不完整',
                icon: 'none'
            })
        }
    }
})