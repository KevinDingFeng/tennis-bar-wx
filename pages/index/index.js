//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        inputShowed: false,
        inputVal: ""
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
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        //避免重复授权
        /*
        wx.login({
          success: function (res) {
            var code = res.code;
            wx.getUserInfo({
              success: function (res) {
                console.log(res.userInfo);
    
                console.log(code);
                var iv = res.iv;
                var encryptedData = res.encryptedData;
                var signature = res.signature;
                var rawData = res.rawData;
                wx.request({
                  //上传用户信息和登录用的code，获取token
                  url: "https://tennis.dazonghetong.com/auth/token",
                  data: {
                    code: code,
                    signature: signature,
                    rawData: rawData,
                    encryptedData: encryptedData,
                    iv: iv
                  },
                  success: function (res) {
                    if(res.data.code && res.data.code == "200"){
                      //授权成功
                      //从后台获取的token，前端自己保存到全局变量中，备用；
                      //以后每次使用request都把该变量存入header变量
                      console.log("token : " + res.data.data);
                      app.globalData.tennisToken = res.data.data;
                    }
                  }
                })
              },
              fail: function () {
              _this.authSetting();
              }
            })
            }
          })
        */
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
        wx.request({
            url: "https://tennis.dazonghetong.com/api/wx_user_info",//根据全局变量token获取后台储存的微信用户信息
            header: {
                'tennisToken': app.globalData.tennisToken
            },
            data: {

            },
            success: function (res) {
                console.log(res);
            }
        })

    }
})
