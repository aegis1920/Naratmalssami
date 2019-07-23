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
    <img class="imagefile ml-3" @click.stop="realImg = true">
    <br>
    <input id="file" type="file" accept="image/*" ref="imgupload" @change="uploadImg" hidden>
  </div>
  <v-dialog v-model="realImg" height="90vh" >
    <!-- <v-card class="real"> -->
      <img class="real imagefile">
    <!-- </v-card> -->
  </v-dialog>
</v-layout>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    realImg: false,
    collection: ['1195040', '2144189', '3634139', '3632808', '2062734']
  }),
  mounted(){
  },
  methods: {
    open_upload() {
      this.$refs.imgupload.click();
    },
    imgSetting(url){
      var imagefiles = document.getElementsByClassName('imagefile');
      for(i in imagefiles){
        imagefiles[i].src = url
      }
    },
    uploadImg() {
      var target = event.currentTarget;
      var xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open('POST', 'https://api.imgur.com/3/image/', true);
      xmlHttpRequest.setRequestHeader("Authorization", "Client-ID 5d0f43f26473d77");
      xmlHttpRequest.onreadystatechange = function() {
        if (xmlHttpRequest.readyState == 4) {
          if (xmlHttpRequest.status == 200) {
            var result = JSON.parse(xmlHttpRequest.responseText);
            var imagefiles = document.getElementsByClassName('imagefile');
            for(var i in imagefiles){
              imagefiles[i].src = result.data.link;
            }
          } else {
            alert("업로드 실패");
            // imagefile.src = "http://dy.gnch.or.kr/img/no-image.jpg";
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
      console.log(randomIdx, getRandomIgmUrl);
      xmlHttpRequest.open('GET', getRandomIgmUrl, true);
      xmlHttpRequest.onreadystatechange = function() {
        if (xmlHttpRequest.readyState == 4) {
          if (xmlHttpRequest.status == 200) {
            var result = JSON.parse(xmlHttpRequest.responseText);
            console.log(result);
            this.img = "http://source.unsplash.com/" + result.id;

            var imagefiles = document.getElementsByClassName('imagefile');
            for(var i in imagefiles){
              imagefiles[i].src =  this.img;
            }

          } else {
            alert("업로드 실패");
            // imagefile.src = "http://dy.gnch.or.kr/img/no-image.jpg";
          }
        }
      };
      xmlHttpRequest.send();
    }
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
