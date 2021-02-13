<template>
  <section class="main-layout home">
    <genre-filter
      @setGenre="setGenreFilter"
      class="flex align-center justify-center"
    ></genre-filter>
    <beat-list :beats="beats" />
  </section>
</template>

<script>
import beatList from "@/cmps/beatList.vue";
import genreFilter from "@/cmps/genreFilter.vue";
export default {
  name: "beat",
  data() {
    return {};
  },
  methods: {
    setGenreFilter(genre) {
      this.$store.dispatch({
        type: "setGenreFilter",
        selectedGenre: genre,
      });
    },
  },
  components: {
    beatList,
    genreFilter,
  },
  computed: {
    beats() {
      return this.$store.getters.beats;
    },
    genreFilter() {
      return this.$store.getters.genres;
    },
  },
  created() {
    this.$store.dispatch({ type: "loadBeats"});
  },
};
</script>
