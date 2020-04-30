<template>
  <div class="container bg-mgrey-900 w-full max-w-full h-full min-h-screen flex flex-row-reverse">
    <div class="w-full bg-white flex flex-col h-full min-h-screen items-center justify-center md:w-1/2">
      <div class="flex w-full flex-col items-start max-w-xs">
        <h1 class="text-3xl font-medium">Mock API</h1>
        <p class="font-light mt-2 text-sm mb-8">Create your mock api with faker.js support.</p>
        <router-link
          class="text-sm text-mgreen w-full hover:underline mt-6"
          :to="{name: 'UserLogin'}"
        >
          <m-button bg-color="mgreen" hover-bg-color="mgreen-600" class="w-full py-4 px-16 text-sm">
            Login
          </m-button>
        </router-link>
        <router-link
          class="text-sm text-mblue w-full hover:underline mt-2"
          :to="{name: 'UserCreate'}"
        >
          <m-button bg-color="mblue" hover-bg-color="mblue-600" class="w-full py-4 px-16 text-sm">
            Register
          </m-button>
        </router-link>
        <div class="flex w-full mt-4">
          <a target="_blank" class="flex w-full" href="https://github.com/vskavgaci/mock-client">
            <m-button bg-color="mgrey" hover-bg-color="mgrey-600" class="w-full justify-center py-4 px-16 text-sm flex flex-row items-center">
              <ion-icon class="text-base" name="logo-github"></ion-icon>
              <span class="ml-2">Github Repo</span>
            </m-button>
          </a>
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

export default {
  name: 'Home'
};
</script>

<style scoped>

</style>
