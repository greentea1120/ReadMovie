var postsData = require('../../../data/posts-data.js')

Page({
  data: {

  },
  onLoad: function (option) {
    var postId = option.id
    this.setData({
      currentPostId: postId
    })
    console.log(postId)
    var postData = postsData.postList[postId-1]
    this.setData({
      postData : postData
    })

    var postsCollected = wx.getStorageSync('posts_collected')
    if(postsCollected) {
      var collected = postsCollected[postId-1]
      this.setData({
        collected: postsCollected 
      })
    } else {
      var postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync('posts_collected', postsCollected)
    }

    // wx.setStorageSync('key', '风暴英雄')
    // wx.setStorageSync('key', {
    //   game: 'fbyx',
    //   developer: '暴雪'
    // })
  },
  onCollectionTap: function(event) {
    var postsCollected = wx.getStorageSync('posts_collected')
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected
    // 更新文章的缓存值
    wx.setStorageSync('posts_collected', postsCollected)
    this.setData({
      collected: postCollected
    })
  }
  // onCollectionTap: function(event) {
  //   var game = wx.getStorageSync('key')
  //   console.log(game)
  // },
  // onShareTap: function(event) {
  //   wx.removeStorageSync('key')
  // }
})