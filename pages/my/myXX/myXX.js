// pages/my/myXX/myXX.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: ['20岁以下', '20-30岁', '30-40岁', '45-55岁',"55岁以上"],
        array_sex: ['男', '女'],
        array_language: ['中文', '英文'],
    },
    bindPickerChange: function (e) {//年龄
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    bindPickerChange_sex: function (e) {//性别
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index_sex: e.detail.value
        })
    },
    bindPickerChange_language: function (e) {//语言
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index_language: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let that = this;
      
      wx.request({
        url: 'http://localhost:6677/api/sys_user/detail',
        method: "GET",
        header: {
          "content-Type": "application/json"
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.code = "200") {

            that.setData({
              wxUserInfo: res.data.data.wxUserInfo,
              sysUser: res.data.data.sysUser,
              ageRangeList: res.data.data.ageRangeList
            })

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
  updatePhone: function(e){
    var p = e.currentTarget.dataset.phone;

    wx.navigateTo({
      url: './phone/phone' + (p?'?phone=' + p:''),
    })
  }
})