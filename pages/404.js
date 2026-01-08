import { Box } from 'theme-ui'

export default function Custom404() {
    return (
        <Box sx={{ p: [4], textAlign: 'center' }}>
            <Box as="h1" sx={{ fontSize: [5, 5, 6, 6], mb: [3] }}>
                404 - Page Not Found
            </Box>
            <Box as="p" sx={{ fontSize: [2, 2, 3, 3] }}>
                The page you are looking for does not exist.
            </Box>
        </Box>
    )
}
