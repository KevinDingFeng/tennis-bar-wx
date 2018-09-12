// pages/game/map/map.js
var app = getApp();
// var utilJs = require("../../../utils/util.js");
//高德地图插件
var amapFile = require("../../../libs/amap-wx.js");
var key = "031aa4737c55832b6d6687e464f1bbd7";
var markersData = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tips:{},
    markers:[],
    longitude:'',
    latitude:'',
    city:'',
    keyword:'',
    textData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRego();  
  },
  //解析当前地址
  getRego:function(){
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getRegeo({
      iconPath: "../../../images/map/marker.png",
      iconWidth: 22,
      iconHeight: 32,
      success: function (data) {
        console.log(data[0]);
        var marker = [{
          id: data[0].id,
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          iconPath: data[0].iconPath,
          width: data[0].width,
          height: data[0].height
        }]
        that.setData({
          markers: marker,
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          textData: {
            name: data[0].name,
            desc: data[0].desc
          },
          city:data[0].regeocodeData.addressComponent.province
        })
      },
      fail: function (info) {
        // wx.showModal({title:info.errMsg})
      }
    })
  },

  getPoi:function(keyword){
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    var params = {
      iconPathSelected: '../../../images/map/marker_checked.png',
      iconPath: '../../../images/map/marker.png',
      success: function (data) {
        markersData = data.markers;
        var poisData = data.poisData;
        var markers_new = [];
        markersData.forEach(function (item, index) {
          markers_new.push({
            id: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            iconPath: item.iconPath,
            width: item.width,
            height: item.height
          })
        })
        if (markersData.length > 0) {
          that.setData({
            markers: markers_new,
            city: poisData[0].cityname || '',
            latitude: markersData[0].latitude,
            longitude: markersData[0].longitude
          });
          that.showMarkerInfo(markersData, 0);
        } else {
          wx.getLocation({
            type: 'gcj02',
            success: function (res) {
              that.setData({
                latitude: res.latitude,
                longitude: res.longitude,
                city: '北京市'
              });
            },
            fail: function () {
              that.setData({
                latitude: 39.909729,
                longitude: 116.398419,
                city: '北京市'
              });
            }
          })
          that.setData({
            textData: {
              name: '抱歉，未找到结果',
              desc: ''
            }
          });
        }
      },
      fail: function (info) {
        // wx.showModal({title:info.errMsg})
      }
    }
    params.querykeywords = keyword == '' ? '网球场' : keyword;
    myAmapFun.getPoiAround(params)
  },
  //显示选择的球场
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "../../../images/map/marker_checked.png";
      } else {
        data[j].iconPath = "../../../images/map/marker.png";
      }
      markers.push({
        id: data[j].id,
        latitude: data[j].latitude,
        longitude: data[j].longitude,
        iconPath: data[j].iconPath,
        width: data[j].width,
        height: data[j].height
      })
    }
    that.setData({
      markers: markers
    });
  },
  //点击球场
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    console.log(markersData);
    if(markersData.length > 0){
      that.showMarkerInfo(markersData, id);
      that.changeMarkerColor(markersData, id);
    }
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
  bindInput:function(e){
    var that = this;
    var keyword = e.detail.value;
    that.getPoi(keyword);
  },
  //确定选择的对象
  confirm:function(){
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];
    prePage.setData({
      courtName:this.data.textData.name
    })
    markersData = [];
    wx.navigateBack({})
  }
})