<template>
  <v-container>
    <v-expansion-panel>
      <v-expansion-panel-content v-for="faq in faqs" :key="faq.doc_id">
        <template v-slot:header>
          
          <div>
            <v-icon color="deep-orange lighten-3">fas fa-question-circle</v-icon>
          {{faq.title}}</div>
        </template>
        <v-card>           
            <v-card-text class="qbody">
              <v-icon color="teal lighten-3">fas fa-exclamation-circle</v-icon>
              {{faq.body}}
              </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
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
      this.faqs = await FirebaseService.getQuestions();
    }
  }
};
</script>
<style scoped>
.qbody{
  padding: 12px 24px !important;
}
i{
  margin-right: 10px !important;
}
.v-expansion-panel__container--active > .v-expansion-panel__header > div{
  font-weight: 900;
}
</style>
