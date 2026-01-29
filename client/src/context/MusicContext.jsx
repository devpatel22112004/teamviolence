import { createContext, useContext, useState, useRef, useEffect } from 'react'

const MusicContext = createContext()

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.15) // 15% default volume
  const [isMuted, setIsMuted] = useState(true) // Muted by default

  useEffect(() => {
    // Create audio element
    if (!audioRef.current) {
      const audio = new Audio('/music/bgmi-theme.mp3')
      audio.loop = true
      audio.volume = volume
      audioRef.current = audio

      // Auto-play on page load with low volume (but muted)
      const playAudio = () => {
        audio.volume = isMuted ? 0 : volume
        audio.play().catch(() => {
          // Autoplay might be blocked, user can click to play
        })
        setIsPlaying(true)
      }

      // Try to play after a short delay
      setTimeout(playAudio, 1000)

      return () => {
        audio.pause()
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
          console.error('Autoplay blocked:', err)
          setIsPlaying(false)
        })
        setIsPlaying(true)
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
      handleVolumeChange
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
