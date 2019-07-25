<template>
    <div>
        <ImgBanner :pagename="routeName()">
            <div style="line-height:1.2em; font-size:10vw; font-family: Aladdin;" slot="text">BOARD Detail</div>
        </ImgBanner>
        <v-container>

            <!-- Board -->
            <v-layout>
                <v-card xs12>
                    <v-img :src="board.img"></v-img>
                    <v-card-title>
                        제목 : {{board.title}}
                    </v-card-title>
                    <v-card-text>
                        작성자 : {{board.author}}
                    </v-card-text>
                    <v-card-text>
                        내용 : {{board.body}}
                    </v-card-text>
                    <v-card-text>
                        조회수 : {{board.boardViewCount}}
                    </v-card-text>
                    <v-card-text>
                        작성 날짜 : {{board.created_at}}
                    </v-card-text>
                </v-card>
            </v-layout>

        </v-container>
    </div>
</template>

<script>
    import FirebaseService from "../services/FirebaseService";
    import {mapActions, mapGetters} from 'vuex'
    import ImgBanner from '../components/ImgBanner'

    export default {
        name: "BoardDetail",
        components: {
            ImgBanner
        },
        data() {
            return {
                board: {},
                boards: [],
            }
        },
        methods: {
            ...mapActions(['addBoard']),
            ...mapGetters(['getNowBoard']),
            async getBoards() {
                this.boards = await FirebaseService.getBoards();
                console.log(this.boards);
            },
            routeName(){
                return this.$route.name
            }
        },
        created() {

        },
        mounted() {
            // 새로고침되면 localStorage에 있는 값으로 vuex갱신
            let key = '';
            console.log(localStorage.getItem('doc_id'));
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

            }
        },
        watch: {
            boards() {

            }
        }
    }
</script>

<style scoped>

</style>