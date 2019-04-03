<template>
  <div class="th_search">
      <input v-model="mySearchData" id="search" v-focus="true" @keypress="searchGoods" placeholder="TODAY’S NETWORK" @input="getSearchData"/>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String
    },
    searchData: {
      type: String
    }
  },
  data () {
    return {
      mySearchData: ''
    }
  },
  directives: { // 优先获焦
    focus: {
      inserted (el, {value}) {
        console.log(el, {value})
        if (value) {
          el.focus()
        }
      }
    }
  },

  computed: {

  },
  mounted () {

  },
  created () {
    // document.querySelector('#search').focus()
  },
  methods: {
    getSearchData () {
      this.$emit('getSearchData', this.mySearchData)
    },
    searchGoods (event) {
      if (event.keyCode === 13) { // 如果按的是enter键 13是enter
        event.preventDefault() || event.stopPropagation()
        // console.log(event.target.value)
        this.$emit('search')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.th_search{
    background: @cf;
    height: 1.5rem;
    line-height: 1.5rem;
    margin:.35rem 0;
    border-radius: .75rem;
    position: relative;
    color: @c9;
    padding-left: 1.8rem;
    input{
      width: calc(100% - 1rem);
      border: 0;
      height: 1.3rem;
      outline: none;
    }
    &:after{
      content: " ";
      background-image: url('./imgs/search.png');
      background-size: contain;
      top: .2rem;
      left: .35rem;
      position: absolute;
      width: 1.1rem;
      height: 1.1rem;
    }
  }
</style>
