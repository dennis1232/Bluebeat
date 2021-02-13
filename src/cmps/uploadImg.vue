<template>
  <div id="app">
    <section v-if="!isLoading && !imgUrl">
      <label for="imgUploader"> <i class="img-icon icon fas fa-camera"></i> </label>
      <input class="img-upload" type="file" name="img-uploader" id="imgUploader" @change="onUploadImg">  
    </section>
    <img class="loader" v-if="isLoading && !imgUrl" src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif" alt="">
    <img v-if="!isLoading && imgUrl" class="img-uploaded" :src="imgUrl">
  </div>
</template>

<script>
import { uploadImg } from '@/services/imgUploadService.js';

export default {
  data() {
    return {
      isLoading: false,
      imgUrl: null
    }
  },
  methods: {
    async onUploadImg(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.imgUrl = res.url
      this.$emit('getImgUrl',res.url)
      this.isLoading = false;
    }
  },

}
</script>

<style>

.loader {
  height: 150px;
}


label img {
  height: 200px;
}



</style>
