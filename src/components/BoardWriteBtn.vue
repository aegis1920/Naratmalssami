<template>
<v-layout row justify-center>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <v-fab-transition>
        <v-btn id="write" v-show="show()" floating fixed absolute dark fab bottom right :style="{'background-image':'url('+ ButtonImg1 + ')', 'background-position':'center center'}" v-scroll="onScroll" v-on="on">
          <v-icon style="font-weight: bold; font-size: 3em">add</v-icon>
        </v-btn>
      </v-fab-transition>
    </template>

    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="close">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title class="white--text">알림판 글쓰기</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="postBoard()">저장</v-btn>
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
          <v-text-field label="제목" box required v-model="title"></v-text-field>
        </v-flex>
        <div>
          <ImageUpload />
        </div>
        <!-- <markdown-editor :options="options" v-model="body" ></markdown-editor> -->
        <v-flex xs12>
        <v-textarea
          id="textarea"
          outlined
          name="input-7-10"
          label="내용 작성"
          auto-grow
          v-model="body"
        ></v-textarea>
      </v-flex>
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
    ButtonImg1: require('@/assets/buttonPattern1.jpg'),
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
    async postBoard() {

      // 엔터 적용시키기
      var str = this.body;
      str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
      this.body = str;

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

      await FirebaseService.postBoard(this.title, this.body, this.img);
      this.dialog = false;
      // 너무 빨리 넘어가지는 문제 때문에 좀 기다려야 함

      setTimeout(function(){
        document.location.href = '/Board';
      },1000);
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
