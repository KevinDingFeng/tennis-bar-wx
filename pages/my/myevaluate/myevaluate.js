// pages/my/myevaluate/myevaluate.js
var utilJs = require("../../../utils/util.js");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imgUrl:getApp().globalData.onlineUrl,
        prePath:"f/",
        isfirst:true,
        //证书路径
        path: [], 
        certPaths:[]
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
          if (res.data.code == "200") {

            that.setData({
              selfEvaluation: res.data.data.selfEvaluation,
              playFrequencyMap: res.data.data.playFrequencyMap,
              playAgeMap: res.data.data.playAgeMap,
              skillLevelMap: res.data.data.skillLevelMap
            })
            that.setPlayFrequencyList();
            that.setPlayAgeList();
            that.setSkillLevelList();
            
            let certPath = that.data.selfEvaluation.certificatePath;
            if (certPath && certPath.split(",") == undefined) {
              let certPaths = that.data.certPath;
              certPath.push(certPath);
              that.setData({ certPaths: certPaths })
            }
            if (certPath && certPath.split(",").length > 0) {
              that.setData({ certPaths: certPath.split(",") })
            }
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
    //上传图片
    var i = 0;
    let tempfiles = this.data.tempFiles;
    if(tempfiles){
      this.uploadImage(i,tempfiles);
    }else{
      wx.showToast({
        title: '请选择图片',
        icon:'none'
      })
    }
  },

  //上传图片
  uploadImage: function (i, tempFiles) {
    let that = this;
    wx.uploadFile({
      url: getApp().globalData.onlineUrl + 'api/wx_user_evaluation/upload',
      filePath: tempFiles[i].path,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data",
        "tennisToken": getApp().globalData.tennisToken
      },
      success: function (res) {
        var data = JSON.parse(res.data);
        if (data.code == "200") {
          let path = data.data.filepath;
          let paths = that.data.path;
          paths.push(path);
          that.setData({
            path: paths
          })
          i++;
          if(i == tempFiles.length){
            that.updateInfo(paths);
          }else{
            that.uploadImage(i,tempFiles);
          }
        } else {
          wx.showToast({
            title: data.data.errMsg,
            icon: 'none'
          })
        }
      },
      complete:function(res){
        
      }
    })
  },
  updateInfo:function(paths){
    let that = this;
    var info = that.data.selfEvaluation;
    var data = {};
    var id = info.id;
    if (id) {
      data.id = id;
    }
    data.playFrequency = info.playFrequency;
    data.playAge = info.playAge;
    data.skillLevel = info.skillLevel;
    data.remark = info.remark ? info.remark : '';
    data.wxUserInfoId = info.wxUserInfoId;
    if (paths.length > 1) {
      let cp = paths.join(",");
      data.certificatePath = cp;
    } else {
      data.certificatePath = paths[0];
    }
    wx.request({
      url: getApp().globalData.onlineUrl + 'api/wx_user_evaluation/update',
      method: "POST",
      header: utilJs.hasTokenPostHeader(),
      data: data,
      success: function (res) {
        console.log(res.data);
        if (res.data.code == "200") {
          //保存成功，返回上一页
          wx.switchTab({
            url: '../my'
          })
        }
      }
    })
  },

  selectimage:function(){
    let that = this;
    wx.chooseImage({
      count:9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFiles = res.tempFiles;
        that.setData({ tempFiles: tempFiles})
        if(tempFiles.size == 0){
          wx.showToast({
            title: '请选择图片',
            icon: 'none'
          })
        }
        for(var i=0;i<tempFiles.length;i++){
          if (tempFiles[i].size > 1024 * 1024) {
            wx.showToast({
              title: '上传图片不能大于1M!',
              icon: 'none'
            })
          } 
        }
      },
    })
  },
  
})