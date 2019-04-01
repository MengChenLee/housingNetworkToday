<template>
  <div class="th_about_us">
    <th-layout :hiddenFooter="true">
      <div class="th_about_us-cont" ref="cont">
        <img :src="baseIcon"/>
        <h5>今日房网APP</h5>
        <ul class="article">
          <li>
            7 月 26 日晚，拼多多在上海和纽约两地同时敲钟，以股票代码“PDD”在纳斯达克上市。
          </li>
          <li>
            但拼多多创始人黄峥没有去纽约敲钟。
          </li>
          <li>
            代表拼多多在纽约敲钟的是一位拼多多的用户，前不久刚用一分钱在拼多多上抽中一台 iPhone X。
          </li>
          <li>
            与此同时，在上海中心大厦内来自北京的一家五口代表拼多多按下敲钟按钮，他们都是拼多多的用户。
          </li>
          <li>
            拼多多创始人、CEO 黄峥没有去纽约，他在上海中心会场的台下见证了这一刻。在上市仪式前拼多多党支部办公室举行的媒体见面会上，黄铮说没去纽约是因为敲钟并没有什么特殊的意义。“这个东西就是一个过程，它是一个形式，不影响实质，我敲一下又不会怎么样。”
          </li>
          <li>
            几个小时前，他和纳斯达克亚太区主席麦柯奕一起见了上海的常务副市长周波。按照拼多多的说法，在上海和纽约两地同时敲钟，是纳斯达克的提议，在纳斯达克历史上也是首次。
          </li>
          <li>
            按下按钮后，拼多多股价很快上涨 40% 并维持一整天以 26.7 美元/ADS（+40.53%）收盘。盘后交易，拼多多继续上涨，以 351 亿美元的市值结束首日，相当于 2/3 个京东。
          </li>
          <li>
            京东是个盈利的公司，用户消费额也数倍于拼多多。可见资本的狂热。
          </li>
        </ul>
        <ul class="info">
          <li>
            官方地址：www.xxxxxxxxxxxxx.com
          </li>
        </ul>
      </div>
    </th-layout>
  </div>
</template>
<script>
export default {
  data () {
    return {
      baseIcon: window.jrfw.baseIcon
    }
  }
}
</script>
<style lang="less" scoped>
.th_about_us{
 height: 100%;
 .th_about_us-cont{
   padding:0 @plrPage*2 2rem;
   color: @c3;
   font-size: @smallFontSize;
   overflow: auto;
   box-sizing: border-box;
  img{
    display: block;
    width: 3.35rem;
    margin: .5rem auto;
  }
  h5{
    font-size: @FontSize17;
    text-align: center;
  }
  .article,.info{
    padding: .6rem 0;
    li{
      margin-bottom: .8rem;
      &:last-child{
        margin-bottom: 0;
      }
    }
    &.info{
      color: @cD14E33;
    }
  }
 }
}
</style>
