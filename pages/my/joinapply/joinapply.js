// pages/my/joinapply/joinapply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 申请记录列表
    applys:'',
    // 已同意列表
    //agrees:'',
    // 已拒绝列表
    //refuses:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '加入申请',
    })
    // 获取加入申请列表
    
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



  /**
  * 点击tab切换
  */
  swichNav: function (e) {
    let that = this;
    let current = e.target.dataset.current;
    let status = e.target.dataset.status;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      if(wx.getStorageSync("applys")){
        that.setData({
          applys:wx.getStorageSync("applys")
        })
      }else{
        this.getApplyConfirmGames(2, status)
      }
      that.setData({
        currentTab: current
      })
    }
  },
  /**
   * 获取 确认列表
   */
  getApplyConfirmGames: function (wxUserInfoId,status) {
    let that = this;
    // let data = {
    //   "wxUserInfoId":wxUserInfoId,
    //   "status":status
    // }
    // 获取加入确认列表
    wx.request({
      url: 'http://localhost:6677/join/applys',
      method: "POST",
      data:{
        "wxUserInfoId": wxUserInfoId,
        "status": status
      },
      header: {
        "content-Type": "application/json"
      },
      success: function (res) {
        if(res.data.code =="200"){
          that.setData({
            applys:res.data.data
          })
        }
      }
    })
  },
})