<template>
  <v-fab-transition>
    <v-btn id="top" v-show="show()"
      floating fixed absolute dark fab bottom right color="#9575CD"
      @click="$vuetify.goTo(0, 0)" v-scroll="onScroll">
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
  </v-fab-transition>

</template>

<script>

export default {
  data: () => ({
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
