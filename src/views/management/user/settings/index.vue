<template lang="html">
  <div class="px-4 pb-6">
    <div class="flex flex-col md:flex-row pb-4 border-b border-mblue-100 mb-4 justify-between">
      <h1 class="text-xl md:text-3xl font-medium md:font-light text-mblue-800 mb-2 md:mb-0">User Settings</h1>
    </div>
    <ValidationObserver
      class="flex flex-row flex-wrap"
      v-slot="{ invalid, reset }"
      ref="observer"
      v-if="completed"
    >
      <string-input
        v-model="user.name"
        rules="required"
        label="Name Surname"
        class="w-full md:p-2"
        name="name"
        id="login_name"
      />
      <string-input
        v-model="user.username"
        rules="required"
        label="User Name"
        class="w-full md:w-1/2 md:p-2"
        name="username"
        id="login_username"
      />
      <string-input
        v-model="user.email"
        rules="required|email"
        label="E-Mail Address"
        class="w-full md:w-1/2 md:p-2"
        name="email"
        id="login_email"
      />
      <string-input
        v-model="user.password"
        rules="min:8"
        type="password"
        label="Password"
        class="w-full md:w-1/2 md:p-2"
        name="password"
        id="login_password"
      />
      <select-box
        v-model="user.locale"
        class="w-full md:w-1/2 md:p-2"
        label="Faker Locale"
        rules="required"
        :clearable="false"
        :options="faker_locales"
        :reduce="locale => locale.key"
      />
      <div class="px-2 w-full">
        <m-button
          bg-color="mblue"
          hover-bg-color="mblue-600"
          :disabled="invalid"
          color="white"
          class="w-full py-4 px-16 mt-4 text-sm"
          @click.native="handleSubmit"
        >
          Edit Settings
        </m-button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const jwt = require('jsonwebtoken');
import StringInput from "@/components/partials/StringInput"
import SelectBox from "@/components/partials/SelectBox"

export default {
  name: "UserSettings",

  components: {
    StringInput,
    SelectBox
  },

  data() {
    return {
      completed: false,
      faker_locales: [
        {
          key: "en",
          label: "English"
        },
        {
          key: "de",
          label: "Deutsch"
        },
        {
          key: "es",
          label: "Espanol"
        },
        {
          key: "tr",
          label: "Türkçe"
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      'user': 'user'
    })
  },

  methods: {
    ...mapActions({
      'userDetail': 'userDetail',
      'userUpdate': 'userUpdate'
    }),

    handleSubmit() {
      const data = {
        name: this.user.name,
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        locale: this.user.locale
      };

      this.userUpdate(data).then((response) => {
        this.$modal.show('result', {
          type: "success",
          title: "Success!",
          text: response.message
        });
      }).catch(err => {
        this.$modal.show('result', {
          type: "error",
          title: "Failed!",
          text: err.message
        });
      }).finally(() => {
        this.$refs.observer.reset()
      })
    }
  },

  created() {
    this.$store.commit('SET_PAGE_NAME', 'UserSettings');

    this.userDetail().then(() => {
      this.completed = true
    });
  }
}
</script>

<style lang="css" scoped>
</style>
