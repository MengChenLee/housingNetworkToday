<template>
  <div class="th_calculator_tax">
    <th-layout :hiddenFooter="true">
      <div class="th_calculator_tax-cont" ref="cont">
        {{$route.meta.title}}
      </div>
    </th-layout>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.th_calculator_tax{
 height: 100%;
}
</style>
