// pages/my/mygame/releasegame/releasegame.js
var utilJs = require("../../../../utils/util.js");
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        comment: {
            gameStar: 0,
            courtStar: 0,
            presentStar: 0
        },
        gameLabels: [],
        selectedGameLabels: [],
        courtLabels: [],
        selectedCourtLabels: [],
        imgUrl: app.globalData.imgUrl,
        tabs: ["球局信息", "评价"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 36,
        game: '',
        joiner: '',  //参与者信息
        court_img: '',  //球场图片信息
        ages: {
            "All": "不限",
            "LessThree": "3年以下",
            "LessFive": "3~5年",
            "LessTen": "5~10年",
            "MoreTen": "10年以上"
        },
        levels: {
            "All": "不限",
            "Entry": "入门(0~1.0)",
            "Medium": "中级(1.5~3.5)",
            "Professional": "专业(4.0~7.0)"
        },
        label_active:null,//球局和谐度的标签
        label_active_hj: null//球局环境的标签
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        that.getLabels();
        if (options.game) {
            let game = JSON.parse(options.game);
            that.setData({
                game: game
            })
            that.getJoinGamerInfo(game.id);
            that.getCourtImgInfo(game.courtId);
        }
        if (options.id) {
            that.getGameInfo(options.id);
        }
        that.getWxUserInfo();
        that.setComment(that.data.game.id);
        // wx.getSystemInfo({
        //   success: function (res) {
        //     that.setData({
        //       sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
        //       sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        //     });
        //   }
        // });
    },
    onShow: function () {
        var gameId = that.data.game.id;
        that.setComment(gameId);
    },
    //获取评价标签
    getLabels: function () {
        let that = this;
        wx.request({
            url: getApp().globalData.onlineUrl + 'api/comment/labels',
            method: 'GET',
            header: utilJs.hasTokenGetHeader(),
            success: function (res) {
                if (res.data.code == '200') {
                    let gameLabels = res.data.data.gameLabel;
                    let courtLabels = res.data.data.courtLabel;
                    that.setData({
                        gameLabels: gameLabels,
                        courtLabels: courtLabels
                    })
                }
            }
        })
    },
    //获取球局信息 
    getGameInfo: function (id) {
        let that = this;
        wx.request({
            url: getApp().globalData.onlineUrl + 'api/game/' + id,
            method: 'GET',
            header: utilJs.hasTokenGetHeader(),
            success: function (res) {
                if (res.data.code == '200') {
                    let info = res.data.data.game;
                    that.setData({ game: info })
                }
            }
        })
    },
    //点击评价标签
    click_pjlabel: function (e) {
        let that = this;
        var _idx = e.currentTarget.dataset.index;
        that.setData({
            label_active: _idx
        })
    },
    //点击环境标签
    click_hjlabel: function (e) {
        let that = this;
        var _idx = e.currentTarget.dataset.index;
        that.setData({
            label_active_hj: _idx
        })
    },
    //获取参加球局的球友  信息
    getJoinGamerInfo: function (id) {
        let that = this;
        wx.request({
            url: getApp().globalData.onlineUrl + 'api/join/info',
            method: 'POST',
            data: {
                "gameId": id
            },
            header: utilJs.hasTokenGetHeader(),
            success: function (res) {
                if (res.data.code == '200') {
                    let joiner = res.data.data.list;
                    that.setData({ joiner: joiner })
                }
            }
        })
    },
    //获取球场图片信息
    getCourtImgInfo: function (id) {
        let that = this;
        wx.request({
            url: getApp().globalData.onlineUrl + 'api/court_img/list?courtId=' + id,
            method: 'GET',
            header: utilJs.hasTokenGetHeader(),
            success: function (res) {
                if (res.data.code == '200') {
                    let courtImg = res.data.data;
                    that.setData({ court_img: courtImg })
                }
            }
        })
    },

    setComment: function (gameId) {
        let that = this;
        wx.request({
            url: getApp().globalData.onlineUrl + 'api/comment/detail',
            method: "GET",
            header: utilJs.hasTokenGetHeader(),
            data: {
                gameId: gameId
            },
            success: function (res) {
                console.log(res.data);
                if (res.data.code == "200") {
                    if (res.data.data.comment) {
                        that.setData({
                            comment: res.data.data.comment
                        });
                        if (res.data.data.comment.gameLabels) {
                            that.setData({ selectedGameLabels: JSON.parse(res.data.data.comment.gameLabels) })
                        }
                        if (res.data.data.comment.courtLabels) {
                            that.setData({ selectedCourtLabels: JSON.parse(res.data.data.comment.courtLabels) })
                        }
                    }
                    if (res.data.data.joinWxUser) {
                        that.setData({
                            joinWxUser: res.data.data.joinWxUser
                        });
                    }
                }
            }
        })
    },
    changeGameStar: function (e) {
        var comment = this.data.comment;
        comment.gameStar = e.currentTarget.dataset.star;
        this.setData({
            comment: comment
        });
    },
    changeCourtStar: function (e) {
        var comment = this.data.comment;
        comment.courtStar = e.currentTarget.dataset.star;
        this.setData({
            comment: comment
        });
    },
    changePresentStar: function (e) {
        var comment = this.data.comment;
        comment.presentStar = e.currentTarget.dataset.star;
        this.setData({
            comment: comment
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
        let that = this;
        if (this.data.currentTab === e.currentTarget.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.currentTarget.dataset.current
            })
        }
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
     * 发布人 取消球局
     */
    cancelGame: function (e) {
        let id = e.currentTarget.dataset.id;
        wx.showModal({
            title: '取消球局',
            content: '是否取消球局',
            confirmText: "确认取消",
            cancelText: "暂不取消",
            success: function (res) {
                if (res.confirm) {
                    wx.request({
                        url: getApp().globalData.onlineUrl + 'api/game/cancel',
                        method: "POST",
                        data: {
                            "id": id
                        },
                        header: utilJs.hasTokenGetHeader(),
                        success: function (res) {
                            if (res.data.code == "200") {
                                wx.navigateBack({})
                            } else {
                                wx.showToast({
                                    title: res.data.data,
                                    icon: 'none',
                                })
                            }
                        }
                    })
                }
            },
        })
    },
    save: function () {
        let that = this;
        var info = this.data.comment;
        var data = {};
        data.gameStar = info.gameStar;
        data.courtStar = info.courtStar;
        data.presentStar = info.presentStar;
        data.gameId = info.gameId;
        data.wxUserInfoId = info.wxUserInfoId;
        if (info.id) {
            data.id = id;
        }
        // data.wxUserIds = that.data.wxUserIds == null?0:that.data.wxUserIds;

        //测试数据
        let gamelabel = new Array();
        gamelabel.push({ "id": 1, "name": "球友很nice" });
        gamelabel.push({ "id": 2, "name": "领导力强" });
        gamelabel.push({ "id": 3, "name": "打的很爽" });
        let courtlabel = new Array();
        courtlabel.push({ "id": 9, "name": "环境很好" });
        courtlabel.push({ "id": 12, "name": "服务态度好" });

        data.gameLabels = JSON.stringify(gamelabel);
        data.courtLabels = JSON.stringify(courtlabel);

        wx.request({
            url: getApp().globalData.onlineUrl + 'api/comment/update',
            method: "POST",
            header: utilJs.hasTokenPostHeader(),
            data: data,
            success: function (res) {
                console.log(res.data);
                if (res.data.code == "200") {
                    console.log("保存成功");
                    that.setComment(that.data.game.id);
                }
            }
        })
    },
    checkboxChange: function (e) {
        this.setData({
            wxUserIds: e.detail.value
        });
    },

    onShareAppMessage: function () {
        return {
            title: "来“一桔”网球吧",
            path: "/pages/my/mygame/releasegame/releasegame?id=" + this.data.game.id
        }
    },
    //获取微信用户信息
    getWxUserInfo: function () {
        let that = this;
        wx.request({
            url: getApp().globalData.onlineUrl + 'api/wx_user_info',
            method: "GET",
            header: utilJs.hasTokenGetHeader(),
            success: function (res) {
                if (res.data.code == "200") {
                    that.setData({
                        wxUserInfo: res.data.data
                    })
                }
            }
        })
    }

})