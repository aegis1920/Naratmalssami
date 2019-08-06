<template>
  <v-container>
    <v-layout width="100vw" align-center justify-center>
      <div style="line-height:3.5em; font-size:8vw;" slot="text">자주 묻는 질문들</div>
    </v-layout>
    <v-layout>
      <v-expansion-panel>
        <v-expansion-panel-content v-for="faq in faqs" :key="faq.doc_id">
          <template v-slot:header>
            <div>
              <v-icon color="blue-grey lighten-3">fas fa-question-circle</v-icon>
              <span style="color:blue-grey lighten-3">{{faq.question}}</span>
            </div>
          </template>
          <v-card>
            <v-card-text class="qbody">
              <v-layout class="answer">
                <v-icon color="teal lighten-3">fas fa-exclamation-circle</v-icon>
                <div>
                  <span></span>
                  <span class="answer" v-for="ans in faq.answer" :key="ans">{{ans}}</span>
                  <span></span>
                </div>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-layout>
  </v-container>
</template>

<script>
import FirebaseService from "../services/FirebaseService";
import ImgBanner from "../components/ImgBanner";
import { setTimeout } from "timers";
import { log } from "util";

export default {
  name: "QnAPage",
  data() {
    return {
      faqs: []
    };
  },
  components: {
    ImgBanner
  },
  mounted() {
    this.getFAQs();
  },
  methods: {
    async getFAQs() {
      this.faqs = await FirebaseService.getFAQs();
    }
  }
};
</script>
<style scoped>
.qbody {
  padding: 13px !important;
  border: 1px solid;
  border-color: #9e9e9e;
}
i {
  margin-right: 10px !important;
}
.v-card {
  padding: 10px !important;
}
.v-expansion-panel__container--active > .v-expansion-panel__header > div * {
  color: #ff8a65 !important;
}
span.answer {
  display: block;
}
</style>
