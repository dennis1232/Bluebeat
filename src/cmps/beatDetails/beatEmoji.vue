<template>
  <section>
    <i @click="toggleEmojiPicker()" class="send-btn icon far fa-smile"></i>
    <ul class="sent-emojis-container">
      <li
        v-for="sentEmoji in sentEmojis"
        :key="sentEmoji.id"
        class="emoji"
        :class="sentEmoji.class"
      ></li>
    </ul>
    <div v-if="isEmoji" class="emoji-container flex wrap space-evenly">
      <li
        v-for="emoji in emojis"
        :key="emoji.id"
        :class="emoji.class"
        @click="onEmoji(emoji.id)"
      ></li>
    </div>
  </section>
</template>
<script>
import { utilService } from "../../services/utilService.js";
import { emojiService } from "../../services/emojiService.js";
export default {
  name: "emojiPicker",
  data() {
    return {
      emojis: null,
      isEmoji: false,
      sentEmojis: [],
    };
  },
  methods: {
    onEmoji(emojiId) {
      let emoji = JSON.parse(
        JSON.stringify(this.emojis.find((emoji) => emoji.id === emojiId))
      );
      emoji.id = utilService.makeId();
      this.toggleEmojiPicker();
      this.startAnimation(emoji);
      this.$socket.emit("sendEmoji", emoji);
    },
    startAnimation(emoji) {
      this.sentEmojis.push(emoji);
      setTimeout(() => {
        emoji.class += " start";
      }, 100);
      setTimeout(() => {
        this.sentEmojis.shift();
      }, 7000);
    },
    toggleEmojiPicker() {
      this.isEmoji = !this.isEmoji;
    },
  },
  created() {
    this.emojis = emojiService.getEmojis();
  },
  sockets: {
    reciveEmoji(emoji) {
      this.startAnimation(emoji);
    },
  },
};
</script>