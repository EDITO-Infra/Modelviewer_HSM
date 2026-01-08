const path = require('path')

const isDev =
  process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development'

// Enable static export for deployment platform
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  ...(isProduction && {
    output: 'export',
    images: {
      unoptimized: true,
    },
    // Disable trailing slash to match dev behavior
    trailingSlash: false,
  }),
}
