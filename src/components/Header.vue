<template>
    <nav>
        <v-toolbar fixed color='transparent' style="border: 5px solid #522A83">
            <v-toolbar-title>
                <!-- logo -->
                <router-link to="/" style="text-decoration:none; color:black">
                    <v-container fill-height pa-0 mr-3>
                        <v-avatar align-center size="40">
                            <img src="../assets/aladdin-lamp-gold.png" alt="avatar">
                        </v-avatar>
                        <v-layout ml-3 style="display:inline-block; color:white">
                            <h2><strong style="font-family:Aladdin">Aladdin</strong></h2>
                        </v-layout>
                    </v-container>
                </router-link>
            </v-toolbar-title>
            <!-- <v-icon @click="addFavorite" color="#FDD835" large>star</v-icon> -->
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only" style="padding:20px">
                <v-tooltip>
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on" @click="addFavorite" color="#FDD835" medium>fas fa-star</v-icon>
                    </template>
                    <span>버튼을 눌러 즐겨찾기에 추가해보세요!
        <v-icon small color="#FDD835">far fa-grin-squint</v-icon>
      </span>
                </v-tooltip>
            </v-toolbar-items>
            <v-toolbar-items class="hidden-xs-only" v-for="item in items">
                <v-btn flat :to="item.link" color="white">{{item.title}}</v-btn>
            </v-toolbar-items>
            <v-toolbar-items v-if="this.isLogin" class="hidden-xs-only" >
            <v-btn flat dark v-on:click="userSignOut"> LOGOUT</v-btn>
            </v-toolbar-items>
            <v-toolbar-items v-else class="hidden-xs-only">
                <LoginModal/>
            </v-toolbar-items>
            <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer" />
        </v-toolbar>

        <v-flex xs-8 class="hidden-sm-and-up">
            <v-navigation-drawer right app v-model="drawer">
                <v-toolbar flat>
                    <v-list>
                        <v-list-tile>
                            <v-list-tile-title class="title">
                                Aladdin
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-toolbar>

                <v-divider></v-divider>

                <v-list dense class="pt-0">
                    <v-list-tile v-for="item in items" :key="item.title" :to="item.link">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="this.isLogin">
                        <v-list-tile-content v-on:click="userSignOut">
                            <v-list-tile-title>Logout</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-else>
                        <v-list-tile-content>
                            <LoginModal2/>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
        </v-flex>
    </nav>
</template>

<script>
    import firebase from "firebase"
    import LoginModal from './LoginModal.vue'
    import LoginModal2 from './LoginModal2.vue'
    import Swal from 'sweetalert2'
    let timerInterval

    const messaging = firebase.messaging();

    export default {
        name: 'Header',
        components: {
            LoginModal,
            LoginModal2,
        },
        data() {
            return {
                // isGuest: firebase.auth().currentUser,
                isLogin: false,
                drawer: null,
                items: [{
                    title: 'Home',
                    link: '/'
                },
                    {
                        title: 'Board',
                        link: '/Board'
                    },
                    {
                        title: 'Aboutus',
                        link: '/aboutus'
                    },
                    // {
                    //   title: 'Login',
                    //   link: '/Login'
                    // }
                ],
                login: {
                    title: 'Login',
                    link: '/Login'
                },
                logout: {
                    title: 'Logout',
                }
            }
        },
        methods: {
            addFavorite() {
                var title = document.title;
                var url = location.href;
                if (window.sidebar && window.sidebar.addPanel) { //firefox
                    window.sidebar.addPanel(title, url, "");
                } else if (window.opera && window.print) { //opera
                    var elem = document.createElement('a');
                    elem.setAttribute('href', url);
                    elem.setAttribute('title', title);
                    elem.setAttribute('rel', 'sidebar');
                    elem.click();
                } else if (document.all) { //msie
                    window.external.AddFavorite(url, title);
                } else {
                    alert("해당브라우저는 즐겨찾기 추가기능이 지원되지 않습니다.\n\n[ Ctrl + D ] 로 즐겨찾기에 추가해주세요.");
                    return true;
                }
            },
            async userSignOut() {
                var userToken = '';
                await Swal.fire({
                    title: 'Are you sure you want to LOG OUT?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Confirm'
                }).then((result) => {
                    let email_id = this.email;
                    messaging
                    .requestPermission()
                    .then(function () {
                        console.log("Notification permission granted.");
                        return messaging.getToken()
                    })
                    .then(function (token) {
                        userToken = token;
                    });
                    if (result.value) {
                        firebase.auth().signOut().then(function() {
                            console.log("I'm" + this);
                            console.log("I'm" + this.userToken);
                            let userTokenRef = firebase.firestore().collection('userTokenList').where('token_id','==', userToken);
                            userTokenRef.get().then(function(querySnapshot){
                                querySnapshot.forEach(function(doc){
                                    console.log(doc.ref.get());
                                    doc.ref.delete();
                                });
                            });
                            Swal.fire(
                                {
                                    type: 'success',
                                    position: 'center',
                                    title: 'LOG Out!',
                                    text: 'Please visit our website again',
                                    showConfirmButton: false,
                                    timer: 1500,
                                }
                            )
                        }).catch(function(error) {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            Swal.fire({
                                type: 'error',
                                position: 'center',
                                title: errorCode,
                                text: error.message,
                                showConfirmButton: false,
                                timer: 3000,
                            })
                        });
                    }
                })
            },
        },
        created() {
            const data = this.$data;
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    data.isLogin = true;
                } else {
                    data.isLogin = false;
                }

            });
        },
    }
    //  test
</script>
<style>
    @font-face {
        font-family: 'Aladdin';
        src: url("../assets/fonts/aladdin.ttf");
    }
</style>
