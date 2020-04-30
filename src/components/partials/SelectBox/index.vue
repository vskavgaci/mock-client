<template>
  <div class="flex pb-3 md:pb-3">
    <ValidationProvider
      ref="validation"
      v-slot="{ validate, errors }"
      class="w-full"
      :mode="mode"
      :name="name ? name : label"
      :rules="rules"
      slim
    >
      <label
        v-if="label"
        class="truncate w-full px-2 text-sm text-mgrey-800"
      >
        {{ label }}
      </label>
      <div
      class="border bg-white py-2 border-solid relative rounded flex flex-col items-center mt-1"
      :class="[errors.length > 0 ? 'border-red' : focused ? 'shadow border-mblue-200' : 'border-mblue-100']"
      >
        <v-select
          ref="vueSelect"
          :tabindex="tabindex"
          class="relative resize-none bg-transparent px-2 outline-none text-mgrey-900 w-full"
          :value="value"
          :clearable="clearable"
          :reduce="reduce"
          :options="options"
          @search:blur="setFocused(false)"
          @search:focus="setFocused(true)"
          @input="setSelected"
        >
          <div slot="no-options">
            Eşleşen kayıt bulunamadı!
          </div>
        </v-select>
      </div>
      <span
        v-if="errors.length > 0"
        class="blink_me absolute error-box block mt-1 ml-2 text-xsx font-medium text-red-500"
      >
        {{ errors[0] }}
      </span>
    </ValidationProvider>
  </div>
</template>

<script>
import vSelect from "vue-select"

export default {
  name: "SelectBox",

  components: {
    vSelect
  },

  props: {
    name: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      default: "aggressive"
    },
    value: {
      type: [String, Object, Number],
      default: null
    },
    options: {
      type: [Array, Object],
      default: function() {
        return []
      }
    },
    label: {
      type: String,
      default: ""
    },
    rules: {
      type: String,
      default: ""
    },
    tabindex: {
      type: Number,
      default: null
    },
    clearable: {
      type: Boolean,
      default: true
    },
    reduce: {
      type: [Function, String],
      default: val => val
    }
  },

  data() {
    return {
      focused: false
    }
  },

  mounted() {

  },

  methods: {
    setSelected(val) {
      this.$emit("input", val)
    },

    setFocused(val) {
      this.focused = val
      this.$emit("focus", val)
    }
  }
}
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
@import "@/assets/css/variables.scss";

.vs__actions {
  display: flex;
  justify-content: flex-end;
  line-height: 1;
  padding: 10px 6px 0 3px !important;
}

.vs__dropdown-toggle {
  border: 0 !important;
  padding-bottom: 0 !important;
}

.vs__selected-options {
  height: 26px;
  line-height: 26px;
  padding-left: 0;
}

.vs__selected {
  padding: 0 0 0 0 !important;
  margin: 0 0 0 0 !important;
  font-weight: 400;
  border: 0;
  line-height: 1;

  &:focus {
    margin: 0 0 0 0 !important;
  }
}

.vs--single.vs--open .vs__selected {
  position: relative;
}

.vs__search {
  padding: 0 0 0 0 !important;
  margin: 0 0 0 0 !important;
  line-height: 1;

  &:focus {
    margin: 0 0 0 0 !important;
  }
}

.vs__actions {
  //padding: 0 0 0 0 !important;
  position: absolute;
  right: 16px;
}

.vs__dropdown-menu {
  width: calc(100% + 2px) !important;
  margin-left: -1px !important;
  margin-top: -6px;
  border-color: $mblue-200 !important;
  min-width: auto;
}
.label-top {
  top: 21px;
}

.blink_me {
  animation: blinker 1s linear 3;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

.vs__clear, .vs__open-indicator {
  fill: $mblue;
}

.vs__dropdown-option--highlight {
  background: $mblue !important;
}
</style>
