var postsData = require('../../../data/posts-data.js')

Page({
  data: {
    isPlayingMusic: false
  },
  onLoad: function (option) {
    var postId = option.id
    this.setData({
      currentPostId: postId
    })
    console.log(postId)
    var postData = postsData.postList[postId]
    this.setData({
      postData: postData
    })

    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync('posts_collected', postsCollected)
    }
  },
  onCollectionTap: function (event) {
    this.getPostCollectedSyc()
  },
  getPostCollectedSyc: function() {
    var postsCollected = wx.getStorageSync('posts_collected')
    var postCollected = postsCollected[this.data.currentPostId]
    postCollected = !postCollected
    postsCollected[this.data.currentPostId] = postCollected
    this.showToast(postsCollected, postCollected)
  },
  getPostsCollectedAsy: function() {
    var that = this
    wx.getStorage({
      key: 'posts_collected',
      success: function(res) {
        var postsCollected = res.data
        var postCollected = postsCollected[that.data.currentPostId]
        postCollected = !postCollected;
        postsCollected[this.data.currentPostId] = postCollected
        this.showToast(postsCollected, postCollected)
      },
    })
  },
  showModal: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? '收藏该文章?' : '取消收藏该文章?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: '#405f80',
      success: function (res) {
        if (res.confirm) {
          // 更新文章的缓存值
          wx.setStorageSync('posts_collected', postsCollected)
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },
  showToast: function (postsCollected, postCollected) {
    // 更新文章的缓存值
    wx.setStorageSync('posts_collected', postsCollected)
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 1000,
      icon: 'success'
    })
  },
  // onShareTap: function(event) {
  //   wx.removeStorageSync('key')
  // }
  onShareTap: function () {
    var itemList = [
      '分享给微信好友',
      '分享到朋友圈',
      '分享到QQ',
      '分享到微博'
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#504f80',
      success: function (res) {
        // res.cancel 
        // res.tapIndex
        wx.showModal({
          title: `用户${itemList[res.tapIndex]}`,
          content: '现在无法实现分享功能'
        })
      }
    })
  },
  onMusicTap: function() {
    var isPlayingMusic = this.data.isPlayingMusic
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46',
        title: '此时此刻-许巍',
        coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }
})