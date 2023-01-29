<template>
    <svg
        id="svg"
        width="50%"
        :viewBox="viewbox"
        preserveAspectRatio="xMidYMid meet"
        style="background-color:white"
        class="rounded inline"
    >

      <line :x1="0" :y1="ij.y/2" :x2="ijxMax" :y2="ij.y/2" class="rep"/>
      <line :x1="0" :y1="ij.y" :x2="ijxMax" :y2="ij.y" class="rep"/>
      <line :x1="0" :y1="0" :x2="ijxMax" :y2="0" class="rep"/>

      <line :x1="0" :y1="0" :x2="0" :y2="ij.y" class="rep"/>
      <line :x1="ijxMax" :y1="0" :x2="ijxMax" :y2="ij.y" class="rep"/>

      <line :x1="0" :y1="ijy" :x2="ijxMax" :y2="ijy"/>
      <line :x1="0" :y1="ijy*3" :x2="ijxMax" :y2="ijy*3"/>

      <line :x1="ijx" y1="0" :x2="ijx" :y2="ij.y"/>
      <line :x1="ijx*2" y1="0" :x2="ijx*2" :y2="ij.y"/>
      <line :x1="ijx*3" y1="0" :x2="ijx*3" :y2="ij.y"/>

      <path :d="courbe(100, min, max)" stroke="red"/>
    </svg>
    <div class="inline">
      <input type="range" class="mx-auto"/>
    </div>
</template>

<script>
export default {
  name: "MaFonction",
  data: () => ({
    ij: { x: -400, y: 200 },
    baseY: 2
  }),
  methods: {

    courbe ( n, min, max ) {

      const dx = (min.x - max.x) / n;

      const xy = Array.from({ length:n}).map((e, idx) => {

        const x = min.x + idx * dx;
        const y = Math.sin(x);

        return { x, y }

      });

      return this.ligne (n, xy, min, max);

    },

    ligne (n, xy, min, max) {
      return xy.reduce((acc, cur, idx, t) => {
        if(t[idx+1]) {
          const x1 = t[idx].x;
          const x2 = t[idx + 1]?.x;

          const y1 = t[idx].y;
          const y2 = t[idx + 1]?.y;

          const M = [
            Math.round((this.ij.x + 1) * (x1 - min.x) / (max.x - min.x)),
            Math.round((this.ij.y + 1) * (max.y - y1) / (max.y - min.y))
          ]

          const L = [
            Math.round((this.ij.x + 1) * (x2 - min.x) / (max.x - min.x)),
            Math.round((this.ij.y + 1) * (max.y - y2) / (max.y - min.y))
          ]

          return acc + "M " + M[0] + "," + M[1] + " " + L[0] + "," + L[1] + " "
        }
        return acc
      }, "")
    },
  },
  computed: {
    ijx () {
      return Math.abs(this.ij.x / 4);
    },
    ijy () {
      return Math.abs(this.ij.y / 4);
    },
    ijxMax () {
      return Math.abs(this.ij.x)
    },
    viewbox () {
      return `0 -2 ${Math.abs(this.ij.x)} ${this.ij.y+5}`
    },
    min () {
      return { x: 0, y:-this.baseY };
    },
    max () {
      return { x:Math.PI*4, y:this.baseY };
    }
  }
}
</script>

<style scoped>
  svg {
    border: 1em white solid;
  }

  line {
    stroke: #ccc;
  }
  path, line {
    stroke-width: 2px;
  }
  .rep {
    stroke: #797979;
  }
</style>