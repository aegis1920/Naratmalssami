<template>
        <v-layout xs12>
            <v-flex xs8>
            <v-textarea
                    full-width
                    v-model="text"
                    placeholder="댓글 작성"
            ></v-textarea>
            </v-flex>
            <v-flex xs4>
                <v-btn @click="replyComment">쓰기</v-btn>
            </v-flex>
        </v-layout>
</template>

<script>
    export default {
        name: "CommentInput",
        data() {
            return {
                text: '',
            }
        },
        methods: {
            replyComment() {
                if(this.text === '') {
                    alert('댓글을 작성하세요');
                    return;
                }
                this.$emit('regi', this.text);
                this.text = '';
            }
        }
    }
</script>

<style scoped>

</style>