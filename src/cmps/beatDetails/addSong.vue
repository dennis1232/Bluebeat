<template>
  <section v-if="searchedSongs" class="beat-add add-container">
    <div v-for="song in searchedSongs" :key="song.id">
      <div class="song-container add-song-container flex align-center space-between icon">
        <img class="song-img" :src="song.imgUrl" />
        <h5 class="song-title">{{ song.title.substring(0, 20) }}</h5>
        <div class="flex">
          <h5 class="song-dur">{{ song.duration }}</h5>
          <i class="song-icon fas fa-plus" @click="addSongToPlayList(song)"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "addSong",
  props: {
    searchedSongs: Array,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    addSongToPlayList(song) {
      this.$emit("addSongToPlayList", song);
    },
  },
  created() {},
 
};
</script>
