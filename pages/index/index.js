//index.js
//获取应用实例
var cityData = require('../../utils/city.js');
var utilJs = require('../../utils/util.js');
const app = getApp()
var pageIndex = 0;
var pageSize = 20;

Page({
    data: {
        //搜索条件
        keyword:'',
        //商区 商圈码
        // code:null,
        level1:null,
        level2:null,
        level3:null,
        // code: {"level1": "100", "level2": "101", "level3": "10101"},
        // code: { "level1": "100", "level2": "101", "level3": "" },
        // code: { "level1": "100", "level2": "", "level3": "" },
        //智能排序
        lon_lat:{},
        // lon_lat: {"longitude": "116.366225", "latitude":"39.935242"},
        orderType:'',
        orderTypeEnums: ["familiarity", "familiarity", "distance", "time"], //默认 熟悉度  距离  时间
        //打球时间
        date:'',  //日期
        time:'',  //时间
        timeType:["morning","afternoon","night"],
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        inputShowed: false,
        inputVal: "",//三栏导航系列
        qy_text:"全部商区",
        nz_text:"智能排序",
        px_text:"打球时间",
        px_time:"请选择日期",
        content: [],
        nv: ['默认排序', '熟人优先', '距离最近', '时间最近'],//智能排序
        px: ['上午场', '下午场', '夜场'],//打球时间
        qyopen: false,
        qyshow: true,//商区显示隐藏
        nzopen: false,
        pxopen: false,
        nzshow: false,//智能筛选x显示 隐藏
        pxshow: false,//打球时间显示隐藏
        childopen:false,
        isfull: false,
        cityleft: cityData.getCity(),
        citycenter: {},
        cityright: {},
        select1: '',
        select2: '',
        shownavindex: '',
        games: ''
    },
    inputTyping: function (e) {
        let keyword = e.detail.value;
        this.setData({keyword:keyword})
    },
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '球局',
        })
    },
    onShow: function(){
      this.queryGame();
    },
    listqy: function (e) {
        if (this.data.qyopen) {
            this.setData({
                qyopen: false,
                nzopen: false,
                pxopen: false,
                nzshow: true,
                pxshow: true,
                qyshow: true,//商区显示隐藏
                isfull: false,
                shownavindex: 0
            })
        } else {
            this.setData({
                qyopen: true,
                pxopen: false,
                nzopen: false,
                nzshow: true,
                pxshow: true,
                qyshow: false,
                isfull: true,
                shownavindex: e.currentTarget.dataset.nav
            })
        }
    },
    list: function (e) {
        if (this.data.nzopen) {
            this.setData({
                nzopen: false,
                pxopen: false,
                qyopen: false,
                nzshow: true,//智能筛选x显示 隐藏
                pxshow: true,
                qyshow: true,
                isfull: false,
                shownavindex: 0
            })
        } else {
            this.setData({
                content: this.data.nv,
                nzopen: true,
                pxopen: false,
                qyopen: false,
                nzshow: false,
                pxshow: true,
                qyshow: true,
                isfull: true,
                shownavindex: e.currentTarget.dataset.nav
            })
        }
    },
    listpx: function (e) {
        if (this.data.pxopen) {
            this.setData({
                nzopen: false,
                pxopen: false,
                qyopen: false,
                nzshow: true,
                pxshow: true,//打球时间显示隐藏
                qyshow: true,
                childopen:false,
                isfull: false,
                shownavindex: 0
            })
        } else {
            this.setData({
                content: this.data.px,
                nzopen: false,
                pxopen: true,
                qyopen: false,
                nzshow: true,
                pxshow: false,
                qyshow: true,
                childopen: true,
                isfull: true,
                shownavindex: e.currentTarget.dataset.nav
            })
        }
        console.log(e.target)
    },
    selectleft: function (e) {
        this.setData({
            cityright: {},
            citycenter: this.data.cityleft[e.currentTarget.dataset.city].city,
            select1: e.target.dataset.city,
            select2: '',
            level1: this.data.cityleft[e.currentTarget.dataset.city].code,
            level2:'',
            level3:''
        });
    },
    selectcenter: function (e) {
        this.setData({
            cityright: this.data.citycenter[e.currentTarget.dataset.city].district,
            select2: e.target.dataset.city,
            level2: this.data.citycenter[e.currentTarget.dataset.city].code,
            level3:''
        });
    },
    selectright:function(e){
        this.setData({
            level3: this.data.cityright[e.currentTarget.dataset.city].code,
        })
        this.hidebg();
    },
    hidebg: function (e) {
        this.setData({
            qyopen: false,
            nzopen: false,
            pxopen: false,
            nzshow: true,
            pxshow: true,
            qyshow: true,
            isfull: false,
            shownavindex: 0
        })
    },
    bindDateChange: function (e) {//时间选择
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },

    // getUserInfo: function (e) {
    //     console.log(e)
    //     app.globalData.userInfo = e.detail.userInfo
    //     this.setData({
    //         userInfo: e.detail.userInfo,
    //         hasUserInfo: true
    //     })
    //     wx.request({
    //         url: getApp().globalData.onlineUrl + 'api/wx_user_info',//根据全局变量token获取后台储存的微信用户信息
    //         header: utilJs.hasTokenGetHeader(),
    //         data: {

    //         },
    //         success: function (res) {
    //             console.log(res);
    //         }
    //     })
    // },

    //搜索
    search:function(){
      this.queryGame();
    },
    
    //查询球局数据
    queryGame:function(){
      let that = this;
      if(this.data.orderType != ''){
        this.setData({ level1: null, level2: null, level3: null })
      }
      let bcode = null;
      if(this.data.level1 != null){
        bcode = { "level1": this.data.level1, "level2": this.data.level2, "level3": this.data.level3 };
      }
      wx.request({
        url: getApp().globalData.onlineUrl + 'api/game',
        method: "GET",
        data:{
          // "curUserId":3,
          "keyword": this.data.keyword ,
          "code": JSON.stringify(bcode),
          "date":this.data.date,
          "orderType":this.data.orderType,
          "lon_lat":JSON.stringify(this.data.lon_lat),
          "timeType":this.data.time,
          "page":  pageIndex,
          "value":  pageSize
        },
        header: utilJs.hasTokenGetHeader(),
        success: function (res) {
          console.log(res.data);
          if (res.data.code == "200") {
            that.setData({
              games: res.data.data.page
            })
          }else{
            wx.showToast({
              title: res.data.data,
              icon:'none'
            })
          }
        }
      })
      this.setData({
        // code:null,
        date:'',
        time:''
      })
    },

    // 查看球场地址详情
    openLocation: function (event) {
        let latitude = event.currentTarget.dataset.latitude;
        let longitude = event.currentTarget.dataset.longitude;
        wx.openLocation({
            latitude: latitude,
            longitude: longitude,
        })
    },
    // 申请加入球局
    applyJoinGame: function (event) {
        let game = event.currentTarget.dataset.game;
        wx.navigateTo({
            url: '../activity/apply/apply?game=' + JSON.stringify(game),
        })
    },

    // 智能排序
    intelligentSort:function(event){
      this.hidebg();
      let idx = event.currentTarget.dataset.idx;
      if(idx == 2){
        this.getLoc();
      }
      this.setData({
        orderType: this.data.orderTypeEnums[idx]
      })
      this.queryGame();
      this.setData({
        orderType:'',
        lon_lat:{},
      })
    },
    //获取当前定位
    getLoc:function(){
      let that =this;
      let locations = that.data.lon_lat;
      //获取当前位置经纬度
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          locations.longitude = longitude;
          locations.latitude  = latitude;
          that.setData({
            lon_lat : locations
          })
        }
      })
    },
    //选择时间 上/下/晚
    selectTime:function(event){
      this.hidebg();
      let idx = event.currentTarget.dataset.idx;
      this.setData({time:this.data.timeType[idx]})
    },
    
    
    


})
