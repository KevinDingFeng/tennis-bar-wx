Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: ["球局信息", "评价"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 36,
        game: '',
        ages: {
            "LessThree": "3年以下",
            "LessFive": "3~5年",
            "LessTen": "5~10年",
            "MoreTen": "10年以上"
        },
        levels: {
            "Entry": "入门(0~1.0)",
            "Medium": "中级(1.5~3.5)",
            "Professional": "专业(4.0~7.0)"
        },
        flag: 0,//评价星级
        info: "",
    },
    changeColor1: function () {
        var that = this;
        that.setData({
            flag: 1
        });
    },
    changeColor2: function () {
        var that = this;
        that.setData({
            flag: 2
        });
    },
    changeColor3: function () {
        var that = this;
        that.setData({
            flag: 3
        });
    },
    changeColor4: function () {
        var that = this;
        that.setData({
            flag: 4
        });
    },
    changeColor5: function () {
        var that = this;
        that.setData({
            flag: 5
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: '参与球局信息',
        })
        let that = this;
        let game = JSON.parse(options.game);
        that.setData({
            game: game
        })
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
        let that = this;
        if (this.data.currentTab === e.currentTarget.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.currentTarget.dataset.current
            })
        }
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
     * 点击tab切换
     */
    swichNav: function(e) {
        let that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },

})