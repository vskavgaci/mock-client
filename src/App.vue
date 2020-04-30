<template>
  <div id="app">
    <router-view/>
    <modal
      name="result"
      class="flex items-center justify-center"
      height="auto"
      :adaptive="true"
      @before-open="beforeOpen"
    >
      <div class="py-16 px-16 flex flex-col items-center">
        <h2
          class="text-xl font-medium mb-2"
          :class="[modal.type === 'success' ? 'text-mgreen' : 'text-red-600']"
        >
          {{ modal.title }}
        </h2>
        <p class="mb-4 text-center text-mgrey-900">{{ modal.text }}</p>
      </div>
    </modal>
    <v-dialog />
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true" />
    <notifications group="notification" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: "App",

    data() {
      return {
        modal: {
          type: "",
          title: "",
          text: ""
        }
      }
    },

    computed: {
      ...mapGetters({
        'current_requests': 'current_requests'
      }),

      isLoading() {
        return this.current_requests.length > 0
      }
    },

    methods: {
      beforeOpen(event) {
        this.modal.type = event.params.type,
        this.modal.title = event.params.title,
        this.modal.text = event.params.text
      },
    }
  }
</script>

<style lang="scss">
@import "assets/css/main.css";

.vue-notification-group {
  width: 100% !important;
  display: flex !important;
  right: auto !important;
  top: 32px !important;

  > span {
    width: 100% !important;
  }

  .vue-notification-wrapper {
    width: 100% !important;
    max-width: 1200px !important;
    margin: 0 auto !important;

    .vue-notification {
      background: #2AB768;
      border: 1px solid #26A55E;
      border-radius: 4px;
    }
  }

  .notification-title {
    font-size: 16px;
  }

  .notification-content {
    font-size: 16px;
  }
}

</style>
