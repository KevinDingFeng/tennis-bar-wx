// pages/game/game.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        //球场
        courts:'',
        //选择的球场
        selectedCourt:'',
        time: '',
        dateTimeArray: null,
        dateTime: null,
        dateTimeArray1: null, //kssj
        dateTime1: null, //kssj
        dateTimeArray2: null, //endsj
        dateTime2: null, //endsj
        startYear: 2000,
        endYear: 2050,
        cc: true,
        cc1: true,
        stat_time:null,
        end_time: null,
        isopen:true,
        istype: false,
        isfull:false,
        isfirst:"1",
        issex:false,
        array: ['3年以下', '3-5年', '30-40岁', '5-10年', "10年以上"],
        array_ji: ['不限', '入门','中级','专业'],
        array_peo: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
        show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
        selectData: [], //['1个', '2个', '3个', '4个', '5个', '6个'],下拉列表的数据
        index: 0,//选择的下拉列表下标
        show_nan: false,//控制下拉列表的显示隐藏，false隐藏、true显示
        index_nan: 0,//选择的下拉列表下标
        show_yul: false,//控制下拉列表的显示隐藏，false隐藏、true显示
        index_peo: 0,//选择的下拉列表下标
    },
    // 点击下拉显示框
    selectTap() {
        this.setData({
            show: !this.data.show,
            selectData: ['1个', '2个', '3个', '4个', '5个', '6个'],
        });
    },
    selectTap_nan() {
        this.setData({
            show_nan: !this.data.show_nan,
            selectData: ['1个', '2个', '3个', '4个', '5个', '6个'],
        });
    },
    selectTap_peo() {
        this.setData({
            show_peo: !this.data.show_peo,
            selectData: ['1个', '2个', '3个', '4个', '5个', '6个'],
        });
    },
    // 点击下拉列表
    optionTap_nan(e) {
        let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
        this.setData({
            index_nan: Index,
            show_nan: !this.data.show_nan,
        });
    },
    optionTap_peo(e) {
        let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
        this.setData({
            index_peo: Index,
            show_peo: !this.data.show_peo,
        });
    },
    optionTap(e) {
        let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
        this.setData({
            index: Index,
            show: !this.data.show,
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
        this.setData({
            isfirst: "2",
        });
    },
    bindPickerChange: function (e) {//球龄
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    bindPickerChange_ji: function (e) {//球技等级
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index_ji: e.detail.value
        })
    },
    bindPickerChange_peo: function (e) {//打球人数
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index_peo: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
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
            dateTime2: obj1.dateTime
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
    changeDateTimeColumn2(e) {

        var arr = this.data.dateTime2, dateArr = this.data.dateTimeArray2;

        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

        this.setData({
            dateTimeArray2: dateArr,
            dateTime2: arr
        });
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

    formSubmit: function(e) {
        let formData = e.detail.value;
        console.log(JSON.stringify(formData));
        wx.navigateTo({
            url: './court/court?game=' + JSON.stringify(formData),
        })
    },


    //搜索球场
    getCourts:function(e){
      let courtName = e.detail.value;
      let that = this;
      if(courtName){
        wx.request({
          url: 'http://localhost:6677/game/courts?courtName=' + courtName,
          method:'GET',
          header:{
            "content-type": "application/x-www-form-urlencodedn"
          },
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
          courts:null,
          selectedCourt:null
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
      this.setData({
        isfull: false,
        selectedCourt:court,
        courtName:court.name
      })
    }
})