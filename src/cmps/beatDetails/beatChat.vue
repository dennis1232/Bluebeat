<template>
  <div :class="['beat-chat flex col space-between', toggleChat]">
    <ul class="beat-msg">
      <li class="msg-li" v-for="(msg, idx) in msgs" :key="idx">
        <span class="from">{{ msg.from }}:</span> <br />
        <span>{{ msg.txt }}</span>
      </li>
      <h4 class="typing" v-if="isTyping">{{ userNowTyping }}</h4>
    </ul>
    <div class="send-container flex space-between">
      <i class="send-btn icon fas fa-paper-plane" @click="sendMsg"></i>
      <form class="chat-form" @submit.prevent="sendMsg">
        <input
          class="send-msg"
          @input="TheUserTyping"
          type="text"
          v-model="msg.txt"
        />
      </form>
      <beat-emoji />
    </div>
  </div>
</template>

<script>
import { beatService } from "../../services/beatService.js";
import beatEmoji from "./beatEmoji.vue";

export default {
  props: {
    beat: Object,
    toggleChat: String,
  },
  name: "beatChat",
  data() {
    return {
      msg: { from: "", txt: "" },
      msgs: [],
      topic: "",
      isTyping: false,
      userNowTyping: "",
    };
  },
  computed: {},
  methods: {
    addMsg(msg) {
      if (!msg) return;
      this.msgs.push(msg);
    },
    sendMsg() {
      if (this.$store.getters.loggedinUser) {
        this.msg.from = this.$store.getters.loggedinUser.username;
      } else {
        this.msg.from = "Guest";
      }
      this.$socket.emit("sendMsg", this.msg);
      this.msg.txt = "";
    },
    TheUserTyping() {
      let loggedinUser = this.$store.getters.loggedinUser;
      if (!loggedinUser) loggedinUser = "Guest";
      this.$socket.emit("userTyping", loggedinUser);
    },
    typing(user) {
      this.isTyping = true;
      if (!user.username) {
        this.userNowTyping = "Guest" + " is typing..";
      } else {
        this.userNowTyping = user.username + " is typing..";
      }
      setTimeout(() => {
        this.userNowTyping = "";
        this.isTyping = false;
      }, 2500);
    },
  },
  sockets: {
    sentMsg(msg) {
      this.addMsg(msg);
    },
    userTyping(user) {
      this.typing(user);
    },
  },

  created() {
   
  },
  components: {
    beatEmoji,
  },
};
</script>

<style >
.beat-chat {
  background-image: url("../../assets/img/chat-background.jpg");
}
</style>
