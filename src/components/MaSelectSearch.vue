<template>
  <div>
    <label v-if="input.label" for="selectSearchLabel" class="ma-label ma-label-1">
      {{ input.label }}
    </label>
    <div class="flex">
      <div v-click-outside="onClickOutside" class="ma-dropdown-wrapper">
        <div class="ma-input">
          <div class="flex">
            <div class="relative ma-search flex-1">
              <input
                id="selectSearchLabel"
                ref="input"
                type="text"
                :name="input.ref"
                class="text-sm"
                :value="input.value"
                @input="(e) => updateInput(e)"
                @focus="focus"
              />
              <!--            <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
              <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </div>-->
            </div>
          </div>
        </div>
        <div v-if="search && founded.length" class="ma-dropdown-options">
          <div class="ma-dropdown-options-wrapper">
            <MaRowOption
              v-for="(item, key) in founded"
              :key="key"
              :item="item"
              :legend="liste.keys"
              :output-legend="liste.outputLegend"
              @select="(e) => select(e)"
            />
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'click-outside-vue3'
import fuzzysort from 'fuzzysort'

import MaRowOption from '../components/MaRowOption.vue'

export default {
  name: 'MaSelectSearch',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: { MaRowOption },
  props: {
    liste: { type: Object },
    input: { type: Object },
    niveau: { type: Number, default: 2 },
  },
  emits: ['updateInput'],
  data: () => ({
    search: false,
    searched: '',
  }),
  computed: {
    founded() {
      return this.searched.length === 0
        ? this.liste.choix
        : fuzzysort
            .go(this.searched, this.liste.choix, {
              keys: this.liste.keys,
              limit: 20,
            })
            .map((e) => e.obj)
    },
  },
  methods: {
    onClickOutside(event) {
      this.search = false
    },
    updateInput(e) {
      this.$emit('updateInput', {
        ref: e.target.name,
        value: this.$refs.input.value,
        _id: e.target._id,
        index: e.target.index,
        maj: false,
      })
      this.search = true
      this.searched = this.$refs.input.value
    },
    select(e) {
      this.$refs.input.value = e.value
      this.updateInput({
        target: {
          name: this.input.ref,
          _id: e._id,
          index: e.index,
        },
      })
      this.blur()
    },
    focus() {
      this.search = true
      this.searched = ''
    },
    blur() {
      this.search = false
    },
  },
}
</script>
