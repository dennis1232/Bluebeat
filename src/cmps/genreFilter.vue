<template>
  <div>
    <el-radio-group class="beat-filter" v-model="selectedGenre" @change="setGenreFilter">
      <el-radio class="filter-btn" value="All" label="ALL"></el-radio>
      <el-radio class="filter-btn" value="Easy"  label="EASY"></el-radio> -->
      <el-radio class="filter-btn" value="Hip Hop"  label="HIP HOP"></el-radio>
      <el-radio class="filter-btn" value="Israeli"  label="ISRAELI"></el-radio>
      <br class="br-filter">
      <el-radio class="filter-btn" value="Dance"  label="DANCE"></el-radio>
      <el-radio class="filter-btn" value="Rock N Roll"  label="ROCK N ROLL"></el-radio>
      <el-radio class="filter-btn" value="Pop"  label="POP"></el-radio>
      <el-radio class="filter-btn" value="Latin"  label="LATIN"></el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
      props:{
        
      },
    data () {
      return {
        selectedGenre:''
      };
    },
    methods:{
        setGenreFilter(){
            let genreFilterCopy =JSON.parse(JSON.stringify(this.selectedGenre));
            this.$emit("setGenre",genreFilterCopy)
           
        }
    },
    created(){
        this.selectedGenre = this.$store.getters.filterBy.genreFilter
        this.setGenreFilter()
    }
  }
</script>