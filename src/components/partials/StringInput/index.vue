<template>
  <div class="flex flex-col pb-3 md:pb-3">
    <ValidationProvider
      ref="validation"
      v-slot="{ validate, errors }"
      :mode="mode"
      :vid="vid"
      :name="label ? label : name"
      :rules="rules"
      :bails="bails"
      slim
    >
      <label
        v-if="label"
        class="truncate w-full px-2 text-sm text-mgrey-800 mb-1"
        :for="id"
      >
        {{ label }}
      </label>
      <div
        class="border bg-white border-solid relative rounded flex flex-col items-center"
        :class="[errors.length > 0 ? 'border-red-500' : 'border-mblue-100', focused && 'shadow']"
      >
        <textarea
          v-if="type === 'textarea'"
          :id="id"
          ref="input"
          class="relative resize-none bg-transparent px-2 outline-none text-mgrey-800 w-full"
          :disabled="disabled"
          :value="value"
          :placeholder="focused ? placeholder : ''"
          rows="5"
          :tabindex="tabindex"
          @input="enterValue($event) || validate"
          @keyup.enter="submit"
          @focus="setFocused(true)"
          @blur="setFocused(false)"
        />
        <div class="w-full flex flex-row" v-else>
          <label :for="id" class="rounded-l bg-mblue-100 select-none text-mgrey-700 text-xs flex items-center px-2" v-if="route">
            {{ routeText }}
          </label>
          <input
            :id="id"
            ref="input"
            class="leading-none relative bg-transparent py-3 px-2 outline-none text-mgrey-800 w-full"
            :class="[route ? 'flex-1' : 'w-full']"
            :disabled="disabled"
            :type="passwordHidden ? type : 'text'"
            :value="value"
            :placeholder="focused ? placeholder : ''"
            :autocomplete="autoCompleteVal"
            :tabindex="tabindex"
            @input="enterValue($event) || validate"
            @keyup.enter="submit"
            @focus="setFocused(true)"
            @blur="setFocused(false)"
          />
        </div>
        <div
          v-if="(type === 'password' || isPassword) && passwordLook"
          class="absolute cursor-pointer right-0 mr-4 h-full flex items-center"
          @click="passwordHidden = !passwordHidden"
        >
          <span v-if="passwordHidden">
            <ion-icon name="lock-closed-outline"></ion-icon>
          </span>
          <span v-else>
            <ion-icon name="lock-open-outline"></ion-icon>
          </span>
        </div>
      </div>
      <span
        v-if="errors.length > 0"
        class="blink_me absolute error-box block ml-2 text-xsx font-medium text-red-500"
      >
        {{ errors[0] }}
      </span>
    </ValidationProvider>
  </div>
</template>

<script>
export default {
  name: 'StringInput',

  props: {
    name: {
      type: String,
      default: '',
    },
    route: {
      type: Boolean,
      default: false
    },
    routeText: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'aggressive',
    },
    bails: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: [String, Object],
      default: null,
    },
    icon: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      required: false,
      default: null,
    },
    maxLength: {
      type: Number,
      required: false,
      default: null,
    },
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
    autoCompleteVal: {
      type: String,
      required: false,
      default: 'on',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    textTransform: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: null,
    },
    boxStyle: {
      type: String,
      default: 'default',
    },
    type: {
      type: String,
      default: 'text',
    },
    tabindex: {
      type: Number,
      default: null,
    },
    vid: {
      type: String,
      default: '',
    },
    passwordLook: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      focused: false,
      passwordHidden: true,
    };
  },

  computed: {
    isPassword() {
      return !this.passwordHidden;
    },
  },
  methods: {
    submit() {
      this.$emit('enter');
    },
    enterValue(event) {
      let { value } = event.target;

      if (this.maxLength) {
        if (value.length > this.maxLength) {
          return;
        }
      }

      if (this.textTransform) {
        switch (this.textTransform) {
          case 'uppercase':
            value = value.toUpperCase();
            break;
          case 'lowercase':
            value = value.toLowerCase();
            break;
          case 'capitalize':
            value = value
              .split(' ')
              .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
              .join(' ');
            break;
          case 'capitalize-first':
            value = value
              .split(' ')
              .map(
                (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),
              )
              .join(' ');
            break;
        }
      }

      this.$emit('input', value);
    },

    setFocused(val) {
      this.focused = val;
      this.$emit('focus', val);
    },
  },
};
</script>

<style lang="scss" scoped>
.label-top {
  top: 16px;
}

.blink_me {
  animation: blinker 1s linear 3;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
