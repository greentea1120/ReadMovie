var postsData = require('../../../data/posts-data.js')
var app = getApp()

Page({
  data: {
    isPlayingMusic: false
  },
  onLoad: function (option) {
    var globalData = app.globalData
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

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setAudioMonitor()
  },
  setAudioMonitor: function () {
    var that = this
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true
      app.globalData.g_currentMusicPostId = that.data.currentPostId
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
  },
  onCollectionTap: function (event) {
    this.getPostCollectedSyc()
  },
  getPostCollectedSyc: function () {
    var postsCollected = wx.getStorageSync('posts_collected')
    var postCollected = postsCollected[this.data.currentPostId]
    postCollected = !postCollected
    postsCollected[this.data.currentPostId] = postCollected
    this.showToast(postsCollected, postCollected)
  },
  getPostsCollectedAsy: function () {
    var that = this
    wx.getStorage({
      key: 'posts_collected',
      success: function (res) {
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
  onMusicTap: function () {
    var currentPostId = this.data.currentPostId
    var postData = postsData.postList[currentPostId]
    var isPlayingMusic = this.data.isPlayingMusic
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }
})