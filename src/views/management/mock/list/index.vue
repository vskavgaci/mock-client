<template lang="html">
  <div class="px-4">
    <div class="flex flex-col md:flex-row pb-4 border-b border-mblue-100 mb-4 justify-between">
      <h1 class="text-xl md:text-3xl font-medium md:font-light text-mblue-800 mb-2 md:mb-0">Mock List</h1>
      <input
        class="rounded font-light focus:shadow focus:outline-none px-2 py-2 md:w-64"
        type="text"
        name=""
        v-model="query"
        placeholder="Search in mocks"
      >
    </div>
    <div class="flex flex-col">
      <table class="border-collapse text-sm md:text-base border-mgrey-500" v-if="filteredMocks.length > 0">
        <thead>
          <tr class="select-none">
            <th class="text-left pb-2 font-normal"></th>
            <th
              class="text-left pb-2 cursor-pointer font-normal flex-1 md:w-1/3 px-4"
              @click="handleSortBy(sortBy === 'name-asc' ? 'name-desc' : 'name-asc')"
            >
              <div class="flex flex-row justify-between items-center">
                <span>Mock Name</span>
                <ion-icon name="caret-down-outline" v-if="sortBy === 'name-asc'"></ion-icon>
                <ion-icon name="caret-up-outline" v-else-if="sortBy === 'name-desc'"></ion-icon>
              </div>
            </th>
            <th
              class="hidden md:table-cell text-left pb-2 cursor-pointer font-normal px-4"
              @click="handleSortBy(sortBy === 'method-asc' ? 'method-desc' : 'method-asc')"
            >
              <div class="flex flex-row justify-between items-center">
                <span>Method</span>
                <ion-icon name="caret-down-outline" v-if="sortBy === 'method-asc'"></ion-icon>
                <ion-icon name="caret-up-outline" v-else-if="sortBy === 'method-desc'"></ion-icon>
              </div>
            </th>
            <th
              class="hidden md:table-cell text-left pb-2 cursor-pointer font-normal px-4"
              @click="handleSortBy(sortBy === 'response_code-asc' ? 'response_code-desc' : 'response_code-asc')"
            >
              <div class="flex flex-row justify-between items-center">
                <span>Code</span>
                <ion-icon name="caret-down-outline" v-if="sortBy === 'response_code-asc'"></ion-icon>
                <ion-icon name="caret-up-outline" v-else-if="sortBy === 'response_code-desc'"></ion-icon>
              </div>
            </th>
            <th
              class="hidden md:table-cell text-left pb-2 cursor-pointer font-normal px-4"
              @click="handleSortBy(sortBy === 'date-asc' ? 'date-desc' : 'date-asc')"
            >
              <div class="flex flex-row justify-between items-center">
                <span>Date</span>
                <ion-icon name="caret-down-outline" v-if="sortBy === 'date-asc'"></ion-icon>
                <ion-icon name="caret-up-outline" v-else-if="sortBy === 'date-desc'"></ion-icon>
              </div>
            </th>
            <th
              class="hidden md:table-cell text-left pb-2 cursor-pointer font-normal px-4"
              @click="handleSortBy(sortBy === 'count-asc' ? 'count-desc' : 'count-asc')"
            >
              <div class="flex flex-row justify-between items-center">
                <span>Views</span>
                <ion-icon name="caret-down-outline" v-if="sortBy === 'count-asc'"></ion-icon>
                <ion-icon name="caret-up-outline" v-else-if="sortBy === 'count-desc'"></ion-icon>
              </div>
            </th>
            <th class="text-left pb-2 font-normal"></th>
          </tr>
        </thead>
        <tbody class="bg-white rounded">
          <tr v-for="(item, index) in filteredMocks">
            <td class="border font-light border-mblue-100 px-4 py-2 text-gray-800">{{ index+1 }}</td>
            <td class="border font-light border-mblue-100 px-4 py-2 text-gray-800">{{ item.name }}</td>
            <td class="hidden md:table-cell border font-light border-mblue-100 px-4 py-2 text-gray-800">{{ item.method }}</td>
            <td class="hidden md:table-cell border font-light border-mblue-100 px-4 py-2 text-gray-800">{{ item.response_code }}</td>
            <td class="hidden md:table-cell border font-light border-mblue-100 px-4 py-2 text-gray-800">{{ new Date(item.date) | moment("Do MMMM YYYY HH:mm") }}</td>
            <td class="hidden md:table-cell border font-light border-mblue-100 px-4 py-2 text-gray-800">{{ item.count }}</td>
            <td class="border font-light border-mblue-100 px-4 py-2 text-gray-800">
              <input type="text" :class="'absolute top-0 left-0 invisible opacity-0 route-'+ item._id" :value="routeUrl(item.route)">
              <router-link :to="{ name: 'MockEdit', params: {id: item._id }}">
                <m-button bg-color="mblue-500" hover-bg-color="mblue-700" class="p-1 mr-1 md:p-2 md:mr-2" title="Edit Mock">
                  <ion-icon name="create-outline"></ion-icon>
                </m-button>
              </router-link>
              <m-button bg-color="red-500" hover-bg-color="red-700" class="p-1 mr-1 md:p-2 md:mr-2" title="Delete Mock" @click.native="handleDeleteMock(item._id)">
                <ion-icon name="trash-outline"></ion-icon>
              </m-button>
              <a target="_blank" :href="routeUrl(item.route)">
                <m-button bg-color="mgreen-500" hover-bg-color="mgreen-700" class="p-1 mr-1 md:p-2 md:mr-2" title="Copy Route">
                <!-- <m-button bg-color="mgreen-500" hover-bg-color="mgreen-700" class="p-1 mr-1 md:p-2 md:mr-2" title="Copy Route" @click.native="copyText(item._id)"> -->
                  <ion-icon name="copy-outline"></ion-icon>
                </m-button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="text-center py-6 font-light text-xl" v-else>
        Mock list is empty
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
var moment = require('moment');
const jwt = require('jsonwebtoken');

