[![DOI](https://zenodo.org/badge/851482302.svg)](https://zenodo.org/doi/10.5281/zenodo.13838371)
# Habitat Suitability Model Viewer

## About
This project is part of EDITO-INFRA ([Grant agreement ID: 101101473](https://doi.org/10.3030/101101473)):
- T7.3: End-to-end demonstrator for aquaculture and maritime industry

Author: Willem Boone | contact: [willem.boone@vliz.be](willem.boone@vliz.be)

## Demo video
[![Watch the video](https://img.youtube.com/vi/VDw9d9u2Kzw/0.jpg)](https://www.youtube.com/watch?v=VDw9d9u2Kzw)


## Goal
#### Summary of Demonstrator
The demonstrator use case (DUC) consists of a smartviewer that hosts a model to predict habitat suitability based on environmental living conditions. The smartviewer is based on Carbonplan its [seaweed-farming-web](https://carbonplan.org/research/seaweed-farming)/[GitHub - seaweed-farming-web](https://github.com/carbonplan/seaweed-farming-web).

In this demonstrator, habitat suitability is calculated using a deterministic model that uses minimum and maximum thresholds on the environmental variables.
 The environmental parameters that are used are: 

- Sea surface temperature
- Sea surface salinity
- Bathymetry

The thresholds for all variables can be adopted using slider widgets. On any changing parameter, the suitability map is updated and rendered in the viewer. Using a time slider, environmental parameters for several future climate scenarios can be accessed and converted in suitability maps.
This work is available on on [GitHub - Edito_model_viewer](https://github.com/willem0boone/Edito_model_viewer). 

#### Data formatting
The environmental variable dataset used by the smartviewer, need to be provided in a specific format. To create this dataset, different sources and storage from Edito data lake are used. Two pipelines were required: 
- Downscaling large .zarr datasets to lower resolution. E.g. the bathymetry dataset is around 20GB, which is to large for the demonstrator purpose.
- Creating pyramids in which each level has increasing resolution (for optimal zooming/rendering).

This work is available on this [GitHub - Edito_resampling_datasts](https://github.com/willem0boone/Edito_resampling_datasets)

## Security

For information about known security vulnerabilities and how to report security issues, see [SECURITY.md](SECURITY.md).

## Building the site

Assuming you already have `Node.js` installed, you can install the build dependencies as:

```shell
npm install .
```

To start a development version of the site, simply run:

```shell
npm run dev
```

Visit application in a browser:
>`http://localhost:5002/model_viewer/habitat_suitability` 


## Simulating Habitat Suitability
The habitat suitability model that is deployed in this viewer is based on the [work](https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2025.1501751/full) from [Rutendo Musimwa](https://orcid.org/0009-0004-2354-4905). 

### Single suitability score
#### Parameters
Each environmental variable has 5 settings (sliders in the app) that can be adjusted to user choices / species characteristics.
- **Critical minimum**: Below this threshold the species cannot survive.
- **Optimal minimum**: Optimal living conditions above this threshold.
- **Optimal maximum** Optimal living conditions below this threshold.
- **Critiall maximum**: Above this threshold the species cannot survive.
- **Weight**: the fifth parameter indicatest the importance of the variable in the total score (~the weight).

#### Score

| Environmental variable				| Situation 					| Suitability score 		|
|-------					|-----						|------------			|
|                     .  < critical minimum  	| The species cannot survive 			| 0	   			|
| critical minimum <  .  < optimal minimum   	| Not optimal but the species can survive  	| value between 0-1 (linear) 	|
| optimal minimum  <  .  < optimal maximum	| Optimal living conditions  			| 1     			|
| optimal maximum  <  .  < critical maximum	| Not optimal but the species can survive  	| value between 1-0 (linear)   	|
| critical maximum <  . 			| The species cannot survive 			| 0     			|

Visual this looks likes this: 

![Habitat suitability graph](https://drive.google.com/uc?export=view&id=1rr4lZyAxBrkXPt7mYiOkqAJL7V__EkCp)

### Habitat suitability

Habitat suitability is calculated as the weighted average of suitability per environmental variable. Each environmental variable has:
- A **weight** (Wi) representing its importance.
- A **suitability score** (Si) indicating how suitable that variable is.

Index \( i \) represent each environmental variable in the habitat suitability model.
<!--
In case the Latex is not rendering fine, this is a description of the formula
To calculate the habitat suitability:
- Multiply each environmental variable's weight by its corresponding suitability score. (Wi * Si)
- Add these values together to get the **numerator**. (SUM(Wi * Si))
- Sum up all the weights to get the **denominator**. (SUM(Wi))
- Divide the numerator by the denominator to calculate the habitat suitability. (SUM(Wi * Si) / SUM(Wi))

> Notice: GitHub might not support LaTeX. Open the markdown in an .md reader or IDE for proper rendering. <br>
-->


```math
\text{Habitat suitability} = \frac{\sum_{i=1}^{n} \left( W_i \cdot S_i \right)}{\sum_{i=1}^{n} W_i}

\\

\text{with:}

\begin{align*}
W_i & \text{ is the weight for environmental variable } i,\\
S_i & \text{ is the suitability score for environmental variable } i,\\
n & \text{ is the number of } i \text{ environmental variables ranging: }[1:n].
\end{align*}
```

### Presets
The simulation is preconfigured for 3 species which can be selected using checkboxes.


>TO DO: add reference for preset values (paper from [Rutendo Musimwa](https://orcid.org/0009-0004-2354-4905) in review).


### Simulating the future
For future predictions, 3 Shared Socioeconomic Pathways can be selected. Using the time slider, the situation in 2010, 2050 and 2090 can be simulated. In these future simulations, sea surface salinity & sea surface temperature are subject to change, while bathymetry is considered static.

 
| [SSP](https://en.wikipedia.org/wiki/Shared_Socioeconomic_Pathways) 	|  Scenario 															|
|-------   								|-----------------														|
| SSP119  								| Very low GHG emissions:CO2 emissions cut to net zero around 2050. 								|
| SSP245   								| Intermediate GHG emissions: CO2 emissions around current levels until 2050, then falling but not reaching net zero by 2100.    |
| SSP585   								| Very high GHG emissions: CO2 emissions triple by 2075.    									|

## Credits
The application makes use of technology developed by Carbonplan: [App](https://carbonplan.org/research/seaweed-farming) | [GitHub](https://github.com/carbonplan/seaweed-farming-web). 
