import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDiscord, FaInstagram, FaYoutube } from 'react-icons/fa'

const CLAN_LOGO = encodeURI('/uploads/team/Clan Logo.png')

const Team = () => {
  const [selected, setSelected] = useState(null)

  const formatImagePath = (path) => {
    if (!path) return ''
    if (path.startsWith('http')) return path
    return encodeURI(path)
  }

  const defaultMembers = [
    {
      _id: 'dev-patel',
      name: 'Dev Patel',
      role: 'IGL / Founder',
      kills: 5320,
      winRate: 77,
      description: 'Visionary founder and in-game leader of Team VioLencE. Built the clan from the ground up with strategic genius and unwavering determination. Calls rotations that break defenses and clutches that win championships.',
      popupDescription: 'Clan founder & IGL. Strategic mastermind with clutch plays.',
      ingameName: 'VioLencE X',
      since: 2019,
      image: '/uploads/team/Dev Patel.jpg',
      socials: { instagram: 'https://instagram.com/devpatel' }
    },
    {
      _id: 'umang-rana',
      name: 'Umang Rana',
      role: 'Co-Leader / Flex IGL',
      kills: 4580,
      winRate: 73,
      description: 'Aggressive co-leader who blends IGL instincts with raw fragging power. Unpredictable rotations, ruthless decision-making, and the firepower to back every call. Keeps the team sharp and enemies on edge.',
      popupDescription: 'Aggressive co-leader with unpredictable IGL calls & raw firepower.',
      ingameName: 'VioLencE UB',
      since: 2019,
      image: '/uploads/team/Umang Rana.jpg',
      socials: { instagram: 'https://instagram.com/umangrana' }
    },
    {
      _id: 'aayush-panchal',
      name: 'Aayush Panchal',
      role: 'Strategic Analyst',
      kills: 4120,
      winRate: 69,
      description: 'Strategic mind who decodes enemy patterns and optimizes team plays. Deep VOD breakdowns, mid-round adjustments, and mental fortitude coaching keep VioLencE one step ahead in every engagement.',
      popupDescription: 'Strategic analyst. VOD breakdown specialist & mental coach.',
      ingameName: 'VioLencE DP',
      since: 2022,
      image: '/uploads/team/Aayush Panchal.webp',
      socials: { instagram: 'https://instagram.com/aayushpanchal' }
    },
    {
      _id: 'purvang-pandya',
      name: 'Purvang Pandya',
      role: 'Elite DMR Specialist',
      kills: 4435,
      winRate: 70,
      description: 'Legendary long-range specialist whose precision knocks open every engagement. Clutch DMR plays that shift momentum, ridiculous aim, and the poise to perform under pressure when it matters most.',
      popupDescription: 'Elite DMR specialist with precision knocks & clutch aim.',
      ingameName: 'VioLencE PV',
      since: 2023,
      image: '/uploads/team/Purvang Pandya.jpg',
      socials: { instagram: 'https://instagram.com/purvangpandya' }
    },
    {
      _id: 'karan-patel',
      name: 'Karan Patel',
      role: 'Entry Fragger',
      kills: 4725,
      winRate: 72,
      description: 'Fearless entry specialist who cracks compound doors and creates the chaos that wins fights. Aggressive entries, flawless trades, and the aggression to control zones. The breach that breaks defenses.',
      popupDescription: 'Fearless entry fragger. Cracks compounds with flawless trades.',
      ingameName: 'VioLencE KP',
      since: 2020,
      image: '/uploads/team/Karan Patel.jpeg',
      socials: { instagram: 'https://instagram.com/karanpatel' }
    },
    {
      _id: 'mehul-darji',
      name: 'Mehul Darji',
      role: 'Aggressive Scout & Co-Leader',
      kills: 4510,
      winRate: 71,
      description: 'Second co-leader and tactical scout who leads aggressive zone pushes and info plays. Rotations that catch teams off-guard, discipline mixed with aggression, and the leadership to hold composure.',
      popupDescription: 'Tactical scout & co-leader. Aggressive zone control expert.',
      ingameName: 'VioLencE MD',
      since: 2021,
      image: '/uploads/team/Mehul Darji.jpg',
      socials: { instagram: 'https://instagram.com/mehuldarji' }
    },
    {
      _id: 'harsh-thakor',
      name: 'Harsh Thakor',
      role: 'Support Anchor',
      kills: 5060,
      winRate: 74,
      description: 'Steady support anchor who locks down flanks and stabilizes every round. Reliable utility, smart positioning, and the composure to hold zones under fire. The silent protector of VioLencE.',
      popupDescription: 'Support anchor. Locks flanks with reliable utility & composure.',
      ingameName: 'VioLencE HT',
      since: 2023,
      image: '/uploads/team/Harsh Thakor.jpg',
      socials: { instagram: 'https://instagram.com/harshthakor' }
    },
  ]

  const displayMembers = defaultMembers.map((member) => ({
    ...member,
    image: member.image ? formatImagePath(member.image) : formatImagePath(CLAN_LOGO),
    kills: member.kills || 0,
    winRate: member.winRate || 0,
    description: member.description || 'Locked-in competitor ready to punish any misplay in the late circles.'
  }))

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
                Prime Lineup
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-display font-black leading-tight max-w-3xl">
                Team VioLencE <span className="gradient-text">Lineup</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                Aggressive pushes, perfect coordination, and icy clutch factor. This is Team VioLencE.
              </p>
              <p className="text-gray-400 leading-relaxed max-w-3xl">
                A roster of sharpshooters, shot-callers, and utility masters forged to dominate every lobby. Click any player to unlock their premium stat card and role impact analysis.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center gap-4 px-4 py-3 rounded-2xl border border-primary-500/40 bg-primary-500/10 shadow-lg shadow-primary-900/30"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-500/60 bg-dark-900 flex items-center justify-center p-2 shadow-inner">
                    <img src={CLAN_LOGO} alt="Team VioLencE clan crest" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-300 uppercase tracking-[0.2em] font-bold">Clan Crest</p>
                    <p className="text-lg font-display font-black text-white">Team VioLencE</p>
                    <p className="text-gray-400 text-sm">Locked, loaded, and LAN ready.</p>
                  </div>
                </motion.div>

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
              className="relative w-full max-w-4xl glass-strong rounded-3xl p-6 border border-primary-500/40 overflow-hidden"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 text-gray-400 hover:text-primary-300 w-10 h-10 rounded-lg hover:bg-dark-800 flex items-center justify-center z-10"
                onClick={() => setSelected(null)}
                aria-label="Close profile"
              >
                ✕
              </motion.button>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Image */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="overflow-hidden rounded-2xl border-2 border-primary-500/40 h-[400px]"
                >
                  <img src={selected.image} alt={selected.name} className="w-full h-full object-cover object-center" />
                </motion.div>

                {/* Info */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4 flex flex-col"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-primary-400 font-bold">Lineup Card</p>
                    <h3 className="text-3xl font-display font-black mb-1">{selected.name}</h3>
                    <p className="text-primary-300 font-bold text-base">{selected.role}</p>
                  </div>

                  {/* IGN & Since - Premium Design */}
                  <div className="flex items-center gap-3">
                    {selected.ingameName && (
                      <div className="flex-1 px-3 py-2 rounded-lg bg-primary-500/10 border border-primary-500/30">
                        <p className="text-[10px] text-primary-400 font-bold uppercase tracking-wider">IGN</p>
                        <p className="text-sm text-primary-100 font-black tracking-[0.18em] uppercase font-mono">{selected.ingameName}</p>
                      </div>
                    )}
                    {selected.since && (
                      <div className="px-3 py-2 rounded-lg bg-primary-500/10 border border-primary-500/30">
                        <p className="text-[10px] text-primary-400 font-bold uppercase tracking-wider">Since</p>
                        <p className="text-sm text-white font-black">{selected.since}</p>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-300 leading-relaxed text-sm">{selected.popupDescription || selected.description}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass-card p-3 rounded-xl border border-primary-500/30">
                      <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Total Kills</p>
                      <p className="text-2xl font-black gradient-text">{selected.kills}+</p>
                    </div>
                    <div className="glass-card p-3 rounded-xl border border-primary-500/30">
                      <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Win Rate</p>
                      <p className="text-2xl font-black gradient-text">{selected.winRate}%</p>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-2 pt-2 border-t border-dark-700">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Follow {selected.name}</p>
                    <div className="flex items-center space-x-2">
                      {selected.socials?.instagram && (
                        <motion.a 
                          href={selected.socials.instagram} 
                          target="_blank" 
                          rel="noreferrer"
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600/20 to-primary-700/20 border border-primary-500/30 hover:border-primary-500/70 flex items-center justify-center text-gray-400 hover:text-primary-300 transition-all"
                        >
                          <FaInstagram size={18} />
                        </motion.a>
                      )}
                      {selected.socials?.youtube && (
                        <motion.a 
                          href={selected.socials.youtube} 
                          target="_blank" 
                          rel="noreferrer"
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600/20 to-primary-700/20 border border-primary-500/30 hover:border-primary-500/70 flex items-center justify-center text-gray-400 hover:text-primary-300 transition-all"
                        >
                          <FaYoutube size={18} />
                        </motion.a>
                      )}
                      {selected.socials?.discord && (
                        <motion.a 
                          href={selected.socials.discord} 
                          target="_blank" 
                          rel="noreferrer"
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600/20 to-primary-700/20 border border-primary-500/30 hover:border-primary-500/70 flex items-center justify-center text-gray-400 hover:text-primary-300 transition-all"
                        >
                          <FaDiscord size={18} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Close Button Mobile */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelected(null)}
                    className="w-full mt-auto btn-secondary py-2 text-sm"
                  >
                    Close Profile
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Team Closing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-black">
              One Clan. <span className="gradient-text">Seven Warriors.</span> Infinite Grind.
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built from the ground up by Dev Patel's vision, Team VioLencE combines strategic brilliance with raw mechanical skill. Every member bleeds the colors, every round is a battle, and every victory is earned.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3 rounded-2xl bg-primary-500/15 border border-primary-500/40 text-primary-200 font-bold uppercase tracking-widest text-sm"
            >
              🏆 Tier-1 Scrims
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3 rounded-2xl bg-primary-500/15 border border-primary-500/40 text-primary-200 font-bold uppercase tracking-widest text-sm"
            >
              🎯 Precision Rotations
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3 rounded-2xl bg-primary-500/15 border border-primary-500/40 text-primary-200 font-bold uppercase tracking-widest text-sm"
            >
              ⚡ Clinical Execution
            </motion.div>
          </div>

          <p className="text-gray-400 italic pt-4">
            Join the grind. Follow the journey. This is Team VioLencE.
          </p>
        </motion.div>
      </section>
    </div>
  )
}

export default Team

