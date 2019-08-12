<style scoped>
  .v-dialog__content >>> .v-dialog {
    width: auto;
  }
</style>
<template>
<v-layout>
  <div class="text-xs-center" style="width:100%">
    <v-btn outline fab color="cyan darken-3" @click="randomImg">
      <v-icon>fas fa-random</v-icon>
    </v-btn>
    <v-btn outline fab color="cyan darken-3" @click="open_upload">
      <v-icon>fas fa-image</v-icon>
    </v-btn>
    <img class="imagefile ml-3" @click.stop="realImg = true" :src="imgUrl">
    <br>
    <input id="file" type="file" accept="image/*" ref="imgupload" @change="uploadImg" hidden>
  </div>
  <v-dialog v-model="realImg" height="90vh" >
      <img class="real imagefile" v-model:src="imgUrl">
  </v-dialog>
</v-layout>
</template>

<script>
export default {
  props: {
    imgUrl:{type:String},
  },
  data: () => ({
    dialog: false,
    realImg: false,
    collection: ['1195040', '2144189', '3634139', '3632808', '2062734'],
    img: '',
  }),
  mounted(){
    this.filImg();
  },
  methods: {
    filImg() {
      var imagefiles = document.getElementsByClassName('imagefile');
      for(i in imagefiles){
        imagefiles[i].src = this.imgUrl;
      }
    },
    open_upload() {
      this.$refs.imgupload.click();
    },
    uploadImg() {
      var target = event.currentTarget;
      var xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open('POST', 'https://api.imgur.com/3/image/', true);
      xmlHttpRequest.setRequestHeader("Authorization", "Client-ID 5d0f43f26473d77");
      xmlHttpRequest.onreadystatechange = () => {
        if (xmlHttpRequest.readyState == 4) {
          if (xmlHttpRequest.status == 200) {
            var result = JSON.parse(xmlHttpRequest.responseText);
            var imagefiles = document.getElementsByClassName('imagefile');
            for(var i in imagefiles){
              imagefiles[i].src = result.data.link;
            }
          } else {
            alert("업로드 실패");
          }
        }
      };
      xmlHttpRequest.send(target.files[0]);
    },
    randomImg() {
      var xmlHttpRequest = new XMLHttpRequest();
      var randomIdx = Math.round(Math.random() * 4);
      var getRandomIgmUrl = 'https://api.unsplash.com/photos/random'
                          + '?client_id=156870c5a79746060fc4027a32a8bf99b824c809693cdbece2830ef3d433599b'
                          + '&collections=' + this.collection[randomIdx];

      xmlHttpRequest.open('GET', getRandomIgmUrl, true);
      xmlHttpRequest.onreadystatechange = () => {
        if (xmlHttpRequest.readyState == 4) {
          if (xmlHttpRequest.status == 200) {
            var result = JSON.parse(xmlHttpRequest.responseText);
            // this는 vue에 할당됨.
            this.img = "http://source.unsplash.com/" + result.id;
            var imagefiles = document.getElementsByClassName('imagefile');
            for(var i in imagefiles){
              imagefiles[i].src =  this.img;
            }


          } else {
            alert("업로드 실패");
          }
        }
      };
      xmlHttpRequest.send();
    },
  },
  mounted() {

  }
}
</script>
<style>
.real {
  margin: auto;
  max-height: none!important;
  height: 90vh!important;
  width: auto;
}
</style>
