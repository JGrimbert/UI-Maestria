<template>
  <div>
    <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
           type="checkbox"
           value=""
           :name="input.ref"
           :checked="input.value"
           @input="(e) => updateInput(e)"
           :id="'flexCheckDefault'+input.ref"
    >
    <label class="form-check-label inline-block text-gray-800" :for="'flexCheckDefault'+input.ref">
      {{ input.label }}
    </label>
  </div>
</template>

<script>
export default {
  name: "MaCheckbox",
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
  label {
    top: -0.28rem;
  }
</style>