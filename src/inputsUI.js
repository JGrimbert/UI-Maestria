export default {
  xy: {
    ref: 'xy',
    label: 'Départ',
    type: 'group',
    refGroup: 'xy',
    inputs: {
      x: { type: 'number', ref: 'x' },
      y: { type: 'number', ref: 'y' },
    },
  },
  mandala: {
    ref: 'mandala',
    type: 'main',
    value: '',
    _id: '',
  },
  cadre: {
    ref: 'cadre',
    label: 'cadre',
    value: false,
  },
  orbita: {
    ref: 'orbita',
    refSch: 'orbita',
    type: 'refSearch',
    output: 'split',
    label: 'Sommets',
    _id: '',
    keys: ['nom', 'sommets'],
    outputLegend: 1,
  },
  kyklos: {
    label: 'Cycles',
    ref: 'kyklos',
  },
  radius: {
    label: 'Rayon',
    ref: 'radius',
  },
  variationRadius: {
    ref: 'variationRadius',
    label: 'variation',
    value: true,
  },
  description: {
    ref: 'description',
    label: 'Description',
  },
  nom: {
    ref: 'nom',
    label: 'Nom',
    validator: {
      type: 'search',
      block: false,
      warn: false,
      funk: (table, arg, search) => table.find((e) => e[arg] === search),
      args: ['listeMandalae', 'choix'],
      arg: 'nom',
      messageWarning: 'Cet objet existe déjà',
    },
  },
  arcVar: {
    ref: 'arcVar',
    sufix: '°',
    min: 0,
    max: 360,
    value: 0,
  },
}
