<template>
  <div class="ma-item">
    <label for="idInput" class="ma-label ma-label-1">Position départ</label>
    <div class="flex">
      <div class="ma-input-group mt-1">
        <span class="">XY</span>
        <template v-for="(input, key) in inputs.inputs">
          <input
              v-if="input"
              :type="input && input.type"
              id="idInput"
              :name="input && input.ref"
              :value="input && input.value"
              @input="(e) => updateInput(e)"
          />
        </template>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MaInputGroup",
  props: {
    inputs: { type: Object }
  },
  methods: {
    updateInput (e) {
      this.$emit("updateInput", {
        type: "group",
        refGroup: this.inputs.refGroup,
        ref: e.target.name,
        value: e.target.value,
      })
    }
  },
  mounted() {
    Object.values(this.inputs.inputs).forEach(e => this.updateInput({
      target: { name: e.ref, value: e.value, }
    }))
  }
}
</script>

<style scoped>

</style>