<template>
  <div class="container bg-mgrey-900 w-full max-w-full h-full min-h-screen flex flex-row-reverse">
    <div class="w-full bg-white flex flex-col h-full min-h-screen items-center justify-center md:w-1/2">
      <div class="flex flex-col items-start max-w-xs w-full pb-12">
        <h1 class="text-3xl font-medium mb-4">Login</h1>
        <p class="hidden font-light mt-2 text-sm mb-8">

        </p>
        <ValidationObserver class="w-full" v-slot="{ invalid }" ref="observer">
          <string-input
            v-model="email"
            rules="required|email"
            text-transform="lowercase"
            label="E-Mail Address"
            name="email"
            class="w-full"
            id="login_email"
            @keyup.enter.native="handleLogin"
          />
          <string-input
            v-model="password"
            type="password"
            rules="required|min:8"
            text-transform="lowercase"
            label="Password"
            name="password"
            class="mt-2 w-full"
            id="login_parola"
            @keyup.enter.native="handleLogin"
          />
          <m-button
            bg-color="mgreen"
            hover-bg-color="mgreen-600"
            :disabled="invalid"
            color="white"
            class="w-full py-4 px-16 mt-4 text-sm"
            @click.native="handleLogin"
          >
            Login
          </m-button>
        </ValidationObserver>
        <div class="flex w-full flex-row justify-end mt-2">
          <router-link
            class="text-sm text-mblue w-full hover:underline"
            :to="{name: 'UserCreate'}"
          >
            <m-button bg-color="mblue" hover-bg-color="mblue-600" class="w-full py-4 px-16 text-sm">
              Register
            </m-button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="hidden md:flex flex-col h-screen w-1/2 text-pollux pt-8">
      <div class="w-full mt-px h-2 bg-mblue"></div>
      <div class="w-full mt-px h-2 bg-myellow"></div>
      <div class="w-full mt-px h-2 bg-morange"></div>
      <div class="w-full mt-px h-2 bg-mgreen"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import StringInput from '@/components/partials/StringInput';
const jwt = require('jsonwebtoken');

export default {
  name: 'UserLogin',

  components: {
    StringInput
  },

  data() {
    return {
      email: "",
      password: ""
    }
  },

  methods: {

    ...mapActions({
      'userLogin': 'userLogin'
    }),

    handleLogin() {

      const token = jwt.sign({
        email: this.email,
        password: this.password
      },
      process.env.VUE_APP_JWT_SECRET,
      {
        expiresIn :"1m"
      })

      const data = {
        token: token
      }

      this.userLogin(data).then(response => {
        this.$router.push({ name: 'MockList' })
      }).catch(err => {
        this.$modal.show('result', {
          type: "error",
          title: "Failed!",
          text: err.message
        });
      })
    }
  },

  mounted() {
    if(this.$route.params.email) {
      this.email = this.$route.params.email
      this.$refs.observer.reset()
    }
  }
};
</script>

<style scoped>

</style>
