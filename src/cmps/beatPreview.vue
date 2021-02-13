<template>
  <div v-if="beat"
    class="prev-card flex col justify-center align-center icon"
    @click="beatPrev(beat._id)"
  >
    <div class="flex col prev-main-info-container">
      <div class="beat-img flex align-center justify-center">
        <img class="prev-img" :src="beat.imgUrl" />
        <i class="play-on-hover fas fa-play-circle"></i>
      </div>
      <div class="prev-details flex col align-center justify-center">
        <h2 class="prev-name">{{ beat.name }}</h2>
        <!-- <h3 class="prev-genre">{{ beat.genre }}</h3> -->
        <span class="">Now Playing:<br></span><span v-if="beat.currSong" class="playing-now">{{beat.currSong.title.substring(0,25)}}</span>
        
      </div>
    </div>
    <div class="prev-info-container flex space-around align-center">
     
      <div class="flex">
        <i class="prev-show fas fa-music"></i>
        <span class="prev-info">{{ beat.songs.length }} </span>
      </div>
      <div class="flex tones-prev">
           <img class="tones-prev1" src=".././assets/img/preview.png" alt="">
           <img class="tones-prev2" src=".././assets/img/sound-gif2.gif" alt="">
      </div>
      <div class="flex">
        <i class="prev-show prev- fas fa-heart"></i>
        <span class="prev-info"> {{ beat.likes }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import MarqueeText from 'vue-marquee-text-component';
export default {
  props: ["beat"],
  name: "beatPreview",
  methods: {
    beatPrev(beatId) {
      this.$router.push(`/beat/${beatId}`);
    },
  },
  components:{
    MarqueeText
  }

 
};
</script>

