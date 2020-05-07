<template lang="html">
  <div class="px-4 pb-6">
    <div class="flex flex-col md:flex-row pb-4 border-b border-mblue-100 mb-4 justify-between">
      <h1 class="text-xl md:text-3xl font-medium md:font-light text-mblue-800 mb-2 md:mb-0">Create Mock</h1>
    </div>
    <ValidationObserver class="flex flex-row flex-wrap" v-slot="{ invalid }" ref="observer">
      <string-input
        v-model="name"
        rules="required"
        label="Mock Name"
        class="w-full md:w-1/2 md:p-2"
        name="name"
        id="login_name"
      />
      <select-box
        v-model="method"
        class="w-full md:w-1/2 md:p-2"
        label="Method"
        rules="required"
        :clearable="false"
        :options="methods"
      />
      <string-input
        v-model="route"
        :route="true"
        :routeText="apiRoute"
        text-transform="lowercase"
        rules="required|alpha"
        label="Route"
        class="w-full md:w-1/2 md:p-2"
        name="route"
        id="login_route"
      />
      <select-box
        v-model="response_code"
        class="w-full md:w-1/2 md:p-2"
        label="Response Code"
        rules="required"
        :clearable="false"
        :options="codes"
      />
      <editor
        label="Request"
        v-model="request"
        class="w-full md:w-1/2 md:p-2"
      />
      <editor
        label="Response"
        rules="required"
        v-model="response"
        class="w-full md:w-1/2 md:p-2"
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
          Create Mock
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
import Editor from "@/components/partials/Editor"

export default {
  name: "MockEdit",

  components: {
    StringInput,
    SelectBox,
    Editor
  },

  data() {
    return {
      name: "",
      method: "GET",
      route: "",
      request: "",
      response: "",
      response_code: "200",
      methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'PATCH'
      ],
      codes: [
        '200',
        '400',
        '401',
        '404',
        '500',
      ],
      options: []
    }
  },

  computed: {
    ...mapGetters({
      'token': 'token'
    }),

    apiRoute() {
      const decodedToken = jwt.verify(this.token, process.env.VUE_APP_JWT_SECRET);

      return process.env.VUE_APP_API_URL +'/api/'+ decodedToken.username +'/';
    }
  },

  methods: {
    ...mapActions({
      'mockCreate': 'mockCreate'
    }),

    handleSubmit() {
      const data = {
        name: this.name,
        route: this.route,
        method: this.method,
        response_code: this.response_code,
        request: this.request,
        response: this.response
      };

      this.mockCreate(data).then((response) => {
        this.$modal.show('result', {
          type: "success",
          title: "Success!",
          text: response.message
        });
      }).catch((err) => {
        this.$modal.show('result', {
          type: "error",
          title: "Failed!",
          text: err.message
        });
      });
    }
  },

  mounted() {
    this.$store.commit('SET_PAGE_NAME', 'MockCreate');
  }
}
</script>

<style lang="css" scoped>
</style>
