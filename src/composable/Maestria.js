import { ref } from 'vue'

export default function useMaestria(inpt) {
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
}
