<template>
  <section class="beat-player flex space-evenly" v-if="currBeat">
    <div class="beat-frame flex">
      <div class="beat-img flex align-center">
        <img
          class="prev-img"
          :class="{ playing: playerVars.isPlaying }"
          :src="currBeat.currSong.imgUrl"
        />
      </div>
      <youtube
        :player-vars="playerVars"
        class="player"
        :video-id="currBeat.currSong.youtubeId"
        ref="youtube"
        style="visibility: hidden"
      ></youtube>
    </div>
    <div class="player-btn flex icon align-center justify-center">
      <h2 class="now-playing">
     <marquee-text><span>Playing Now:<br></span>{{currBeat.currSong.title}}</marquee-text>
      </h2>
      <i
        @click.stop="switchSong(currBeat.currSong.id, -1)"
        class="fas fa-backward"
      ></i>
      <i
        v-if="!playerVars.isPlaying"
        @click.stop="playOrPauseSong(true, false)"
        class="fas fa-play"
      ></i>
      <i
        v-if="playerVars.isPlaying"
        @click.stop="playOrPauseSong(false, false)"
        class="fas fa-pause"
      ></i>
      <i
        @click.stop="switchSong(currBeat.currSong.id, 1)"
        class="fas fa-forward"
      ></i>
      <i
        @click.stop="shuffle"
        :class="{ active: playerVars.isShuffle }"
        class="fas fa-random"
      ></i>
      <i
        @click.stop="muteSound"
        :class="{ active: !playerVars.isMuted }"
        class="sound icon fas fa-volume-down"
      ></i>
      <!-- </div> -->
      <input
        class="set-vol"
        type="range"
        min="0"
        max="10"
        v-model="playerVars.vol"
        @input="setVol"
      />
      <span class="vol-var">{{ playerVars.vol }}</span>
      <img
        class="back-to-beat-img"
        @click.prevent="backToBeat"
        src="../../assets/img/backtobeat.png"
        alt=""
      />
    </div>
    <div @click="closePlayer" class="close-player">
      <i class="icon close-player-btn fas fa-times"></i>
    </div>
  </section>
</template>

<script>
export default {
  name: "beatPlayer",
  // props: ["currBeat"],
  data() {
    return {
      playerVars: {
        autoplay: 1,
        vol: 5,
        time: null,
        isMuted: false,
        isPlaying: true,
        isShuffle: false,
      },
    };
  },
  methods: {
    closePlayer() {
      this.$emit("closePlayer");
      sessionStorage.clear();
    },
    shuffle() {
      this.playerVars.isShuffle = !this.playerVars.isShuffle;
    },
    async playOrPauseSong(isPlaying, isFromSocket) {
      this.playerVars.isPlaying = isPlaying;
      if (isPlaying) await this.$refs.youtube.player.playVideo();
      else await this.$refs.youtube.player.pauseVideo();
      if (isFromSocket) return;
      this.$socket.emit("setSongStatus", isPlaying);
    },
    muteSound() {
      if (!this.playerVars.isMuted) {
        this.$refs.youtube.player.mute();
        this.playerVars.isMuted = true;
      } else {
        this.$refs.youtube.player.unMute();
        this.playerVars.isMuted = false;
      }
    },
    setVol() {
      this.$refs.youtube.player.setVolume(this.playerVars.vol);
    },
    async setCurrSong(song) {
      await this.$store.dispatch({
        type: "setCurrSong",
        song,
      });
    },
    async switchSong(songId, diff) {
      let song;
      if (this.playerVars.isShuffle) {
        let beatSongOpts = this.currBeat.songs.length - 1;
        let rndIdx = Math.floor(Math.random() * Math.floor(beatSongOpts));
        song = this.currBeat.songs[rndIdx];
      } else {
        let idx = this.currBeat.songs.findIndex((song) => song.id === songId);
        if (idx === 0 && diff === -1) idx = this.currBeat.songs.length - 1;
        else if (idx === this.currBeat.songs.length - 1 && diff === 1) idx = 0;
        else idx += diff;
        song = this.currBeat.songs[idx];
      }
      await this.$socket.emit("songChanged", song);
    },
    backToBeat() {
      this.$router.push(`/beat/${this.currBeat._id}`);
      if(!this.currSong) this.currSong = this.currBeat.songs[0]
    },
  },
  computed: {
    player() {
      if (this.currBeat) return this.$refs.youtube.player;
    },
    currBeat() {
      this.playerVars.isPlaying = true;
      return this.$store.getters.currBeat;
    },
  },
  created() {
    if (this.currBeat && !this.currBeat.currSong) {
      this.currBeat.currSong = this.currBeat.songs[0];
    }
  },
  sockets: {
    songChanged(song) {
      this.setCurrSong(song);
      this.playOrPauseSong(true, true);
    },
    songStatusChanged(isPlaying) {
      this.playOrPauseSong(isPlaying, true);
    },
  },
};
</script>