<style scope>
.v-toolbar {
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}
</style>

<template>
  <nav>
    <v-toolbar
      fixed
      color="rgba(255, 255, 255, 0.5)"
      style="border-bottom: white solid gray!important;"
    >
      <v-toolbar-title>
        <!-- logo -->
        <router-link to="/" style="text-decoration:none; color:black">
          <v-container fill-height pa-0 mr-3>
            <v-img class :src="headerImg" style="min-width: 30px;" />
            <v-img class="ml-2" :src="logoImg" style="min-width: 150px;" />
          </v-container>
        </router-link>
      </v-toolbar-title>
      <!-- <v-icon @click="addFavorite" color="#FDD835" large>star</v-icon> -->
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <!-- <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" @click="addFavorite" color="#FDD835" medium>fas fa-star</v-icon>
          </template>
          <span>
            버튼을 눌러 주인장과 대화해보세요!
            <v-icon small color="#FDD835">far fa-grin-squint</v-icon>
          </span>
        </v-tooltip>-->
        <ChatBotBtn />
      </v-toolbar-items>
      <v-toolbar-items v-if="this.user_class == 'administrator'" class="hidden-xs-only">
        <v-btn flat :to="adminLink">관리자</v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-xs-only" v-for="item in items" :key="item.title">
        <v-btn flat :to="item.link">{{item.title}}</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="this.isLogin" class="hidden-xs-only">
        <v-btn flat v-on:click="userSignOut">나가기</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else class="hidden-xs-only">
        <LoginModal />
      </v-toolbar-items>
      <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer" />
    </v-toolbar>

    <v-flex xs-8 class="hidden-sm-and-up">
      <v-navigation-drawer right app v-model="drawer">
        <v-toolbar flat>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">나랏말싸미</v-list-tile-title>
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
              <v-list-tile-title>나가기</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-else>
            <v-list-tile-content>
              <LoginModal2 />
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-flex>
  </nav>
</template>

<script>
import firebase from "firebase";
import LoginModal from "./LoginModal.vue";
import LoginModal2 from "./LoginModal2.vue";
import Swal from "sweetalert2";
import ChatBotBtn from "./ChatBotBtn.vue";
import "firebase/auth";
import "firebase/firestore";
import $ from "jquery";
let timerInterval;

const firestore = firebase.firestore();
const messaging = firebase.messaging();

export default {
  name: "Header",
  components: {
    LoginModal,
    LoginModal2,
    ChatBotBtn
  },
  data() {
    return {
      // isGuest: firebase.auth().currentUser,
      headerImg: require("@/assets/traditional_pattern2.png"),
      logoImg: require("@/assets/logo_header.png"),
      user_class: "",
      adminLink: "/admin",
      isLogin: false,
      drawer: null,
      items: [
        {
          title: "거택",
          link: "/"
        },
        {
          title: "알림판",
          link: "/Board"
        },
        {
          title: "맹근이",
          link: "/aboutus"
        }
        // {
        //   title: 'Login',
        //   link: '/Login'
        // }
      ],
      login: {
        title: "Login",
        link: "/Login"
      },
      logout: {
        title: "Logout"
      }
    };
  },
  watch: {
    user_class: function() {
      if (this.user_class === "administrator") {
        const danbee = $("#frogue-container");
        const left = danbee.css("left");
        danbee.css("left", left.substring(0, left.length - 2) - 88);
      }
    }
  },
  methods: {
    addFavorite() {
      var title = document.title;
      var url = location.href;
      if (window.sidebar && window.sidebar.addPanel) {
        //firefox
        window.sidebar.addPanel(title, url, "");
      } else if (window.opera && window.print) {
        //opera
        var elem = document.createElement("a");
        elem.setAttribute("href", url);
        elem.setAttribute("title", title);
        elem.setAttribute("rel", "sidebar");
        elem.click();
      } else if (document.all) {
        //msie
        window.external.AddFavorite(url, title);
      } else {
        alert(
          "해당브라우저는 즐겨찾기 추가기능이 지원되지 않습니다.\n\n[ Ctrl + D ] 로 즐겨찾기에 추가해주세요."
        );
        return true;
      }
    },
    async userSignOut() {
      let user_id = firebase.auth().currentUser.email;
      await Swal.fire({
        title: "정말로 나가시겠습니까?",
        text: "이 작업은 취소하실 수 없습니다!",
        type: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then(result => {
        if (result.value) {
          firebase
            .auth()
            .signOut()
            .then(function() {
              Swal.fire({
                type: "success",
                position: "center",
                title: "안녕히 가세요",
                text: "나랏말싸미를 다시 찾아주세요",
                showConfirmButton: false,
                timer: 1500
              });
            })
            .then(function() {
              console.log(user_id);
              let deleteDocRef = firestore
                .collection("userTokenList")
                .where("userId", "==", user_id);
              deleteDocRef.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  doc.ref.delete();
                });
              });
            })
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              Swal.fire({
                type: "error",
                position: "center",
                title: errorCode,
                text: error.message,
                showConfirmButton: false,
                timer: 3000
              });
            });
        }
      });
      this.user_class = "";
      this.$router.push({ name: "home" });
    }
  },
  created() {
    const data = this.$data;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        data.isLogin = true;
        var docRef = firestore.collection("users").doc(user.email);
        docRef
          .get()
          .then(function(doc) {
            data.user_class = doc.data().user_class;
          })
          .catch(function(error) {
            console.log("Error getting document:", error);
          });
      } else {
        data.isLogin = false;
      }

      //  this.islogin = user ? true  : false ;
      //   .bind(this)
    });
  }
};
//  test
</script>
<style>
</style>
