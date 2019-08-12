<template>
    <div>
        <ImgBanner :pagename="routeName()">
            <div style="line-height:1.2em; font-size:10vw " slot="text">자세한 알림판</div>
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
                    console.log(res);
                    this.board = res;
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
            //this.board = this.getNowBoard();
            // 새로고침되면 localStorage에 있는 값으로 vuex갱신
            /*let key = '';
            // console.log(localStorage.getItem('doc_id'));
            if(localStorage.getItem('doc_id') === undefined) {
                this.$router.push({name:'board'})
            }else if(localStorage.getItem('doc_id') !== undefined) {
                key = localStorage.getItem('doc_id');
                this.getBoards();
                setTimeout(()=> {
                    this.boards.forEach((b)=>{
                        if(b.doc_id === key) {
                            this.addBoard(b);
                        }
                    });
                    this.board = this.getNowBoard();
                }, 1000);
            }*/
        },
    }
</script>

<style scoped>

</style>