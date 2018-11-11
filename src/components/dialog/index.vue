<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h1 class="modal-title" v-html="modalData.title"></h1>
          <p class="modal-text" v-html="modalData.content"></p>
          <div class="modal-btns one" v-if=" modalData.type == 'sure'" >
            <button class="oneBtn"  @click="$emit('leftBtnAction')">
              {{modalData.btn[1].text}}
            </button>
          </div>
          <div class="modal-btns two" v-else>
            <button class="cancle"   @click="$emit('leftBtnAction')">
              {{modalData.btn[0].text}}
            </button>
            <button class="sure"  @click="$emit('rightBtnAction')">
              {{modalData.btn[1].text}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'dialogModal',
  props: ['modalData']
}
</script>

<style lang="stylus" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .3s ease;
}

/*垂直居中*/
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  box-shadow: 0 25px 28px 0 rgba(112,104,87,0.20);
  border-radius: 5px;
  width: 80%;
  margin: 0 auto;
  padding: rem(30) 0;
  background-color: #fff;
  transition: all .3s ease;
  text-align: center;
  position: relative;
  max-width 375px
}

.modal-title{
  font-size: rem(20);
  line-height: rem(25);
  color: #5D4220;
  font-weight: normal;
  padding: 0 rem(15);
}

.modal-text{
  margin-top:rem(24);
  font-size: rem(16);
  line-height: rem(25);
  color: #5D4220;
  padding: 0 rem(15);
}

.modal-btns{
  margin-top: rem(30);
  font-size: rem(15);
}
.oneBtn{
  width: rem(150);
  height: rem(45);
  outline: 0;
  border:none;
  background: #FCDBB2;
  border-radius: 2px;
  font-size: rem(14);
  color: #5D4220;
  letter-spacing: 0;
}
.cancle{
  width:rem(130);
  height:rem(40);
  border: 1px solid #FCDBB2;
  border-radius: 2px;
  background: #ffffff;
  font-size: rem(14);
  color: #5D4220;
  letter-spacing: 0;
  outline:none;
}
.sure{
  width:rem(130);
  height:rem(45);
  background-color: #FCDBB2;
  border-radius: 2px;
  border:none;
  margin-left:rem(16);
  font-size: rem(14);
  color: #5D4220;
  letter-spacing: 0;
  outline:none;
}
</style>
