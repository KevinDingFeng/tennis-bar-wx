//pages/my/mygame/joingame/joingame.js
var utilJs = require("../../../../utils/util.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: ["球局信息", "评价"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 36,
        game: '',
        ages: {
            "LessThree": "3年以下",
            "LessFive": "3~5年",
            "LessTen": "5~10年",
            "MoreTen": "10年以上"
        },
        levels: {
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
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: '参与球局信息',
        })
        let that = this;
        let game = JSON.parse(options.game);
        that.setData({
            game: game
        })
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
      var gameId = game.id;

      this.setComment(gameId);
    },
  setComment(gameId) {
    let that = this;
    wx.request({
      url: 'http://localhost:6677/api/comment/detail',
      method: "GET",
      header: utilJs.hasTokenGetHeader(),
      data: {
        gameId: gameId
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.code = "200") {
          if (res.data.data.comment) {
            that.setData({
              comment: res.data.data.comment
            });
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
    data.presentStar = info.presentStar;
    data.gameId = info.gameId;
    data.wxUserInfoId = info.wxUserInfoId;
    if (info.id) {
      data.id = id;
    }
    wx.request({
      url: 'http://localhost:6677/api/comment/update',
      method: "POST",
      header: utilJs.hasTokenPostHeader(),
      data: data,
      success: function (res) {
        console.log(res.data);
        if (res.data.code = "200") {
          console.log("保存成功");
          that.setComment(info.gameId);
        }
      }
    })
  }
})