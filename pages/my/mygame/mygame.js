// pages/my/mygame/mygame.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // tab切换
        currentTab: 0,
        joinGame: '',
        releaseGame: ''

    },
    showInput: function() {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function() {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function() {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function(e) {
        this.setData({
            inputVal: e.detail.value
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        wx.request({
            url: "http://localhost:6677/join/query?organizerId=" + 2,
            method: "GET",
            header: {
                "content-Type": "application/json"
            },
            success: function(res) {
                if (res.data.code == "200") {
                    console.log(res.data.data.releaseGame);
                    that.setData({
                        joinGame: res.data.data.joinGame,
                        releaseGame: res.data.data.releaseGame
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
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    /**
     * 点击tab切换
     */
    swichNav: function(e) {
        let that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    }
})