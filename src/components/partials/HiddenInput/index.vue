<template>
  <div class="flex flex-col">
    <ValidationProvider
      ref="validation"
      v-slot="{ validate, errors }"
      :name="name ? name : label"
      :rules="rules"
      slim
    >
      <div class="">
        <input ref="input" type="hidden" :value="value" />
      </div>
      <span v-if="errors.length > 0" class="blink_me absolute error-box block ml-2 text-xsx font-medium text-red-500">
        {{ errors[0] }}
      </span>
    </ValidationProvider>
  </div>
</template>

<script>

export default {
  name: "HiddenInput",

  props: {
    name: {
      type: String,
      default: ""
    },
    rules: {
      type: [String, Object],
      default: null
    },
    value: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: String,
      default: null
    }
  },

  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

.blink_me {
  animation: blinker 1s linear 3;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
