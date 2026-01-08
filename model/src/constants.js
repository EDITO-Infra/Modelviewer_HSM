
export const LAYER_UNITS = {
  habitat_suitability: {
    SSP119: '',
    SSP126: '',
    SSP245: '',
    SSP460: '',
    SSP585: '',
  },
  salinity: {
    SSP119: 'PSU',
    SSP126: 'PSU',
    SSP245: 'PSU',
    SSP460_: 'PSU',
    SSP585: 'PSU',
  },
  temperature: {
    SSP119: '°C',
    SSP126: '°C',
    SSP245: '°C',
    SSP460: '°C',
    SSP585: '°C',
  },
  depth: {
    SSP119: 'm',
    SSP126: 'm',
    SSP245: 'm',
    SSP460: 'm',
    SSP585: 'm',
  },
}

export const LAYER_UNIFORMS = {
  habitat_suitability: 'habitat_suitabilityLayer',
  depth: 'depthLayer',
  salinity: 'salinityLayer',
  temperature: 'temperatureLayer',
}

export const PARAMETERS = {

  habitat_suitability: {
    id: 'habitat_suitability',
    min: 0,
    max: 1,
    step: 0.01,
    label: 'habitat suitability',
    units: 'habitat suitability',
    tooltip:
      'habitat suitability',
    presets: {
      herring: 1,
      mackerel: 1,
      seabass: 1,
    },
  },
  time: {
    id: 'time',
    min: 2010,
    max: 2090,
    step: 40,
    label: 'Year',
    units: '',
    tooltip: '',
    presets: {
      herring: 2010,
      mackerel: 2010,
      seabass: 2010,
    },
  },
  extMin_b: {
    id: 'extMin_b',
    min: 0,
    max: 6000,
    step: 10,
    label: 'Bathymetry',
    units: 'Critical minimum depth',
    tooltip:
      'elevation of seabed below sea surface in meters',
    presets: {
      herring: 0,
      mackerel: 0,
      seabass: 5,
    },
  },
  optMin_b: {
    id: 'optMin_b',
    min: 0,
    max: 6000,
    step: 10,
    label: '',
    units: 'Optimal minimal depth',
    tooltip: '',
    presets: {
      herring: 10,
      mackerel: 15,
      seabass: 10,
    },
  },
  optMax_b: {
    id: 'optMax_b',
    min: 0,
    max: 6000,
    step: 10,
    label: '',
    units: 'Optimal maximal depth',
    tooltip:
      '',
    presets: {
      herring: 75,
      mackerel: 200,
      seabass: 50,
    },
  },
  extMax_b: {
    id: 'extMax_b',
    min: 0,
    max: 6000,
    step: 10,
    label: '',
    tooltip: '',
    units: 'Critical maximal depth',
    presets: {
      herring: 250,
      mackerel: 1000,
      seabass: 100,
    },
  },
  weight_b: {
    id: 'weight_b',
    min: 0,
    max: 1,
    step: 0.1,
    label: '',
    units: 'Importance of bathymetry',
    tooltip: '',
    presets: {
      herring: 1,
      mackerel: 1,
      seabass: 1,
    },
  },

  extMin_s: {
    id: 'extMin_s',
    min: 0,
    max: 40,
    step: 1,
    label: 'Sea Surface Salinity',
    units: 'Critical minimum',
    tooltip: 'salinity',
    presets: {
      herring: 2,
      mackerel: 20,
      seabass: 0.5,
    },
  },
  optMin_s: {
    id: 'optMin_s',
    min: 0,
    max: 40,
    step: 1,
    label: '',
    units: 'Optimal minimal salinity',
    tooltip: '',
    presets: {
      herring: 30,
      mackerel: 30,
      seabass: 0.5,
    },
  },
  optMax_s: {
    id: 'optMax_s',
    min: 0,
    max: 40,
    step: 1,
    label: '',
    units: 'Optimal maximal salinity',
    tooltip:
      '',
    presets: {
      herring: 35,
      mackerel: 35,
      seabass: 40,
    },
  },
  extMax_s: {
    id: 'extMax_s',
    min: 0,
    max: 40,
    step: 1,
    label: '',
    tooltip: '',
    units: 'Critical maximal salinity',
    presets: {
      herring: 40,
      mackerel: 36,
      seabass: 40,
    },
  },
  weight_s: {
    id: 'weight_s',
    min: 0,
    max: 1,
    step: 0.1,
    label: '',
    units: 'Importance of salinity',
    tooltip: '',
    presets: {
      herring: 1,
      mackerel: 1,
      seabass: 1,
    },
  },

  extMin_t: {
    id: 'extMin_t',
    min: 0,
    max: 25,
    step: 1,
    label: 'Sea Surface Temperature',
    units: 'Critical minimal temperature',
    tooltip:
      '',
    presets: {
      herring: 1,
      mackerel: 5,
      seabass: 8,
    },
  },
  optMin_t: {
    id: 'optMin_t',
    min: 0,
    max: 25,
    step: 1,
    label: '',
    units: 'Suitable minimal temperature',
    tooltip: '',
    presets: {
      herring: 8,
      mackerel: 7,
      seabass: 9,
    },
  },
  optMax_t: {
    id: 'optMax_t',
    min: 0,
    max: 25,
    step: 1,
    label: '',
    units: 'Suitable maximal temperature',
    tooltip:
      '',
    presets: {
      herring: 12,
      mackerel: 8,
      seabass: 17.7,
    },
  },
  extMax_t: {
    id: 'extMax_t',
    min: 0,
    max: 25,
    step: 1,
    label: '',
    tooltip:
      '',
    units: 'Critical maximal temperature',
    presets: {
      herring: 19,
      mackerel: 20,
      seabass: 24,
    },
  },

  weight_t: {
    id: 'weight_t',
    min: 0,
    max: 1,
    step: 0.1,
    label: '',
    tooltip:
      '',
    units: 'Importance of temperature',
    presets: {
      herring: 1,
      mackerel: 1,
      seabass: 1,
    },
  },
}


export const LAYER_PARAMETERS = {

  habitat_suitability: {
    env_par: [
      'time',
      'extMin_b', 'optMin_b', 'optMax_b', 'extMax_b', 'weight_b',
      'extMin_s', 'optMin_s', 'optMax_s', 'extMax_s', 'weight_s',
      'extMin_t', 'optMin_t', 'optMax_t', 'extMax_t', 'weight_t'
    ],

    SSP119: [],
    SSP126: [],
    SSP245: [],
    SSP460: [],
    SSP585: [],
  },

  temperature: {
    env_par: [
      'time'
    ],
    SSP119: [],
    SSP126: [],
    SSP245: [],
    SSP460: [],
    SSP585: [],

  },
  salinity: {
    env_par: [
      'time'
    ],
    SSP119: [],
    SSP126: [],
    SSP245: [],
    SSP460: [],
    SSP585: [],

  },
  elevation: {
    env_par: [],
    SSP119: [],
    SSP126: [],
    SSP245: [],
    SSP460: [],
    SSP585: [],

  },
}
// Used for the discrete legend (e.g. `species_preferred`) and presets keyed by species name.
export const SPECIES = ['herring', 'mackerel', 'seabass']
