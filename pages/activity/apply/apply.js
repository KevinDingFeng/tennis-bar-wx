// pages/activity/apply/apply.js
var utilJs = require('../../../utils/util.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageStyle: `width:${app.globalData.width};height:${app.globalData.height}`,
        scale: app.globalData.windowWidth / app.globalData.windowHeight,
        width_cc: `width:${app.globalData.width};`,
        imgUrl: app.globalData.imgUrl,
        game: '',
        ages: { "All": "不限", "LessThree": "3年以下", "LessFive": "3~5年", "LessTen": "5~10年", "MoreTen": "10年以上" },
        levels: { "All": "不限", "Entry": "入门(0~1.0)", "Medium": "中级(1.5~3.5)", "Professional": "专业(4.0~7.0)" },
        joiner: '',
        court_img: '',
        types: '',
    },
    //获取微信用户信息
    // getWxUserInfo: function () {
    //   let that = this;
    //   wx.request({
    //     url: getApp().globalData.onlineUrl + 'api/wx_user_info',
    //     method: "GET",
    //     header: utilJs.hasTokenGetHeader(),
    //     success: function (res) {
    //       if (res.data.code == "200") {
    //         that.setData({
    //           wxUserInfo: res.data.data
    //         })
    //       }
    //     }
    //   })
    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.getWxUserInfo();
        let _Token = wx.getStorageSync('tennisToken'); 
        console.log(_Token);
        if (_Token) {
            console.log('token' + _Token);
            wx.request({
                url: getApp().globalData.onlineUrl + 'game/checktoken',
                method: 'GET',
                header: {
                    "content-Type": "application/x-www-form-urlencoded",
                    "tennisToken": _Token
                },
                success: function (res) {
                    console.log("成功")
                    if (res.data.code == "200"){
                        wx.setStorageSync('tennisToken', _Token);
                    } else if (res.data.code == "201"){
                        wx.showToast({
                            title: '暂未登陆，跳转中',
                            icon: 'none'
                        })
                        wx.redirectTo({
                            url: '../../login/login',
                        })
                    }
                },
                fail:function(){
                    console.log("失败")
                }
            })
        } else{
            wx.showToast({
                title: '暂未登陆，跳转中',
                icon: 'none'
            })
            wx.redirectTo({
                url: '../../login/login',
            })
        }
        let that = this;
        wx.showShareMenu({
            withShareTicket: true,
            success: function (res) {
            },
            complete: function (res) {
                console.log(options.id);
                if (options.id) {
                    let _id = Number(options.id)
                    
                    that.getGameInfo(_id);
                    that.getJoinGamerInfo(_id);
                    that.getCourtImgInfo(that.data.game.courtId);
                }
            }
        })
        if (options.game) {
            let _cc = JSON.parse(options.game);
            if (options.cc){
                _cc = JSON.parse(options.game).game;
            }
            that.setData({
                game: _cc,
                types: 'normal'
            })
            that.getJoinGamerInfo(_cc.id);
            that.getCourtImgInfo(_cc.courtId);
        }
    },
    onShow: function () {
        this.setData({ wxUserInfo: wx.getStorageSync("wxUserInfo") })
    },

    //获取球局信息  分享步骤
    getGameInfo: function (id) {
        let that = this;
        wx.request({
            url: getApp().globalData.onlineUrl + 'api/game/' + id,
            method: 'GET',
            header: utilJs.hasTokenGetHeader(),
            success: function (res) {
                console.log(res)
                if (res.data.code == '200') {
                    let game = res.data.data.game;
                    for (var i = 0; i < game.length; i++) {
                        let _cc = game[i].startTime.substr(0, 13);
                        game[i].startTime = _cc
                        game[i].endTime = game[i].endTime.substr(0, 13)
                    }
                    that.setData({ game: game })
                }
            }
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
     * 分享
     */
    onShareAppMessage: function (e) {
        if(e.form == "button"){
            
        } 
        return {
            title: "来“一桔”网球吧",
            path: "/pages/activity/apply/apply?id=" + this.data.game.id,
            success: function (res) {
                wx.getShareInfo({
                    shareTicket: res.shareTickets[0],
                })
            }
        };
    },

    joinGame: function (event) {
        let game = event.currentTarget.dataset.game;
        wx.navigateTo({
            url: '../join/join?game=' + JSON.stringify(game) + "&type=" + this.data.types,
        })
    },

    //返回首页
    gobackIndex: function () {
        app.globalData.cate_id = "1";
        wx.switchTab({
             url: '../../index/index',
        })
    }

})