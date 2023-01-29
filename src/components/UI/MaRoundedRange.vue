<template>
  <div class="flex pl-2 pt-1">
    <div ref="roundedRange"></div>
    <div class="text-center flex-none w-6"> </div>
    <div class="angle">{{ angleDeg }}{{ input.sufix }}</div>
  </div>
</template>

<script>
import { Slider } from '@/roundedSlider'
export default {
  name: "MaRoundedRange",
  emits: ["updateInput"],
  props: {
    input: { type: Object }
  },
  data: () => ({
    angle: 0,
    slider: {},
    initial:{
      radius: 10,
      step: 10,
      initialValue: 0,
      color: '#D8D8D8',
      displayName: 'Value 3'
    },
  }),
  methods: {
    handleRangeChange (e) {
      this.angle = e;
      this.$emit('updateInput', {
        ref: this.input.ref,
        value: e,
      })
    }
  },
  computed: {
    init () {
      return {
        ...this.initial,
        min: this.input.min,
        max: this.input.max,
      }
    },
    angleDeg () {
      return Math.round( this.angle*180/Math.PI )
    }
  },
  mounted () {
    this.slider = new Slider(this.init, this.$refs.roundedRange, this.handleRangeChange)
    this.slider.draw()
  }
}
</script>

<style scoped>
  .angle {
    position: absolute;
    right: 0px;
    top:12px;
  }
</style>