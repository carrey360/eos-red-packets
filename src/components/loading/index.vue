<template>
  <div class="loading-warrap">
    <div class="Loading_Backdrop">
        <div class="Loading_Circle">
            <div class="Circle"><i class="Circle_i"></i></div>
        </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.loading-warrap{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 90;
  display: block;
}
@keyframes rotate {
  0%{ transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.Loading_Backdrop{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.Loading_Circle{
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 70px;
  width: 70px;
  background-color: #999999;
  border-radius: 10px;
}
.Circle{
  width: 30px;
  height: 30px;
  margin: 0 auto;
  border-radius: 100px;
  border: 4px solid #ffffff;
  box-sizing: border-box;
  border-top-color: rgba(51,51,51,0);
  animation: rotate .8s infinite linear;
  margin-top: 25%;
}
.Circle_i{
  font-style: normal;
}
</style>
