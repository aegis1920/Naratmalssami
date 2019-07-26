<template>
    <v-layout>
        <v-flex xs1>
            {{user_id}} :
        </v-flex>
        <v-flex xs9>
            {{comment}}
        </v-flex>
        <v-flex xs1 v-if="modiOn">
            <v-icon class="icon" small>fas fa-pencil-alt</v-icon>
        </v-flex>
        <v-flex xs1 v-if="modiOn">
            <v-icon style="cursor: pointer" class="icon" small
            @click="deleteComment">fas fa-trash-alt</v-icon>
        </v-flex>
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
          deleteComment() {
            this.$emit('delete', this.com_id);
          }
        },
        mounted() {
            if(this.user_id === this.cur_user_id) {
                this.modiOn = true;
            }
        }
    }
</script>

<style scoped>
    .icon {

    }
</style>