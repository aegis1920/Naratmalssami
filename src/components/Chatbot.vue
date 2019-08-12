<template>
  <div
    id="frogue-container"
    class="position-right-bottom"
    data-chatbot="03674280-8dd2-472f-8779-a18eca2ccb57"
    data-user="사용자ID"
    data-init-key="value"
  >
    <div id="test"></div>
  </div>
</template>

<script>
import { log } from "util";
import { setTimeout } from "timers";
import $ from "jquery";
export default {
  name: "chat",
  data() {
    return {
      styleOption: {
        top: "30px!important",
        right: "0px!important"
      },
      isLoad: false
    };
  },
  watch: {
    isLoad: function() {
      console.log("chat load !!!!");
      const icon = document.getElementById("chat-icon").getBoundingClientRect();
      const danbee =  $("#frogue-container");
      console.log(document.getElementById("chat-icon"));

      console.log(icon.bottom);
      console.log(danbee);
      danbee.css('bottom', icon.bottom);
      danbee.css('height', icon.height);
      danbee.css('left', icon.left);
      danbee.css('right', icon.right);
      danbee.css('top', icon.top);
      danbee.css('width', icon.width);
      danbee.css('x', icon.x);
      danbee.css('y', icon.y);
      console.log(danbee);
    }
  },
  mounted() {
    this.chatbotLoad().then(result => {
      console.log(result);

      setTimeout(() => {
        this.isLoad = true;
      }, 600);
    });
  },
  methods: {
    async chatbotLoad() {
      var fjs = document.getElementsByTagName("script")[0];

      if (document.getElementById("frogue-embed")) {
        return;
      }

      var js = document.createElement("script");
      js.id = "frogue-embed";
      js.src = "https://danbee.ai/js/plugins/frogue-embed/frogue-embed.min.js";

      await fjs.parentNode.insertBefore(js, fjs);
    }
  }
};
</script>

<style>
@media (min-width: 960px) {
  .frogue-chat {
    top: 80px;
    left: calc(100% - 440px);
  }
}
@media (max-width: 960px) and (min-width: 600px) {
  .frogue-chat {
    top: 60px;
    left: calc(100% - 440px);
  }
}
@media (max-width: 600px) {
  .frogue-chat {
    top: 0px;
    left: 0px;
  }
}
.frogue-launcher {
  /* top: 30px !important; */
  /* left: calc(100% - 350px) !important; */
  width: 30px !important;
  height: 30px !important;
  opacity: 0.1;
}
/* #frogue-container {
  top: 15px !important;
  bottom: 0px !important;
  right: 434.234px !important;
} */
</style>


