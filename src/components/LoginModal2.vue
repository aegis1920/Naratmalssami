<style scope>
    .v-dialog {
        box-shadow: none!important;
        -webkit-box-shadow: none!important
    }
    .v-dialog--active {
        box-shadow: none!important;
        -webkit-box-shadow: none!important
    }

</style>

<template>
    <v-layout row justify-center align-center>
        <v-dialog v-model="dialog3" max-width="50%">
            <template v-slot:activator="{ on }">
                <v-list-tile-title v-on="on">Login</v-list-tile-title>
            </template>
            <v-container fluid style="max-height: 500px; background-color: transparent; box-shadow: none; border: hidden">
                    <v-layout row wrap justify-center>
                        <v-flex mr-3 >
                            <v-btn round color="#df4a31" dark v-on:click="loginWithGoogle" style="width:100%;">
                                <v-icon size="25" class="mr-2">fab fa-google</v-icon>
                                Google 로그인
                            </v-btn>
                            <v-btn v-on:click="facebookLogin" round color="#3C5A99" dark style="width: 100%">
                                <v-icon size="25" class="mr-2">fab fa-facebook</v-icon>
                                FACEBOOK 로그인
                            </v-btn>
                            <v-btn round color="#fdd835" dark style="width: 100%" @click="dialog = true">
                                <v-icon size="25" class="mr-2">far fa-envelope</v-icon>
                                EMAIL 로그인
                            </v-btn>
                            <v-btn round color="#A9B0A8" dark style="width: 100%" @click="dialog2 = true">
                                <v-icon size="25" class="mr-2">fas fa-user-plus</v-icon>
                                회원가입
                            </v-btn>
                            <v-dialog
                                    v-model="dialog"
                                    max-width="500px"
                            >
                                <v-card tile>
                                    <v-toolbar card dark color="#fdd835">
                                        <v-btn icon dark @click="dialog = false">
                                            <v-icon>close</v-icon>
                                        </v-btn>
                                        <v-toolbar-title>EMAIL 로그인</v-toolbar-title>
                                        <v-spacer></v-spacer>
                                    </v-toolbar>
                                    <v-card-text>
                                        <v-form v-model="valid">
                                            <v-container fluid>
                                                <v-layout row wrap align-center justify-center>
                                                    <v-flex
                                                            xs12
                                                    >
                                                        <v-text-field
                                                                v-model="email"
                                                                :rules="emailRules"
                                                                counter
                                                                label="E-mail"
                                                                required
                                                                @click:append="show1 = !show1"
                                                        ></v-text-field>
                                                    </v-flex>
                                                    <v-flex
                                                            xs12
                                                    >
                                                        <v-text-field
                                                                v-model="password"
                                                                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                                                :rules="passwordRules"
                                                                :type="show1 ? 'text' : 'password'"
                                                                name="input-10-1"
                                                                label="Normal with hint text"
                                                                hint="At least 8 characters"
                                                                counter
                                                                @click:append="show1 = !show1"
                                                        ></v-text-field>
                                                    </v-flex>
                                                    <v-flex xs12 text-xs-center>
                                                        <v-btn v-on:click="emailLogin" dark color="#fdd835"> 로그인 </v-btn>
                                                    </v-flex>
                                                </v-layout>
                                            </v-container>
                                        </v-form>
                                    </v-card-text>
                                    <div style="flex: 1 1 auto;"></div>
                                </v-card>
                            </v-dialog>
                            <v-dialog
                                    v-model="dialog2"
                                    max-width="500px"
                            >
                                <v-card tile>
                                    <v-toolbar card dark color="#A9B0A8">
                                        <v-btn icon dark @click="dialog2 = false">
                                            <v-icon>close</v-icon>
                                        </v-btn>
                                        <v-toolbar-title>회원가입</v-toolbar-title>
                                        <v-spacer></v-spacer>
                                    </v-toolbar>
                                    <v-card-text>
                                        <v-form v-model="valid">
                                            <v-container fluid>
                                                <v-layout row wrap justify-center>
                                                    <v-flex
                                                            xs12
                                                    >
                                                        <v-text-field
                                                                v-model="email"
                                                                :rules="emailRules"
                                                                counter
                                                                label="E-mail"
                                                                required
                                                                @click:append="show2 = !show2"
                                                        ></v-text-field>
                                                    </v-flex>
                                                    <v-flex
                                                            xs12
                                                    >
                                                        <v-text-field
                                                                v-model="password"
                                                                :append-icon="show2 ? 'visibility' : 'visibility_off'"
                                                                :rules="passwordRules"
                                                                :type="show2 ? 'text' : 'password'"
                                                                name="input-10-1"
                                                                label="Normal with hint text"
                                                                hint="At least 8 characters"
                                                                counter
                                                                @click:append="show2 = !show2"
                                                        ></v-text-field>
                                                    </v-flex>
                                                    <v-flex xs12 text-xs-center>
                                                        <v-btn v-on:click="userSignUp" dark color="#A9B0A8"> 가입 </v-btn>
                                                    </v-flex>
                                                </v-layout>
                                            </v-container>
                                        </v-form>
                                    </v-card-text>
                                    <div style="flex: 1 1 auto;"></div>
                                </v-card>
                            </v-dialog>
                        </v-flex>
                    </v-layout>
            </v-container>
        </v-dialog>
    </v-layout>
