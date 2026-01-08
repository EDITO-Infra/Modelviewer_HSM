import { ThemeUIProvider } from 'theme-ui'
import { ColorModeProvider } from '@theme-ui/color-modes'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@carbonplan/components/fonts.css'
import '@carbonplan/components/globals.css'
import theme from '@carbonplan/theme'
import { RegionProvider } from '../components/region'
import { ParameterProvider } from '../components/parameters'
import { LayersProvider } from '../components/layers'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeUIProvider theme={theme}>
      <ColorModeProvider>
        <LayersProvider>
          <ParameterProvider>
            <RegionProvider>
              <Component {...pageProps} />
            </RegionProvider>
          </ParameterProvider>
        </LayersProvider>
      </ColorModeProvider>
    </ThemeUIProvider>
  )
}

export default App
