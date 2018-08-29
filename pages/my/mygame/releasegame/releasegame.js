// pages/my/mygame/releasegame/releasegame.js
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
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       
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
  setComment(gameId){
    let that = this;
    wx.request({
      url: 'http://localhost:6677/api/comment/detail',
      method: "GET",
      header: {
        "content-Type": "application/json"
      },
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
  changeGameStar: function(e){
    var comment = this.data.comment;
    comment.gameStar = e.currentTarget.dataset.star;
    this.setData({
      comment: comment
    });
  },
  changeCourtStar: function(e){
    var comment = this.data.comment;
    comment.courtStar = e.currentTarget.dataset.star;
    this.setData({
      comment: comment
    });
  },
  changePresentStar: function(e){
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
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 发布人 取消球局
     */
    cancelGame: function(e) {
        let id = e.currentTarget.dataset.id;
        wx.showModal({
            title: '取消球局',
            content: '是否取消球局',
            confirmText: "确认取消",
            cancelText: "暂不取消",
            success: function(res) {
                if (res.confirm) {
                    wx.request({
                        url: 'http://localhost:6677/game/cancel',
                        method: "POST",
                        data: {
                            "id": id
                        },
                        header: {
                            "content-type": "application/json"
                        },
                        success: function(res) {
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
    if (info.id){
      data.id = id;
    }
    data.wxUserIds = this.data.wxUserIds;
    wx.request({
      url: 'http://localhost:6677/api/comment/update',
      method: "POST",
      header: {
        "content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: function (res) {
        console.log(res.data);
        if (res.data.code = "200") {
          console.log("保存成功");
          that.setComment(info.gameId);
        }
      }
    })
  },
  checkboxChange: function(e){
    this.setData({
      wxUserIds: e.detail.value
    });
  }

})