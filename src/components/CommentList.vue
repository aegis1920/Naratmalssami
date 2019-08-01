<template>
    <v-card
            class="mx-auto"
            tile
    >
        <v-card-title v-for="comment in comments">
            <Comment
              :user_id="comment.user_id"
              :comment="comment.comment"
              :cur_user_id="cur_user_id"
              :com_id="comment.com_id"
              @delete="deleteCo"
              @modify="modifyCo"
            ></Comment>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
            <CommentInput
                @regi="postCo"
            ></CommentInput>
        </v-card-actions>
    </v-card>
</template>

<script>
    import FirebaseService from "../services/FirebaseService";
    import firebase from 'firebase/app'
    import Comment from "./Comment";
    import CommentInput from "./CommentInput";

    export default {
        name: "CommentList",
        data() {
            return {
                comments: [],
                cur_user_id: '',
            }
        },
        components: {
            Comment,
            CommentInput,
        },
        methods: {
            async getComments() {
                let tmp = await FirebaseService.getComments();
                let key = localStorage.getItem('doc_id');
                let arr = [];
                tmp.forEach((b)=>{
                    if(b.doc_id === key) {
                        arr.push(b);
                    }
                });
                this.comments = arr;
                let user = firebase.auth().currentUser;
                if(user !== null) {
                    let userEmail = user.email.split('@');
                    let userId = userEmail[0];
                    this.cur_user_id = userId;
                }
            },
            postCo(reply) {
                FirebaseService.postComment(localStorage.getItem('doc_id'), reply);
                this.getComments();
            },
            async deleteCo(com_id) {
                await FirebaseService.deleteComment(com_id);
                this.comments = [];
                await this.getComments();
            },
            async modifyCo(comment, com_id) {
                await FirebaseService.updateComment(comment, com_id);
                alert('수정이 완료되었습니다.');
                await this.getComments();
            }
        },
        mounted() {
            this.getComments();
        },
    }
</script>

<style scoped>

</style>