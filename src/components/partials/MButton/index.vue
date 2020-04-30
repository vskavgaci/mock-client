<template>
  <button :class="classes" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>

<script>
export default {
  name: "MButton",

  props: {
    buttonType: {
      type: String,
      default: "default"
    },
    type: {
      type: String,
      default: "button"
    },
    bgColor: {
      type: String,
      default: "transparent"
    },
    hoverBgColor: {
      type: String,
      default: null
    },
    borderSize: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: "white"
    },
    hoverColor: {
      type: String,
      default: ""
    },
    rounded: {
      type: String,
      default: ""
    },
    borderColor: {
      type: String,
      default: ""
    },
    hoverBorderColor: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes() {
      let classNames = [
        "outline-none",
        "focus:outline-none",
        "font-medium",
        "mt-0",
        "transition-all",
        "duration-300"
      ]

      if (this.borderSize > 0) {
        classNames.push("border-" + this.borderSize)
        if (!this.borderColor) {
          classNames.push("border-" + this.color)
        } else {
          classNames.push("border-" + this.borderColor)
        }
      }

      if (this.disabled) {
        classNames.push("bg-" + this.bgColor +"-400")

        if (this.hoverBgColor) {
          classNames.push("hover:bg-" + this.hoverBgColor +"-500")
        }
      } else {
        classNames.push("bg-" + this.bgColor)

        if (this.hoverBgColor) {
          classNames.push("hover:bg-" + this.hoverBgColor)
        }
      }

      if (this.color) {
        classNames.push("text-" + this.color)
      }

      if (this.rounded) {
        classNames.push("rounded-" + this.rounded)
      }else {
        classNames.push("rounded")
      }

      if (this.hoverColor) {
        classNames.push("hover:text-" + this.hoverColor)
      }

      if (this.hoverBorderColor) {
        classNames.push("hover:border-" + this.hoverBorderColor)
      }

      classNames.push("leading-none")

      return classNames
    }
  }
}
</script>

<style lang="css" scoped></style>
