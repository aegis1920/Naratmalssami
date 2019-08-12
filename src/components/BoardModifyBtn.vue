<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
                <v-fab-transition>
                    <v-icon v-on="on" small>fas fa-pencil-alt</v-icon>
                </v-fab-transition>
            </template>

            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="close">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>게시판 수정</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click="postBoard">수정하기</v-btn>
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
                        <ImageUpload :imgUrl="imgSrc"/>
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
        name: "BoardModifyBtn",
        props: {
            title: {type: String},
            body: {type: String},
            imgSrc: {type: String},
            doc_id: {type: String},
        },
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
            ctitle: '',
            cbody: '',
            cimg: '',
            alert: false,
            errorMsg: '',
            time: 2000,
        }),
        components: {
            ImageUpload
        },
        methods: {
            getBoard() {
              this.ctitle = this.title;
              this.cbody = this.body;
              this.cimg = this.imgSrc;
            },
            postBoard() {
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
                let imagefile = document.getElementsByClassName('imagefile');
                let img = imagefile[0].src;
                FirebaseService.updateBoard(this.doc_id, this.title, this.body, img);
                this.dialog = false;
                // 너무 빨리 넘어가지는 문제 때문에 좀 기다려야 함
                setTimeout(function(){
                    document.location.href = '/Board';
                },3000);
            },
            close(){
                var imagefiles = document.getElementsByClassName('imagefile');
                imagefiles[0].src = '';
                imagefiles[1].src = '';
                imagefiles[2].src = '';

                this.ctitle = ''
                this.cimg = ''
                this.cbody = ''
                this.dialog = false;
            }
        },
        mounted() {
            this.getBoard();
        }
    }
</script>
<style>
    .imagefile {
        max-height: 68px;
        vertical-align: middle;
    }
</style>
