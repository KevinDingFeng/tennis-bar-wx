// pages/game/game.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
        isfull:false
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









})