<template>
    <div>
        <ImgBanner :pagename="routeName()">
            <div style="line-height:1.2em; font-size:10vw; color:white" slot="text">자세한 알림판</div>
        </ImgBanner>
        <v-container>
            <!-- Board -->
            <v-layout>
                <v-flex xs12>
                    <v-card>
                        <v-img :src="board.img"></v-img>
                        <template v-if="changeColRow === true">
                            <div style="writing-mode:tb-rl">
                        <v-card-title>
                            {{board.title}}
                        </v-card-title>
                        <!-- 일단 내용만 세로로 글쓰기 위해서  -->
                        <v-card-text>
                            <div v-html="board.body"></div>
                        </v-card-text>
                        <v-card-text>
                            글품쟁이, {{board.author}}
                        </v-card-text>
                        <v-card-text>
                            눈깔모숨, {{board.boardViewCount}}
                        </v-card-text>
                        <v-card-text>
                            맹근 시간, {{board.created_at}}
                        </v-card-text>
                        </div>
                        </template>
                        <template v-else>
                            <div>
                        <v-card-title>
                            {{board.title}}
                        </v-card-title>
                        <!-- 일단 내용만 세로로 글쓰기 위해서  -->
                        <v-card-text>
                            <div v-html="board.body"></div>
                        </v-card-text>
                        <v-card-text>
                            글품쟁이, {{board.author}}
                        </v-card-text>
                        <v-card-text>
                            눈깔모숨, {{board.boardViewCount}}
                        </v-card-text>
                        <v-card-text>
                            맹근 시간, {{board.created_at}}
                        </v-card-text>
                        </div>
                        </template>
                    </v-card>
                    <v-btn @click="changeColRowButton">글씨 회전</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container xs12>
            <v-layout>
                <v-flex xs12>
                    <CommentList></CommentList>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import FirebaseService from "../services/FirebaseService";
    import {mapActions, mapGetters} from 'vuex'
    import ImgBanner from '../components/ImgBanner'
    import CommentList from "../components/CommentList";

    export default {
        name: "BoardDetail",
        components: {
            ImgBanner,
            CommentList,
        },
        data() {
            return {
                changeColRow:false,
                board: {},
                boards: [],
            }
        },
        props: {
            test_board:{},
        },
        methods: {
            ...mapActions(['addBoard']),
            ...mapGetters(['getNowBoard']),
            async getBoards() {
                this.boards = await FirebaseService.getBoards();
            },
            routeName(){
                return this.$route.name
            },
            searchBoard() {
                // 새로고침하면 vuex 갱신해야됨
                let key = localStorage.getItem('doc_id');
                let tmp = FirebaseService.getBoard(key);
                tmp.then(res => {
                    let sec = res.created_at.seconds;
                    let tmp = new Date(sec * 1000);
                    this.board = res;
                    this.board.created_at = `${tmp.getFullYear()}년 ${tmp.getMonth()+1}월 ${tmp.getDate()}일 ${tmp.getHours()}시 ${tmp.getMinutes()}분`;
                })
            },
            changeColRowButton() {
                this.changeColRow = !this.changeColRow;
            }
        },
        created() {
            this.searchBoard();
        },
        mounted() {

        },
    }
</script>

<style scoped>

</style>