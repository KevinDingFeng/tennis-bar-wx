//index.js
//获取应用实例
var cityData = require('../../utils/city.js');
var utilJs = require('../../utils/util.js');
const app = getApp()
var pageIndex = 0;
var pageSize = 20;
var isbottom = false;
Page({
    data: {
        isScroll:true,
        pageStyle: `width:${app.globalData.width};height:${app.globalData.height}`,
        scale: app.globalData.windowWidth / app.globalData.windowHeight,
        gameTypes: { "All": "不限", "Entertainment": "娱乐局", "Teaching": "教学局" },    // 球局类型
        gt: ["All", "Entertainment", "Teaching"],
        skillLevs: { "All": "不限", "Entry": "入门(0~1.0)", "Medium": "中级(1.5~3.5)", "Professional": "专业(4.0~7.0)" },        // 球技等级 
        sl: ["All", "Entry", "Medium", "Professional"],
        //筛选
        skillLev: '',
        gameType: '',
        coachName: '',
        //搜索条件
        keyword: '',
        //商区 商圈码
        // code:null,
        level1: null,
        level2: null,
        level3: null,
        //智能排序
        lon_lat: {},
        orderType: '',
        orderTypeEnums: ["familiarity", "familiarity", "distance", "time"], //默认 熟悉度  距离  时间
        //打球时间
        date: '',  //日期
        time: '',  //时间
        timeType: ["morning", "afternoon", "night"],
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        inputShowed: false,
        inputVal: "",//三栏导航系列
        qy_text: "全部商区",
        nz_text: "智能排序",
        px_text: "打球时间",
        ft_text: "筛选",
        px_time: utilJs.formatDate(new Date()),
        content: [],
        nv: ['默认排序', '熟人优先', '距离最近', '时间最近'],//智能排序
        px: ['上午场', '下午场', '夜场'],//打球时间
        lx: ['球局类型1', '球局类型2', "球局类型3"],//筛选
        gods: [],//大神列表
        qyopen: false,
        qyshow: true,//商区显示隐藏
        nzopen: false,
        pxopen: false,
        nzshow: false,//智能筛选x显示 隐藏
        pxshow: false,//打球时间显示隐藏
        sxopen: false,
        sxshow: true,//筛选显示隐藏
        childopen: false,
        isfull: false,
        cityleft: cityData.getCity(),
        citycenter: {},
        cityright: {},
        select1: '',
        select2: '',
        shownavindex: '',
        games: [],
        sx_active: null,//筛选点击类型
        dj_active: null,//筛选的选择教练
        sq_hx: null,//商区回显
        px_hx: null,//排序回显
        time_hx: null,//打球时间回显
        xs_jl: null,//教练回显
        //当前用户信息
        wxUserInfo:null
    },
    inputTyping: function (e) {
        let keyword = e.detail.value;
        this.setData({ keyword: keyword })
    },
    //获取微信用户信息
    getWxUserInfo: function () {
      let that = this;
      wx.request({
        url: getApp().globalData.onlineUrl + 'api/wx_user_info',
        method: "GET",
        header: utilJs.hasTokenGetHeader(),
        success: function (res) {
          if (res.data.code == "200") {
            that.setData({
              wxUserInfo: res.data.data
            })
          }
        }
      })
    },
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '球局',
        })
        //获取当前微信用户信息
        this.getWxUserInfo();
        //获取所有教练，筛选的时候用
        this.getCoachList();
    },
    getCoachList: function () {
        let that = this;
        wx.request({
            url: getApp().globalData.onlineUrl + 'api/wx_user_info/coach',
            method: 'GET',
            header: utilJs.hasTokenGetHeader(),
            success: function (res) {
                if (res.data.code == '200') {
                    let coachs = res.data.data.coachList;
                    var gods = [];
                    coachs.forEach(function (item, index) {
                        gods.push({
                            id: item.id,
                            name: item.nickName,
                            checked:false
                        })
                    })
                    that.setData({ gods: gods })
                }
            }
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
            keyword: "",
            inputShowed: false
        });
    },
    //点击筛选 球局类型
    selectLX: function (e) {
        let _idx = e.currentTarget.dataset.idx;//点击当前的自定义id
        this.setData({
            sx_active: _idx,
        });
    },
    //点击筛选 球技等级
    selectDJ: function (e) {
        let _idx = e.currentTarget.dataset.idxdj;//点击当前的自定义id
        this.setData({
            dj_active: _idx
        });
    },
    //点击筛选 教练
    selecJL: function (e) {
        console.log(this.data.gods)
        let _idx = e.currentTarget.dataset.idxjl;//点击当前的自定义id
        let gods_arr = this.data.gods;//大神数据
        for(var i=0;i<gods_arr.length;i++){
            if (gods_arr[i].checked == true){

            }else{
                gods_arr[i].checked = false;
            }
            
        }
        gods_arr[_idx].checked = !gods_arr[_idx].checked;
        this.setData({
            gods: gods_arr
        });
    },

    //确认筛选
    filter_search: function () {
        this.setData({
            isfull: false,
            sxshow:true,
            sxopen:false,
            pxshow: true,
            qyshow: true,
            shownavindex:0
        })
        let gt = this.data.gt;
        let sl = this.data.sl;
        let qj_idx = this.data.sx_active;
        let dj_idx = this.data.dj_active;
        let gods = this.data.gods;
        if (qj_idx) {
            this.setData({ gameType: gt[qj_idx] });
        }
        if (dj_idx) {
            this.setData({ skillLev: sl[dj_idx] })
        }
        if (gods) {
            var gods_sub = [];
            gods.forEach(function (item, index) {
                if (item.checked) {
                    gods_sub.push(item.id)
                }
            })
            this.setData({ coachName: gods_sub.length == 0 ? '' : JSON.stringify(gods_sub) })
        }
        console.log(this.data.coachName);
        pageIndex = pageIndex > 0 ? 0 : pageIndex;
        wx.showToast({
            title: '数据查询中',
            icon: 'none'
        })
        this.queryGame();
    },
    //重置
    reset_search: function () {
        this.setData({
            sx_active: null,
            dj_active: null,
        })
        this.resetSelectCoach();
    },
    onShow: function () {
        pageIndex = 0;
        this.setData({ games: [] })
        this.queryGame();
    },
    listqy: function (e) {
        if (this.data.qyopen) {
            this.setData({
                qyopen: false,
                nzopen: false,
                pxopen: false,
                sxopen: false,
                sxshow: true,//筛选显示隐藏
                nzshow: true,
                pxshow: true,
                qyshow: true,//商区显示隐藏
                isfull: false,
                isScroll: true,
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
                sxopen: false,
                sxshow: true,//筛选显示隐藏
                isfull: true,
                citycenter: this.data.cityleft[0].city,
                select1: 0,
                select2: '',
                level1: this.data.cityleft[0].city[0].code,
                level2: '',
                level3: '',
                isScroll: true,
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
                sxopen: false,
                sxshow: true,//筛选显示隐藏
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
                sxopen: false,
                sxshow: true,//筛选显示隐藏
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
                sxopen: false,
                sxshow: true,//筛选显示隐藏
                nzshow: true,
                pxshow: true,//打球时间显示隐藏
                qyshow: true,
                childopen: false,
                isfull: false,
                shownavindex: 0,
               
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
                sxopen: false,
                sxshow: true,//筛选显示隐藏
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
            level2: '',
            level3: ''
        });
    },
    selectcenter: function (e) {
        let index = e.currentTarget.dataset.city;
        if (index == 0) {
            this.setData({
                level2: '',
                level3: '',
                qy_text: this.data.citycenter[index].name,
                nz_text: "智能排序",
                px_text: "打球时间",
                ft_text: "筛选",
                sq_hx:""
            })
            this.hidebg();
            this.setData({
                date: '',
                orderType: '',
                lon_lat: {},
                time: '',
                gameType: '',
                skillLev: '',
                coachName: '',
                sx_active: null,//筛选点击类型
                dj_active: null,//筛选的选择教练
                //清空games 数据
                games: []
            })
            this.resetSelectCoach();
            pageIndex = pageIndex > 0 ? 0 : pageIndex;
            this.queryGame();
        } else {
            this.setData({
                cityright: this.data.citycenter[e.currentTarget.dataset.city].district,
                select2: e.target.dataset.city,
                level2: this.data.citycenter[e.currentTarget.dataset.city].code,
                level3: ''
            });
        }
    },
    selectright: function (e) {
        let index = e.currentTarget.dataset.city;
        let city_name = e.currentTarget.dataset.cityname;
        if (index == 0) {
            this.setData({
                level3: '',
                qy_text: this.data.cityright[index].name,
                nz_text: "智能排序",
                px_text: "打球时间",
                ft_text: "筛选",
            })
        } else {
            this.setData({
                level3: this.data.cityright[e.currentTarget.dataset.city].code,
                qy_text: this.data.cityright[index].name,
                nz_text: "智能排序",
                px_text: "打球时间",
                ft_text: "筛选",
                sq_hx: city_name
            })
        }
        this.hidebg();
        this.setData({
            date: '',
            orderType: '',
            lon_lat: {},
            time: '',
            gameType: '',
            skillLev: '',
            coachName: '',
            sx_active: null,//筛选点击类型
            dj_active: null,//筛选的选择教练
            //清空games 数据
            games: []
        })
        this.resetSelectCoach();
        pageIndex = pageIndex > 0 ? 0 : pageIndex;
        this.queryGame();
    },
    hidebg: function (e) {
        if (this.data.sxopen) {
            this.setData({
                isfull: true,
            })
        } else {
            this.setData({
                qyopen: false,
                nzopen: false,
                pxopen: false,
                nzshow: true,
                pxshow: true,
                qyshow: true,
                sxshow: true,
                sxopen: false,
                isfull: false,
                shownavindex: 0
            })
        }
    },
    bindDateChange: function (e) {//时间选择
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value,
            px_time: e.detail.value
        })
    },

    //搜索
    search: function () {
        this.setData({ games: [] });
        pageIndex = pageIndex > 0 ? 0 : pageIndex;
        isbottom = false;
        this.queryGame();
    },

    //查询球局数据
    queryGame: function () {
        let that = this;
        let code = null;
        if (this.data.level1 != null) {
            code = { "level1": this.data.level1, "level2": this.data.level2, "level3": this.data.level3 };
        }
        wx.request({
            url: getApp().globalData.onlineUrl + 'api/game',
            method: "POST",
            data: {
                // "curUserId":3,
                "keyword": this.data.keyword,
                "code": JSON.stringify(code),
                "orderType": this.data.orderType,
                "lon_lat": JSON.stringify(this.data.lon_lat),
                "date": this.data.date,
                "timeType": this.data.time,
                "gameType": this.data.gameType,
                "skillLev": this.data.skillLev,
                "name": this.data.coachName,
                "page": pageIndex,
                "size": pageSize
            },
            header: utilJs.hasTokenPostHeader(),
            success: function (res) {
                console.log(res.data);
                if (res.data.code == "200") {
                    console.log(that.data.gods)
                    let game = that.data.games;
                    game = game.concat(res.data.data.page.content);
                    that.setData({
                        games: game
                    })
                    if (res.data.data.page.content.length < pageSize) {
                        isbottom = true;
                    } else {
                        pageIndex++;
                        isbottom = false;
                    }
                } else {
                    wx.showToast({
                        title: res.data.data,
                        icon: 'none'
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
    intelligentSort: function (event) {
        this.hidebg();
        let idx = event.currentTarget.dataset.idx;
        let _name = event.currentTarget.dataset.pxname;
        if (idx == 2) {
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
            ft_text: "筛选",
            nz_text: this.data.nv[idx],
            gameType: '',
            skillLev: '',
            coachName: '',
            sx_active: null,//筛选点击类型
            dj_active: null,//筛选的选择教练
            //清空games 数据
            games: [],
            px_hx: _name
        })
        this.resetSelectCoach();
        if (this.data.orderType == 'familiarity') {
            this.setData({ lon_lat: {}, date: '', time: '' })
        }
        if (this.data.orderType == 'distance') {
            this.setData({ date: '', time: '' })
        }
        if (this.data.orderType == 'time') {
            this.setData({ lon_lat: {} })
        }
        pageIndex = pageIndex > 0 ? 0 : pageIndex;
        this.queryGame();
    },

    //获取当前定位
    getLoc: function () {
        let that = this;
        let locations = that.data.lon_lat;
        //获取当前位置经纬度
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                var latitude = res.latitude;
                var longitude = res.longitude;
                locations.longitude = longitude;
                locations.latitude = latitude;
                that.setData({
                    lon_lat: locations
                })
            }
        })
    },
    //选择时间 上/下/晚
    selectTime: function (event) {
        this.hidebg();
        let idx = event.currentTarget.dataset.idx;
        let _type = event.currentTarget.dataset.type;
        this.setData({
            level1: null,
            level2: null,
            level3: null,
            lon_lat: {},
            orderType: '',
            qy_text: "全部商区",
            nz_text: "智能排序",
            ft_text: "筛选",
            time: this.data.timeType[idx],
            px_text: this.data.px[idx],
            gameType: '',
            skillLev: '',
            coachName: '',
            sx_active: null,//筛选点击类型
            dj_active: null,//筛选的选择教练
            //清空games 数据
            games: [],
            time_hx: _type
        })
        this.resetSelectCoach();
        pageIndex = pageIndex > 0 ? 0 : pageIndex;
        this.queryGame();
    },

    //筛选
    filter: function (e) {
        if (this.data.sxopen) {
            this.setData({
                nzopen: false,
                pxopen: false,
                qyopen: false,
                nzshow: true,
                sxshow: true,
                sxopen: false,
                pxshow: true,
                qyshow: true,
                isfull: false,
                shownavindex: 0
            })
        } else {
            this.setData({
                sxopen: true,
                nzopen: false,
                pxopen: false,
                qyopen: false,
                nzshow: true,
                sxshow: false,

                pxshow: true,
                qyshow: true,
                isfull: true,
                shownavindex: e.currentTarget.dataset.nav
            })
        }
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
            gameType: '',
            skillLev: '',
            name: '',
            //清空games 数据
            games: []
        })
        // this.resetSelectCoach();
    },

    /**
      * 页面相关事件处理函数--监听用户下拉动作
      */
    onPullDownRefresh: function () {
        pageIndex = pageIndex > 0 ? 0 : pageIndex;
        this.setData({ games: [] })
        this.queryGame();
        wx.showNavigationBarLoading();
        //模拟加载    
        setTimeout(function () {
            // complete 
            wx.hideNavigationBarLoading()  //完成停止加载     
            wx.stopPullDownRefresh() //停止下拉刷新    
            wx.showToast({
                title: '刷新完成！',
                icon: 'none'
            })
        }, 1500);
    },

    /**
      * 页面上拉触底事件的处理函数
      */
    onReachBottom: function () {
        if (!isbottom) {
            let orderType = this.data.orderType;
            if (orderType != 'familiarity') {
                this.queryGame();
            }
        } else {
            wx.showToast({
                title: '已经到底了~',
                icon: 'none'
            })
        }

    },
    resetSelectCoach: function () {
        let gods = this.data.gods;
        var gods_new = [];
        gods.forEach(function (item, index) {
            gods_new.push({
                id: item.id,
                name: item.name,
                checked:false
            })
        })
        this.setData({ gods: gods_new })
    },
    preventD:function(){

    }

})
