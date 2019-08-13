<template>
  <v-fab-transition>
    <v-btn id="top" v-show="show()"
      floating fixed absolute fab bottom right color="#9575CD"
      @click="$vuetify.goTo(0, 0)" v-scroll="onScroll" :style="{'background-image':'url('+ ButtonImg2 + ')', 'background-repeat':'none', 'background-position':'center center'}">
      <v-icon style="color: rgba(90,90,100, 1); font-weight: bold; font-size: 3em">keyboard_arrow_up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>
<script>

export default {
  data: () => ({
    ButtonImg2: require('@/assets/buttonPattern2.jpg'),
    offsetTop: 0
  }),
  methods: {
    onScroll(e) {
      this.offsetTop = window.scrollY;
    },
    show() {
      if(this.offsetTop<30){
        return false;
      } else {
        return true;
      }
    }
  }
}
</script>
<style>
#top{
  margin-bottom: 50px;
}
</style>
