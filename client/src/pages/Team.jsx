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
      socials: { instagram: 'https://instagram.com', youtube: 'https://youtube.com' }
    },
    {
      _id: '2',
      name: 'Harsh Thakor',
      role: 'Entry Fragger',
      kills: 4950,
      winRate: 74,
      description: 'Explosive opener who cracks compounds and creates space for the squad.',
      image: '/images/harsh-thakor.jpg',
      socials: { instagram: 'https://instagram.com' }
    },
    {
      _id: '3',
      name: 'Karan Patel',
      role: 'Support / Anchor',
      kills: 4600,
      winRate: 72,
      description: 'Ice-cold anchor covering flanks and delivering late-game consistency.',
      image: '/images/karan-patel.jpeg',
      socials: { instagram: 'https://instagram.com' }
    },
    {
      _id: '4',
      name: 'Mehul Darji',
      role: 'Scout / Recon',
      kills: 4400,
      winRate: 71,
      description: 'Rotations mastermind with razor-sharp map reads and info plays.',
      image: '/images/mehul-darji.jpg',
      socials: { instagram: 'https://instagram.com' }
    },
    {
      _id: '5',
      name: 'Purvang Pandya',
      role: 'Sniper / DMR',
      kills: 4300,
      winRate: 70,
      description: 'Long-range specialist landing knock after knock to open fights.',
      image: '/images/purvang-pandya.jpg',
      socials: { instagram: 'https://instagram.com' }
    },
    {
      _id: '6',
      name: 'Umang Rana',
      role: 'Flex / Utility',
      kills: 4500,
      winRate: 73,
      description: 'Adaptable flex who swaps roles on the fly and clutches chaotic end-games.',
      image: '/images/umang-rana.jpg',
      socials: { instagram: 'https://instagram.com' }
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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-dark-950 to-dark-950" />
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute -left-24 -top-24 w-96 h-96 bg-primary-500/25 blur-3xl" />
        <div className="absolute right-10 top-10 w-72 h-72 bg-primary-700/25 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-100 text-sm font-semibold">
                Prime roster reveal
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
                Meet Our <span className="text-primary-400">Elite Squad</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Aggressive pushes, perfect sync, and icy clutch factor—this is Team VioLencE.
              </p>
              <p className="text-gray-400 leading-relaxed max-w-3xl">
                A roster of sharpshooters, shot-callers, and utility masters forged to dominate every lobby. Click any player to open a premium stat card with their role impact and social hubs.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Clutch DNA', 'LAN ready', 'Tier-1 scrims'].map((tag) => (
                  <span key={tag} className="pill text-xs uppercase tracking-wide">{tag}</span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-primary-500/10 blur-3xl rounded-full" />
              <div className="relative grid grid-cols-3 gap-4">
                {displayMembers.slice(0, 6).map((member) => (
                  <div
                    key={member._id}
                    className="rounded-2xl overflow-hidden border border-primary-500/25 shadow-lg shadow-primary-900/30 cursor-pointer group"
                    onClick={() => setSelected(member)}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-28 w-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {displayMembers.map((member, index) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card group hover:scale-[1.02] cursor-pointer"
              onClick={() => setSelected(member)}
            >
              {/* Member Image */}
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <div className="aspect-video bg-gradient-to-br from-primary-600/20 to-primary-800/20 flex items-center justify-center border border-primary-500/30">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl font-display font-bold text-primary-500/30">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>

              {/* Member Info */}
              <div>
                <h3 className="text-2xl font-display font-bold mb-2">{member.name}</h3>
                <p className="text-primary-500 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-400 mb-6">{member.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-dark-800 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary-500">{member.kills}+</div>
                    <div className="text-sm text-gray-400">Total Kills</div>
                  </div>
                  <div className="bg-dark-800 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary-500">{member.winRate}%</div>
                    <div className="text-sm text-gray-400">Win Rate</div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {member.socials?.discord && (
                    <a
                      href={member.socials.discord}
                      className="text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      <FaDiscord size={24} />
                    </a>
                  )}
                  {member.socials?.instagram && (
                    <a
                      href={member.socials.instagram}
                      className="text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      <FaInstagram size={24} />
                    </a>
                  )}
                  {member.socials?.youtube && (
                    <a
                      href={member.socials.youtube}
                      className="text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      <FaYoutube size={24} />
                    </a>
                  )}
                </div>

                <button className="mt-6 text-primary-300 font-semibold inline-flex items-center" onClick={(e) => { e.stopPropagation(); setSelected(member) }}>
                  View profile
                  <span className="ml-2">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelected(null)}></div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-3xl glass-strong rounded-2xl p-6 border-primary-500/30"
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-primary-300"
                onClick={() => setSelected(null)}
                aria-label="Close profile"
              >
                ✕
              </button>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="overflow-hidden rounded-xl border border-primary-500/30">
                  <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Prime roster</p>
                    <h3 className="text-3xl font-display font-bold">{selected.name}</h3>
                    <p className="text-primary-300 font-semibold">{selected.role}</p>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{selected.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-dark-900/80 rounded-lg p-3 border border-dark-700">
                      <p className="text-xs text-gray-400">Total Kills</p>
                      <p className="text-2xl font-bold text-primary-200">{selected.kills}+</p>
                    </div>
                    <div className="bg-dark-900/80 rounded-lg p-3 border border-dark-700">
                      <p className="text-xs text-gray-400">Win Rate</p>
                      <p className="text-2xl font-bold text-primary-200">{selected.winRate}%</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {selected.socials?.instagram && (
                      <a href={selected.socials.instagram} className="text-gray-400 hover:text-primary-300 transition-colors" target="_blank" rel="noreferrer">
                        <FaInstagram size={24} />
                      </a>
                    )}
                    {selected.socials?.youtube && (
                      <a href={selected.socials.youtube} className="text-gray-400 hover:text-primary-300 transition-colors" target="_blank" rel="noreferrer">
                        <FaYoutube size={24} />
                      </a>
                    )}
                    {selected.socials?.discord && (
                      <a href={selected.socials.discord} className="text-gray-400 hover:text-primary-300 transition-colors" target="_blank" rel="noreferrer">
                        <FaDiscord size={24} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Team
