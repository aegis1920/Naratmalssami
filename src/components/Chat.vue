<style>
.sc-header {
  background-image: url('../assets/paper.jpg')!important;
}
.sc-header--title {
  font-size: 1.3em;
  font-weight: 700;
}
.sc-message--text > p {
  margin: 8px 0px
}
</style>
<template>
<div>
  <beautiful-chat
    :title = "title"
    :placeholder="placeholder"
    :participants="participants"
    :titleImageUrl="titleImageUrl"
    :onMessageWasSent="onMessageWasSent"
    :messageList="messageList"
    :newMessagesCount="newMessagesCount"
    :isOpen="isChatOpen"
    :close="closeChat"
    :onClose="true"
    :open="openChat"
    :showEmoji="true"
    :showFile="false"
    :showTypingIndicator="showTypingIndicator"
    :colors="colors"
    :alwaysScrollToBottom="alwaysScrollToBottom"
    :messageStyling="messageStyling"
    @onType="handleOnType" />
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import FirebaseService from '../services/FirebaseService'
import ChatbotService from '../services/ChatbotService'

export default {
  name: 'app',
  data() {
    return {
      count: 0,
      currentUser: '',
      title: '주인장과 당신의 대화창',
      placeholder: '문의를 입력하세요',
      participants: [{
          id: 'user1',
          name: '주인장',
          imageUrl: require('@/assets/k_avatar.png')
        },
        {
          id: 'user2',
          name: '',
          imageUrl: require('@/assets/k_avatar2.png')
        }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: require('@/assets/traditional.png'),
      messageList: [],
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: '#6D4C41',
          text: '#000'
        },
        launcher: {
          bg: '#6D4C41'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#6D4C41',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: true, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    }
  },
  mounted(){
    this.currentUser = this.getUser['userName']
    this.participants[1].name = this.currentUser;
  },
  beforeUpdate(){
    this.count = this.count+1;
    if(this.count==1){
      this.messageList = this.getUserChat;
    }
  },
  computed:{
    ...mapGetters(['getUser', 'getUserChat'])
  },
  methods: {
    sendMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({
          author: this.currentUser,
          type: 'text',
          data: {
            text
          }
        });
      }
    },
    onMessageWasSent(message) {
      this.messageList = [...this.messageList, message];
      if(message.type=='text'){
        var text = ChatbotService.getAnswer(message.data.text);
        var answerMessage = {
          author: `user1`,
          type: 'text',
          data: {
            text
          }
        };
        this.messageList = [...this.messageList, answerMessage];
      }
    },
    openChat() {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
      var chatWindow = document.getElementsByClassName('sc-chat-window')[0];
      var chatButton = document.getElementsByClassName('sc-closed-icon')[0];
      var vueThis = this;

      document.onclick = function(e){
        if(!chatWindow.contains(e.target) && !chatButton.contains(e.target)){
          vueThis.closeChat();
        }
      }
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      FirebaseService.setUserMessageList(this.messageList);
      this.isChatOpen = false
    },
    handleScrollToTop() {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType() {
      // console.log('Emit typing event')
    }
  }
}
</script>
