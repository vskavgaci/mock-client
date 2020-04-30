<template>
  <div class="container bg-mgrey-900 w-full max-w-full h-full min-h-screen flex flex-row-reverse">
    <div class="w-full bg-white flex flex-col h-full min-h-screen items-center justify-center md:w-1/2">
      <div class="flex flex-col items-start max-w-xs w-full">
        <h1 class="text-3xl font-medium mb-4">Register</h1>
        <ValidationObserver class="w-full" v-slot="{ invalid }" ref="observer">
          <string-input
            v-model="name"
            rules="required"
            label="Name Surname"
            class="w-full"
            name="name"
            id="login_name"
            @keyup.enter.native="handleSubmit"
          />
          <string-input
            v-model="username"
            rules="required"
            label="User Name"
            class="w-full"
            name="username"
            id="login_username"
            @keyup.enter.native="handleSubmit"
          />
          <string-input
            v-model="email"
            rules="required|email"
            text-transform="lowercase"
            label="E-Mail Address"
            class="w-full"
            name="email"
            id="login_email"
            @keyup.enter.native="handleSubmit"
          />
          <string-input
            v-model="password"
            type="password"
            rules="min:8"
            text-transform="lowercase"
            :passwordLook="false"
            label="Password"
            class="w-full"
            name="password"
            vid="passwordTekrar"
            id="login_parola"
            @keyup.enter.native="handleSubmit"
          />
          <string-input
            v-model="passwordRe"
            type="password"
            rules="required|min:8|confirmed:passwordTekrar"
            text-transform="lowercase"
            :passwordLook="false"
            label="Re-Password"
            class="w-full"
            name="passwordRe"
            id="login_parola_re"
            @keyup.enter.native="handleSubmit"
          />
          <m-button
            bg-color="mgreen"
            hover-bg-color="mgreen-600"
            :disabled="invalid"
            color="white"
            class="w-full py-4 px-16 mt-4 text-sm"
            @click.native="handleSubmit"
          >
            Register
          </m-button>
        </ValidationObserver>
        <div class="flex w-full flex-row justify-end mt-2">
          <router-link
            class="text-sm text-mblue w-full hover:underline"
            :to="{name: 'UserLogin'}"
          >
            <m-button bg-color="mblue" hover-bg-color="mblue-600" class="w-full py-4 px-16 text-sm">
              Login
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
  name: 'UserCreate',

  components: {
    StringInput
  },

  data() {
    return {
      name: "",
      username: "",
      email: "",
      password: "",
      passwordRe: "",
      modal: {
        type: "",
        title: "",
        text: ""
      }
    }
  },

  methods: {

    ...mapActions({
      'userCreate': 'userCreate'
    }),

    handleSubmit() {
      const token = jwt.sign({
        name: this.name,
        username: this.username,
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

      this.userCreate(data).then(response => {
        this.$modal.show('result', {
          type: "success",
          title: "Successful!",
          text: response.message
        });

        this.$router.push({ name: 'UserLogin', params: { email: this.email }})

      }).catch(err => {
        this.$modal.show('result', {
          type: "error",
          title: "Failed!",
          text: err.message
        });
      })
    }
  }
};
</script>

<style scoped>

</style>
