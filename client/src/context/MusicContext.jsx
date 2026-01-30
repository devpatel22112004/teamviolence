import { createContext, useContext, useState, useRef, useEffect } from 'react'

const MusicContext = createContext()

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.15) // 15% default volume
  const [isMuted, setIsMuted] = useState(true) // Muted by default
  const [audioLoaded, setAudioLoaded] = useState(false)
  
  // Refs to capture current state for playAudio closure
  const isMutedRef = useRef(isMuted)
  const volumeRef = useRef(volume)
  
  // Update refs whenever state changes
  useEffect(() => {
    isMutedRef.current = isMuted
    volumeRef.current = volume
  }, [isMuted, volume])

  useEffect(() => {
    // Create audio element
    if (!audioRef.current) {
      const audio = new Audio()
      audio.loop = true
      audio.volume = volume
      audio.crossOrigin = 'anonymous'
      
      // Try to load from multiple sources - both MP3 and WAV with fallback
      const sources = [
        { src: '/music/bgmi-theme.wav', type: 'audio/wav' },
        { src: '/music/bgmi-theme.mp3', type: 'audio/mpeg' },
        { src: '/music/bgmi.mp3', type: 'audio/mpeg' },
        { src: '/music/background.mp3', type: 'audio/mpeg' }
      ]
      
      // Append all sources for fallback
      sources.forEach(({ src, type }) => {
        const sourceElement = document.createElement('source')
        sourceElement.src = src
        sourceElement.type = type
        audio.appendChild(sourceElement)
      })
      
      // Named event handlers for cleanup
      const handleCanPlay = () => {
        setAudioLoaded(true)
        console.log('✅ Audio loaded successfully from:', audio.currentSrc)
      }
      
      const handleError = (e) => {
        console.error('❌ Audio error:', e.target.error, 'Current src:', audio.currentSrc)
        // Try next source
        audio.load()
      }
      
      const handleLoadedData = () => {
        console.log('✅ Audio data loaded:', audio.currentSrc)
      }
      
      const handlePlay = () => {
        console.log('▶️ Audio playing')
        setIsPlaying(true)
      }
      
      const handlePause = () => {
        console.log('⏸️ Audio paused')
        setIsPlaying(false)
      }
      
      const handleVolumeChange = () => {
        console.log('🔊 Volume changed to:', audio.volume)
      }
      
      // Add event listeners
      audio.addEventListener('canplay', handleCanPlay)
      audio.addEventListener('error', handleError)
      audio.addEventListener('loadeddata', handleLoadedData)
      audio.addEventListener('play', handlePlay)
      audio.addEventListener('pause', handlePause)
      audio.addEventListener('volumechange', handleVolumeChange)
      
      // Load audio
      audio.load()
      console.log('🔄 Loading audio sources...')
      
      audioRef.current = audio

      // Auto-play on page load with low volume (but muted)
      const playAudio = () => {
        audio.volume = isMutedRef.current ? 0 : volumeRef.current
        audio.play().catch((err) => {
          console.error('Autoplay blocked or error:', err.message)
        })
      }

      // Try to play after a short delay
      const timeoutId = setTimeout(playAudio, 1000)

      return () => {
        if (audio) {
          audio.pause()
          audio.currentTime = 0
          // Remove all event listeners
          audio.removeEventListener('canplay', handleCanPlay)
          audio.removeEventListener('error', handleError)
          audio.removeEventListener('play', handlePlay)
          audio.removeEventListener('pause', handlePause)
        }
        clearTimeout(timeoutId)
      }
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        // Set volume before playing
        audioRef.current.volume = isMuted ? 0 : volume
        audioRef.current.play().catch((err) => {
          console.error('Play error:', err.message)
        })
      }
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume)
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <MusicContext.Provider value={{
      isPlaying,
      togglePlay,
      isMuted,
      toggleMute,
      volume,
      handleVolumeChange,
      audioLoaded
    }}>
      {children}
    </MusicContext.Provider>
  )
}

export const useMusic = () => {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error('useMusic must be used within MusicProvider')
  }
  return context
}
