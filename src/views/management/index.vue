<template lang="html">
  <div class="container mx-auto flex flex-col md:flex-row md:pt-8">
    <div class="w-full md:w-64 flex flex-col md:sticky top-0">
      <div class="logo text-mblue">
        <ion-icon name="cog-outline"></ion-icon>
      </div>
      <ul class="text-base pb-2 p-4 md:p-0">
        <li class="mb-2" >
          <router-link
            class="py-2 px-4 text-mblue-700 select-none flex md:inline-flex items-center rounded md:rounded-lg"
            :class="[pageName === 'MockList' ? 'bg-mblue-100' : 'hover:text-mblue-300']"
            :to="{ name: 'MockList', params: {} }"
          >
            <ion-icon
              class="text-xl hydrated"
              name="list-outline"
              :class="[pageName === 'MockList' && 'text-mblue-600 hydrated']"
            />
            <span class="pl-2 font-light">Mock List</span>
          </router-link>
        </li>
        <li class="mb-2">
          <router-link
            class="py-2 px-4 text-mblue-700 select-none flex md:inline-flex items-center rounded md:rounded-lg"
            :class="[pageName === 'MockCreate' ? 'bg-mblue-100' : 'hover:text-mblue-300']"
            :to="{ name: 'MockCreate', params: {} }"
          >
            <ion-icon
              class="text-xl hydrated"
              name="create-outline"
              :class="[pageName === 'MockCreate' && 'text-mblue-600 hydrated']"
            />
            <span class="pl-2 font-light">Create Mock</span>
          </router-link>
        </li>
        <li class="mb-2">
          <router-link
            class="py-2 px-4 text-mblue-700 select-none flex md:inline-flex items-center rounded md:rounded-lg"
            :class="[pageName === 'UserSettings' ? 'bg-mblue-100' : 'hover:text-mblue-300']"
            :to="{ name: 'UserSettings', params: {} }"
          >
            <ion-icon
              class="text-xl hydrated"
              name="settings-outline"
              :class="[pageName === 'UserSettings' && 'text-mblue-600 hydrated']"
            />
            <span class="pl-2 font-light">User Settings</span>
          </router-link>
        </li>
        <li class="mb-2">
          <button
            type="button"
            class="text-left select-none rounded md:rounded-lg focus:outline-none cursor-pointer py-2 px-4 text-mblue-700 inline-flex items-center hover:text-mblue-300"
            @click="handleLogout"
          >
            <ion-icon class="text-xl" name="exit-outline"></ion-icon>
            <span class="pl-2 font-light">Logout</span>
          </button>
        </li>
      </ul>
    </div>
    <div class="flex-1 px-4 md:p-0 md:pt-8">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Management",

  computed: {
    ...mapGetters({
      'pageName': 'pageName'
    })
  },

  methods: {
    logout: function () {
      this.$store.dispatch("userLogout")
      .then(() => {
        this.$router.push({ name: 'UserLogin'})
      })
    },

    handleLogout() {
      this.$modal.show('dialog', {
        title: 'Logout!',
        text: 'Are you sure?',
        buttons: [
          {
            title: 'Logout Please',
            handler: () => {
              this.logout()
              this.$modal.hide("dialog")
            }
          },
          {
            title: 'Cancel'
          }
        ]
      })
    }
  }
}
</script>

<style lang="css" scoped>
.logo {
  font-size: 124px;
  padding: 0 0 16px 16px;
  display: flex;
}
</style>
