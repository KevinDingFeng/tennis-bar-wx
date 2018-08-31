//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  login: function () {
    var _this = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.getUserInfo({
          success: function (res) {
            _this.globalData.userInfo = res.userInfo;
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            var signature = res.signature;
            var rawData = res.rawData;
            wx.request({
              url: _this.globalData.onlineUrl + 'auth/token',
              data: {
                code: code,
                signature: signature,
                rawData: rawData,
                encryptedData: encryptedData,
                iv: iv
              },
              success: function (res) {
                //设置返回的3rdsession
                wx.setStorageSync('tennisToken', res.data.data)
                _this.globalData.tennisToken = res.data.data;
                wx.switchTab({
                  url: '../index/index',
                })
              }
            })

          },
          fail: function () {
            console.log("失败");
            _this.authSetting();
          }
        })
      }
    })
  },
  //拒绝授权之后打开授权设置
  authSetting: function () {
    var _this = this;
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userInfo']) {
          console.log("当前情况是 ，用户拒绝授权，获取不到用户相关的信息");
          //拒绝授权的情况下 打开工具开启授权
          wx.openSetting({
            success: (res) => {
              var authorization = res.authSetting['scope.userInfo'];
              if (authorization) {
                _this.login();//此时用户同意获取信息，可以继续登录
              } else {
                wx.showToast({
                  title: '授权失败'
                })
              }
            }
          })
        } else {
          console.log("测试已经过去到了用户的信息，可以继续登录");
          _this.login();
        }
      },
      fail: function () {
        console.log("获取不到用户信息");
        wx.showToast({
          title: '授权失败'
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    tennisToken: null,
    // onlineUrl: "https://tennis.dazonghetong.com/"
    onlineUrl: "http://localhost:6677/"
  }
})