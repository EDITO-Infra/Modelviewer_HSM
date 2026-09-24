import { Box, Container, Divider, IconButton } from 'theme-ui'
import { useState, useEffect } from 'react'
import { Column, Row, getScrollbarWidth, Button } from '@carbonplan/components'
import { Sidebar, SidebarFooter } from '@carbonplan/layouts'

import Statistics from '../components/statistics'
import { useRegionContext } from './region'

const sx = {
  heading: {
    fontFamily: 'heading',
    letterSpacing: 'smallcaps',
    textTransform: 'uppercase',
    fontSize: [2, 2, 2, 3],
  },
  description: {
    fontSize: [1, 1, 1, 2],
  },
  label: {
    fontFamily: 'faux',
    letterSpacing: 'smallcaps',
    fontSize: [2, 2, 2, 3],
    mb: [2],
  },
}

const useScrollbarClasses = () => {
  const [customScrollbar] = useState(
    () => document && getScrollbarWidth(document) > 0
  )

  return customScrollbar ? 'custom-scrollbar' : null
}

// Client-side only breakpoint hook
const useBreakpointIndex = ({ defaultIndex = 2 }) => {
  const [index, setIndex] = useState(defaultIndex)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateIndex = () => {
      const width = window.innerWidth
      // Breakpoints: mobile (< 640px = 0), tablet (< 1024px = 1), desktop (>= 1024px = 2+)
      if (width < 640) {
        setIndex(0)
      } else if (width < 1024) {
        setIndex(1)
      } else {
        setIndex(2)
      }
    }

    updateIndex()
    window.addEventListener('resize', updateIndex)
    return () => window.removeEventListener('resize', updateIndex)
  }, [])

  return index
}

const ControlPanel = ({ expanded, setExpanded, children, embedded }) => {
  const { setShowRegionPicker } = useRegionContext()
  const className = useScrollbarClasses()
  const index = useBreakpointIndex({ defaultIndex: 2 })

  if (embedded) {
    return (
      <>
        {/* Show controls button in bottom left */}
        <Box
          sx={{
            position: 'fixed',
            bottom: [17, 17, 15, 15],
            left: [13],
            zIndex: 5000,
          }}
        >
          <Button
            onClick={() => setExpanded(!expanded)}
            sx={{
              cursor: 'pointer',
              backgroundColor: 'background',
              border: '1px solid',
              borderColor: 'muted',
              borderRadius: '4px',
              px: 3,
              py: 2,
              fontSize: [1, 1, 2],
              fontFamily: 'body',
              '&:hover': {
                backgroundColor: 'muted',
              },
            }}
          >
            {expanded ? 'Hide controls' : 'Show controls'}
          </Button>
        </Box>

        {/* Control panel sidebar */}
        <Box
          sx={{
            opacity: expanded ? 1 : 0,
            pointerEvents: expanded ? 'all' : 'none',
            position: 'fixed',
            top: '0px',
            left: '0px',
            bottom: '0px',
            width: ['100%', '100%', '400px', '450px'],
            maxWidth: '450px',
            maxHeight: '100vh',
            overflowX: 'hidden',
            overflowY: 'auto',
            backgroundColor: 'background',
            zIndex: 4000,
            pt: ['56px'],
            px: [3, 4],
            pb: [4],
            borderRight: '1px solid',
            borderColor: 'muted',
            boxShadow: expanded ? '4px 0 12px rgba(0,0,0,0.1)' : 'none',
            transition: 'opacity 0.25s, box-shadow 0.25s',
          }}
        >
          <Box
            sx={{
              display: expanded ? 'inherit' : 'none',
              mt: [4],
            }}
          >
            {expanded && children}
          </Box>
        </Box>
      </>
    )
  } else if (index < 2) {
    return (
      <Box
        className={className}
        sx={{
          overflowX: 'hidden',
          overflowY: 'scroll',
          height: 'calc(100%)',
          position: 'fixed',
          width: 'calc(100vw)',
          top: '0px',
          mt: ['56px'],
          pb: '56px',
          pt: [5],
          bg: 'background',
          zIndex: 1100,
          borderStyle: 'solid',
          borderColor: 'muted',
          borderWidth: '0px',
          borderBottomWidth: '1px',
          transition: 'transform 0.15s',
          ml: [-3, -4, -5, -6],
          pl: [3, 4, 5, 6],
          pr: [3, 4, 5, 6],
          transform: expanded ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <Row>
          <Column start={[1, 1, 1, 1]} width={[6, 8, 10, 10]}>
            {children}
          </Column>
        </Row>
      </Box>
    )
  } else {
    return (
      <Sidebar
        expanded={expanded}
        setExpanded={setExpanded}
        tooltip='Show controls'
        side='left'
        width={3}
        onClose={() => setShowRegionPicker(false)}

      >
        {children}
      </Sidebar>
    )
  }
}

export default ControlPanel
