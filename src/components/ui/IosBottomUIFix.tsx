'use client'
import { useEffect } from 'react'

export default function IosBottomUIFix() {
  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return
    
    const setBottomUI = () => {
      // How much vertical space the browser UI occupies at the bottom
      const ui = Math.max(0, window.innerHeight - (vv.height + vv.offsetTop))
      // Cap at something sane; prevents weird spikes during rotations
      const clamped = Math.min(ui, 200)
      
      // Debug logging for Safari
      if (window.innerWidth < 768) {
        console.log('Safari toolbar detection:', {
          windowHeight: window.innerHeight,
          viewportHeight: vv.height,
          offsetTop: vv.offsetTop,
          calculatedUI: ui,
          clampedUI: clamped
        })
      }
      
      document.documentElement.style.setProperty('--ios-bottom-ui', `${clamped}px`)
    }
    
    setBottomUI()
    vv.addEventListener('resize', setBottomUI)
    vv.addEventListener('scroll', setBottomUI)
    window.addEventListener('orientationchange', setBottomUI)
    
    return () => {
      vv.removeEventListener('resize', setBottomUI)
      vv.removeEventListener('scroll', setBottomUI)
      window.removeEventListener('orientationchange', setBottomUI)
    }
  }, [])
  
  return null
}
