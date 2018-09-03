// pages/activity/apply/apply.js
var utilJs = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game:'',
    ages: { "LessThree": "3年以下", "LessFive": "3~5年", "LessTen": "5~10年", "MoreTen":"10年以上"},
    levels: { "Entry": "入门(0~1.0)", "Medium": "中级(1.5~3.5)", "Professional":"专业(4.0~7.0)"}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '球局详情',
    })
    // if (getApp().globalData.tennisToken == null) {
    //   wx.getSetting({
    //     success: res => {
    //       if (res.authSetting['scope.userInfo']) {
    //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //         wx.getUserInfo({
    //           success: res => {
    //             // 可以将 res 发送给后台解码出 unionId
    //             getApp().globalData.userInfo = res.userInfo
    //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //             // 所以此处加入 callback 以防止这种情况
    //             // if (this.userInfoReadyCallback) {
    //             //   this.userInfoReadyCallback(res)
    //             // }
    //           }
    //         })
    //       }
    //     }
    //   });
    //   this.getTokenIfNotExist();
    // }
    let that = this;
    if(options.game){
      that.setData({
        game: JSON.parse(options.game)
      })
    }
    if(options.id){
      this.getGameInfo(options.id);
    }
  },

  
  //获取球局信息  分享步骤
  getGameInfo:function(id){
    let that = this ;
    wx.request({
      url: getApp().globalData.onlineUrl + 'api/game/' + id,
      method:'GET',
      header: utilJs.hasTokenGetHeader(),
      success:function(res){
        if(res.data.code == '200'){
          let game = res.data.data.game;
          that.setData({game:game})
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
   * 分享
   */
  onShareAppMessage:function(){
    console.log(this.data.game);
    return {
      title:"网球吧",
      path: "/pages/activity/apply/apply?id="+this.data.game.id,
    };
  },

  joinGame:function(event){
    let game = event.currentTarget.dataset.game;
    wx.navigateTo({
      url: '../join/join?game='+JSON.stringify(game),
    })
  },

  //判断是否授权
  // getTokenIfNotExist: function () {
  //   wx.login({
  //     success: function (res) {
  //       var code = res.code;
  //       wx.getUserInfo({
  //         success: function (res) {
  //           getApp().globalData.userInfo = res.userInfo;
  //           var iv = res.iv;
  //           var encryptedData = res.encryptedData;
  //           var signature = res.signature;
  //           var rawData = res.rawData;
  //           wx.request({
  //             url: getApp().globalData.onlineUrl + 'auth/token',
  //             data: {
  //               code: code,
  //               signature: signature,
  //               rawData: rawData,
  //               encryptedData: encryptedData,
  //               iv: iv
  //             },
  //             success: function (res) {
  //               //设置返回的3rdsession
  //               wx.setStorageSync('tennisToken', res.data.data)
  //               getApp().globalData.tennisToken = res.data.data;
  //             }
  //           })
  //         },
  //         fail: function () {
  //           console.log("失败");
  //           getApp().authSetting();
  //         }
  //       })
  //     }
  //   })
  // },
  
  


})