export default {
  name: "MockList",

  data() {
    return {
      query: "",
      sortBy: "date-desc"
    }
  },

  computed: {
    ...mapGetters({
      'mocks': 'mocks',
      'token': 'token'
    }),

    filteredMocks() {
      const sortName = this.sortBy.split("-")[0]
      const sortType = this.sortBy.split("-")[1]

      const list = this.mocks.filter(e => e.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1 || e.route.toLowerCase().indexOf(this.query.toLowerCase()) > -1 || e.method.toLowerCase().indexOf(this.query.toLowerCase()) > -1 || e.date.toLowerCase().indexOf(this.query.toLowerCase()) > -1)

      list.sort((a, b) => {
        if(sortName === 'date') {
          const aDate = new Date(a.date)
          const bDate = new Date(b.date)

          if (aDate < bDate) {
            return sortType === 'asc' ? -1 : 1;
          } else {
            return sortType === 'asc' ? 1 : -1;
          }
        } else if(sortName === 'count') {
          if (a[sortName] < b[sortName]) {
            return sortType === 'asc' ? -1 : 1;
          } else {
            return sortType === 'asc' ? 1 : -1;
          }
        } else {
          if (a[sortName].toLowerCase() < b[sortName].toLowerCase()) {
            return sortType === 'asc' ? -1 : 1;
          } else {
            return sortType === 'asc' ? 1 : -1;
          }
        }
      })

      return list;
    }
  },

  methods: {
    ...mapActions({
      'mockList': 'mockList',
      'mockDelete': 'mockDelete'
    }),

    dateConvert(date) {
      const dateObject = new Date(date);
      return dateObject;
    },

    copyText(id) {
      var copyText = document.querySelector(".route-"+ id);
      navigator.clipboard.writeText(copyText.value);
      this.$notify({
        group: 'notification',
        text: `<div class="flex items-center">
          <ion-icon class="text-xl" name="checkmark-outline"></ion-icon>
          <span class="pl-2">Endpoint copied to clipboard.</span>
        </div>`,
        duration: 700
      });
    },

    routeUrl(route) {
      const decodedToken = jwt.verify(this.token, process.env.VUE_APP_JWT_SECRET);

      return process.env.VUE_APP_API_URL +'/api/'+ decodedToken.username +'/'+ route;
    },

    handleDeleteMock(id) {
      this.$modal.show('dialog', {
        title: 'Delete Mock!',
        text: 'Are you sure?',
        buttons: [
          {
            title: 'Delete Please',
            handler: () => {
              this.deleteMock(id)
              this.$modal.hide("dialog")
            }
          },
          {
            title: 'Cancel'
          }
        ]
      })
    },

    deleteMock(id) {
      this.mockDelete(id)
    },

    handleSortBy(val) {
      this.sortBy = val;
    }
  },

  async mounted() {
    this.$store.commit('SET_PAGE_NAME', 'MockList');
    this.mockList();
  }
}
</script>

<style lang="css" scoped>
</style>
