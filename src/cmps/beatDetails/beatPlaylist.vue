<template>
  <section v-if="songs">
    <draggable ghost-class="ghost" @end="onEnd">
      <transition-group type="transition" name="flip-list">
        <div
          v-for="song in songs"
          :key="song.id"
          class="song-container sortable flex space-between align-center icon"
          :class="{ active: song.id === currBeat.currSong.id }"
          :id="song.id"
          @click.stop="changeSong(song)"
        >
          <img
            src="@/assets/img/preview.png"
            v-if="song.id !== currBeat.currSong.id"
            class="song-img"
            alt=""
          />
          <img
            src="@/assets/img/sound-gif2.gif"
            v-if="song.id === currBeat.currSong.id"
            class="song-img"
            alt=""
          />
          <img class="song-img" :src="song.imgUrl" />
          <span class="song-title">{{song.title.substring(0, 30)}}</span>
          <div class="flex align-center">
            <span class="song-dur">{{ song.duration }}</span>
            <i class="song-icon fas fa-sort"></i>
            <span @click.stop="removeSong(song.id)">
              <i class="song-icon icon fas fa-trash"></i
            ></span>
          </div>
        </div>
      </transition-group>
    </draggable>
  </section>
</template>

<script>
import draggable from "vuedraggable";
export default {
  props: {
    currBeat: Object,
    currSong: Object,
  },
  name: "playlist",
  data() {
    return {
      oldIndex: "",
      newIndex: "",
      isPlaying: false,
    };
  },
  computed: {
    songs() {
      console.log("cmp", this.currBeat.songs);
      return JSON.parse(JSON.stringify(this.currBeat.songs));
    },
  },

  methods: {
    onEnd(ev) {
      this.oldIndex = ev.oldIndex;
      this.newIndex = ev.newIndex;
      this.$emit("dragSong", this.songs);
    },
    removeSong(songId) {
      this.$emit("removeSong", songId);
    },
    async changeSong(song) {
      await this.$emit("changeSong", song);
      this.song = song;
    },
  },
  components: {
    draggable,
  },
};
</script>
