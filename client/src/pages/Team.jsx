import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDiscord, FaInstagram, FaYoutube } from 'react-icons/fa'
import axios from 'axios'

const Team = () => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const res = await axios.get('/api/team')
      setMembers(res.data)
    } catch (error) {
      console.error('Error fetching team members:', error)
      // Fallback to default members if API fails
      setMembers(defaultMembers)
    } finally {
      setLoading(false)
    }
  }

  const defaultMembers = [
    {
      _id: '1',
      name: 'Dev Patel',
      role: 'IGL / Assaulter',
      kills: 5200,
      winRate: 76,
      description: 'Tactical shot-caller with ruthless mid-game aggression and crisp utilities.',
      image: '/images/dev-patel.jpg',
      socials: { instagram: 'https://instagram.com/devpatel' }
    },
    {
      _id: '2',
      name: 'Harsh Thakor',
      role: 'Entry Fragger',
      kills: 4950,
      winRate: 74,
      description: 'Explosive opener who cracks compounds and creates space for the squad.',
      image: '/images/harsh-thakor.jpg',
      socials: { instagram: 'https://instagram.com/harshthakor' }
    },
    {
      _id: '3',
      name: 'Karan Patel',
      role: 'Support / Anchor',
      kills: 4600,
      winRate: 72,
      description: 'Ice-cold anchor covering flanks and delivering late-game consistency.',
      image: '/images/karan-patel.jpeg',
      socials: { instagram: 'https://instagram.com/karanpatel' }
    },
    {
      _id: '4',
      name: 'Mehul Darji',
      role: 'Scout / Recon',
      kills: 4400,
      winRate: 71,
      description: 'Rotations mastermind with razor-sharp map reads and info plays.',
      image: '/images/mehul-darji.jpg',
      socials: { instagram: 'https://instagram.com/mehuldarji' }
    },
    {
      _id: '5',
      name: 'Purvang Pandya',
      role: 'Sniper / DMR',
      kills: 4300,
      winRate: 70,
      description: 'Long-range specialist landing knock after knock to open fights.',
      image: '/images/purvang-pandya.jpg',
      socials: { instagram: 'https://instagram.com/purvangpandya' }
    },
    {
      _id: '6',
      name: 'Umang Rana',
      role: 'Flex / Utility',
      kills: 4500,
      winRate: 73,
      description: 'Adaptable flex who swaps roles on the fly and clutches chaotic end-games.',
      image: '/images/umang-rana.jpg',
      socials: { instagram: 'https://instagram.com/umangrana' }
    },
  ]

  const displayMembers = members.length ? members : defaultMembers

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/15 via-dark-950 to-dark-950" />
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute -left-32 -top-32 w-96 h-96 bg-primary-500/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 w-80 h-80 bg-primary-700/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-primary-500/15 border border-primary-500/40 text-primary-100 text-sm font-bold"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                Prime Roster Reveal
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-display font-black leading-tight max-w-3xl">
                Meet Our <span className="gradient-text">Elite Squad</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                Aggressive pushes, perfect coordination, and icy clutch factor. This is Team VioLencE.
              </p>
              <p className="text-gray-400 leading-relaxed max-w-3xl">
                A roster of sharpshooters, shot-callers, and utility masters forged to dominate every lobby. Click any player to unlock their premium stat card and role impact analysis.
              </p>
              <div className="flex flex-wrap gap-3">
                {['🔥 Clutch DNA', '🎮 LAN ready', '⚡ Tier-1 scrims'].map((tag) => (
                  <motion.span 
                    key={tag} 
                    whileHover={{ scale: 1.05 }}
                    className="pill text-sm font-bold tracking-wide"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Hero Image Grid */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-600/20 to-primary-700/20 blur-2xl rounded-3xl" />
              <div className="relative grid grid-cols-3 gap-4 md:gap-6">
                {displayMembers.slice(0, 6).map((member, idx) => (
                  <motion.div
                    key={member._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="rounded-2xl overflow-hidden border-2 border-primary-500/30 hover:border-primary-400 shadow-xl shadow-primary-900/30 cursor-pointer group"
                    onClick={() => setSelected(member)}
                  >
                    <div className="aspect-square bg-gradient-to-br from-primary-600/30 to-primary-800/30 relative overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayMembers.map((member, index) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="card-interactive group"
              onClick={() => setSelected(member)}
            >
              {/* Member Image */}
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <div className="aspect-video bg-gradient-to-br from-primary-600/20 to-primary-800/20 flex items-center justify-center border border-primary-500/30 group-hover:border-primary-500/60 transition-all">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-6xl font-display font-bold text-primary-500/30">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>

              {/* Member Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-display font-bold mb-1 group-hover:gradient-text transition-all">{member.name}</h3>
                  <p className="text-primary-400 font-bold text-sm uppercase tracking-widest">{member.role}</p>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{member.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-card p-4 text-center rounded-xl">
                    <div className="text-2xl font-bold gradient-text">{member.kills}+</div>
                    <div className="text-xs text-gray-400 uppercase font-bold mt-1">Kills</div>
                  </div>
                  <div className="glass-card p-4 text-center rounded-xl">
                    <div className="text-2xl font-bold gradient-text">{member.winRate}%</div>
                    <div className="text-xs text-gray-400 uppercase font-bold mt-1">Win Rate</div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-3">
                  {member.socials?.discord && (
                    <motion.a
                      href={member.socials.discord}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-800 hover:bg-primary-600 text-gray-400 hover:text-white transition-all border border-dark-700 hover:border-primary-500"
                    >
                      <FaDiscord size={18} />
                    </motion.a>
                  )}
                  {member.socials?.instagram && (
                    <motion.a
                      href={member.socials.instagram}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-800 hover:bg-primary-600 text-gray-400 hover:text-white transition-all border border-dark-700 hover:border-primary-500"
                    >
                      <FaInstagram size={18} />
                    </motion.a>
                  )}
                  {member.socials?.youtube && (
                    <motion.a
                      href={member.socials.youtube}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-800 hover:bg-primary-600 text-gray-400 hover:text-white transition-all border border-dark-700 hover:border-primary-500"
                    >
                      <FaYoutube size={18} />
                    </motion.a>
                  )}
                </div>

                <motion.button 
                  whileHover={{ x: 5 }}
                  className="mt-4 text-primary-300 hover:text-primary-200 font-bold inline-flex items-center text-sm uppercase tracking-widest" 
                  onClick={(e) => { e.stopPropagation(); setSelected(member) }}
                >
                  View Profile
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="absolute inset-0 bg-black/70 backdrop-blur-lg" 
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl glass-strong rounded-3xl p-8 border border-primary-500/40 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-6 text-gray-400 hover:text-primary-300 w-10 h-10 rounded-lg hover:bg-dark-800 flex items-center justify-center z-10"
                onClick={() => setSelected(null)}
                aria-label="Close profile"
              >
                ✕
              </motion.button>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Image */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="overflow-hidden rounded-2xl border-2 border-primary-500/40"
                >
                  <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                </motion.div>

                {/* Info */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-primary-400 font-bold">Prime Roster</p>
                    <h3 className="text-4xl font-display font-black mb-2">{selected.name}</h3>
                    <p className="text-primary-300 font-bold text-lg">{selected.role}</p>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-lg">{selected.description}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-4 rounded-xl border border-primary-500/30">
                      <p className="text-xs text-gray-400 uppercase font-bold mb-2">Total Kills</p>
                      <p className="text-3xl font-black gradient-text">{selected.kills}+</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl border border-primary-500/30">
                      <p className="text-xs text-gray-400 uppercase font-bold mb-2">Win Rate</p>
                      <p className="text-3xl font-black gradient-text">{selected.winRate}%</p>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-3 pt-4 border-t border-dark-700">
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Follow {selected.name}</p>
                    <div className="flex items-center space-x-3">
                      {selected.socials?.instagram && (
                        <motion.a 
                          href={selected.socials.instagram} 
                          target="_blank" 
                          rel="noreferrer"
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-600/20 to-primary-700/20 border border-primary-500/30 hover:border-primary-500/70 flex items-center justify-center text-gray-400 hover:text-primary-300 transition-all"
                        >
                          <FaInstagram size={20} />
                        </motion.a>
                      )}
                      {selected.socials?.youtube && (
                        <motion.a 
                          href={selected.socials.youtube} 
                          target="_blank" 
                          rel="noreferrer"
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-600/20 to-primary-700/20 border border-primary-500/30 hover:border-primary-500/70 flex items-center justify-center text-gray-400 hover:text-primary-300 transition-all"
                        >
                          <FaYoutube size={20} />
                        </motion.a>
                      )}
                      {selected.socials?.discord && (
                        <motion.a 
                          href={selected.socials.discord} 
                          target="_blank" 
                          rel="noreferrer"
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-600/20 to-primary-700/20 border border-primary-500/30 hover:border-primary-500/70 flex items-center justify-center text-gray-400 hover:text-primary-300 transition-all"
                        >
                          <FaDiscord size={20} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Close Button Mobile */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelected(null)}
                    className="w-full mt-6 btn-secondary py-3"
                  >
                    Close Profile
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Team
