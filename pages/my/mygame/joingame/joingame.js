//pages/my/mygame/joingame/joingame.js
var utilJs = require("../../../../utils/util.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        wxUserInfo: '',
        comment: {
            gameStar: 0,
            courtStar: 0
        },
        gameLabels: [],
        selectedGameLabels: [],
        courtLabels: [],
        selectedCourtLabels: [],
        tabs: ["球局信息", "评价"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 36,
        game: '',
        joiner: '',
        court_img: '',
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
        flag: 0,//评价星级
        info: "",
        items: [
            { name: 'USA', value: '到场' },
            { name: 'BRA', value: '到场' },
            { name: 'JPN', value: '到场' },
            { name: 'ENG', value: '到场' },
            { name: 'TUR', value: '到场' },
        ]
    },
    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    },
    changeColor1: function () {
        var that = this;
        that.setData({
            flag: 1
        });
    },
    changeColor2: function () {
        var that = this;
        that.setData({
            flag: 2
        });
    },
    changeColor3: function () {
        var that = this;
        that.setData({
            flag: 3
        });
    },
    changeColor4: function () {
        var that = this;
        that.setData({
            flag: 4
        });
    },
    changeColor5: function () {
        var that = this;
        that.setData({
            flag: 5
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        that.getLabels();
        if (options.game) {
            let game = JSON.parse(options.game);
            game.deadlineTime = game.deadlineTime.substr(0, 13);
            if (game.deadlineTime.substr(11, 13)=="00"){
                game.deadlineTime(/00/, "24")
            }
            
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
    },
    onShow: function () {
        var that = this;
        var info = that.data.game;
        var gameId = info.id;
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
                    let gl = [];
                    gameLabels.forEach(function(item,index){
                      gl.push({
                        id:item.id,
                        name:item.name,
                        checked:false
                      })
                    })
                    that.setData({ gameLabels:gl})

                    let courtLabels = res.data.data.courtLabel;
                    let cl = [];
                    courtLabels.forEach(function(item,index){
                      cl.push({
                        id:item.id,
                        name:item.name,
                        checked:false
                      })
                    })
                    that.setData({courtLabels: cl})
                }
            }
        })
    },
    //球局和谐度标签
    click_pjlabel: function (e) {
        let that = this;
        let _idx = e.currentTarget.dataset.index;
        let gameLabels = that.data.gameLabels;
        gameLabels[_idx].checked = !gameLabels[_idx].checked; 
        that.setData({gameLabels:gameLabels})
    },
    //球场环境标签
    click_hjlabel: function (e) {
        let that = this;
        let _idx = e.currentTarget.dataset.index;
        let courtLabels = that.data.courtLabels;
        courtLabels[_idx].checked = !courtLabels[_idx].checked;
        that.setData({ courtLabels: courtLabels})
    },
    //获取球局信息  分享步骤
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
            url: getApp().globalData.imgUrl + 'api/court_img/list?courtId=' + id,
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
     * 点击tab切换
     */
    swichNav: function (e) {
        let that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
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
    save: function () {
        let that = this;
        var info = this.data.comment;
        var data = {};
        data.gameStar = info.gameStar;
        data.courtStar = info.courtStar;
        data.presentStar = info.presentStar == null ? 0 : info.presentStar;
        data.gameId = info.gameId == null ? that.data.game.id : info.gameId;
        data.wxUserInfoId = info.wxUserInfoId == null ? that.data.wxUserInfo.id : info.wxUserInfoId;

        let gameLabel = new Array();
        let courtLabel = new Array();
        let gameL = that.data.gameLabels;
        let courtL = that.data.courtLabels;
        gameL.forEach(function(item,index){
          if(item.checked){
            gameLabel.push({id:item.id,name:item.name})
          }
        })
        courtL.forEach(function (item, index) {
          if (item.checked) {
            courtLabel.push({ id: item.id, name: item.name })
          }
        })
        data.gameLabels = JSON.stringify(gameLabel);
        data.courtLabels = JSON.stringify(courtLabel);

        if (info.id) {
            data.id = id;
        }
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
    onShareAppMessage: function () {
        return {
            title: "来“一桔”网球吧",
            path: "/pages/my/mygame/joingame/joingame?id=" + this.data.game.id
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