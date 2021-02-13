<template>
  <section
    v-if="currBeat"
    :key="this.isLiked"
    class="beat-info flex space-between"
  >
    <div class="beat-info-imgs flex">
      <img class="prev-img-details" :src="currBeat.imgUrl" />
      <div class="user-profile flex col align-center justify-baseline">
        <img
          class="profile-img"
          v-if="currBeat.createdBy.imgUrl"
          :src="currBeat.createdBy.imgUrl"
        />
        <img
          class="profile-img"
          v-else
          src="../../assets/img/default-guest.jpg"
        />
        <span>{{ currBeat.createdBy.userName }}</span>
      </div>
    </div>
    <div class="song-info flex col justify-center align-center">
      <span class="beat-title">{{ currBeat.name }}</span>
      <span class="beat-genre">{{ currBeat.genre }}</span>
      <span class="beat-description">{{ currBeat.description }}</span>
    </div>
    <div class="views-container flex col align-center space-between">
      <div class="flex space-around">
        <a
             href= "whatsapp://send?text=LOOK AT THAT BEAT https://bluebeat.herokuapp.com/" 
          data-action="share/whatsapp/share"
          ><i class="copy-clipboard icon fab fa-whatsapp"></i
        ></a>
        <i v-if="isCopied" class="copy-clipboard icon fas fa-share-square"></i>
        <i
          v-else
          @click="copyToClipboard"
          class="copy-clipboard icon far fa-share-square"
        ></i>
      </div>
      <div class="flex space-around">
        <span class="beat-likes">{{ currBeat.visits }}</span>
        <i class="like-btn far fa-eye"></i>
      </div>
      <div class="flex space-around">
        <span class="beat-likes">{{ currBeat.likes }}</span>
        <i
          @click.prevent="setLike(1)"
          v-if="!isLiked"
          class="like-btn icon far fa-heart"
        ></i>
        <i
          @click.prevent="setLike(-1)"
          v-if="isLiked"
          class="like-btn icon fas fa-heart"
        ></i>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    currBeat: Object,
  },
  name: "beatInfo",
  data() {
    return {
      isLiked: false,
      onlineUsers: 0,
      isCopied: false,
    };
  },
  computed: {
    likes() {
      return this.$store.getters.currBeat.likes;
    },
  },
  methods: {
    emitDelete(beatId) {
      this.$emit("removeBeat", beatId);
      this.$router.push("/beat");
    },
    setLike(diff) {
      this.$emit("setLike", diff);
      this.isLiked = !this.isLiked;
    },
    copyToClipboard() {
      this.isCopied = true;
      let input = document.body.appendChild(document.createElement("input"));
      input.value = window.location.href;
      input.focus();
      input.select();
      document.execCommand("copy");
      input.parentNode.removeChild(input);
      setTimeout(() => {
        this.isCopied = false;
      }, 2000);
    },
  },
  created() {
    this.onlineUsers++;
  },
  sockets: {
    userJoinRoom(diff) {
      this.onlineUsers += diff;
    },
  },
};
</script>
