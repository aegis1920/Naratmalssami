<template>
<div>
  <v-img :src="imgSrc" id="banner" aspect-ratio="1.7" height="100vh">
    <v-layout align-center justify-center row fill-height>

      <v-dialog width="400px" height="300px" v-model="dialog">
        <template v-slot:activator="{ on }">
          <v-flex text-xs-center>
            <span class="text-shadow font-weight-bold">
              <slot name="text" />
            </span>
          </v-flex>
          <v-btn absolute outline fab bottom left class="bannerBtn" color="grey darken-2" v-on="on">
            <v-icon>fas fa-cog</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
            <ImageUpload @update="updateImgUrl" />
          </v-card-title>
          <div id="btndiv">
            <v-btn flat color="red" @click="dialog = false">CANCEL</v-btn>
            <v-btn flat color="blue" @click="updateImgUrl">SAVE</v-btn>
          </div>
        </v-card>

      </v-dialog>
    </v-layout>
  </v-img>
</div>
</template>



<script>
import FirebaseService from '@/services/FirebaseService'
import ImageUpload from './ImageUpload.vue'

export default {
  name: 'ImgBanner',
  props: {
    pagename: {
      type: String
    },
    text: {
      type: String
    }
  },
  data() {
    return {
      img: "",
      imgSrc: "",
      dialog: false
    }
  },
  components: {
    ImageUpload
  },
  mounted() {
    if(this.pagename === 'home') {
      this.imgSrc = '';
    }else{
      this.bannerSetting(this.pagename)
    }

    // 잠깐 바꿈

  },
  methods: {
    async bannerSetting(page) {
      var data = await FirebaseService.getImgUrl(page);
      var imgurl = String(data.imgurl);
      this.imgSrc = imgurl
    },
    updateImgUrl() {
      var imagefile = document.getElementsByClassName('imagefile');
      var path = ''
      if (this.pagename == 'home') {
        path = '/'
      } else {
        path = '/' + this.pagename
      }
      this.img = imagefile[0].src;
      FirebaseService.updateImgUrl(this.pagename, this.img)
      this.dialog = false;
      document.location.href = path;

    }
  }
}
</script>
<style>
.text-shadow {
  text-shadow: 0 0 50px rgb(0, 0, 0);
  color: #ffffffba;
}

.bannerBtn {
  margin-bottom: 50px;
}

ImageUpload {
  height: 100%;
}

#btndiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
