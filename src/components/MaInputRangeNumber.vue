<template>
  <div>
  <label for="custom-input-number" class="ma-label ma-label-1 ">{{ input.label }}</label>
  <div class="flex items-center">
    <div class="ma-item flex-none w-24">
    <div class="flex flex-row h-8 rounded-lg relative bg-transparent mt-1 shadow-sm">
      <button @click="decr" class="ma-input-range-button rounded-l">
        <span class="m-auto font-thin">−</span>
      </button>
      <input
          type="number"
          ref="range"
          class="ma-input-range"
          name="custom-input-number"
          :value="input.value"
      />
      <button @click="incr" class="ma-input-range-button rounded-r">
        <span class="m-auto font-thin">+</span>
      </button>
    </div>
  </div>
    <slot ></slot>
  </div>
  </div>
</template>

<script>
export default {
  name: "MaInputRangeNumber",
  emits: ["updateInput"],
  props: {
    input: { type: Object }
  },
  methods: {
    incr (e) {
      e.preventDefault()
      this.$emit("updateInput",{
        ref: this.input.ref,
        value: parseInt(this.$refs.range.value)+1,
      });
    },
    decr (e) {
      e.preventDefault()
      this.$emit("updateInput",{
        ref: this.input.ref,
        value: parseInt(this.$refs.range.value)-1,
      });
    }
  }
}
</script>

<style scoped>

</style>