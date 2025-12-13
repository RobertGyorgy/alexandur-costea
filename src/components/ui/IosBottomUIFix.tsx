'use client'
import { useEffect } from 'react'

export default function IosBottomUIFix() {
  useEffect(() => {
    // Only run on iOS Safari
    if (typeof window === 'undefined' || !window.visualViewport) {
      // Set default value for non-supporting browsers
      document.documentElement.style.setProperty('--ios-bottom-ui', 'env(safe-area-inset-bottom, 0px)')
      return
    }
    
    const vv = window.visualViewport
    
    const setBottomUI = () => {
      try {
        // How much vertical space the browser UI occupies at the bottom
        const ui = Math.max(0, window.innerHeight - (vv.height + vv.offsetTop))
        // Cap at something sane; prevents weird spikes during rotations
        const clamped = Math.min(ui, 200)
        document.documentElement.style.setProperty('--ios-bottom-ui', `${clamped}px`)
      } catch (_e) {
        // Fallback to safe-area-inset if calculation fails
        document.documentElement.style.setProperty('--ios-bottom-ui', 'env(safe-area-inset-bottom, 0px)')
      }
    }
    
    setBottomUI()
    vv.addEventListener('resize', setBottomUI)
    vv.addEventListener('scroll', setBottomUI)
    window.addEventListener('orientationchange', setBottomUI)
    window.addEventListener('resize', setBottomUI)
    
    return () => {
      vv.removeEventListener('resize', setBottomUI)
      vv.removeEventListener('scroll', setBottomUI)
      window.removeEventListener('orientationchange', setBottomUI)
      window.removeEventListener('resize', setBottomUI)
    }
  }, [])
  
  return null
}
