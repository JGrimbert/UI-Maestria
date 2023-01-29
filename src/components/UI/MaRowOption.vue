<template>
  <div
      class="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100"
      @click.native="e => click(e)"
  >
    <div class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
      <div
          class="w-full items-center flex"
      >
        <div class="mx-2 -mt-1 w-1/2 ">
          {{ item[legend[0]] }}
          <div class="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">{{ item[legend[1]] }}</div >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MaRowOption",
  props: {
    item: { type: Object },
    legend: { type: Array },
    outputLegend: { type: Number, default: 0 }
  },
  methods: {
    click (e) {
      e.stopImmediatePropagation();
      this.$emit('select', {
        value: this.item[this.legend[this.outputLegend]],
        _id: this.item._id,
        index: this.item.index,
      })
    }
  }
}
</script>

<style scoped>

</style>