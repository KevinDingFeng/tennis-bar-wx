//index.js
//获取应用实例
var cityData = require('../../utils/city.js');
const app = getApp()
var pageIndex = 0;
var pageSize = 20;

Page({
    data: {
        keyword:'',
        // code: {"level1": "100", "level2": "101", "level3": "10101"},
        // code: { "level1": "100", "level2": "101", "level3": "" },
        code: { "level1": "100", "level2": "", "level3": "" },
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
        nv: ['默认排序', '离我最近', '价格最低', '价格最高'],//智能排序
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
    /**
     * 
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
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
     * 
     */
    inputTyping: function (e) {
        let keyword = e.detail.value;
        this.setData({keyword:keyword})
        // this.setData({
        //     inputVal: e.detail.value
        // });
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
            citycenter: this.data.cityleft[e.currentTarget.dataset.city],
            select1: e.target.dataset.city,
            select2: ''
        });
    },
    selectcenter: function (e) {
        this.setData({
            cityright: this.data.citycenter[e.currentTarget.dataset.city],
            select2: e.target.dataset.city
        });
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
            px_time: e.detail.value
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
    //         url: "https://tennis.dazonghetong.com/api/wx_user_info",//根据全局变量token获取后台储存的微信用户信息
    //         header: {
    //             'tennisToken': app.globalData.tennisToken
    //         },
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
      wx.request({
        url: 'http://localhost:6677/game',
        method: "GET",
        data:{
          "keyword": this.data.keyword ,
          "code": JSON.stringify(this.data.code),
          "page":  pageIndex,
          "value":  pageSize
        },
        header: {
          "content-Type": "application/json"
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.code = "200") {
            that.setData({
              games: res.data.data.page
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
    }
})
