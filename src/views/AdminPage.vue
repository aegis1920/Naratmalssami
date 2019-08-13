
<template>
  <v-container v-if="UserClass == 'administrator'">
    <v-layout width="100vw" align-center justify-center>
      <div style="line-height:3.5em; font-size:8vw;" slot="text">관리자의 공간</div>
    </v-layout>
    <div class="mt-5" sytle="margin: auto;">
      <!--            style="color: white"-->
      <h2 class="text-xs-center mb-2">
        현재까지
        <v-btn outline large color="black" to="/board">
          <!-- <h1>{{boardList.length}} 게시글</h1> -->
          <h1>{{boardSize}} 게시글</h1>
        </v-btn>과
        <v-btn outline large color="black" to="/board">
          <!-- <h1>{{commentList.length}} 댓글</h1> -->
          <h1>{{commentSize}} 댓글</h1>
        </v-btn>이 작성되었습니다.
      </h2>
      <h2 class="text-xs-center mb-2">
        관리자는
        <v-btn outline large color="black" @click="select='user'">
          <h1>회원 관리</h1>
        </v-btn>와 회원들이 작성한
        <v-btn outline large color="black" @click="select='qna'">
          <h1>1:1 문의</h1>
        </v-btn>를 볼 수 있습니다.
      </h2>
      <h2 class="text-xs-center mb-2">
        '나랏말싸미' 에 방문한 사람들의
        <v-btn outline large color="black" @click="log()">
          <h1>기록</h1>
        </v-btn>을 살펴보세요.
      </h2>
    </div>

    <v-layout>
      <UserList v-show="select=='user'">user click</UserList>
      <QnaList v-show="select=='qna'">user click</QnaList>
    </v-layout>
  </v-container>

  <v-container v-else-if="UserClass === 'guest' || UserClass === 'member'">
    <div class="mt-5" sytle="margin: auto;">
      <h1 class="text-xs-center">잘못된 접근입니다</h1>
      <br />
      <p class="text-xs-center">관리자 권한이 없는 사용자는 해당 페이지를 열람하거나 이용할 수 없습니다.</p>
      <p class="text-xs-center">
        <strong>{{redirectTime}}</strong>초 뒤에 메인페이지로 이동합니다.
      </p>
    </div>
  </v-container>
  <v-container v-else>
    <div class="mt-5" sytle="margin: auto; height:300px">
      <v-img :src="loadingSrc" style="width:100px; margin: auto" />
    </div>
  </v-container>
</template>

<script>
import firebase from "firebase";
import UserList from "@/components/UserList.vue";
import QnaList from "@/components/QnaList.vue"
const firestore = firebase.firestore();

export default {
  name: "AdminPage",
  data() {
    return {
      UserClass: "",
      redirectTime: 3,
      select: "",
      boardSize: 0,
      commentSize: 0,
      loadingSrc: require('@/assets/Infinity-7.6s-200px.gif'),
    };
  },
  components: {
    UserList,
    QnaList
  },
  methods: {
    log(){
        window.open("https://analytics.google.com/analytics/web/#/report/visitors-overview/a144848343w206396916p199290162/overview-graphOptions.primaryConcept=analytics.totalVisitors");
    }
  },
  created() {
    const data = this.$data;
    firestore
      .collection("boards")
      .get()
      .then(snap => {
        this.boardSize = snap.size;
      });
    firestore
      .collection("comments")
      .get()
      .then(snap => {
        this.commentSize = snap.size;
      });
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var docRef = firestore.collection("users").doc(user.email);
        docRef
          .get()
          .then(function(doc) {
            data.UserClass = doc.data().user_class;
            if (data.UserClass != "administrator") {
              setInterval(
                function() {
                  if (data.redirectTime > 0) {
                    data.redirectTime = parseInt(data.redirectTime) - 1;
                  } else {
                    clearInterval();
                    window.location.href = "/";
                  }
                }.bind(this),
                1000
              );
            }
          })
          .catch(function(error) {
          });
      } else {
        setInterval(
          function() {
            if (data.redirectTime > 0) {
              data.redirectTime = parseInt(data.redirectTime) - 1;
            } else {
              clearInterval();
              window.location.href = "/";
            }
          }.bind(this),
          1000
        );
      }
    });
  }
};
</script>

<style>
.content-table {
  border-collapse: collapse;
  margin: auto;
  font-size: 0.9em;
  min-width: 400px;
  width: 70vw;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.content-table thead tr {
  background-color: #ccc3ff;
  color: #ffffff;
  text-align: center;
  font-weight: bold;
}

.content-table th,
.content-table td {
  padding: 12px 15px;
}

.content-table tbody tr {
  border-bottom: 1px solid #dddddd;
  background-color: white;
  text-align: center;
}

.content-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.content-table tbody tr:last-of-type {
  border-bottom: 2px solid #ccc3ff;
}

@media screen and (min-width: 600px) and (max-width: 960px) {
  .content-table {
    min-width: 580px;
  }
}

@media screen and (min-width: 960px) and (max-width: 1904px) {
  .content-table {
    min-width: 900px;
  }
}
</style>
