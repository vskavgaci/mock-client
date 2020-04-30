<template lang="html">
  <div class="flex flex-col pb-3 md:pb-3">
    <label
      v-if="label"
      class="truncate w-full px-2 text-sm text-mgrey-800"
      :for="id"
    >
      {{ label }}
    </label>
    <div
      class="border w-full mt-1"
      :class="[!isJSONValid ? 'border-red-500' : 'border-mblue-100']"
    >
      <MonacoEditor
        height="300"
        theme="vs"
        language="json"
        :options="options"
        @change="onChange"
        :value="value"
      />
    </div>
    <hidden-input
      v-model="inputValue"
      :label="label"
      :rules="rules"
    />
  </div>
</template>

<script>
import MonacoEditor from 'monaco-editor-vue';
import HiddenInput from '@/components/partials/HiddenInput';

export default {
  name: "Editor",

  components: {
    MonacoEditor,
    HiddenInput
  },

  data() {
    return {
      options: {},
      isJSONValid: true
    }
  },

  computed: {
    inputValue() {
      return this.isJSONValid ? 'done' : ''
    }
  },

  props: {
    name: {
      type: String,
      default: '',
    },
    id: {
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
    rules: {
      type: [String, Object],
      default: ''
    }
  },

  methods: {
    onChange(value) {
      this.$emit("input", value);

      try {
        const parsed = JSON.parse(value);
        this.isJSONValid = true;
      } catch {
        this.isJSONValid = (this.rules.indexOf("required") === -1 && value === "") ? true : false;
      }
    }
  },
}
</script>

<style lang="css" scoped>
</style>
