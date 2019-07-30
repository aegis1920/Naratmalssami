<template>
  <div
    id="frogue-container"
    class="position-right-bottom"
    data-chatbot="03674280-8dd2-472f-8779-a18eca2ccb57"
    data-user="사용자ID"
    data-init-key="value"
  ></div>
</template>

<script>
import { log } from "util";
export default {
  name: "chat",
  mounted() {
    this.chatbotLoad();
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
  top: 30px !important;
  left: calc(100% - 350px) !important;
  opacity: 0.00001;
}
</style>


