<template>
    <!-- div -->
    <div>
        <v-container class="pt-1" style="margin-top: 9em; margin-bottom: 5em; background-color: white;">
            <v-layout wrap>
                <v-flex xs1>
                    <v-img class="" :src="danchungImg" style="height: 100%; width: 25px"/>
                </v-flex>
                <v-flex xs7 style="background-color: white; vertical-align: middle;">
                    <div class="" style="line-height:1.1em; font-size: 2.4vw;" slot="text">
                        나랏말싸미에 오신 것을 환영합니다.
                    </div>
                    <div class="" style="line-height:1.1em; font-size: 2.4vw; color: rgb(170,170,170)"
                         slot="text">
                        한국 전통의 맛을 느껴보세요.
                    </div>
                    <div class="" style="line-height:1.1em; font-size: 2.4vw; color: rgb(220,220,220)"
                         slot="text">
                        구수한 된장과 매운 고추장의 맛을.
                    </div>
                </v-flex>
            </v-layout>
        </v-container>


        <div id="overflowDiv" v-bind:style="{ 'background-image': 'url(' + HanGImg + ')'}" class="backgroundImg px-5 py-4 hidden-xs-only" style="display: inline-block; overflow-x: scroll; width: 100%">
            <button v-if="horizonScroll > 0" id="left-button" v-on:click="scroll_left" style="position: absolute; margin-top: 15%; margin-left: 0; color: white; z-index: 1001;"><i class="fas fa-chevron-left slideButton"></i></button>
            <button id="right-button" v-on:click="scroll_right" style="position: absolute; margin-top: 15%; margin-left: 90%; color: white; z-index: 1001;"><i class="fas fa-chevron-right slideButton"></i></button>
            <ul style="list-style: none; width: 900%;" class="">
                <li class="grow" v-for="gridBoard in gridBoards1" style="float: left; width: 5%; cursor:pointer">
                    <div :style="{'background-image':'url('+ gridBoard.img+ ')', 'width': '100%', 'height':'500px', 'background-size':'cover', 'background-repeat':'none', 'background-position':'center center'}"
                    @click="goDetail(gridBoard.doc_id)">
                        <div class="text-xs-center greyBackground">
                            <p style="color: floralwhite; vertical-align: middle; margin: 0"><strong class="pfont">{{gridBoard.title}}</strong> <br> <br> 글쓴이 {{ gridBoard.author }}</p>
                        </div>
                    </div>
                </li>
                <li class="grow" v-for="gridBoard in gridBoards2" style="float: left; width: 5%; cursor:pointer">
                    <div :style="{'background-image':'url('+ gridBoard.img+ ')', 'width': '100%', 'height':'500px', 'background-size':'cover', 'background-repeat':'none', 'background-position':'center center'}"
                         @click="goDetail(gridBoard.doc_id)">
                        <div class="text-xs-center greyBackground">
                            <p style="color: floralwhite; vertical-align: middle; margin: 0"><strong class="pfont">{{gridBoard.title}}</strong> <br> 글쓴이 {{ gridBoard.author }}</p>
                        </div>
                    </div>
                </li>
                <li class="grow" v-for="gridBoard in gridBoards3" style="float: left; width: 5%; cursor:pointer">
                    <div :style="{'background-image':'url('+ gridBoard.img+ ')', 'width': '100%', 'height':'500px', 'background-size':'cover', 'background-repeat':'none', 'background-position':'center center'}"
                         @click="goDetail(gridBoard.doc_id)">
                        <div class="text-xs-center greyBackground">
                            <p style="color: floralwhite; vertical-align: middle; margin: 0"><strong class="pfont">{{gridBoard.title}}</strong> <br> 글쓴이 {{ gridBoard.author }}</p>
                        </div>
                    </div>
                </li>
                <li class="grow" v-for="gridBoard in gridBoards4" style="float: left; width: 5%; cursor:pointer">
                    <div :style="{'background-image':'url('+ gridBoard.img+ ')', 'width': '100%', 'height':'500px', 'background-size':'cover', 'background-repeat':'none', 'background-position':'center center'}"
                         @click="goDetail(gridBoard.doc_id)">
                        <div class="text-xs-center greyBackground">
                            <p style="color: floralwhite; vertical-align: middle; margin: 0"><strong class="pfont">{{gridBoard.title}}</strong> <br> 글쓴이 {{ gridBoard.author }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div v-bind:style="{ 'background-image': 'url(' + HanGImg + ')'}" class="hidden-sm-and-up backgroundImg px-5 py-4">
            <v-carousel hide-delimiters>
                <v-carousel-item
                    v-for="gridBoard in gridBoards1"
            >
                <v-sheet
                        :style="{'background-image':'url('+ gridBoard.img+ ')', 'background-size':'cover', 'background-repeat':'none', 'background-position':'center center'}"
                        height="100%"
                        tile
                        @click="goDetail(gridBoard.doc_id)"
                >
                    <div class="text-xs-center greyBackground2">
                        <p style="color: floralwhite; vertical-align: middle; margin: 0"><strong class="pfont2">{{gridBoard.title}}</strong><br> <br> 글쓴이 {{ gridBoard.author }}</p>
                    </div>
                </v-sheet>
            </v-carousel-item>
                <v-carousel-item
                        v-for="gridBoard in gridBoards2"
                >
                    <v-sheet
                            :style="{'background-image':'url('+ gridBoard.img+ ')', 'background-size':'cover', 'background-repeat':'none', 'background-position':'center center'}"
                            height="100%"
                            tile
                            @click="goDetail(gridBoard.doc_id)"
                    >
                        <div class="text-xs-center greyBackground2">
                            <p style="color: floralwhite; vertical-align: middle; margin: 0"><strong class="pfont2">{{gridBoard.title}}</strong> <br><br> 글쓴이 {{ gridBoard.author }}</p>
                        </div>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item
                        v-for="gridBoard in gridBoards3"
                >
                    <v-sheet
                            :style="{'background-image':'url('+ gridBoard.img+ ')', 'background-size':'cover', 'background-repeat':'none', 'background-position':'center center'}"
                            height="100%"
                            tile
                            @click="goDetail(gridBoard.doc_id)"
                    >
                        <div class="text-xs-center greyBackground2">
                            <p style="color: floralwhite; vertical-align: middle; margin: 0"><strong class="pfont2">{{gridBoard.title}}</strong><br> <br> 글쓴이 {{ gridBoard.author }}</p>

                        </div>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item
                        v-for="gridBoard in gridBoards4"
                >
                    <v-sheet
                            :style="{'background-image':'url('+ gridBoard.img+ ')', 'background-size':'cover', 'background-repeat':'none', 'background-position':'center center'}"
                            height="100%"
                            tile
                            @click="goDetail(gridBoard.doc_id)"
                    >
                        <div class="text-xs-center greyBackground2">
                            <p style="color: floralwhite; vertical-align: middle; margin: 0"><strong class="pfont2">{{gridBoard.title}}</strong> <br><br> 글쓴이 {{ gridBoard.author }}</p>
                        </div>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
        </div>

        <!-- Github -->
        <v-layout my-5>
            <v-flex xs12>
                <router-link to="/aboutus" style="text-decoration:none;">
                    <h2 class="my-5 text-xs-center page_title">맹근이</h2>
                </router-link>
                <v-card flat style="background-color:#fff0">
                    <v-container fluid grid-list-lg style="background-color:#fff0;">
                        <v-layout row wrap>
                            <v-flex xs12 sm3 v-for="team in teams" :key="team.name">
                                <v-card
                                        class="black--text"
                                        style="min-width: 200px; min-height: 300px; background-color: #fff0; box-shadow: none!important;"
                                >
                                    <Person
                                            :name="team.name"
                                            :description="team.description"
                                            :image="team.image"
                                            :url="team.url"
                                    ></Person>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import ImgBanner from "../components/ImgBanner";
    import BoardList from "../components/BoardList";
    import RepositoryList from "../components/RepositoryList";
    import FirebaseService from "@/services/FirebaseService";
    import welcome from "../components/welcome.vue";
    import Person from "../components/Person";
    import About from "../components/About";


    export default {
        name: "HomePage",
        data() {
            return {
                horizonScroll: 0,
                gridBoards1: [],
                gridBoards2: [],
                gridBoards3: [],
                gridBoards4: [],
                limit_true: true,
                HanGImg: require('@/assets/HanG.jpg'),
                danchungImg: require('@/assets/danchung3.jpg'),
                teams: [
                    {
                        name: "이민경",
                        age: 26,
                        description: "야오밍입니다.",
                        url: "https://lab.ssafy.com/mkl0819",
                        //image: require('@/assets/ming.png'),
                        image:
                            "https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Round&hairColor=BrownDark&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Heather&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Light",
                        token: "YwemDXZ5dD-Hxgx-dj5o",
                        key: false,
                        userName: "mkl0819"
                    },
                    {
                        name: "이상주",
                        age: 28,
                        description: "학벌 깡패입니다.",
                        url: "https://lab.ssafy.com/leesangju92",
                        //image: require('@/assets/sang.png'),
                        image:
                            "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=CollarSweater&clotheColor=Blue03&eyeType=Surprised&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
                        token: "XLZHQWzDiR5vY3px3oWu",
                        key: false,
                        userName: "mkl0819"
                    },
                    {
                        name: "이호빈",
                        age: 27,
                        description: "그냥 깡패입니다.",
                        url: "https://lab.ssafy.com/aegis1920",
                        //image: require('@/assets/leehobin.jpg'),
                        image:
                            "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Round&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=Hoodie&clotheColor=Gray02&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light",
                        token: "6izgztskLYEhJ__s4Jim",
                        key: false,
                        userName: "aegis1920"
                    },
                    {
                        name: "전의환",
                        age: 27,
                        description: "다이애나 장인입니다.",
                        url: "https://lab.ssafy.com/jeon",
                        //image: require('@/assets/profile.png'),
                        image:
                            "https://avataaars.io/?avatarStyle=Circle&topType=Eyepatch&facialHairType=BeardMedium&facialHairColor=Brown&clotheType=GraphicShirt&clotheColor=Pink&graphicType=SkullOutline&eyeType=Surprised&eyebrowType=RaisedExcitedNatural&mouthType=Serious&skinColor=Tanned",
                        token: "nxzw23Tzc1aFThgMNEvo",
                        key: false,
                        userName: "jeon"
                    }
                ]
            };
        },
        components: {
            ImgBanner,
            BoardList,
            RepositoryList,
            Person,
            About,
            welcome,
        },
        methods: {
            scroll_left() {
                let content = document.querySelector("#overflowDiv");
                content.scrollLeft -= 1300;
                this.$data.horizonScroll -= 1300;
            },
            scroll_right() {
                let content = document.querySelector("#overflowDiv");
                content.scrollLeft += 1300;
                this.$data.horizonScroll += 1300;
            },
            getImgUrl(img) {
                return require("../assets/" + img);
            },
            routeName() {
                return this.$route.name;
            },
            updateBoardViewCountMethod(doc_id){
                FirebaseService.updateBoardViewCount(doc_id);
            },
            goDetail(doc_id) {
                // localStorage에 doc_id 넣어놓기
                this.updateBoardViewCountMethod(doc_id); // 조회수 증가.
                localStorage.setItem('doc_id', doc_id);
                // router 이동
                this.$router.push({name:'boarddetail'});
            },
        },
        mounted() {
            const data = this.$data;
            FirebaseService.getNumBoard(0, 4, -1).then(function (result) {
                data.gridBoards1 = result;
            });
            FirebaseService.getNumBoard(4, 4, 3).then(function (result) {
                data.gridBoards2 = result;
            });
            FirebaseService.getNumBoard(8, 4, 7).then(function (result) {
                data.gridBoards3 = result;
            });
            FirebaseService.getNumBoard(12, 4, 11).then(function (result) {
                data.gridBoards4 = result;
            });
        }
    };
</script>

<style>
    .backgroundImg {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
    }
    .imgLine {
        background-size: cover;
        background-position: center center;
        background-repeat: repeat-x;
    }
    ::-webkit-scrollbar {
        width: 0px;  /* Remove scrollbar space */
        background: transparent;  /* Optional: just make scrollbar invisible */
    }
    /* Optional: show position indicator in red */
    ::-webkit-scrollbar-thumb {
        background: transparent;
    }
    #overflowDiv {
        scroll-behavior: smooth;
    }
    .grow { transition: all .2s ease-in-out;}
    .grow:hover { transform: scale(1.02); }
    .slideButton {
        font-size: 3em;
        color: rgba(50, 50, 50, 0.6);
    }
    .slideButton:hover {
        color: rgba(255,250,240, 0.6)
    }

    .greyBackground {
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        color: white;
        padding-top: 28%
    }

    .greyBackground2 {
        height: 100%;
        background-color: rgba(0,0,0,0.3);
        color: white;
        padding-top: 60%;
    }

    .pfont {
        font-size: 3em;; color: white; font-weight: lighter
    }
    .pfont2 {
        font-size: 2em; color: white; font-weight: lighter
    }

</style>
