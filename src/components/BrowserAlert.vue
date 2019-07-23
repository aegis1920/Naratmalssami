<template>
  <v-snackbar
        v-model="snackbar"
        color="error"
        vertical
        top
      >
        해당 사이트는 Chrome에 최적화 되어 있습니다.
        <v-btn
          dark
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
</template>

<script>
export default {
	name: 'BrowserAlert',
  data () {
    return {
      snackbar: false
    }
  },mounted() {
    this.isChrome()
  },
  methods : {
    async isChrome(){
      var userAgent = window.navigator.userAgent;

      if (userAgent.indexOf("Chrome") > 0) {
        console.log("크롬임니댜")
        this.snackbar = false;
        return;
      }else {
        this.snackbar = true;
        return;
      }
    }
  }
}



</script>
