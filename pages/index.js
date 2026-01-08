// pages/index.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const RedirectHome = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/model_viewer/habitat_suitability')
  }, [router])

  return null
}

export default dynamic(() => Promise.resolve(RedirectHome), { ssr: false })