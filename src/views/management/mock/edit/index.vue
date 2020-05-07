<template lang="html">
  <div class="px-4 pb-6">
    <div class="flex flex-row pb-4 items-center border-b border-mblue-100 mb-4 justify-between">
      <h1 class="text-xl md:text-3xl font-medium md:font-light text-mblue-800">Edit Mock</h1>
      <m-button class="text-3xl w-10 flex items-center justify-center py-1" bg-color="mblue-100" hover-bg-color="mblue-200" @click.native="$router.go(-1)">
        <ion-icon class="text-mblue" name="chevron-back-outline"></ion-icon>
      </m-button>
    </div>
    <ValidationObserver class="flex flex-row flex-wrap" v-slot="{ invalid }" ref="observer">
      <string-input
        v-model="mock.name"
        rules="required"
        label="Mock Name"
        class="w-full md:w-1/2 md:p-2"
        name="name"
        id="login_name"
      />
      <select-box
        v-model="mock.method"
        class="w-full md:w-1/2 md:p-2"
        label="Method"
        rules="required"
        :clearable="false"
        :options="methods"
      />
      <string-input
        v-model="mock.route"
        :route="true"
        :routeText="apiRoute"
        text-transform="lowercase"
        rules="required"
        label="Route"
        class="w-full md:w-1/2 md:p-2"
        name="route"
        id="login_route"
      />
      <select-box
        v-model="mock.response_code"
        class="w-full md:w-1/2 md:p-2"
        label="Response Code"
        rules="required"
        :clearable="false"
        :options="codes"
      />
      <editor
        label="Request"
        v-model="mock.request"
        class="w-full md:w-1/2 md:p-2"
      />
      <editor
        label="Response"
        v-model="mock.response"
        class="w-full md:w-1/2 md:p-2"
        rules="required"
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
          Edit Mock
        </m-button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const jwt = require('jsonwebtoken');
import StringInput from "@/components/partials/StringInput"
import SelectBox from "@/components/partials/SelectBox"
import Editor from "@/components/partials/Editor"

export default {
  name: "MockCreate",

  components: {
    StringInput,
    SelectBox,
    Editor
  },

  data() {
    return {
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
      'mock': 'mock',
      'token': 'token'
    }),

    apiRoute() {
      const decodedToken = jwt.verify(this.token, process.env.VUE_APP_JWT_SECRET);

      return process.env.VUE_APP_API_URL +'/api/'+ decodedToken.username +'/';
    }
  },

  methods: {
    ...mapActions({
      'mockDetail': 'mockDetail',
      'mockEdit': 'mockEdit'
    }),

    handleSubmit() {
      const data = {
        id: this.$route.params.id,
        ...this.mock
      };

      this.mockEdit(data).then((response) => {
        this.$modal.show('result', {
          type: "success",
          title: "Success!",
          text: response.message
        });
      }).catch((err) => {
        this.$modal.show('result', {
          type: "error",
          title: "Failed!",
          text: err.message.message
        });
      });
    }
  },

  mounted() {
    this.mockDetail(this.$route.params.id)
    this.$store.commit('SET_PAGE_NAME', 'MockList');
  }
}
</script>

<style lang="css" scoped>
</style>
