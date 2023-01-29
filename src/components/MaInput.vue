<template>
  <label>{{ input.label }}</label>
  <input
      type="text"
      :value="input.value"
      :name="input.ref"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      @input="(e) => updateInput(e)"
  >
  <div v-if="input.validator.warn" class="text-red-400 mb-2">
    {{ input.validator.messageWarning }}
  </div>
</template>

<script>
export default {
  name: "MaInput",
  emits: ["updateInput"],
  props: {
    input: { type: Object }
  },
  methods: {
    updateInput (e) {
      this.$emit("updateInput", {
        ref: e.target.name,
        value: e.target.value,
        validator: this.input.validator,
      })
    }
  }
}
</script>

<style scoped>

</style>