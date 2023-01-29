<template>
  <div>
    <label
        for="selectSearchLabel"
        v-if="input.label"
        class="ma-label ma-label-1"
    >{{ input.label }}
    </label>
    <div class="flex">
    <div class="flex flex-col flex-1" v-click-outside="onClickOutside">
      <div class="ma-input">
        <div class="flex">
          <div class="relative ma-search flex-1">
            <input
                type="text"
                id="selectSearchLabel"
                :name="input.ref"
                ref="input"
                class=" text-sm"
                @input="e => updateInput(e)"
                @focus="focus"
                :value="input.value"
            >
<!--            <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
              <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </div>-->
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col items-center"
           v-if="search && founded.length"
      >
        <div class="w-full">
          <div class="flex flex-col items-center relative">
            <div class="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto  mt-1">
              <div class="">
                <MaRowOption
                    v-for="(item, key) in founded"
                    :item="item"
                    :legend="liste.keys"
                    :output-legend="liste.outputLegend"
                    :key="key"
                    @select="e => select(e)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import MaRowOption from "@/components/MaRowOption.vue";
import fuzzysort from "fuzzysort";
import vClickOutside from "click-outside-vue3";

export default {
  name: "MaSelectSearch",
  emits: ["updateInput"],
  directives: {
    clickOutside: vClickOutside.directive
  },
  components: {MaRowOption},
  data: () => ({
    search: false,
    searched: "",
  }),
  props: {
    liste: { type: Object },
    input: { type: Object },
    niveau: { type: Number, default: 2 }
  },
  computed: {
    founded () {
      return this.searched.length === 0
          ? this.liste.choix
          : fuzzysort.go(this.searched, this.liste.choix, {
              keys: this.liste.keys,
              limit: 20
            }).map(e => e.obj);
    }
  },
  methods: {
    onClickOutside (event) {
      this.search = false;
    },
    updateInput (e) {
      this.$emit('updateInput',{
        ref: e.target.name,
        value: this.$refs.input.value,
        _id: e.target._id,
        index: e.target.index,
        maj: false,
      });
      this.search = true;
      this.searched = this.$refs.input.value;
    },
    select (e) {
      this.$refs.input.value = e.value;
      this.updateInput({
        target: {
          name: this.input.ref,
          _id: e._id,
          index: e.index
      }})
      this.blur();
    },
    focus () {
      this.search = true;
      this.searched = "";
    },
    blur () {
      this.search = false;
    },
  },
}
</script>

<style scoped>

</style>