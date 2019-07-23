<template>
  <!-- vapp -->
  <v-app v-scroll="onScroll">
    <!-- vcontent -->
    <Header />
    <video id="videoBG"
           :src="videoUrl"
           autoplay
           loop
           muted
    >
    </video>
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

export default {
  name: 'App',
  store,
  components: {
    Header,
    Footer,
    scroll,
    Translate
  },

  data() {
    return {
      offsetTop: 0,
      videoUrl: require('@/assets/Temple - 20773.mp4')
    }
  },
  methods: {
    onScroll(e) {
      this.offsetTop = window.scrollY;
    },
    show(){

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
  height: auto;
  width: auto;
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
</style>
