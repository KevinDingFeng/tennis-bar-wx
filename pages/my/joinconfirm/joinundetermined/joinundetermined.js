// pages/my/joinconfirm/joinundetermined/joinundetermined.js
var utilJs = require("../../../../utils/util.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
      apply:'',
      joiner: '', //参与人
      personInfo:'',
      position: {"Common":"普通","Coach":"教练"},
      languages:{"Chinese":"中文","English":"英文"},
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
    showDialogBtn: function () {

        this.setData({
            showModal: true
        })
    },
    /**
* 弹出框蒙层截断touchmove事件
*/
    preventTouchMove: function () {
    },
    /**
    * 隐藏模态对话框
    */
    hideModal: function () {
        this.setData({
            showModal: false
        });
    },
    /**
    * 对话框取消按钮点击事件
    */
    onCancel: function () {
        this.hideModal();
    },
    /**
    * 对话框确认按钮点击事件
    */
    onConfirm: function () {
        wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
        })
        this.hideModal();
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '确认详情',
      })
      let info = options.info;
      let that = this;
      that.setData({
        apply: JSON.parse(info)
      })
      that.getPersonInfo(this.data.apply.wxUserInfoId);
      that.getJoinGamerInfo(this.data.apply.gameId);
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

    getPersonInfo:function(id){
      let that =this ;
      wx.request({
        url: getApp().globalData.onlineUrl + 'api/wx_user_evaluation?userId='+ id,
        method:"GET",
        header: utilJs.hasTokenGetHeader(),
        success:function(res){
          if(res.data.code =="200"){
            that.setData({
              personInfo:res.data.data.info
            })
          }
        }
      })
    },

    /**
     * 同意 申请
     */
    confirmJoin:function(e){
      let id = e.currentTarget.dataset.id;
      let types = e.currentTarget.dataset.type;
      wx.showModal({
        title: '同意',
        content: '是否同意申请',
        success:function(res){
          wx.request({
            url: getApp().globalData.onlineUrl + 'api/join/update',
            data:{"id":id,"type":types},
            method:"POST",
            header: utilJs.hasTokenGetHeader(),
            success:function(res){
              if (res.data.code == "200") {
                wx.navigateBack({})
              } else {
                wx.showToast({
                  title: res.data.data.message,
                  icon: 'none'
                })
              }
            }
          })
        }
      })
    },

    //拒绝
    refuse:function(e){
      let applyId = this.data.apply.id;
      let reason = e.detail.value.remark;
      wx.request({
        url: getApp().globalData.onlineUrl + 'api/join/update',
        data:{
          "id":applyId,
          "reason":reason,
          "type":"refuse"
        },
        method:"POST",
        header: utilJs.hasTokenGetHeader(),
        success:function(res){
          if(res.data.code == "200"){
            wx.navigateBack({
            })
          }else{
            wx.showToast({
              title: res.data.data.message,
              icon:'none'
            })
          }
        }
      })
      this.hideModal();
    }
})