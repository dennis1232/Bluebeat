<template>
  <div class="flex align-center">
    <el-input
      type="text"
      class="search-new-songs"
      v-model="searchKeyWord"
      @input="searchYoutubeSong"
      placeholder="Add song to playlist"
      prefix-icon="el-icon-search"
      id="search"
    />
  <i @click="cleanSearch" class="clean-search fas fa-backspace"></i>
  </div>
</template>

<script>
export default {
  name: "addSong",
  props: {
    searchedSongs: Array,
  },
  data() {
    return {
      searchKeyWord: '',
      isSearch: false,
    };
  },
  computed: {},
  methods: {
    toggleSearch() {
      this.isSearch = !this.isSearch;
    },
    async searchYoutubeSong() {
      if (!this.searchKeyWord) this.$emit("setKeyWord", false);
      else this.$emit("setKeyWord", this.searchKeyWord);
    },
    cleanSearch(){
      this.searchKeyWord =''
      this.searchYoutubeSong()
    }
  },
  created(){
    this.searchKeyWord =''
    this.searchYoutubeSong()
  }
};
</script>
