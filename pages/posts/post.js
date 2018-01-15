Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面 加载
   */
  onLoad: function (options) {
    var posts_content = [
      {
        date: 'Sep 18 2016',
        title: '正是虾肥蟹壮时',
        imgSrc: '/images/post/crab.png',
        avatar: '/images/avatar/1.png',
        content: '螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹',
        reading: '112',
        collection: '96'
      },
      {
        date: 'Sep 18 2016',
        title: '正是虾肥蟹壮时',
        imgSrc: '/images/post/crab.png',
        avatar: '/images/avatar/1.png',
        content: '螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹螃蟹',
        reading: '112',
        collection: '96'
      }
    ]
    this.setData({
      posts_key: posts_content
    })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})