<template style="font-family:Arita-buri-SemiBold">
  <!-- vapp -->
  <v-app v-scroll="onScroll">
    <!-- vcontent -->
    <Header />
    <img id="videoBG" src="@/assets/paper-light.jpg" alt="">
    <!-- <video id="videoBG"
           :src="videoUrl"
           autoplay
           loop
           muted
    >
    </video> -->
    <v-content class="content"
        style="padding-right: 0px;">

      <!-- router -->
      <router-view/>

      <!-- scroll -->
    </v-content>
    <scroll />
    <Footer />
  </v-app>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import store from './store'
import scroll from './components/Scroll.vue'
import Translate from './components/Translate.vue'

import {mapGetters} from 'vuex'
export default {
  name: 'App',
  store,
  components: {
    Header,
    Footer,
    scroll,
    Translate,
  },
  data() {
    return {
      offsetTop: 0,
      videoUrl: require('@/assets/Temple - 20773.mp4')
    }
  },
  computed:{
    ...mapGetters(['getUser'])
  },
  methods: {
    onScroll(e) {
      this.offsetTop = window.scrollY;
    },
    show(){

    },
    isLogin(){
      return (this.getUser['userEmail']!='');
    }
  },
  watch:{
    offsetTop: function(){
      var video = document.getElementById('videoBG');
      video.style.filter= 'blur('+(this.offsetTop/150)+'px)';
    }
  }
}
</script>

<style>
.body-txt {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.repo-txt {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.card-item {
  cursor: pointer;
  height: 100%;
  width: 100%;
}
#videoBG {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 0;
}
.threeLine{
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.oneLine{
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

@font-face { 
  font-family: 'Arita-buri-SemiBold'; 
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/Arita-buri-SemiBold.woff') format('woff'); 
  font-weight: normal; 
  font-style: normal;
}

@import url(//fonts.googleapis.com/earlyaccess/jejumyeongjo.css); .jejumyeongjo * { font-family: 'Jeju Myeongjo', serif; }
</style>
