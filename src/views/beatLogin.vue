<template>
  <section class="main-layout login-page flex justify-center align-center">
    <form
      class="login-form flex justify-center align-center col"
      @submit.prevent="loginOrSignup"
    >
       <h3>Email:</h3>
      <input
        type="email"
        class="login-input icon"
        v-model="userCred.email"
        placeholder="email@example.com"
      />
      <h3>Username:</h3>
      <input
        type="text"
        class="login-input icon"
        v-model="userCred.username"
        placeholder="Username"
      />
      <h3>Password:</h3>
      <input
        type="text"
        class="login-input icon"
        v-model="userCred.password"
        placeholder="Password"
      />
      <div class="flex">
      <button  class="login-btn">Login</button>
      <button  class="login-btn">Signup</button>
      </div>
    </form>
    <!-- <form
      class="login-form flex justify-center align-center col"
      v-else
      @submit.prevent="signupUser"
    >
      <h3>Email:</h3>
      <input
        type="email"
        class="login-input icon"
        v-model="userCred.email"
        placeholder="Email"
      />
      <h3>Username:</h3>
      <input
        type="text"
        class="login-input icon"
        v-model="userCred.username"
        placeholder="Username"
      />
      <h3>Password:</h3>
      <input
        type="text"
        class="login-input icon"
        v-model="userCred.password"
        placeholder="Password"
      />
      <button class="login-btn">Signup</button>
    </form> -->
  </section>
</template>

<script>
export default {
  name: "beat",
  data() {
    return {
      // registeredUser: true,
      // registeredUser: false,
      registeredUser: null,
      userCred: {
        username: "",
        email: "",
        password: null,
      },
    };
  },
  computed: {
    // registeredUser() {
    //   // console.log(this.$store.getters.isRegistered);
    //   // this.registeredUser = this.$store.getters.isRegistered
    //   return this.$store.getters.isRegistered
    //   // return this.registeredUser
    // }
  },
  methods: {
    loginOrSignup() {
      console.log(this.userCred);
      if (this.registeredUser) {
        this.$store.dispatch({ type: "login", userCred: this.userCred });
        // this.$router.push("/")
      } else {
         this.$store.dispatch({ type: "signup", userCred: this.userCred });
         this.$router.push("/")
       }
    },
    signupUser() {
      //  if (!this.registeredUser) {
      //    this.$store.dispatch({ type: "signup", userCred: this.userCred });
      //    this.$router.push("/")
      //  }
    },
  },
  components: {},
  computed: {},
  created() {
    this.registeredUser = this.$store.getters.isRegistered
    console.log('this.registeredUser', this.registeredUser);
  },
};
</script>