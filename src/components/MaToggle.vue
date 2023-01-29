<template>
  <label class="relative inline-flex items-center ml-5 mt-0 cursor-pointer">
    <input
        type="checkbox"
        value=""
        :name="input.ref"
        :checked="input.value"
        @input="(e) => updateInput(e)"
        class="sr-only peer"
    >
    <div class="ma-toggle bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white  peer-checked:bg-blue-600"></div>
    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{ input.label }}</span>
  </label>
</template>

<script>
export default {
  name: "MaToggle",
  props: {
    input: { type: Object }
  },
  methods: {
    updateInput (e) {
      this.$emit("updateInput", {
        ref: e.target.name,
        value: e.target.checked,
      })
    }
  }

}
</script>

<style scoped>

</style>