import { ref } from 'vue'

import MaCheckbox from './components/MaCheckbox.vue'
import MaFonction from './components/MaFonction.vue'
import MaInput from './components/MaInput.vue'
import MaInputGroup from './components/MaInputGroup.vue'
import MaInputRangeNumber from './components/MaInputRangeNumber.vue'
import MaInputTextAction from './components/MaInputTextAction.vue'
import MaModal from './components/MaModal.vue'
import MaRoundedRange from './components/MaRoundedRange.vue'
import MaSelectSearch from './components/MaSelectSearch.vue'
import MaTextArea from './components/MaTextArea.vue'
//import MaToggle from './components/MaToggle.vue'
import MaToggle from '../src/components/MaToggle.vue'

export default {
  install: (app, options) => {
    app
      .component('MaInput', MaInput)
      .component('MaTextArea', MaTextArea)
      .component('MaModal', MaModal)
      .component('MaCheckbox', MaCheckbox)
      .component('MaToggle', MaToggle)
      .component('MaRoundedRange', MaRoundedRange)
      .component('MaFonction', MaFonction)
      .component('MaInputTextAction', MaInputTextAction)
      .component('MaInputRangeNumber', MaInputRangeNumber)
      .component('MaInputGroup', MaInputGroup)
      .component('MaSelectSearch', MaSelectSearch)
  },
  useMaestria: (inpt) => {
    const inputs = ref(inpt)

    function updateInput(e) {
      if (e.validator) {
        if (e.validator.type === 'search') {
          const table = getObject(this, e.validator.args)
          const result = e.validator.funk(table, e.validator.arg, e.value)

          if (result) {
            e.validator.warn = true
          } else {
            e.validator.warn = false
          }
        }
      }

      if (e.type === 'group') {
        inputs.value[e.refGroup].inputs[e.ref].value = e.value
      } else {
        inputs.value[e.ref].value = e.value
      }

      if (e._id !== undefined) {
        inputs.value[e.ref]._id = e._id
      }
    }
    function getObject(target, args, current = 0) {
      const founded = target[args[current]]

      return args.length - 1 > current ? getObject(founded, args, current + 1) : founded
    }

    function validator() {
      return Object.values(this.inputs).every((e) => {
        const required = !e.validator || (e.validator.required && !e.value.length)
        const warn = !e.validator || e.validator.warn

        return required || warn
      })
    }

    return { updateInput, inputs }
  },
}
