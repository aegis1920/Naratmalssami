<template>

  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-fab-transition>
          <v-btn id="write" v-show="show()"
            floating fixed absolute dark fab bottom right color="#FF7043"
             v-scroll="onScroll" v-on="on">
            <v-icon>add</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>

      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Post Write</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="postPost()">SAVE</v-btn>
          </v-toolbar-items>
        </v-toolbar>
          <!-- editor -->


          <div class="container">
            <v-flex xs12>
             <v-text-field
               label="Title"
               box
               required
               v-model="title"
             ></v-text-field>
           </v-flex>
              <markdown-editor
              :options="options"
              v-model="body"
              ></markdown-editor>
          </div>

      </v-card>
    </v-dialog>
  </v-layout>


</template>

<script>
import 'v-markdown-editor/dist/index.css';

import Vue from 'vue'
import Editor from 'v-markdown-editor'

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
    body: ''
  }),
  components:{

  },
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
    },
    postPost() {
      console.log(this.title);
      console.log(this.body);
			FirebaseService.postPost(this.title, this.body)
      this.dialog = false;
      // document.location.href = '/Post';
		},
  }
}
</script>
<style>
#write{
  margin-bottom: 50px;
  margin-right: 80px;
}
</style>
