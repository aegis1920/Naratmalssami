<template>
  <v-layout>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-img
          id="chat-icon"
          v-on="on"
          :src="require('@/assets/korea.png')"
          width="30px"
          height="30px"
          style="margin:auto; margin-right: 10px;"
        ></v-img>
      </template>
      <span>
        버튼을 눌러 주인장과 대화해보세요!
        <v-icon small color="#FDD835">far fa-grin-squint</v-icon>
      </span>
    </v-tooltip>
    <ChatBot  />
  </v-layout>
</template>

<script>
import ChatBot from "../components/Chatbot.vue";
export default {
  components: {
    ChatBot
  }
};
</script>


