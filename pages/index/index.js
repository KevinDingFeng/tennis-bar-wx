//index.js
//获取应用实例
var cityData = require('../../utils/city.js');
var utilJs = require('../../utils/util.js');
const app = getApp()
var pageIndex = 0;
var pageSize = 20;

Page({
    data: {
        //筛选
        skillLev:'',
        gameType:'',
        coachName:'',
        //搜索条件
        keyword:'',
        //商区 商圈码
        // code:null,
        level1:null,
        level2:null,
        level3:null,
        //智能排序
        lon_lat:{},
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
        ft_text:"筛选",
        px_time: utilJs.formatDate(new Date()),
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
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
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
        let index = e.currentTarget.dataset.city;
        if(index == 0){
          this.setData({
            level2: '',
            level3: '',
            qy_text: this.data.citycenter[index].name,
            nz_text: "智能排序",
            px_text: "打球时间",
          })
          this.hidebg();
          this.setData({
            date: '',
            orderType: '',
            lon_lat: {},
            time: '',
            gameType: '',
            skillLev: '',
            name: ''
          })
          this.queryGame();
        }else{
          this.setData({
              cityright: this.data.citycenter[e.currentTarget.dataset.city].district,
              select2: e.target.dataset.city,
              level2: this.data.citycenter[e.currentTarget.dataset.city].code,
              level3:''
          });
        }
    },
    selectright:function(e){
        let index = e.currentTarget.dataset.city;
        if(index == 0){
          this.setData({
            level3:'',
            qy_text: this.data.cityright[index].name,
            nz_text: "智能排序",
            px_text: "打球时间",
          })
        }else{
          this.setData({
              level3: this.data.cityright[e.currentTarget.dataset.city].code,
              qy_text: this.data.cityright[index].name,
              nz_text: "智能排序",
              px_text: "打球时间",
          })
        }
        this.hidebg();
        this.setData({
          date:'',
          orderType: '',
          lon_lat:{},
          time:'',
          gameType: '',
          skillLev: '',
          name: ''
        })
        this.queryGame();

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
            date: e.detail.value,
            px_time:e.detail.value
        })
    },

    //搜索
    search:function(){
      this.queryGame();
    },
    
    //查询球局数据
    queryGame:function(){
      let that = this;
      let code = null;
      if(this.data.level1 != null){
        code = { "level1": this.data.level1, "level2": this.data.level2, "level3": this.data.level3 };
      }
      wx.request({
        url: getApp().globalData.onlineUrl + 'api/game',
        method: "GET",
        data:{
          // "curUserId":3,
          "keyword": this.data.keyword ,
          "code": JSON.stringify(code),
          "orderType":this.data.orderType,
          "lon_lat":JSON.stringify(this.data.lon_lat),
          "date":this.data.date,
          "timeType":this.data.time,
          "gameType":this.data.gameType,
          "skillLev":this.data.skillLev,
          "name":this.data.coachName,
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
        this.setData({
          level1: null,
          level2: null,
          level3: null,
          qy_text: "全部商区",
          px_text: "打球时间",
          nz_text: this.data.nv[idx],
          gameType: '',
          skillLev: '',
          name: ''
        })
        if (this.data.orderType == 'familiarity'){
          this.setData({ lon_lat: {}, date: '', time: ''})
        }
        if (this.data.orderType == 'distance') {
          this.setData({ date: '', time: ''})
        }
        if (this.data.orderType == 'time'){
          this.setData({ lon_lat: {}})
        }
        this.queryGame();
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
      this.setData({
          level1:null,
          level2: null,
          level3: null,
          lon_lat: {},
          orderType: '',
          qy_text: "全部商区",
          nz_text: "智能排序",
          time: this.data.timeType[idx],
          px_text: this.data.px[idx],
          gameType: '',
          skillLev: '',
          name: ''
      })
      this.queryGame();
    },
    
    //筛选
    filter:function(){
      this.setData({
        level1: null,
        level2: null,
        level3: null,
        lon_lat: {},
        orderType: '',
        qy_text: "全部商区",
        nz_text: "智能排序",
        px_text: "打球时间",
        time: '',
        date: '',
        // gameType: 'Entertainment',
        // gameType:'Teaching',
        gameType: '',
        // skillLev:'Entry',
        skillLev: 'Professional',
        name:''
      })
      this.queryGame();
    }

})
