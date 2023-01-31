<template>
  <div>
  <label for="custom-input-number" class="ma-label ma-label-1 ">{{ input.label }}</label>
  <div class="flex items-center">
    <div class="ma-item ma-item-thin">
    <div class="ma-item-buttons">
      <button @click="decr" class="ma-input-range-button ma-input-range-button-left">
        <span class="m-auto font-thin">−</span>
      </button>
      <input
          type="number"
          ref="range"
          class="ma-input-range"
          name="custom-input-number"
          :value="input.value"
      />
      <button @click="incr" class="ma-input-range-button ma-input-range-button-right">
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