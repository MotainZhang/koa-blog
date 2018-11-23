<template>
  <div id="article" v-loading="loading">
    <div class="article-warp" v-if="article._id">
      <div class="article-message">
        <p class="article-title">
          {{ article.title }}
        </p>
        <div class="article-info">
          <i class="iconfont icon-calendar"></i>
          发表于 {{ article.createTime | time('YYYY年MM月DD日') }} •
          <i class="iconfont icon-folder"></i>
          <span class="classify" @click="toList('category', article.categoryId._id)">{{ article.categoryId.categoryName }}</span> •
        </div>
        <div class="article-sub-message">{{ article.subTitle }}</div>
      </div>
      <md-preview :contents="article.content" />
      <div class="money-wrap" v-if="qrcode">
        <p>如果我的文章对您有帮助！有钱的捧个钱场，没钱的捧个人场，谢谢您！</p>
        <div class="money-btn" @click="showQrcode = !showQrcode">赞赏支持</div>
        <transition name="slide-fade">
          <div class="qrcode-wrap" v-show="showQrcode">
            <span class="qrcode">
              <img :src='qrcode.wxpayQrcode'/>
              <p>微信支付</p>
            </span>
            <span class="qrcode">
              <img :src='qrcode.alipayQrcode'/>
              <p>支付宝支付</p>
            </span>
          </div>
        </transition>
      </div>
      <div class="tags">
         <div
          v-for="(tag, index) in article.tagId"
          :key="index"
          class="tag"
           @click="toList('tag', tag.id)">
          <i class="iconfont icon-tag"></i>
          {{ tag.tagName }}
        </div>
      </div>
      <comments/>
    </div>
    <no-data
      v-if="!article._id"
      text="没有找到该文章~"/>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'

import mdPreview from 'COMMON/mdPreview/mdPreview'
import noData from 'COMMON/noData/noData'
import comments from 'COMMON/comments/comments'
import {getArticleDetail} from '../../../api/index'

export default {
  name: 'article-content',
  components: {
    mdPreview,
    noData,
    comments
  },
  data () {
    return {
      showQrcode: false,
      article: {},
      category: {},
      tags: [],
      qrcode: {},
      loading: false
    }
  },
  created() {
    this.initData()
  },
  watch: {
    $route(route) {
      this.initData()
    }
  },
  methods: {
    ...mapActions([
      'getBlogArticle'
    ]),
    initData() {
      this.article = {}
      this.category = {}
      this.tags = []
      this.qrcode = {}
      let id = this.$route.query.id
      if (id) {
         this.loading = true
         getArticleDetail({
		        articleId: id,
	       })
        .then((data) => {
            this.article = data.articleInfo
            this.category = data.articleInfo.categoryId
            this.tags = data.articleInfo.tagId
            this.qrcode = data.userInfo
            this.loading = false
        })
        .catch(()=> {
          this.loading = false
        })
      }
    },
    toList (type, id) {
      this.$router.push({
        name: 'articleList',
        params: {
          type: type,
          id: id
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#article
  position: relative
  padding: 30px 10px
  width: 100%
  .article-warp
    position: relative
    animation: show .8s
    padding: 30px
    width: 100%
    @media (max-width: 768px)
      padding: 30px 15px
    background-color: $color-white
    box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, .1)
    .article-message
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .article-title
        font-size: 26px
        @media (max-width: 768px)
          font-size: 22px
        font-weight: bold
      .article-info
        font-size: 14px
        @media (max-width: 768px)
          font-size: 12px
        margin: 20px 0px
        color: #666666
        display: flex
        flex-direction: row
        justify-content: center
        flex-wrap: wrap
        .classify
          color: #444444
          border-bottom: 1px solid $color-main
          cursor: pointer
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
          margin-right: 5px
          &:hover
            color: $color-main
        .iconfont
          font-size: 14px
          @media (max-width: 768px)
            font-size: 12px
          margin: 0 5px
          &:first-child
            margin-left: 0
      .article-sub-message
        font-size: 14px
        color: #999999
        margin-bottom: 20px
    .money-wrap
      width: 100%
      padding: 20px 30px
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      > p
        line-height: 2
        color: #555555
        font-size: 14px
        margin-top: 20px
        text-align: center
      .money-btn
        margin-top: 10px
        padding: 10px 24px
        background-color: #f44336
        border-radius: 5px
        color: $color-white
        font-size: 16px
        font-weight: bold
        cursor: pointer
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
        transition: background-color .3s
        &:hover
          background-color: lighten(#f44336, 30%)
      .qrcode-wrap
        margin-top: 10px
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
        flex-wrap: wrap
        .qrcode
          width: 200px
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          margin-bottom: 10px
          padding: 10px
          > img
            width: 180px
            height: 180px
          > p
            text-align: center
            line-height: 1.5
            color: #555555
            font-size: 14px
    .tags
      width: 100%
      padding: 10px 0px
      display: flex
      flex-direction: row
      align-items: center
      flex-wrap: wrap
      border-bottom: 1px solid #eeeeee
      .tag
        color: $color-white
        padding: 5px
        background-color: $color-main
        font-size: 12px
        margin-right: 5px
        border-radius: 5px
        position: relative
        margin-left: 10px
        margin-top: 10px
        line-height: 1
        transition: all .3s
        cursor: pointer
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
        &:hover
          &:before
            border-right: 12px solid lighten($color-main, 10%)
          background-color: lighten($color-main, 10%)
        &:before
          position: absolute
          left: -9px
          top: 0
          width: 0
          height: 0
          content: ""
          border-top: 11px solid transparent
          border-bottom: 11px solid transparent
          border-right: 12px solid $color-main
          transition: all .3s
        .iconfont
          font-size: 12px
    .pre-next-wrap
      width: 100%
      padding-top: 25px
      display: flex
      flex-direction: row
      font-size: 14px
      color: #555555
      font-weight: bold
      .pre-wrap
        padding-right: 10px
        text-align: left
      .next-wrap
        padding-left: 10px
        text-align: right
      .pre-wrap,
      .next-wrap
        flex: 1
        cursor: pointer
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
        &:hover
          color: lighten(#555555, 20%)


.slide-fade-enter-active
  transition: all .3s ease
.slide-fade-leave-active
  transition: all .3s ease
.slide-fade-enter
.slide-fade-leave-to
  transform: translateY(20px)
  opacity: 0
@keyframes show {
  from {
    margin-top: -10px;
    opacity: 0;
  }
  to {
    margin-top: 0px;
    opacity: 1;
  }
}
</style>
