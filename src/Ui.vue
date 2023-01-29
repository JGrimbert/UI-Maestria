<template>
  <div >
    <div class="p-4">
      <form v-if="inputs">
        <div class="">
          <!-- -->
          <div class="ma-fieldset ma-fieldset-head">
            <div class="ma-fieldset-wrapper">
            <MaSelectSearch
                :input="inputs.mandala"
                :liste="listeMandalae"
                class="ma-input-important"
                @updateInput="e => maestria.updateInputs(e)"
            >
            </MaSelectSearch>
            </div>
          </div>
          <!-- -->
          <div class="ma-fieldset">
            <div class="my-5">
              <div class="ma-fieldset-wrapper">
                <div class="px-2 ">
                  <div class="flex">
                    <MaSelectSearch
                        :input="inputs.orbita"
                        :liste="listePavages"
                        class="flex-1 pr-3"
                        @updateInput="e => updateInputsAndMandala(e)"
                    />
                    <MaInputRangeNumber
                        :input="inputs.kyklos"
                        @updateInput="e => updateInputsAndMandala(e)"
                    >
                    </MaInputRangeNumber>
                  </div>
                  <MaCheckbox
                      :input="inputs.cadre"
                      @updateInput="e => maestria.updateInput(e)"
                  />
                </div>
              </div><!-- -->
                <div
                    v-if="inputs.cadre.value"
                    class="ma-fieldset ma-fieldset-inner"
                >
                  <MaSelectSearch
                      :input="inputs.limites"
                      :liste="listeQuadro"
                      @updateInput="e => maestria.updateInput(e)"
                  />
                  <div class="flex items-center mb-4">
                    <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
                  </div>
                  <div class="flex items-center">
                    <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                  </div>
                </div>
            </div>
            <!-- -->
            <div>
<!--              <h1 class="text-lg mb-2">Positions</h1>-->
              <div class="ma-fieldset-wrapper">
              <div class="mx-3">
                <MaInputGroup
                    :inputs="inputs.xy"
                    @updateInput="e => maestria.updateInput(e)"
                >
                  <MaRoundedRange
                      :input="inputs.arcVar"
                      @updateInput="e => maestria.updateInput(e)"
                  ></MaRoundedRange>
                </MaInputGroup>
                <div class="flex items-center">
                <MaInputRangeNumber
                    :input="inputs.radius"
                    @updateInput="e => maestria.updateInput(e)"
                >
                  <MaCheckbox
                      class="mx-3"
                      :input="inputs.variationRadius"
                      @updateInput="e => maestria.updateInput(e)"
                  />
                </MaInputRangeNumber>

                </div>
              </div>
              </div>
                <div
                    v-if="inputs.variationRadius.value"
                    class="ma-fieldset ma-fieldset-inner flex"
                >
                  <MaFonction />
                </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div id="#modals">
      <!-- MODALE NOUVEAU MANDALA -->
      <ModalNovaMandala
          :validator="validator"
          :inputs="inputs"
          :showModal="modals.get('nouveau')"
          @toggleModal="e=> toggleModal(e, 'nouveau')"
          @saveNewMandala="save()"
          @updateInput="e => maestria.updateInput(e)"
      />
      <!-- MODALE MODIFIER MANDALA -->
      <MaModal
          v-if="showModalModifier"
          @toggleModal="e => toggleModalModifier(e)"
      >
        <template #header>
          <h3 class="text-3xl font-semibold">
            Modifier objet
          </h3>
        </template>
        <template #body>
          <MaInput
              :input="inputs.nom"
              @updateInput="e => maestria.updateInput(e)"
          />
          <MaTextArea
              :input="inputs.description"
              @updateInput="e => maestria.updateInput(e)"
          />
        </template>
        <template #footer>
          <button
              class="btn btn-blue"
              type="button"
              @click="e => resetModalModifier(e)"
          >
            Fermer
          </button>
          <button
              class="btn btn-blue"
              type="button"
              :disabled="validator"
              @click="e => updateMetaMandala(e)"
          >
            Enregistrer
          </button>
          <button
              class="btn btn-red"
              type="button"
              :disabled="validator"
              @click="e => deleteMetaMandala(e)"
          >
            Supprimer
          </button>
        </template>
      </MaModal>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import inputs from '@/inputsUI.js';
import useMaestria from "@/composable/Maestria";

export default {
  name: "Ui.vue",
  async setup () {

    const inputs = ref({})
    const maestria = useMaestria(inputs)

    const personae = [{}]
    const listes = { personae: { keys: ['nom', 'profession'], outputLegend: 1 } };

    return { personae, maestria, inputs, listes };
  },

  props: {},
  methods: {

    /**
     * Transfert à l'interface les données récupérée en base pour l'objet actuellement "selected"
     * Permet d'automatiser le lien entre inputsUI et la BDD.
     * Ne mets à jour que les champs déjà inscrits en BDD.
     * @param selected
     * @returns {Promise<void>}
     */
    async setCurrent (selected) {

      this.mandala = (await getById(`mandala`, this.mandalae.choix[selected]._id))[0];

      this.inputs = Object.entries(this.inputs).reduce((accInputs, [keyInputs, curInputs]) => {

        let current = curInputs;

        if(curInputs.type === "main") { // Type principal, clée courante dans la collection

          current = {
            ...current,
            value: this.mandalae.choix[selected].nom,
            _id: this.mandalae.choix[selected]._id,
          }

        } else if (curInputs.type === "refSearch") { // Collection associée

          current = {
            ...current,
            value: this.mandala[keyInputs][curInputs.keys[curInputs.outputLegend]],
            _id: this.mandala[keyInputs]._id
          }

        } else if (curInputs.type === "group") { // Groupe d'inputs

          current = {
            ...current,
            inputs: Object.entries(curInputs.inputs).reduce((acc, [keyInput, curInput]) => {
              return {
                ...acc, [keyInput]: {
                  ...curInput,
                  value: this.mandala[keyInputs][keyInput]
                }
              }
            }, {})
          }

        } else if (curInputs.type === "ressource") {

          current = {
            ...current,
            value: this.mandala[keyInputs] //? mandala[keyInputs].value : curInputs.value
          }

          console.warn(current, keyInputs, this.mandala)

        }  else { // Input lambda

          current = {
            ...current,
            value: this.mandala[keyInputs] //? mandala[keyInputs].value : curInputs.value
          }

        }

        return { ...accInputs, [keyInputs]: current }

      }, {});

    }

  },
  watch: {
    selected (nova) {
      this.setCurrent(nova)
    }
  },
  created () {
    this.inputs = inputs;
    this.selected = 0;
  },

  computed: {

    listePersonae () {
      return { ...this.personae, ...this.listes.personae };
    },

    validator () {
      return Object.values(this.inputs).every(e => {

        const required = !e.validator || e.validator.required && !e.value.length
        const warn = !e.validator || e.validator.warn

        return required || warn
      } )
    },

},

</script>

<style scoped>
h1 {
  font-weight: 600;
}
.top-100 {top: 100%}
.bottom-100 {bottom: 100%}
.max-h-select {
  max-height: 300px;
}

</style>