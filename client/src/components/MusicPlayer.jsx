import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMusic, FaVolumeUp, FaVolumeMute, FaPlay, FaPause, FaChevronDown } from 'react-icons/fa'
import { useMusic } from '../context/MusicContext'

const MusicPlayer = () => {
  const { isPlaying, togglePlay, isMuted, toggleMute, volume, handleVolumeChange } = useMusic()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, bottom: -100 }}
      animate={{ opacity: 1, bottom: 20 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed bottom-6 right-6 z-40"
    >
      {/* Expanded Controls */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 bg-gradient-to-br from-dark-900 to-dark-950 border-2 border-primary-500/40 rounded-2xl p-6 shadow-2xl backdrop-blur-xl w-72"
          >
            {/* Title */}
            <div className="mb-4">
              <p className="text-xs uppercase tracking-widest text-primary-400 font-bold">Background Music</p>
              <p className="text-sm font-bold text-white mt-1">Team VioLencE Theme</p>
            </div>

            {/* Play/Pause Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold mb-4 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary-500/50 transition-all"
            >
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: isPlaying ? 2 : 0 }}
              >
                <FaMusic className="text-lg" />
              </motion.div>
              {isPlaying ? 'Now Playing' : 'Play Music'}
            </motion.button>

            {/* Volume Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Volume</p>
                <p className="text-sm font-bold text-primary-400">{Math.round(volume * 100)}%</p>
              </div>
              
              <div className="flex items-center gap-3">
                <FaVolumeUp className="text-lg text-gray-500 flex-shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-dark-800 rounded-full appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, rgba(14, 165, 233, 0.6) 0%, rgba(14, 165, 233, 0.6) ${(volume * 100)}%, rgba(55, 65, 81, 0.5) ${(volume * 100)}%, rgba(55, 65, 81, 0.5) 100%)`
                  }}
                />
              </div>
            </div>

            {/* Mute Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleMute}
              className={`w-full py-2 rounded-lg font-bold text-sm mt-4 flex items-center justify-center gap-2 transition-all border ${
                isMuted
                  ? 'bg-red-600/20 border-red-500/40 text-red-400 hover:bg-red-600/30'
                  : 'bg-primary-500/10 border-primary-500/30 text-primary-300 hover:bg-primary-500/20'
              }`}
            >
              {isMuted ? (
                <>
                  <FaVolumeMute className="text-lg" />
                  Unmute
                </>
              ) : (
                <>
                  <FaVolumeUp className="text-lg" />
                  Mute
                </>
              )}
            </motion.button>

            {/* Info */}
            <p className="text-xs text-gray-500 mt-4 text-center">Background music enhances your experience</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Control Button */}
      <motion.button
        whileHover={{ scale: 1.12, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative w-16 h-16 rounded-full flex items-center justify-center font-bold text-white shadow-2xl transition-all border-2 overflow-hidden group ${
          isPlaying
            ? 'bg-gradient-to-br from-primary-600 to-primary-500 border-primary-400/60 drop-shadow-[0_0_20px_rgba(14,165,233,0.6)]'
            : 'bg-gradient-to-br from-dark-800 to-dark-900 border-primary-500/40 drop-shadow-[0_0_15px_rgba(14,165,233,0.4)]'
        }`}
      >
        {/* Animated background pulse when playing */}
        {isPlaying && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-primary-500/20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary-400/40"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
          </>
        )}

        {/* Icon */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={isPlaying ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
          className="relative z-10 text-xl"
        >
          {isPlaying ? <FaMusic /> : <FaMusic />}
        </motion.div>

        {/* Expand indicator */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-1 right-1 text-xs bg-dark-900/80 rounded-full p-0.5 z-20"
        >
          <FaChevronDown />
        </motion.div>
      </motion.button>
    </motion.div>
  )
}

export default MusicPlayer
