<template>
  <section v-if="beats" class="">
    <div class="list-header flex space-between align-baseline">
      <h2 class="list-genre">{{ genre }}</h2>
      <h5
        class="list-genre"
        v-if="genre !== 'Popular' && genre !== 'Trending'"
        @click="showBeatsByGener"
      >
        See All
      </h5>
    </div>
    <beat-list :beats="beatsToShow" />
  </section>
</template>

<script>
import beatList from "../cmps/beatList.vue";
export default {
  name: "beatHomeList",
  props: {
    beats: Array,
    genre: String,
  },
  data() {
    return {};
  },
  computed: {
    beatsToShow() {
      if (this.genre === "Popular") {
        var sortBeats = JSON.parse(JSON.stringify(this.beats));
        sortBeats = sortBeats.sort((a, b) => (a.likes > b.likes ? -1 : 1));
        var popularBeats = [];
        for (var i = 0; i < 5; i++) {
          popularBeats.push(sortBeats[i]);
        }
        return popularBeats;
      } else if (this.genre === "Trending") {
        var sortBeats = JSON.parse(JSON.stringify(this.beats));
        sortBeats = sortBeats.sort((a, b) => (a.visits > b.visits ? 1 : -1));
        var popularBeats = [];
        for (var i = 0; i < 5; i++) {
          popularBeats.push(sortBeats[i]);
        }
        return popularBeats;
      }

      const beatsByGenres = this.beats.filter(
        (beat) => beat.genre.toLowerCase() === this.genre.toLowerCase()
      );
      var beatsByGenresToShow = []
      for (var i = 0; i < 5; i++) {
        if(beatsByGenres.length > 4){
          beatsByGenresToShow.push(beatsByGenres[i])
        } else {
          beatsByGenresToShow = beatsByGenres
        }
      }
      return beatsByGenresToShow;
    },
  },
  methods: {
    showBeatsByGener() {
      this.$emit("filter", this.genre.toUpperCase());
      this.$router.push("/beat");
    },
  },
  created() {},
  components: {
    beatList,
  },
};
</script>
