
<template>
  <section >
    <div class="main-list" v-if="beats">
      <beat-preview v-for="beat in beats" :key="beat._id" :beat="beat" />
    </div>
  </section>
</template>

<script>
import beatPreview from "../cmps/beatPreview.vue";
export default {
  name: "beatList",
  props: {
    beats: Array,
  },
  methods: {},
  components: {
    beatPreview,
  },
  created() {},
};
</script>
