// pages/my/myXX/phone/phone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subText: "确认绑定"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.t) {
      wx.setNavigationBarTitle({
        title: '修改手机号',
      })
      this.setData({
        subText: "确认修改"
      });
    }
    let that = this;

    wx.request({
      url: 'http://localhost:6677/api/wx_user_info',
      method: "GET",
      header: {
        "content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.code = "200") {
          that.setData({
            wxUserInfo: res.data.data
          });
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  inputPhone: function(e){
    this.setData({
      phone: e.detail.value
    });
  },
  inputCode: function (e) {
    this.setData({
      code: e.detail.value
    });
  },
  sendCode: function(){
    var p = this.data.phone;
    if(p){
      wx.request({
        url: 'http://localhost:6677/api/sms_code/send',
        method: "GET",
        header: {
          "content-Type": "application/json"
        },
        data:{
          cellphone:p
        },
        success: function (res) {
          if (res.data.code == 200) {
            console.log("发送成功");
          }
        }
      })
    }
  },
  save: function(){
    console.log("asdfasdf");
    wx.navigateTo({
      url: '../myXX'

    })
    
    // var p = this.data.phone;
    // var c = this.data.code;
    // if(p && c){
    //   wx.request({
    //     url: 'http://localhost:6677/api/wx_user_info/update/cellphone',
    //     method: "POST",
    //     header: {
    //       "content-Type": "application/x-www-form-urlencoded"
    //     },
    //     data: {
    //       cellphone: p,
    //       code: c
    //     },
    //     success: function (res) {
    //       console.log(res.data);
    //       if (res.data.code = "200") {
    //         //保存成功，返回基础信息
    //         wx.switchTab({
    //           url: '../../my/myXX'
    //         })
    //       }
    //     }
    //   })
    // }
  }
})