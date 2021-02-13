<template>
  <section class="home">
    <div class="hero-container">
      <img class="beat-hero" src="@/assets/img/bluebeatHero.jpg" />
      <div class="marketing">
        <h1>FIND YOUR BEAT</h1>
        <h3>CREATE JOIN &amp; EDIT LIVE PLAYLISTS</h3>
      </div>
      <a
        href="/"
        @click.prevent="smoothScroll('homeList', 1000)"
        class="scroll-down"
      >
        <span></span>
      </a>
    </div>
    <section id="homeList" v-if="beats" class="home-list">
      <beat-home-list
        class="main-layout"
        v-for="genre in genres"
        :genre="genre"
        :beats="beats"
        :key="genre"
        @filter="dispatchFilter"
      />
    </section>
  </section>
</template>

<script>
import beatHomeList from "@/cmps/beatHomeList.vue";

export default {
  name: "Home",
  methods: {
    dispatchFilter(selectedGenre) {
      this.$store.dispatch({
        type: "setGenreFilter",
        selectedGenre,
      });
    },
    smoothScroll(target, duration) {
      var target = document.getElementById(target);
      var targetPosition = target.getBoundingClientRect().top;
      var startingPosition = window.pageYOffset;
      var distance = targetPosition - startingPosition;
      var startTime = null;
      function animationScroll(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startingPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animationScroll);
      }
      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      }
      requestAnimationFrame(animationScroll);
    },
  },
  computed: {
    beats() {
      return this.$store.getters.beats;
    },
    genres() {
      return this.$store.getters.genres;
    },
  },
  created() {
    this.$store.dispatch({ type: "resetFilter" });
  },
  components: {
    beatHomeList,
  },
};
</script>

