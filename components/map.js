import { Box, Flex, useColorMode, useThemeUI } from 'theme-ui'
import { Fill, Line, Map, Raster, RegionPicker } from '@carbonplan/maps'
import { useRegionContext } from './region'
import { Dimmer, Colorbar, Button } from '@carbonplan/components'
import { SidebarAttachment } from '@carbonplan/layouts'
import { Reset } from '@carbonplan/icons'

import Ruler from './ruler'
import { useParameters } from './parameters'
import { useCustomColormap, formatValue } from './utils'
import { useLayers } from './layers'
import { NAN, LABEL_MAP, COLORMAPS_MAP } from '../constants'
import { frag, LAYER_UNITS } from '../model'

const VARIABLES = [
  'SALINITY_SSP119_2050',
  'SALINITY_SSP119_2090',
  'SALINITY_SSP245_2050',
  'SALINITY_SSP245_2090',
  'SALINITY_SSP585_2050',
  'SALINITY_SSP585_2090',
  'SALINITY_baseline_2010',
  'SST_SSP119_2050',
  'SST_SSP119_2090',
  'SST_SSP245_2050',
  'SST_SSP245_2090',
  'SST_SSP585_2050',
  'SST_SSP585_2090',
  'SST_baseline_2010',
  'area',
  'elevation']

const Viewer = ({ expanded, children }) => {
  const { theme } = useThemeUI()
  const [mode] = useColorMode()
  const parameters = useParameters()
  const {
    uniforms: layerUniforms,
    layer,
    target,
    resetLayers,
    clim,
    setClim,
  } = useLayers()
  const { colormap, legend, discrete } = useCustomColormap(layer)
  const { setRegionData, showRegionPicker } = useRegionContext()

  return (
    <>
      <SidebarAttachment
        expanded={expanded}
        side='left'
        width={3}
        sx={{
          top: ['17px', '17px', '17px', '15px'],
          ml: [null, null, '-63px', '-84px'],
          display: ['none', 'none', 'inline-block', 'inline-block'],
        }}
      >
        <Button
          prefix={<Reset sx={{ width: 20, height: 20, strokeWidth: 1.5 }} />}
          onClick={() => {
            parameters.resetParameters()
            resetLayers()
          }}
          sx={{
            cursor: expanded ? 'pointer' : 'default',
            color: 'secondary',
            opacity: expanded ? 1 : 0,
            transition: ' opacity 0.2s',
          }}
        />
      </SidebarAttachment>

      <Map
        zoom={4}
        minZoom={2}
        maxZoom={8}
        center={[15, 55]}
        debug={false}
        style={{ overflow: 'inherit' }}
      >
        <Fill
          color={theme.rawColors?.background || theme.colors?.background || '#ffffff'}
          source={
            'https://storage.googleapis.com/carbonplan-maps/basemaps/land'
          }
          variable={'land'}
        />
        <Line
          color={theme.rawColors?.primary || theme.colors?.primary || '#000000'}
          source={
            'https://storage.googleapis.com/carbonplan-maps/basemaps/land'
          }
          variable={'land'}
        />
        {showRegionPicker && (
          <RegionPicker
            color={theme.colors?.primary || '#000000'}
            backgroundColor={theme.colors?.background || '#ffffff'}
            fontFamily={theme.fonts?.mono || theme.fonts?.body || 'monospace'}
            fontSize={'14px'}
            minRadius={50}
          />
        )}
        <Raster
          maxZoom={6}
          colormap={colormap}
          clim={clim}
          display={true}
          mode={'texture'}
          uniforms={{
            ...layerUniforms,
            ...parameters,
            target,
            empty: mode == 'dark' ? 0.25 : 0.75,
          }}
          regionOptions={{ setData: setRegionData }}
          variable={'all_variables'}
          selector={{ variable: VARIABLES }}
          fillValue={NAN}
          source={
            //'https://minio.lab.dive.edito.eu/oidc-willemboone/prototype_reduced.zarr'
            //'https://minio.lab.dive.edito.eu/oidc-willemboone/EDITO_DUC/EDITO_DUC_pyramid.zarr'
            'https://minio.dive.edito.eu/oidc-willemboone/EDITO_DUC/EDITO_DUC_pyramid.zarr'
          }
          frag={frag}
        />
        <Box
          sx={{
            position: 'absolute',
            right: [13],
            bottom: [17, 17, 15, 15],
          }}
        >
          <Flex sx={{ gap: [3], alignItems: legend ? 'flex-end' : 'center' }}>
            {legend || (
              <Colorbar
                colormap={colormap}
                format={formatValue}
                clim={clim}
                units={
                  <Box sx={{ color: 'primary' }}>
                    {LAYER_UNITS[layer][target]}
                  </Box>
                }
                label={
                  typeof LABEL_MAP[layer] === 'string'
                    ? LABEL_MAP[layer]
                    : LABEL_MAP[layer][target]
                }
                discrete={discrete}
                horizontal
                setClim={
                  discrete ? undefined : (setter) => setClim(setter(clim))
                }
                setClimStep={COLORMAPS_MAP[layer].step}
              />
            )}
            <Ruler />
            <Dimmer
              sx={{
                display: ['none', 'none', 'initial', 'initial'],
                color: 'primary',
              }}
            />
          </Flex>
        </Box>
        {children}
      </Map>
    </>
  )
}

export default Viewer
