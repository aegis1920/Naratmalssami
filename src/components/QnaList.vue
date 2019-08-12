<template>
  <v-container>
    <table class="content-table" width="70vw">
      <thead>
        <tr>
          <th>문의 제목</th>
          <th>글쓴이</th>
          <th>답변여부</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(q, i) in qnaList" :key="i" @click="questionDetail(q)">
          <td>{{q.title}}</td>
          <td>{{q.author}}</td>
          <td>
            <v-chip v-if="!q.isAnswered" label color="red lighten-4">미답변</v-chip>
            <v-chip v-if="q.isAnswered" label color="green lighten-4">답변완료</v-chip>
          </td>
        </tr>
      </tbody>
    </table>
    <v-dialog v-model="dialog" width="70vw">
      <v-card>
        <div>
          <v-card-title>
            <div class="headline">
              <strong>{{author}}</strong>
            </div>
          </v-card-title>
          <v-card-text>
            <div class="box question">{{title}}</div>
            <div class="box question">{{body}}</div>
            <div class="box answer">
              <form
                class="gform"
                method="POST"
                action="https://script.google.com/macros/s/AKfycbxfiqbR-q13b_kFqWJRIHKfv-5UGbvDi9tc9A4Sx6LbfNCO6MQ7/exec"
              >
                <div class="form">
                  <div class="floating-placeholder">
                    <input id="email" name="email" type="text" placeholder="이메일" :value="email" />
                  </div>
                  <div class="floating-placeholder">
                    <input id="title" name="title" type="text" placeholder="제목" />
                  </div>
                  <div class="floating-placeholder">
                    <input
                      id="question"
                      name="question"
                      type="text"
                      placeholder="질문"
                      :value="title"
                    />
                  </div>
                  <div class="floating-placeholder floating-placeholder-textarea">
                    <textarea id="answer" name="answer" placeholder="답변" />
                  </div>
                </div>
                <div class="text-xs-center">
                  <!-- <v-btn color="primary">보내기</v-btn> -->
                  <input type="submit" color="primary" value="보내기">
                </div>
                <div style="display:none;" id="thankyou_message">
                  <h1>감사합니다.</h1>
                </div>
              </form>
            </div>
          </v-card-text>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import FirebaseService from "../services/FirebaseService";

export default {
  name: "UserList",
  data() {
    return {
      qnaList: [],
      title: "",
      body: "",
      author: "",
      email: "",
      dialog: false
    };
  },
  mounted() {
    this.getQuestions();
  },
  methods: {
    async getQuestions() {
      this.qnaList = await FirebaseService.getQuestions();
    },
    questionDetail(q) {
      console.log(q);

      this.title = q.title;
      this.author = q.author;
      this.body = q.body;
      this.email = q.email;
      this.dialog = true;
    },
    sendEmail() {
      console.log("send이메일");
      const formData = document.getElementById("gform");
      console.log(formData);
      const data = new FormData(formData);
      console.log(data);
      const url =
        "https://script.google.com/macros/s/AKfycbxfiqbR-q13b_kFqWJRIHKfv-5UGbvDi9tc9A4Sx6LbfNCO6MQ7/exec";

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        console.log(xhr.readyState);

        if (xhr.readyState === 4) {
          console.log(xhr.response);

          if (xhr.status === 200) {
            console.log("성공");
          } else {
            console.log("실패");
          }
        }
      };
      xhr.open("POST", url, true);
      xhr.send(data);
    }
  }
};
</script>

<style scoped>
tbody tr:hover {
  cursor: pointer;
  opacity: 0.7;
}
.v-dialog {
  background-color: #eeeeee !important;
  border-radius: 10px !important;
  box-shadow: 0px 0px 10px 3px #c1c1c1 !important;
}
.headline {
  margin: auto;
}
.box {
  width: 300px;
  margin: 15px auto;
  border-radius: 15px;
  padding: 15px;
  font-weight: 900;
  font-family: arial;
  position: relative;
  overflow: unset;
  overflow-wrap: break-word;
}
.question {
  margin-left: 15px;
  background: #cacaca;
  color: rgb(51, 51, 51);
}
.question:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 15px solid transparent;
  border-right: 15px solid #cacaca;
  border-top: 15px solid #cacaca;
  border-bottom: 15px solid transparent;
  left: -16px;
  top: 0px;
}
.answer {
  margin-right: 15px;
  background: #38a0a3;
  color: #fff;
}
.answer:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 15px solid #38a0a3;
  border-right: 15px solid transparent;
  border-top: 15px solid #38a0a3;
  border-bottom: 15px solid transparent;
  right: -16px;
  top: 0px;
}
.form {
  width: 95%;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  margin-bottom: 20px;
}
input,
.floating-placeholder,
textarea {
  line-height: 2.6em;
  height: 2.6em;
  margin: 0;
  padding: 10px;
  width: 100%;
}
.floating-placeholder {
  position: relative;
}
textarea {
  height: auto;
}
.floating-placeholder-textarea {
  display: table;
}
.floating-placeholder input,
textarea {
  /* font-size:20pt; */
  border: none;
  outline: none;
  /* position:absolute; */
  top: 0;
  left: 0;
  display: block;
  background: transparent;
  z-index: 2;
  border-bottom: 1px solid #ccc;
  /* text-indent:$padding-horizontal; */
}

.floating-placeholder:last-child input {
  border-bottom: none;
}
.floating-placeholder label {
  display: block;
  position: absolute;
  top: 0;
  /* left:$padding-horizontal; */
  /* font-size:20pt; */
  z-index: 1;
  /* @include transform-origin(0,0.0em);
  @include transition(transform 160ms, color 200ms);
  @include transform(scale(1,1) rotateY(0)); */
  color: #999;
}
.floating-placeholder-float input {
  line-height: 3.4em;
}
</style>
