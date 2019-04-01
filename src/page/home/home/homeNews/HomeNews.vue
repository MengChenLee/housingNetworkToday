<template>
  <div class="th_home_news">
      <th-news-list :style="style" :newsList="myNewsList"></th-news-list>
  </div>
</template>

<script>
import ThNewsList from '../../../../components/newsList/NewsList.vue'
export default {
  props: {
    newsList: {
      type: Array
    }
  },
  data () {
    return {
      style: {},
      myNewsList: []
    }
  },
  components: {
    ThNewsList
  },
  watch: {
    newsList: function (val) {
      this.newsScroll(val)
    }
  },
  computed: {

  },
  mounted () {
    // this.newsScroll()
  },
  created () {
  },
  methods: {
    newsScroll (val) {
      if (!this.newsList || this.newsList.length <= 0) {
        this.myNewsList = null
        return
      }
      if (this.newsList.length === 1) {
        this.myNewsList = this.newsList
        return
      }
      const scrollNews = JSON.parse(JSON.stringify(this.newsList))
      const initStyle = {
        transform: 'translateY(0)',
        transition: 'initial'
      }
      const changedStyle = {
        transform: 'translateY(-4.65rem)',
        transition: 'transform .5s'
      }
      if (typeof this.timerInterval !== 'undefined') {
        clearInterval(this.timerInterval)
      }
      if (this.timer !== null) {
        clearTimeout(this.timer)
      }
      this.myNewsList = scrollNews
      this.timerInterval = setInterval(() => {
        this.style = changedStyle
        this.timer = setTimeout(() => {
          this.timer = null
          const first = scrollNews && scrollNews.shift()
          scrollNews && scrollNews.push(first)
          this.myNewsList = scrollNews
          this.style = initStyle
        }, 600)
      }, 2500)
    }
  }
}
</script>

<style lang="less" scoped>
.th_home_news{
  height: 4.2rem;
  overflow: hidden;
  & /deep/ .th_news_list .th_news_list-item{
    border: 0
  }
}
</style>
