// pages/my/myevaluate/myevaluate.js
var utilJs = require("../../../utils/util.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isfirst:true
    },
    bindPickerChange: function (e) {//打球频率
      var ar = this.data.playFrequencyNameArr[e.detail.value];
      var selfEvaluation = this.data.selfEvaluation;
      selfEvaluation.playFrequency = ar;
      this.setData({
        index: e.detail.value,
        selfEvaluation: selfEvaluation
      })
    },
    bindPickerChange_age: function (e) {//球龄
      var ar = this.data.playAgeNameArr[e.detail.value];
      var selfEvaluation = this.data.selfEvaluation;
      selfEvaluation.playAge = ar;
      this.setData({
        index_age: e.detail.value,
        selfEvaluation: selfEvaluation
      })
    },
    bindPickerChange_ji: function (e) {//等级
      var ar = this.data.skillLevelNameArr[e.detail.value];
      var selfEvaluation = this.data.selfEvaluation;
      selfEvaluation.skillLevel = ar;
      this.setData({
        index_ji: e.detail.value,
        selfEvaluation: selfEvaluation
      })
    },
    grade:function(){
        this.setData({
            isfirst: false
        })
    },
    go_history:function(){
        this.setData({
            isfirst: true
        })
    },
    openAlert: function () {
        wx.showModal({
            title:"找教练判定级别",
            content: '想找教练帮自己看看什么级别？\r\n请联系客服：010-989898，\r\n我们会为您推荐教练，推荐后您最终是否方便过去\r\n全由您自己做主哦~~',
            showCancel: false,
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                }
            }
        });
    },
  //根据传入的额值，找到对应的坐标
  getArrIndex: function (n, arr) {
    return arr.indexOf(n);
  },
  //循环传入的 map ，并执行回调方法，把分离的 name 和 text 数组返回。针对操作 java 对应的枚举类型
  loopMap: function (m, cb) {
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
  setPlayFrequencyList: function(){
    if (this.data.playFrequencyMap) {
      var m = this.data.playFrequencyMap;
      var that = this;
      var cb = function (nameArr, textArr) {
        var i = that.getArrIndex(that.data.selfEvaluation.playFrequency, nameArr);
        that.setData({
          index: i,
          playFrequencyTextArr: textArr,
          playFrequencyNameArr: nameArr
        });
      }
      this.loopMap(m, cb);
    }
  },
  setPlayAgeList: function(){
    if (this.data.playAgeMap) {
      var m = this.data.playAgeMap;
      var that = this;
      var cb = function (nameArr, textArr) {
        var i = that.getArrIndex(that.data.selfEvaluation.playAge, nameArr);
        that.setData({
          index_age: i,
          playAgeTextArr: textArr,
          playAgeNameArr: nameArr
        });
      }
      this.loopMap(m, cb);
    }
  },
  setSkillLevelList: function(){
    if (this.data.skillLevelMap) {
      var m = this.data.skillLevelMap;
      var that = this;
      var cb = function (nameArr, textArr) {
        var i = that.getArrIndex(that.data.selfEvaluation.skillLevel, nameArr);
        that.setData({
          index_ji: i,
          skillLevelTextArr: textArr,
          skillLevelNameArr: nameArr
        });
      }
      this.loopMap(m, cb);
    }
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      let that = this;
      wx.request({
        url: getApp().globalData.onlineUrl + 'api/wx_user_evaluation/detail',
        method: "GET",
        header: utilJs.hasTokenGetHeader(),
        success: function (res) {
          console.log(res.data);
          if (res.data.code = "200") {

            that.setData({
              selfEvaluation: res.data.data.selfEvaluation,
              playFrequencyMap: res.data.data.playFrequencyMap,
              playAgeMap: res.data.data.playAgeMap,
              skillLevelMap: res.data.data.skillLevelMap
            })
            that.setPlayFrequencyList();
            that.setPlayAgeList();
            that.setSkillLevelList();
          }
        }
      })
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
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
  modifyRemark: function(e){
    var v = e.detail.value;
    if (v) {
      var selfEvaluation = this.data.selfEvaluation;
      selfEvaluation.remark = v;
      this.setData({
        selfEvaluation: selfEvaluation
      });
    }
  },
  save: function () {
    var info = this.data.selfEvaluation;
    var id = info.id;
    var playFrequency = info.playFrequency;
    var playAge = info.playAge;
    var skillLevel = info.skillLevel;
    var remark = info.remark ? info.remark : '';
    wx.request({
      url: getApp().globalData.onlineUrl + 'api/wx_user_evaluation/update',
      method: "POST",
      header: utilJs.hasTokenPostHeader(),
      data: {
        "id": id,
        "playFrequency": playFrequency,
        "playAge": playAge,
        "skillLevel": skillLevel,
        "remark": remark
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.code = "200") {
          //保存成功，返回上一页
          wx.switchTab({
            url: '../my'
          })
        }
      }
    })
  }
})