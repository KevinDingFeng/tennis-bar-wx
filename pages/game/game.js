// pages/game/game.js
var utilJs = require("../../utils/util.js");
var dateTimePicker = require('../../utils/dateTimePicker.js');
var pageIndex = 0;
var pageSize = 20;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: getApp().globalData.imgUrl,
        //微信用户信息
        wxUserInfo:'',
        ages: ["LessThree", "LessFive", "LessTen","MoreTen"],
        playAges: { "LessThree": "3年以下", "LessFive": "3~5年", "LessTen": "5~10年", "MoreTen": "10年以上"},
        level: ["Entry", "Medium","Professional"],
        skillLevels: { "Entry": "入门(0~1.0)", "Medium": "中级(1.5~3.5)", "Professional": "专业(4.0~7.0)"},
        // 球局数据
        name:'',
        start_time: null,
        end_time: null,
        playAge:null,       //球龄
        skillLevel:null,    //球技
        totalNum:1,         //总人数 
        maleNum:0,          //男性人数
        femaleNum:0,        //女性人数
        holderNum:0,        //预留人数
        deadlineTime:null,  //报名截止日期
        remark:null,        //备注
        //球场
        courts:{},
        //选择的球场
        selectedCourt:{
            name:"请输入球场名称/球场地址关键字"
        },
        court_img: '',
        time: '',
        dateTimeArray: null,
        dateTime: null,
        dateTimeArray1: null, //kssj
        dateTime1: null, //kssj
        dateTimeArray2: null, //endsj
        dateTime2: null, //endsj
        dateTimeArray3: null, //deadsj
        dateTime3: null, //deadsj
        startYear: 2000,
        endYear: 2050,
        cc: true,
        cc1:true,
        cc2:true,
        isopen:true, //是否公开
        isEntertaining: true, //球局类型
        isfull:false,
        isfirst:"1",
        nolimitSex:true,
        array: ['3年以下', '3-5年', '5-10年', "10年以上"],
        array_ji: ['入门(0~1.0)', '中级(1.5~3.5)','专业(4.0~7.0)'],
        array_peo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
        selectData: [], //预留位置
        selectData_g:[],//预留人数女
        selectData_n:[],//预留人数男
        index: 0,//选择的下拉列表下标
        show_nan: false,//控制下拉列表的显示隐藏，false隐藏、true显示
        index_nan: 0,//选择的下拉列表下标
        show_yul: false,//控制下拉列表的显示隐藏，false隐藏、true显示
        index_peo: 0,//选择的下拉列表下标

        index_total:0, //球龄
        index_ji:0    //球技
    },

    //球局类型
    selectType:function(e){
      let isEntertaining = e.currentTarget.dataset.entaintype;
      this.setData({ isEntertaining : !isEntertaining})
    },
    //是否公开
    selectOpenType:function(e){
      let isOpen = e.currentTarget.dataset.opentype;
      this.setData({ isopen : !isOpen })
    },
    // 是否限制性别
    selectSex:function(e){
      let limit = e.currentTarget.dataset.limittype;
      if (!limit){
        this.setData({ nolimitSex: !limit})
        this.setData({ maleNum : 0 })
        this.setData({ femaleNum: 0 })
      }else{
        this.setData({ nolimitSex: !limit })
      }
    },
    // 点击下拉显示框
    selectTap() {//性别女
        let _this = this;
        var _num;
        var n_num = _this.data.index_nan;//男的数量
        if (n_num >0){
            _num = parseInt(_this.data.index_total) + 1;
            _num =  _num - n_num;
        }else{
            _num = parseInt(_this.data.index_total) + 1;
        }
        
        let _selectData = [];
        for (var i = 0; i <= _num; i++) {
            _selectData.push(i)
        }
        this.setData({
            show: !this.data.show,
            selectData_g: _selectData,
            // show_nan:false
        });
    },
    selectTap_nan() {//性别男
        let _this = this;
        var _num = parseInt(_this.data.index_total) + 1;
        var g_num = _this.data.femaleNum;//女的数量
        if (g_num > 0){
            _num = parseInt(_this.data.index_total) + 1;
            _num = _num - g_num;
        }else{
            _num = parseInt(_this.data.index_total) + 1;
        }
        let _selectData = [];
        for (var i = 0; i <= _num; i++) {
            _selectData.push(i)
        }
      
        this.setData({
            show_nan: !this.data.show_nan,
            selectData_n: _selectData,
            // show:false
        });
    },
    selectTap_peo() {//预留位置
        let _this = this;
        var _num = parseInt(_this.data.index_total) +1;
        let _selectData = [];
       // _num = _num.toString();
        for (var i = 0; i <= _num;i++){
            _selectData.push(i)
        }
        this.setData({
            show_peo: !this.data.show_peo,
            selectData: _selectData,
        });
    },
    // 点击下拉列表
    optionTap_nan(e) {
        let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
        this.setData({
            index_nan: Index,
            show_nan: !this.data.show_nan,
            maleNum:this.data.selectData_n[Index]
        });
    },
    optionTap_peo(e) {
        let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
        this.setData({
            index_peo: Index,
            show_peo: !this.data.show_peo,
            holderNum: this.data.selectData[Index]
        });
    },
    optionTap(e) {
        let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
        this.setData({
            index: Index,
            show: !this.data.show,
            femaleNum:this.data.selectData_g[Index]
        });
    },
    go_history() {//上一步
       this.setData({
           isfirst: "1",
       });
   },
    yul_show(){//点击预览
        this.setData({
            isfirst: "3",
        });
    },
    next_bu(){//下一步
      if (this.data.name.length < 1 || this.data.name.length > 10) {
        wx.showToast({
          title: '球局名称长度0~10位~',
          icon: 'none'
        })
        return false;
      } else if (this.data.name.length == "" || this.data.name.length == undefined || this.data.name.length == null){
            wx.showToast({
                title: '球局名称不能为空~',
                icon: 'none'
            })
          return false;
      }
      if (this.data.selectedCourt == '') {
        wx.showToast({ title: '球场不能为空~', icon: 'none' })
        return false;
      }
      if (this.data.start_time == null || this.data.end_time == null) {
        wx.showToast({ title: '打球时间不能为空~', icon: 'none' })
        return false;
      } else if (parseInt(utilJs.replaceAllChar(this.data.start_time)) > parseInt(utilJs.replaceAllChar(this.data.end_time))) {
        wx.showToast({ title: '打球开始时间不能晚于打球结束时间~', icon: 'none' })
        return false;
      }
      this.setData({
        isfirst: "2",
      });
    },
    bindPickerChange: function (e) {//球龄
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value,
            playAge:this.data.ages[e.detail.value]
        })
    },
    bindPickerChange_ji: function (e) {//球技等级
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index_ji: e.detail.value,
            skillLevel:this.data.level[e.detail.value]
        })
    },
    bindPickerChange_peo: function (e) {//打球人数
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index_total : e.detail.value,
            totalNum : this.data.array_peo[e.detail.value]   
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //获取微信用户信息
        this.getWxUserInfo();

        // 获取完整的年月日 时分秒，以及默认显示的数组
        var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        // 精确到分的处理，将数组的秒去掉
        var lastArray = obj1.dateTimeArray.pop();
        var lastTime = obj1.dateTime.pop();

        this.setData({
            dateTime: obj.dateTime,
            dateTimeArray: obj.dateTimeArray,
            dateTimeArray1: obj1.dateTimeArray,
            dateTime1: obj1.dateTime,
            dateTimeArray2: obj1.dateTimeArray,
            dateTime2: obj1.dateTime,
            dateTimeArray3: obj1.dateTimeArray,
            dateTime3: obj1.dateTime
        });
    },
    changeDateTime1(e) {
        this.setData({ dateTime1: e.detail.value });
        this.setData({ cc: false });
    },
    changeDateTime2(e) {
        this.setData({ dateTime2: e.detail.value });
        this.setData({ cc1: false });
    },
    changeDateTime3(e) {
      this.setData({ dateTime3: e.detail.value });
      this.setData({ cc2: false });
    },
    changeDateTimeColumn1(e) {
      var arr = this.data.dateTime1;
      var dateArr = this.data.dateTimeArray1;
      arr[e.detail.column] = e.detail.value;
      dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
      this.setData({
        dateTimeArray1: dateArr,
        dateTime1: arr,
      });
      let dateTimeArray1 = this.data.dateTimeArray1;
      let dateTime1 = this.data.dateTime1;
      let startTime = dateTimeArray1[0][dateTime1[0]] + "-" + dateTimeArray1[1][dateTime1[1]] + "-" + dateTimeArray1[2][dateTime1[2]] + " " + dateTimeArray1[3][dateTime1[3]] + ":" + dateTimeArray1[4][dateTime1[4]];

      let cur = parseInt(utilJs.replaceAllChar(utilJs.formatTime(new Date())));
      let stt = parseInt(utilJs.replaceAllChar(startTime));
      let edt = parseInt(utilJs.replaceAllChar(this.data.end_time));
      if (cur > stt) {
        wx.showToast({
          title: '打球开始日期不得早于当前时间',
          icon: 'none'
        })
        this.setData({ start_time: null })
        return ;
      }
      if(this.data.end_time != null){
        if(stt > edt){
          wx.showToast({
            title: '打球结束日期不得早于开始日期',
            icon: 'none'
          })
          this.setData({ start_time: null })
          this.setData({ deadlineTime: null })
          return ;
        }else{
          this.setData({ start_time : startTime })
          this.setData({ deadlineTime: startTime})
        }
      }else{
        this.setData({ start_time: startTime })
        this.setData({ deadlineTime: startTime })
      }
      
    },
    changeDateTimeColumn2(e) {
        var arr = this.data.dateTime2, dateArr = this.data.dateTimeArray2;
        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
        this.setData({
            dateTimeArray2: dateArr,
            dateTime2: arr
        });
        let dateTime1 = this.data.dateTime1;
        let dateTimeArray2 = this.data.dateTimeArray2;
        let dateTime2 = this.data.dateTime2;
        let endTime = dateTimeArray2[0][dateTime2[0]]+"-"+dateTimeArray2[1][dateTime2[1]]+"-"+ dateTimeArray2[2][dateTime1[2]] + " " + dateTimeArray2[3][dateTime2[3]] + ":" + dateTimeArray2[4][dateTime2[4]];
        let stt = parseInt(utilJs.replaceAllChar(this.data.start_time));
        let edt = parseInt(utilJs.replaceAllChar(endTime));
        if(this.data.start_time != null){
          if(stt > edt){
            wx.showToast({
              title: '打球结束日期不得早于开始日期',
              icon:'none'
            })
            this.setData({ end_time: null })
            return ;
          }else{
            this.setData({ end_time: endTime })
          }
        }
    },
    changeDateTimeColumn3(e) {
      var arr = this.data.dateTime3, dateArr = this.data.dateTimeArray3;
      arr[e.detail.column] = e.detail.value;
      dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
      this.setData({
        dateTimeArray3: dateArr,
        dateTime3: arr
      });
      let dateTimeArray3 = this.data.dateTimeArray3;
      let dateTime3 = this.data.dateTime3;
      let deadlineTime = dateTimeArray3[0][dateTime3[0]] + "-" + dateTimeArray3[1][dateTime3[1]] + "-" + dateTimeArray3[2][dateTime3[2]] + " " + dateTimeArray3[3][dateTime3[3]] + ":" + dateTimeArray3[4][dateTime3[4]];
      this.setData({ deadlineTime: deadlineTime })
    },
    
    ball_cc(){//场地
        this.setData({
            isfull: true,
        });
    },
    hidebg: function (e) {
        this.setData({
            isfull: false,
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
        wx.setNavigationBarTitle({
            title: '发布球局',
        })
    },

    //球局数据
    //球局名称
    gameName:function(e){
      let gameName = e.detail.value;
      if(gameName.length > 10 ){
        wx.showToast({
          title: '球局名称长度不超过10位',
          icon:'none'
        })
      }else if (gameName.length <= 0){
        wx.showToast({
          title: '球局名称不能为空!',
          icon: 'none'
        })
      }
      this.setData({
        name:e.detail.value
      })
    },
    //备注
    remark:function(e){
      this.setData({
        remark:e.detail.value
      })
    },

    addGame: function(e) {
        let formData = {};
        // formData.organizerId = this.data.wxUserInfo.id;
        // formData.organizerId = 3;
        formData.name = this.data.name;
        formData.courtId = this.data.selectedCourt.id;
        formData.startTime = this.data.start_time;
        formData.endTime = this.data.end_time;
        formData.gameType = this.data.isEntertaining ? 'Entertainment' :'Teaching';
        formData.isPublic = this.data.isopen;
        formData.playAge = this.data.playAge==null ? this.data.ages[this.data.index]:this.data.playAge;
        formData.skillLevel = this.data.skillLevel==null ? this.data.level[this.data.index_ji]:this.data.skillLevel;
        formData.limitGender = !this.data.nolimitSex;
        if(!this.data.nolimitSex){
          if(this.data.maleNum + this.data.femaleNum != this.data.totalNum){
            wx.showToast({ title: '打球人数设置错误,请重新检查~', icon: 'none' })
            return false;
          }
          formData.femaleNum = this.data.femaleNum;
          formData.maleNum = this.data.maleNum;
        }else if(this.data.holderNum > this.data.totalNum){
          wx.showToast({ title: '预留位置人数不能超过打球总人数~', icon: 'none' })
          return false;
        }
        formData.holderNum = this.data.holderNum;
        formData.totalNum = this.data.totalNum ;
        if(parseInt(utilJs.replaceAllChar(this.data.deadlineTime)) > parseInt(utilJs.replaceAllChar(this.data.start_time))){
          wx.showToast({ title: '报名截止时间不能晚于打球开始时间~', icon: 'none' })
          return false;
        }
        formData.deadlineTime = this.data.deadlineTime;
        formData.remark = this.data.remark;
        if (this.data.remark !=null && this.data.remark.length>31){
            wx.showToast({ title: '备注字数为30字之内~', icon: 'none' })
            return false;
        }
        let that = this;
        wx.request({
          url: getApp().globalData.onlineUrl + 'api/game/create',
          data: formData,
          method: 'POST',
          header: utilJs.hasTokenGetHeader(),
          success: function (res) {
            if (res.data.code == "200") {
              that.setData({
                name: '',
                selectedCourt: {
                  name: "请输入球场名称/球场地址关键字"
                },
                courts:{},
                start_time: null,
                end_time: null,
                playAge: null,
                skillLevel: null,
                totalNum: 0,
                maleNum: 0,
                femaleNum: 0,
                holderNum: 0,
                deadlineTime: null,
                remark: null,
                isfirst: "1",
                isopen: true, //是否公开
                isEntertaining: true, //球局类型
                isfull: false,
                nolimitSex: true,
              })
              wx.switchTab({
                url: '../index/index',
              })
            }else{
              wx.showToast({
                title: res.data.data.errMsg,
                icon:'none'
              })
            }
          }
        })
    },


    //搜索球场
    getCourts:function(e){
      let courtName = e.detail.value;
      let that = this;
      if(courtName){
        wx.request({
          url: getApp().globalData.onlineUrl + 'api/game/courts?courtName=' + courtName,
          method:'GET',
          data: {
            "page": pageIndex,
            "value": pageSize
          },
          header: utilJs.hasTokenGetHeader(),
          success:function(res){
            if(res.data.code == '200'){
              that.setData({
                courts:res.data.data.page
              })
            }
          }
        })
      }else{
        that.setData({
          courts:{},
          selectedCourt: {
            name: "请输入球场名称/球场地址关键字"
          },
        })
      }
    },
    //打开地图
    openMap:function(e){
      let latitude = event.currentTarget.dataset.latitude;
      let longitude = event.currentTarget.dataset.longitude;
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
      })
    },
    //选择球场
    selectCourt:function(e){
      let court = e.currentTarget.dataset.court;
      this.getCourtImgInfo(court.id);
      this.setData({
        isfull: false,
        selectedCourt:court,
        courtName:court.name
      })
    },
    //获取球场图片信息
    getCourtImgInfo: function (id) {
      let that = this;
      wx.request({
        url: getApp().globalData.onlineUrl + 'api/court_img/list?courtId=' + id,
        method: 'GET',
        header: utilJs.hasTokenGetHeader(),
        success: function (res) {
          if (res.data.code == '200') {
            let courtImg = res.data.data;
            that.setData({ court_img: courtImg })
          }
        }
      })
    },
    //获取微信用户信息
    getWxUserInfo:function(){
      let that = this;
      wx.request({
        url: getApp().globalData.onlineUrl + 'api/wx_user_info',
        method:"GET",
        header: utilJs.hasTokenGetHeader(),
        success:function(res){
          if(res.data.code =="200"){
            that.setData({
              wxUserInfo:res.data.data
            })
          }
        }
      })
    }
})