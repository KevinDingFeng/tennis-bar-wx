// pages/my/myevaluate/myevaluate.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: ['3次以下/周', '3次以上/周', '10次以下/月', '10次以上/周'],
        array_age: ['3年以下', '3-5年', '5-10年', '10年以上'],
        array_ji: ['入门(0~1.0)', '中级(1.5~3.5)', '专业(4.0~7.0)'],
        isfirst:true,
    },
    bindPickerChange: function (e) {//打球频率
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    bindPickerChange_age: function (e) {//球龄
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index_age: e.detail.value
        })
    },
    bindPickerChange_ji: function (e) {//等级
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index_ji: e.detail.value
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
            content: '想找教练帮自己看看什么级别？\r\n请联系客服：010-989898，我们会为您推荐教练，推荐后您最终是否方便过去全由您自己做主哦~~',
            showCancel: false,
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                }
            }
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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

    }
})