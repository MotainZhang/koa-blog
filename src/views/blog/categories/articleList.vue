<template>
  <div id="archives" v-loading="loading">
    <div class="archives-wrap">
      <article-card2
        v-for="(article, index) in articleList"
        :key="index"
        :article="article" />
    </div>
    <!-- 分页 -->
    <div
      class="pagination"
      v-show="total > 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        @current-change="pageChange"
        :current-page="currentPage"
        :total="total">
      </el-pagination>
    </div>
    <!-- 分页 结束 -->
    <no-data
      v-if="total === 0"
      text="没有找到文章~"/>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'

import { scroll } from 'MIXINS/scroll'
import articleCard2 from 'COMMON/articleCard/articleCard2'
import noData from 'COMMON/noData/noData'
import {getBlogArticleList} from '../../../api/index'

export default {
  name: 'archives',
  components: {
    articleCard2,
    noData
  },
  mixins: [scroll],
  data () {
    return {
      page:1,
      pageSize: 15,
      currentPage: 0,
      total: 0,
      articleList: [],
      loading: false,
      keyword :'',
      tagId : '',
      categoryId : '',
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
     
    ]),
    initData() {
      this.total = 0
      this.articleList = []
      this.page = 1
      this.getList()
    },
    pageChange(currentPage) {
      this.scrollToTarget(0, false)
      this.page = currentPage - 1
      this.currentPage = currentPage
      this.getList()
    },
    getList() {
    		if(this.$route.query.id && this.$route.query.type){
    		let type = this.$route.query.type;
    		let id = this.$route.query.id;
    		if(type =='category'){
    			this.categoryId = id;
    		}else if(type =='tag'){
    			this.tagId = id;
    		}else{
    			this.categoryId = '';
    			this.tagId = '';
    		}
    	}
      this.loading = true
      getBlogArticleList({
          keyword : this.keyword,
          tagId : this.tagId,
          categoryId : this.categoryId,
          page: this.page,
        })
        .then((data) => {
          this.total = data.count
          this.articleList = data.list
          this.loading = false
        })
        .catch(()=> {
          this.articleList = []
          this.loading = false
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#archives
  position: relative
  padding: 30px 10px
  .pagination
    width: 100%
    padding: 10px 0
    display: flex
    display: -webkit-flex
    flex-direction: row
    justify-content: center
    background-color: $color-white
  .archives-wrap
    position: relative
    width: 100%
    padding: 10px 30px
    animation: show .8s
    @media (max-width: 768px)
      padding: 5px
    .time-line
      position: absolute
      left: 30px
      @media (max-width: 768px)
        left: 5px
      top: 15px
      bottom: 0
      width: 2px
      background-color: #eeeeee

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
