import {
  SPECIES,
  // SPECIES_LINE_DENSITIES,
  // SPECIES_EQUIPMENT_habitat_suitabilityS,
} from './constants'

export const getSpecies = (species) => {
  if (species === SPECIES.length) {
    return SPECIES[SPECIES.length - 1]
  } else {
    return SPECIES[species]
  }
}

// this is the evaluateSuitability function used within the main function
function evaluateSingleSuitability(value, extMin, optMin, optMax, extMax) {
  const slopeUp = (1 - 0) / (optMin - extMin);
  const slopeDwn = (0 - 1) / (extMax - optMax);
  const interceptUp = 0 - (slopeUp * extMin);
  const interceptDwn = 0 - (slopeDwn * extMax);

  if (value <= extMin) {
    return 0;
  } else if (extMin < value && value <= optMin) {
    return (slopeUp * value) + interceptUp;
  } else if (optMin < value && value <= optMax) {
    return 1;
  } else if (optMax < value && value <= extMax) {
    return (slopeDwn * value) + interceptDwn;
  } else if (extMax < value) {
    return 0;
  } else {
    return "NAN";
  }
}

// Main function to evaluate habitat suitability
export const evaluateSuitability = (target, values, parameters) => {
  const {
    extMin_b, optMin_b, optMax_b, extMax_b,
    extMin_t, optMin_t, optMax_t, extMax_t,
    extMin_s, optMin_s, optMax_s, extMax_s
  } = parameters;

  const { elevation, temperature, salinity } = values;

  const suitability_elevation = evaluateSingleSuitability(
    elevation, extMin_b, optMin_b, optMax_b, extMax_b
  );
  const suitability_temperature = evaluateSingleSuitability(
    temperature, extMin_t, optMin_t, optMax_t, extMax_t
  );
  const suitability_salinity = evaluateSingleSuitability(
    salinity, extMin_s, optMin_s, optMax_s, extMax_s
  );
  return (suitability_elevation + suitability_temperature + suitability_salinity) / 3;
};


export const calculatehabitat_suitability = (target, values, parameters) => {
  // these paramters are old model en should be removed later on
  const { capex, harvesthabitat_suitability, linehabitat_suitability, opex, transporthabitat_suitability, conversionhabitat_suitability } =
    parameters

  // mock parameters for new model
  // use depth for bathymetry
  const extMin_b = 0;
  const optMin_b = 10;
  const optMax_b = 50;
  const extMax_b = 200;

  // use weive height isntead of temperature
  const extMin_t = 0;
  const optMin_t = 0;
  const optMax_t = 1;
  const extMax_t = 2;

  // use distance to port instead of 
  const extMin_s = 0;
  const optMin_s = 1;
  const optMax_s = 20;
  const extMax_s = 50;

  // read the values
  const { seaweed_dw, depth, d2p, nharv, wave_height, d2sink, species } = values



  const suitability_elevation = evaluateSingleSuitability(
    depth, extMin_b, optMin_b, optMax_b, extMax_b
  );
  const suitability_temperature = evaluateSingleSuitability(
    wave_height, extMin_t, optMin_t, optMax_t, extMax_t
  );
  const suitability_salinity = evaluateSingleSuitability(
    d2p, extMin_s, optMin_s, optMax_s, extMax_s
  );

  const suitability = (suitability_elevation + suitability_temperature + suitability_salinity) / 3;
  return suitability
}

export const calculateBenefit = (target, values, parameters) => {
  const carbon_fraction = 0.248
  const carbon_to_co2 = 3.67

  const { seaweed_dw, d2p, fseq_transport: fseq, d2sink, species } = values

  return d2p
}



