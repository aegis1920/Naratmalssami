<template>
<v-layout row justify-center>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <v-fab-transition>
        <v-btn id="write" v-show="show()" floating fixed absolute dark fab bottom right color="#FF7043" v-scroll="onScroll" v-on="on">
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>
    </template>

    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="close">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Board Write</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="postBoard()">SAVE</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <div class="container">
        <v-snackbar
              v-model="alert"
              color="error"
              top
              :timeout="time"
            >
              {{errorMsg}}
            </v-snackbar>
        <v-flex xs12>
          <v-text-field label="Title" box required v-model="title"></v-text-field>
        </v-flex>
        <div>
          <ImageUpload />
        </div>
        <markdown-editor :options="options" v-model="body" ></markdown-editor>
      </div>

    </v-card>
  </v-dialog>
</v-layout>
</template>

<script>
import 'v-markdown-editor/dist/index.css';

import Vue from 'vue'
import Editor from 'v-markdown-editor'

import ImageUpload from './ImageUpload.vue'

import FirebaseService from '@/services/FirebaseService'


// global register
Vue.use(Editor);


export default {
  data: () => ({
    offsetTop: 0,
    dialog: false,
    options: {
      lineNumbers: true,
      styleActiveLine: true,
      styleSelectedText: true,
      lineWrapping: true,
      indentWithTabs: true,
      tabSize: 2,
      indentUnit: 2
    },
    title: '',
    body: '',
    img: '',
    alert: false,
    errorMsg: '',
    time: 2000
  }),
  components: {
    ImageUpload
  },
  methods: {
    onScroll(e) {
      this.offsetTop = window.scrollY;
    },
    show() {
      if (this.offsetTop < 30) {
        return false;
      } else {
        return true;
      }
    },
    postBoard() {
      var imagefiles = document.getElementsByClassName('imagefile');
      this.img = imagefiles[0].src;
      if(this.title==''){
        this.errorMsg = '제목을 입력해주세요.';
        this.alert = true;
        return;
      }
      if(this.body==''){
        this.errorMsg = '내용을 입력해주세요.';
        this.alert = true;
        return;
      }
      if(this.img==''){
        this.errorMsg = '이미지를 첨부해주세요.';
        this.alert = true;
        return;
      }

      FirebaseService.postBoard(this.title, this.body, this.img)
      this.dialog = false;
      document.location.href = '/Board';
    },
    close(){
      var imagefiles = document.getElementsByClassName('imagefile');
      imagefiles[0].src = '';
      imagefiles[1].src = '';
      imagefiles[2].src = '';

      this.title = ''
      this.img = ''
      this.body = ''
      this.dialog = false;
    }
  }
}
</script>
<style>
#write {
  margin-bottom: 50px;
  margin-right: 80px;
}

.imagefile {
  max-height: 68px;
  vertical-align: middle;
}
</style>
