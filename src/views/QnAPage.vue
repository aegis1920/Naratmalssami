<template>
  <v-container>
    <v-layout width="100vw" align-center justify-center>
      <div style="line-height:3.5em; font-size:8vw;" slot="text">돌쇠에게 전달하기</div>
    </v-layout>
    <v-sheet class="mt-3 pa-3" width="100%" elevation="50" color="white" opacity="0.5">
      <v-snackbar v-model="alert" color="error" top :timeout="time">{{errorMsg}}</v-snackbar>
      <v-btn-toggle
        mandatory
        light
        v-model="selectedTag"
        style="width:100%"
        active-class="selectedTag"
      >
        <v-btn
          large
          class="tags"
          v-for="tag in tags"
          :key="tag"
          :value="tag"
          @click="selectedTag = tag"
        >{{tag}}</v-btn>
      </v-btn-toggle>
      <br />
      <v-spacer />
      <br />
      <v-text-field
        xs-12
        label="제목"
        placeholder="제목을 입력하세요"
        outline
        light
        v-model="title"
        required
        :rules="titleRules"
      ></v-text-field>
      <v-text-field
        xs-12
        label="이메일"
        placeholder="답변을 받을 이메일 주소를 입력하세요"
        outline
        light
        v-model="email"
        required
        :rules="emailRules"
      ></v-text-field>

      <v-textarea xs-12 outline label="문의내용" v-model="body" required :rules="bodyRules" rows="10"></v-textarea>
      <v-btn large color="error" @click="check = true">취소하고 돌아가기</v-btn>
      <v-btn large color="primary" @click="postQuestion()">문의 등록하기</v-btn>
    </v-sheet>

    <v-dialog v-model="check" max-width="290">
      <v-card>
        <v-card-title class="headline">취소하고 돌아가기</v-card-title>

        <v-card-text>
          입력하신 모든 문의 기록이 사라집니다.
          정말 취소하시겠습니까?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="check = false">앗, 실수였어요</v-btn>

          <v-btn color="green darken-1" text @click="cancel()">확실합니다</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import FirebaseService from "../services/FirebaseService";
import ImgBanner from "../components/ImgBanner";
import { setTimeout } from "timers";

export default {
  name: "QnAPage",
  data() {
    return {
      time: 2000,
      title: "",
      body: "",
      email: "",
      tags: ["기타", "오류", "개인 정보", "한글 관련"],
      selectedTag: "기타",
      check: false,
      alert: false,
      errorMsg: "",
      titleRules: [v => !!v || "제목을 입력해주세요!!"],
      emailRules: [
        v => !!v || "이메일을 입력해주세요!!",
        v => /.+@.+/.test(v) || "이메일 형식을 지켜주세요!!"
      ],
      bodyRules: [v => !!v || "내용을 입력해주세요!!"]
    };
  },
  components: {
    ImgBanner
  },
  methods: {
    async postQuestion() {
      if (this.title == "") {
        this.errorMsg = "제목을 입력해주세요.";
        this.alert = true;
        return;
      }
      if (this.email == "") {
        this.errorMsg = "이메일을 등록해주세요.";
        this.alert = true;
        return;
      }
      if (this.body == "") {
        this.errorMsg = "내용을 입력해주세요.";
        this.alert = true;
        return;
      }
      FirebaseService.postQuestion(this.selectedTag, this.title, this.body, this.email)
        .then(
          function(result) {
            if (result) {
              window.alert("1:1 문의를 전송하였습니다.");
              self.close();
            }
          }.bind(this)
        )
        .catch(function(err) {
          console.log(err);
        });
    },
    cancel() {
      self.close();
    },
    async isAdmin() {
      return await FirebaseService.isAdmin();
    }
  }
};
</script>
<style scoped>
.tags {
  width: 20% !important;
  margin: 0px 10px !important;
  border-radius: 28px !important;
}
.v-btn-toggle--selected {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0), 0 2px 2px 0 rgba(0, 0, 0, 0),
    0 1px 5px 0 rgba(0, 0, 0, 0) !important;
}
.v-btn-toggle .v-btn {
  opacity: 1 !important;
}
.v-btn--active {
  background-color: #e0ff80 !important;
}
.v-messages__message {
  color: red !important;
}
</style>
