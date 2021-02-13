<template>
  <section class="beat-add main-layout">
    <div class="beat-add-container flex space-evenly align-center">
      <div class="upload-img flex justify-center">
        <upload-img @getImgUrl="setImgUrl" />
      </div>
      <div class="upload-info flex col justify-center align-center">
        <el-input
          class="add-input"
          type="text"
          v-model="beat.name"
          placeholder="Beat name"
        ></el-input>
        <el-input
          class="add-input"
          type="textarea"
          :rows="2"
          v-model="beat.description"
          placeholder="Description"
          :value="beat.description"
        ></el-input>
      </div>
      <div class="flex col">
        <div class="btns-add flex space-between">
          <a class="filter-btn icon" round @click="saveBeat">Create</a>
          <a class="filter-btn icon" @click="back">Back</a>
        </div>
        <div>
          <genere-select
            class="genre-select"
            @setGenre="setGenre"
            :genres="genreSelectOpts"
          ></genere-select>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import genereSelect from "@/cmps/genereSelect";
import uploadImg from "@/cmps/uploadImg";
import { utilService } from "@/services/utilService";
export default {
  name: "beatAdd",
  data() {
    return {
      beat: null,
      msg: "",
      genreSelectOpts: [
        { value: "HIP HOP", label: "Hip Hop" },
        { value: "ISRAELI", label: "Isreali" },
        { value: "DANCE", label: "Dance" },
        { value: "POP", label: "Pop" },
        { value: "ROCK N ROLL", label: "Rock N Roll" },
        { value: "LATIN", label: "Latin" },
        { value: "EASY", label: "Easy" },
      ],
    };
  },
  created() {
    this.beat = utilService.getEmpty();
  },
  computed: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    async saveBeat() {
      const savedBeat = await this.$store.dispatch({
        type: "addBeat",
        beat: this.beat,
      });
      this.$router.push(`/beat/${savedBeat._id}`);
    },
    setImgUrl(imgUrl) {
      this.beat.imgUrl = imgUrl;
    },
    setGenre(genre) {
      this.beat.genre = genre;
    },
  },
  components: {
    genereSelect,
    uploadImg,
  },
};
</script>
