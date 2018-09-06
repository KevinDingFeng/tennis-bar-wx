// pages/my/myXX/myXX.js
var utilJs = require("../../../utils/util.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },
    bindPickerChange: function (e) {//年龄
      var ar = this.data.ageRangeNameArr[e.detail.value];
      var wxUserInfo = this.data.wxUserInfo;
      wxUserInfo.ageRange = ar;
      this.setData({
        index: e.detail.value,
        wxUserInfo: wxUserInfo
      })
    },
    bindPickerChange_sex: function (e) {//性别
      var ar = this.data.genderNameArr[e.detail.value];
      var wxUserInfo = this.data.wxUserInfo;
      wxUserInfo.genderBase = ar;
      this.setData({
        index_sex: e.detail.value,
        wxUserInfo: wxUserInfo
      })
    },
    bindPickerChange_language: function (e) {//语言
      var ar = this.data.languageNameArr[e.detail.value];
      var wxUserInfo = this.data.wxUserInfo;
      wxUserInfo.languageBase = ar;
      this.setData({
        index_language: e.detail.value,
        wxUserInfo: wxUserInfo
      })
      console.log(this.data.wxUserInfo);
    },
  //根据传入的额值，找到对应的坐标
  getArrIndex: function(n, arr){
    return arr.indexOf(n);
  },
  //循环传入的 map ，并执行回调方法，把分离的 name 和 text 数组返回。针对操作 java 对应的枚举类型
  loopMap: function(m, cb){
    var nameArr = new Array();
    var textArr = new Array();
    var i = 0;
    for (var k in m) {
      nameArr[i] = k;
      textArr[i] = m[k];
      i++;
    }
    cb(nameArr, textArr);
  },
  setAgeRangeList: function () {
    if (this.data.ageRangeMap) {
      var m = this.data.ageRangeMap;
      var that = this;
      var cb = function (nameArr, textArr){
        var i = that.getArrIndex(that.data.wxUserInfo.ageRange, nameArr);
        that.setData({
          index: i,
          ageRangeTextArr: textArr,
          ageRangeNameArr: nameArr
        });
      }
      this.loopMap(m, cb);
    }
  },
  setGenderList: function(){
    if (this.data.genderMap) {
      var m = this.data.genderMap;
      var that = this;
      var cb = function (nameArr, textArr) {
        var i = that.getArrIndex(that.data.wxUserInfo.genderBase, nameArr);
        that.setData({
          index_sex: i,
          genderTextArr: textArr,
          genderNameArr: nameArr
        });
      }
      this.loopMap(m, cb);
    }
  },
  setLanguageList: function(){
    if (this.data.languageMap) {
      var m = this.data.languageMap;
      var that = this;
      var cb = function (nameArr, textArr) {
        var i = that.getArrIndex(that.data.wxUserInfo.languageBase, nameArr);
        that.setData({
          index_language: i,
          languageTextArr: textArr,
          languageNameArr: nameArr
        });
      }
      this.loopMap(m, cb);
    }
  },
  /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let that = this;
      
      wx.request({
        url: getApp().globalData.onlineUrl + 'api/wx_user_info/detail',
        method: "GET",
        header: utilJs.hasTokenGetHeader(),
        success: function (res) {
          console.log(res.data);
          if (res.data.code == "200") {

            that.setData({
              wxUserInfo: res.data.data.wxUserInfo,
              ageRangeMap: res.data.data.ageRangeMap,
              genderMap: res.data.data.genderMap,
              languageMap: res.data.data.languageMap,
              positionMap: res.data.data.positionMap
            })
            that.setAgeRangeList();
            that.setGenderList();
            that.setLanguageList();
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
    if(p){
      wx.navigateTo({
        url: './phone/phone' + (p ? '?phone=' + p : ''),
      })
    }else{
      wx.navigateTo({
        url: './phoneNext/phoneNext',
      })
    }
  },
  modifyOccupation: function(e){
    var v = e.detail.value;
    // if(v){
      var wxUserInfo = this.data.wxUserInfo;
      wxUserInfo.occupation = v;
      this.setData({
        wxUserInfo: wxUserInfo
      });
    // }
  },
  save: function(){
    var info = this.data.wxUserInfo;
    var id = info.id;
    var ageRange = info.ageRange;
    var gender = info.genderBase;
    var language = info.languageBase;
    var occupation = info.occupation ? info.occupation : '';
    wx.request({
      url: getApp().globalData.onlineUrl + 'api/wx_user_info/update',
      method: "POST",
      header: utilJs.hasTokenPostHeader(),
      data: {
        "id":id,
        "ageRange": ageRange,
        "genderBase": gender,
        "languageBase": language,
        "occupation": occupation
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.code == "200") {
          //保存成功，返回上一页
          wx.switchTab({
            url: '../my'
          })
        }else{
          wx.showToast({
            title: res.data.data,
            icon: 'none'
          })
        }
      }
    })
  }
})