</template>

<script>
    import FirebaseService from '@/services/FirebaseService'
    import firebase from "firebase"
    import Swal from 'sweetalert2'

    const firestore = firebase.firestore();

    export default {
        name: "LoginModal2",
        data() {
            return {
                isGuest: firebase.auth().currentUser,
                valid: true,
                dialog: false,
                dialog2: false,
                dialog3: false,
                notifications: false,
                sound: true,
                widgets: false,
                show1: false,
                show2: false,
                password: '',
                passwordRules: [
                    v => !!v|| 'Required.',
                    v => v.length >= 8 || 'Min 8 characters',
                    // () => ('The email and password you entered don\'t match')
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ]
            }
        },
        components: {},
        methods: {
            async emailLogin() {
                await firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    Swal.fire({
                        type: 'error',
                        toast: true,
                        position: 'top-start',
                        title: errorCode,
                        text: error.message,
                        showConfirmButton: false,
                        timer: 3000,
                    })
                });
                let username = firebase.auth().currentUser.email.split("@",1)[0]
                this.dialog = false;
                Swal.fire({
                    type: 'success',
                    toast: true,
                    position: 'top-start',
                    title: 'Welcome, ' + username,
                    text: "It's good to see you again",
                    showConfirmButton: false,
                    timer: 1500,
                })
            },
            async userSignUp() {
                let email_id = this.email
                await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then(()=>{
                        var userRef = firestore.collection('users').doc(email_id);
                        var setUser = userRef.set({
                            id: email_id,
                            created: firebase.firestore.FieldValue.serverTimestamp(),
                            home: 0,
                            portfolio: 0,
                            post: 0,
                            repository: 0,
                            login: 0
                        });
                        let username = email_id.split("@",1)[0]
                        Swal.fire({
                            type: 'success',
                            toast: true,
                            position: 'top-start',
                            title: 'Welcome, ' + username,
                            text: "Thank you for signing up for our website",
                            showConfirmButton: false,
                            timer: 1500,
                        })
                    })
                    .catch(function(error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        Swal.fire({
                            type: 'error',
                            toast: true,
                            position: 'top-start',
                            title: errorCode,
                            text: error.message,
                            showConfirmButton: false,
                            timer: 3000,
                        })
                    });
                this.dialog2 = false;
            },
            async loginWithGoogle() {
                var provider = new firebase.auth.GoogleAuthProvider();
                await firebase.auth().signInWithPopup(provider).then(function (result) {
                    var token = result.credential.accessToken;
                    var user = result.user;
                    Swal.fire({
                        type: 'success',
                        toast: true,
                        position: 'top-start',
                        title: 'Welcome, ' + user.displayName,
                        text: "It's good to see you again",
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }).catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    var credential = error.credential;
                    Swal.fire({
                        type: 'error',
                        toast: true,
                        position: 'top-start',
                        title: errorCode,
                        text: error.message,
                        showConfirmButton: false,
                        timer: 3000,
                    })
                });
            },
            async facebookLogin() {
                var provider = new firebase.auth.FacebookAuthProvider();
                await firebase.auth().signInWithPopup(provider).then(function (result) {
                    var token = result.credential.accessToken;
                    var user = result.user;
                    Swal.fire({
                        type: 'success',
                        toast: true,
                        position: 'top-start',
                        title: 'Welcome, ' + user.displayName,
                        text: "It's good to see you again",
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }).catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    var credential = error.credential;
                    Swal.fire({
                        type: 'error',
                        toast: true,
                        position: 'top-start',
                        title: errorCode,
                        text: error.message,
                        showConfirmButton: false,
                        timer: 3000,
                    })
                });
            },
        },
        mounted() {
            console.log(firebase.auth().currentUser);
        },
    }
</script>

<style scoped>

</style>
