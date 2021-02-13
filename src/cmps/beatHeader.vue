<template>
  <div class="header">
    <div class="flex justify-center align-center space-between">
      <img
        class="beat-logo icon"
        src="@/assets/img/beatLogo.png"
        @click="backHome"
      />
      <form @keyup="searchBeat">
        <el-input
          class="header-search icon"
          type="text"
          placeholder="Search a beat"
          prefix-icon="el-icon-search"
          v-model="beatToSearch"
        />
      </form>
      <div class="flex row">
        <div class="flex justify-center align-center">
          <router-link class="header-btn" to="/beat">Beats</router-link>
          <span class="divider">|</span>
          <router-link class="header-btn" to="/beat/add"
            >Create Beat</router-link
          >
        </div>
        <div @click="toggelMenu" class="user-profile-btn icon fas fa-user-circle flex col justify-center align-center">
        </div>
      </div>
    </div>
     <ul class="" :class="{ menuOpen: isMenuOpen, userNav: !isMenuOpen }">
        <li class="login-link icon" @click="login" to="/login">Login</li>
            <!-- <div v-if="isLoggedIn" class="" @click="login" to="/login">Login</div> -->
        <li class="login-link icon"  @click="signup" to="/login">Signup</li>
        <li class="login-link icon" @click="logout" to="/">Logout</li>
      </ul>
          
  </div>
</template>



<script>
export default {
  name: "beatHeader",
  data() {
    return {
      genre: "",
      beatToSearch: "",
      isMenuOpen: false
    };
  },
  computed: {
    isLoggedIn(state) {
      return state.getters.loggedinUser
    }
  },
  methods: {
    toggelMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    login() {
      this.$store.dispatch({
        type: "logUser",
        registeredUser: true
      })
      this.isMenuOpen = !this.isMenuOpen
      this.$router.push('/login')
    },
    signup() {
      this.$store.dispatch({
        type: "signUser",
        registeredUser: false
      })
      this.isMenuOpen = !this.isMenuOpen
      this.$router.push('/login')
    },
    logout() {
      this.isMenuOpen = !this.isMenuOpen
      this.$store.dispatch({
        type: 'logout',
      })
      this.$router.push('/')
    },
    backHome() {
      this.$router.push("/");
    },
    searchBeat() {
      this.$store.dispatch({
        type: "setTxtFilter",
        txt: this.beatToSearch,
      });
      this.$router.push("/beat");
    },
  },
};
</script>