<template>
	<el-select @change="setGenre" v-model="selectedGenre" placeholder="genre" >
		<el-option
			v-for="genre in genres"
			:key="genre.value"
			:label="genre.label"
			:value="genre.value"
		>
		</el-option>
	</el-select>
</template>

<script>
export default {
	props: {
		 genres:Array
	},
	data() {
		return {
			selectedGenre:''
		};
	},
	methods: {
	setGenre(){
		this.$emit('setGenre',this.selectedGenre)
	}
    },
    created(){
      
    }
};
</script>