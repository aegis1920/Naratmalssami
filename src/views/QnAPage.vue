<template>
  <v-container>
    <!-- <ImgBanner>
      <div style="line-height:1.2em; font-size:10vw; font-family: Aladdin;" slot="text">1 : 1 문의</div>
    </ImgBanner>-->
    <v-sheet
      class="mt-3 pa-3"
      width="100%"
      height="70vh"
      elevation="50"
      color="white"
      opacity="0.5"
    >
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
      <v-text-field xs-12 label="제목" placeholder="제목을 입력하세요" outline light v-model="title"></v-text-field>

      <v-textarea xs-12 outline label="문의내용" v-model="body"></v-textarea>
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
      title: "",
      body: "",
      tags: ["기타", "오류", "개인 정보", "한글 관련"],
      selectedTag: "기타",
      check: false
    };
  },
  components: {
    ImgBanner
  },
  methods: {
    async postQuestion() {
      const close = this.cancel();
      console.log(window);

      FirebaseService.postQuestion(
        this.selectedTag,
        this.title,
        this.body
      ).then(function(result) {
        // window.close();
        if (result) {
          close();
        }
      });
    },
    cancel() {
      this.title = "";
      this.body = "";
      window.close();
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
</style>
