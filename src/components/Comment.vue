<template>
    <v-layout>
        <v-flex xs1>
            {{user_id}} :
        </v-flex>
        <v-flex xs9>
            <input id="commentInput" type="text" v-model:value="text"
                   :readonly="!modiBtnOn"
            />
        </v-flex>
        <v-layout xs1 v-if="modiOn && !modiBtnOn">
            <v-flex xs6>
                <v-icon style="cursor: pointer" class="icon" small
                @click="modifyComment">fas fa-pencil-alt</v-icon>
            </v-flex>
            <v-flex xs6>
                <v-icon style="cursor: pointer" class="icon" small
                @click="deleteComment">fas fa-trash-alt</v-icon>
            </v-flex>
        </v-layout>
        <v-layout xs1 v-if="modiBtnOn">
            <v-btn @click="modifyEx">수정하기</v-btn>
        </v-layout>
    </v-layout>
</template>

<script>
    import FirebaseService from "../services/FirebaseService";
    import firebase from 'firebase/app'

    export default {
        name: "Comment",
        data() {
            return {
                modiOn: false,
                modiBtnOn: false,
                text: '',
            }
        },
        props: {
            user_id:{type:String},
            comment:{type:String},
            created_at:{type:String},
            cur_user_id:{type:String},
            com_id:{type:String},
        },
        methods: {
          modifyComment() {
            this.modiBtnOn = true;
            document.getElementById('commentInput').focus();
          },
          modifyEx() {
            this.$emit('modify', this.text, this.com_id);
            this.modiBtnOn = false;
          },
          deleteComment() {
            this.$emit('delete', this.com_id);
          }
        },
        mounted() {
            if(this.user_id === this.cur_user_id) {
                this.modiOn = true;
            };
            this.text = this.comment;
        }
    }
</script>

<style scoped>
    .icon {

    }
</style>