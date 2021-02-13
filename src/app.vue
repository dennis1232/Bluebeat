<template>
  <div id="app">
    <beatHeader />
    <router-view />
    <beatPlayer @closePlayer="closePlayer" />
  </div>
</template>,

<script>

import beatHeader from "@/cmps/beatHeader.vue";
import beatPlayer from "@/cmps/beatDetails/beatPlayer.vue";
import MarqueeText from 'vue-marquee-text-component';
import Vue from 'vue';
import marqueeText from 'vue-marquee-text-component';
 
Vue.component('marquee-text', MarqueeText);


export default {
  components: {
    beatHeader,
    beatPlayer,
  },
  methods: {
    closePlayer() {
      this.$store.commit({
        type: "setCurrBeat",
        currBeat: null,
      });
    },
  },
  computed: {
    currBeat() {
      return this.$store.getters.currBeat;
    },
  },
  created() {
    this.$store.dispatch({ type: "loadBeats" });
  },
//   components:{
//  MarqueeText
//   }

};
</script>

