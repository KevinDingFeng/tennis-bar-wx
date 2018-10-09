// pages/my/mygame/mygame.js
var utilJs = require("../../../utils/util.js");
var init_type = "join";
var pageIndex = 0;
var pageSize = 20;
var isbottom = false;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // tab切换
        currentTab: 0,
        // joinGame: '',
        // releaseGame: '',
        games: [],
        keyword: '',
        inputVal: '',
        isBottom: false

    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
        this.getMyGames(init_type);
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
        this.getMyGames(init_type);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '我的球局',
        })
        // pageIndex = 0;
        // this.getMyGames(init_type);
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
        pageIndex = 0;
        this.setData({ games: [] })
        this.getMyGames(init_type);
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        pageIndex = 0;
        this.setData({ games: [] })
        this.getMyGames(init_type);
        wx.showNavigationBarLoading();
        //模拟加载    
        setTimeout(function () {
            // complete 
            wx.hideNavigationBarLoading()  //完成停止加载     
            wx.stopPullDownRefresh() //停止下拉刷新    
        }, 1500);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!isbottom) {
            this.getMyGames(init_type);
        } else {
            wx.showToast({
                title: '已经到底了~',
                icon: 'none'
            })
        }
    },

    /**
     * 获取我的球局数据
     */
    getMyGames: function (types) {
        let that = this;
        wx.request({
            url: getApp().globalData.onlineUrl + 'api/join/query?type=' + types + '&keyword=' + this.data.inputVal,
            method: "GET",
            data: {
                "page": pageIndex,
                "size": pageSize
            },
            header: utilJs.hasTokenGetHeader(),
            success: function (res) {
                if (res.data.code == "200") {
                    let game = that.data.games;
                    game = game.concat(res.data.data.page.content);
                    that.setData({
                        games: game,
                    })
                    if (res.data.data.page.content.length < pageSize) {
                        isbottom = true;
                    } else {
                        pageIndex++;
                        isbottom = false;
                    }
                    // wx.setStorageSync(types, res.data.data.page);
                } else {
                    wx.showToast({
                        title: res.data.data,
                        icon: 'none'
                    })
                }
            }
        })
    },

    /**
     * 点击tab切换
     */
    swichNav: function (e) {
        let that = this;
        let types = e.target.dataset.type;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            // if(wx.getStorageSync(types)){
            // that.setData({
            //   games: wx.getStorageSync(types)
            // })
            // }else{
            that.setData({ games: [] })
            pageIndex = 0;
            isbottom = false;
            that.getMyGames(types);
            // }
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
        init_type = types;
    },

    /**
     * 参与球局
     */
    joinGameDetail: function (e) {
        let game = e.currentTarget.dataset.game;
        wx.navigateTo({
            url: './joingame/joingame?game=' + JSON.stringify(game),
        })
    },

    /**
     * 发布球局
     */
    releaseGameDetail: function (e) {
        let game = e.currentTarget.dataset.game;
        wx.navigateTo({
            url: './releasegame/releasegame?game=' + JSON.stringify(game),
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

})