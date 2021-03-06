// pages/my/myXX/phone/phone.js
var utilJs = require("../../../../utils/util.js");
var interval = null //倒计时函数
Page({

    /**
     * 页面的初始数据
     */
    data: {
        time: "获取验证码",
        currentTime: 90,
        disabled: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        if (options.phone) {
            this.setData({
                phone: options.phone
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
    sendCode: function () {
        var that = this;
        if (this.data.disabled == false) {
            wx.request({
                url: getApp().globalData.onlineUrl + 'api/sms_code/send',
                method: "GET",
                header: utilJs.hasTokenGetHeader(),
                success: function (res) {
                    var title = res.data.code == 200 ? '发送成功' : res.data.data;
                    var currentTime = that.data.currentTime;
                    interval = setInterval(function () {
                        currentTime--;
                        that.setData({
                            time: "剩余" + currentTime + '秒'
                        })
                        if (currentTime <= 0) {
                            clearInterval(interval)
                            that.setData({
                                time: '重新发送',
                                currentTime: 90,
                                disabled: false
                            })
                        } else {
                            that.setData({
                                disabled: true
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
                title: '90秒后再试！',
                icon: 'none'
            })
        }
    },
    inputCode: function (e) {
        this.setData({
            code: e.detail.value
        });
    },
    //t 是用来在 phoneNext 页面标识该请求来自 基础信息页面，还是修改手机号页面，从而分别显示不同的提示文字
    toNext: function () {
        // wx.navigateTo({
        //   url: '../phoneNext/phoneNext?t=1',
        // })
        var c = this.data.code;
        if (c) {
            //校验码是否正确
            wx.request({
                url: getApp().globalData.onlineUrl + 'api/sms_code/check',
                method: "GET",
                header: utilJs.hasTokenGetHeader(),
                data: {
                    code: c
                },
                success: function (res) {
                    if (res.data.code == 200) {
                        console.log("校验通过成功");
                        wx.navigateTo({
                            url: '../phoneNext/phoneNext?t=1',
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
                title: '请输入验证码',
                icon: 'none'
            })
        }
    }
})