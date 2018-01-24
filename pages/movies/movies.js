var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl  = `${app.globalData.doubanBase}/v2/movie/in_theaters?start=0&count=3`
    var comingSoon = `${app.globalData.doubanBase}/v2/movie/coming_soon?start=0&count=3`
    var top250Url = `${app.globalData.doubanBase}/v2/movie/top250?start=0&count=3`

    this.getMovieListData(inTheatersUrl)
    // this.getMovieListData(comingSoon)
    // this.getMovieListData(top250Url)
  },
  getMovieListData: function(url) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Content-Type': 'json'
      },
      success: function(res) {
        console.log(res)
        that.processDouBanData(res.data)
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },
  processDouBanData: function(moviesDouBan) {
    var movies = []
    for(var idx in moviesDouBan.subjects) {
      var subject = moviesDouBan.subjects[idx]
      var title = subject.title
      if(title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    this.setData({
      movies: movies
    })
    console.log(this.data.movies)
  }
 
})