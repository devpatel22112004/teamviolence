import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDiscord, FaInstagram, FaYoutube, FaWhatsapp, FaCrown, FaVideo, FaEdit, FaChevronDown, FaArrowRight } from 'react-icons/fa'

const CLAN_LOGO = '/Line_up/logo.png'

const Team = () => {
  const [selected, setSelected] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(0)

  const formatImagePath = (path) => {
    if (!path) return ''
    if (path.startsWith('http')) return path
    // Split path, encode each part, then rejoin
    return path.split('/').map(part => part ? encodeURIComponent(part) : part).join('/')
  }

  const handleImageError = (e) => {
    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%231f2937" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="%236b7280"%3EImage Loading%3C/text%3E%3C/svg%3E'
  }

  // Organizers - Main leaders and founders
  const organizers = [
    {
      _id: 'dev-patel',
      name: 'Dev Patel',
      role: 'IGL / Founder',
      category: 'Organizer',
      kills: 5320,
      winRate: 77,
      description: 'Visionary founder and in-game leader of Team VioLencE. Built the clan from the ground up with strategic genius and unwavering determination. Calls rotations that break defenses and clutches that win championships.',
      popupDescription: 'Clan founder & IGL. Strategic mastermind with clutch plays.',
      ingameName: 'VioLencE 乂',
      since: 2019,
      image: '/Line_up/Dev Patel.jpg',
      socials: { discord: 'https://discord.gg/AmezSUbP', instagram: 'https://instagram.com/devpatel', whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu' }
    },
    {
      _id: 'umang-rana',
      name: 'Umang Rana',
      role: 'Co-Leader / Flex IGL',
      category: 'Organizer',
      kills: 5739,
      winRate: 84,
      description: 'Aggressive co-leader who blends IGL instincts with raw fragging power. Unpredictable rotations, ruthless decision-making, and the firepower to back every call. Keeps the team sharp and enemies on edge.',
      popupDescription: 'Aggressive co-leader with unpredictable IGL calls & raw firepower.',
      ingameName: 'VioLencE UB',
      since: 2019,
      image: '/Line_up/Umang Rana.jpg',
      socials: { discord: 'https://discord.gg/AmezSUbP', instagram: 'https://instagram.com/umangrana', whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu' }
    },
    {
      _id: 'mehul-darji',
      name: 'Mehul Darji',
      role: 'Aggressive Scout & Co-Leader',
      category: 'Organizer',
      kills: 4510,
      winRate: 73,
      description: 'Second co-leader and tactical scout who leads aggressive zone pushes and info plays. Rotations that catch teams off-guard, discipline mixed with aggression, and the leadership to hold composure.',
      popupDescription: 'Tactical scout & co-leader. Aggressive zone control expert.',
      ingameName: 'VioLencE MD',
      since: 2021,
      image: '/Line_up/Mehul Darji.jpg',
      socials: { discord: 'https://discord.gg/AmezSUbP', instagram: 'https://instagram.com/mehuldarji', whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu' }
    },
  ]

  // Creators - Content creators and streamers
  const creators = [
    {
      _id: 'karan-patel',
      name: 'Karan Patel',
      role: 'Entry Fragger / Creator',
      category: 'Creator',
      kills: 5111,
      winRate: 72,
      description: 'Fearless entry specialist who cracks compound doors and creates the chaos that wins fights. Aggressive entries, flawless trades, and the aggression to control zones. The breach that breaks defenses.',
      popupDescription: 'Fearless entry fragger. Cracks compounds with flawless trades.',
      ingameName: 'VioLencE KP',
      since: 2020,
      image: '/Line_up/karan-patel.jpeg',
      socials: { discord: 'https://discord.gg/AmezSUbP', instagram: 'https://instagram.com/karanpatel', whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu' }
    },
    {
      _id: 'purvang-pandya',
      name: 'Purvang Pandya',
      role: 'Elite DMR Specialist / Creator',
      category: 'Creator',
      kills: 4999,
      winRate: 72,
      description: 'Legendary long-range specialist whose precision knocks open every engagement. Clutch DMR plays that shift momentum, ridiculous aim, and the poise to perform under pressure when it matters most.',
      popupDescription: 'Elite DMR specialist with precision knocks & clutch aim.',
      ingameName: 'VioLencE PV',
      since: 2023,
      image: '/Line_up/Purvang Pandya.jpg',
      socials: { discord: 'https://discord.gg/AmezSUbP', instagram: 'https://instagram.com/purvangpandya', whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu' }
    },
  ]

  // Editors - Video editors and content managers
  const editors = [
    {
      _id: 'aayush-panchal',
      name: 'Aayush Panchal',
      role: 'Strategic Analyst / Editor',
      category: 'Editor',
      kills: 4120,
      winRate: 75,
      description: 'Strategic mind who decodes enemy patterns and optimizes team plays. Deep VOD breakdowns, mid-round adjustments, and mental fortitude coaching keep VioLencE one step ahead in every engagement.',
      popupDescription: 'Strategic analyst. VOD breakdown specialist & mental coach.',
      ingameName: 'VioLencE DP',
      since: 2022,
      image: '/Line_up/Aayush Panchal.webp',
      socials: { discord: 'https://discord.gg/AmezSUbP', instagram: 'https://instagram.com/aayushpanchal', whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu' }
    },
    {
      _id: 'harsh-thakor',
      name: 'Harsh Thakor',
      role: 'Support Anchor / Editor',
      category: 'Editor',
      kills: 4269,
      winRate: 69,
      description: 'Steady support anchor who locks down flanks and stabilizes every round. Reliable utility, smart positioning, and the composure to hold zones under fire. The silent protector of VioLencE.',
      popupDescription: 'Support anchor. Locks flanks with reliable utility & composure.',
      ingameName: 'VioLencE HT',
      since: 2023,
      image: '/Line_up/Harsh Thakor.jpg',
      socials: { discord: 'https://discord.gg/AmezSUbP', instagram: 'https://instagram.com/harshthakor', whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu' }
    },
  ]

  const categories = [
    { 
      title: 'Organizers', 
      members: organizers, 
      icon: FaCrown,
      color: 'from-amber-500 to-yellow-600',
      description: 'Leadership team managing clan operations and strategies'
    },
    { 
      title: 'Creators', 
      members: creators, 
      icon: FaVideo,
      color: 'from-purple-500 to-pink-600',
      description: 'Content creators bringing VioLencE to the community'
    },
    { 
      title: 'Editors', 
      members: editors, 
      icon: FaEdit,
      color: 'from-blue-500 to-cyan-600',
      description: 'Production team crafting premium visual content'
    },
  ]

  return (
    <div className="pt-16 sm:pt-20 pb-12 sm:pb-20">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/15 via-dark-950 to-dark-950" />
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute -left-32 -top-32 w-96 h-96 bg-primary-500/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 w-80 h-80 bg-primary-700/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-4 sm:space-y-6 md:space-y-8"
          >
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary-500/15 border border-primary-500/40 text-primary-100 text-xs sm:text-sm font-bold"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                Prime Lineup
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black leading-tight max-w-3xl">
                Team VIOLENCE <span className="gradient-text">Lineup</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
                Aggressive pushes, perfect coordination, and icy clutch factor. This is Team VioLencE.
              </p>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-3xl">
                A roster of sharpshooters, shot-callers, and utility masters forged to dominate every lobby. Click any player to unlock their premium stat card and role impact analysis.
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-primary-500/40 bg-primary-500/10 shadow-lg shadow-primary-900/30"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-primary-500/60 bg-dark-900 flex items-center justify-center p-2 sm:p-2.5 shadow-inner">
                    <img src={formatImagePath(CLAN_LOGO)} alt="Team VioLencE clan crest" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-primary-300 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold">Clan Crest</p>
                    <p className="text-base sm:text-lg font-display font-black text-white">Team VIOLENCE</p>
                    <p className="text-gray-400 text-xs sm:text-sm">Locked, loaded, and LAN ready.</p>
                  </div>
                </motion.div>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {['🔥 Clutch DNA', '🎮 LAN ready', '⚡ Tier-1 scrims'].map((tag) => (
                    <motion.span 
                      key={tag} 
                      whileHover={{ scale: 1.05 }}
                      className="pill text-xs sm:text-sm font-bold tracking-wide"
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

      {/* Team Members by Category - Collapsible Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 space-y-6 sm:space-y-8">
        {categories.map((category, catIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIndex * 0.1 }}
            className="space-y-4"
          >
            {/* Clickable Category Header */}
            <motion.button
              onClick={() => setExpandedCategory(expandedCategory === catIndex ? -1 : catIndex)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all ${
                expandedCategory === catIndex
                  ? `bg-gradient-to-br ${category.color} shadow-2xl border-primary-500/60`
                  : 'bg-gradient-to-br from-dark-900 to-dark-800 border-dark-700 hover:border-primary-500/60 shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg transform transition-transform ${
                    expandedCategory === catIndex ? 'scale-110 rotate-12' : 'group-hover:scale-105'
                  }`}>
                    <category.icon className={`text-white text-xl sm:text-2xl ${expandedCategory === catIndex ? 'text-white' : ''}`} />
                  </div>
                  <div className="text-left">
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-display font-black ${
                      expandedCategory === catIndex ? 'text-white' : 'gradient-text'
                    }`}>
                      {category.title}
                    </h2>
                    <p className={`text-xs sm:text-sm font-medium ${
                      expandedCategory === catIndex ? 'text-white/90' : 'text-gray-400'
                    }`}>
                      {category.description}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedCategory === catIndex ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`text-2xl flex-shrink-0 ml-4 ${expandedCategory === catIndex ? 'text-white' : 'text-primary-400'}`}
                >
                  <FaChevronDown />
                </motion.div>
              </div>
            </motion.button>

            {/* Collapsible Members Grid */}
            <AnimatePresence>
              {expandedCategory === catIndex && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    exit={{ y: -20 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6"
                  >
                    {category.members.map((member, index) => {
                      const displayMember = {
                        ...member,
                        image: member.image || CLAN_LOGO,
                        kills: member.kills || 0,
                        winRate: member.winRate || 0,
                        description: member.description || 'Locked-in competitor ready to punish any misplay in the late circles.'
                      }
                      
                      return (
                        <motion.div
                          key={member._id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.08 }}
                          whileHover={{ y: -8, scale: 1.02 }}
                          className="card-interactive group cursor-pointer rounded-2xl overflow-hidden border border-dark-700 hover:border-primary-500/60 bg-gradient-to-br from-dark-900 to-dark-800 p-5 sm:p-6 space-y-4"
                          onClick={() => setSelected(displayMember)}
                        >
                          {/* Member Image */}
                          <div className="relative overflow-hidden rounded-xl">
                            <div className="aspect-video bg-gradient-to-br from-primary-600/20 to-primary-800/20 flex items-center justify-center border border-primary-500/30 group-hover:border-primary-500/60 transition-all">
                              {member.image ? (
                                <img
                                  src={formatImagePath(member.image)}
                                  alt={member.name}
                                  onError={handleImageError}
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
                          <div className="space-y-3">
                            <div>
                              <h3 className="text-xl sm:text-2xl font-display font-bold mb-1 group-hover:gradient-text transition-all">
                                {member.name}
                              </h3>
                              <p className="text-primary-400 font-bold text-xs uppercase tracking-widest">
                                {member.role}
                              </p>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                              {member.description}
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-2">
                              <div className="glass-card p-3 text-center rounded-lg">
                                <div className="text-lg font-bold gradient-text">{member.kills}+</div>
                                <div className="text-xs text-gray-400 uppercase font-bold mt-0.5">Kills</div>
                              </div>
                              <div className="glass-card p-3 text-center rounded-lg">
                                <div className="text-lg font-bold gradient-text">{member.winRate}%</div>
                                <div className="text-xs text-gray-400 uppercase font-bold mt-0.5">Win Rate</div>
                              </div>
                            </div>

                            {/* Social Links */}
                            <div className="flex space-x-2 pt-2">
                              {member.socials?.discord && (
                                <motion.a
                                  href={member.socials.discord}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.2, rotate: 10 }}
                                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-dark-800 hover:bg-primary-600 text-gray-400 hover:text-white transition-all border border-dark-700 hover:border-primary-500"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <FaDiscord size={16} />
                                </motion.a>
                              )}
                              {member.socials?.instagram && (
                                <motion.a
                                  href={member.socials.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.2, rotate: 10 }}
                                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-dark-800 hover:bg-primary-600 text-gray-400 hover:text-white transition-all border border-dark-700 hover:border-primary-500"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <FaInstagram size={16} />
                                </motion.a>
                              )}
                              {member.socials?.youtube && (
                                <motion.a
                                  href={member.socials.youtube}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.2, rotate: 10 }}
                                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-dark-800 hover:bg-primary-600 text-gray-400 hover:text-white transition-all border border-dark-700 hover:border-primary-500"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <FaYoutube size={16} />
                                </motion.a>
                              )}
                              {member.socials?.whatsapp && (
                                <motion.a
                                  href={member.socials.whatsapp}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.2, rotate: 10 }}
                                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-dark-800 hover:bg-primary-600 text-gray-400 hover:text-white transition-all border border-dark-700 hover:border-primary-500"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <FaWhatsapp size={16} />
                                </motion.a>
                              )}
                            </div>

                            <motion.button 
                              whileHover={{ x: 5 }}
                              className="mt-2 text-primary-300 hover:text-primary-200 font-bold inline-flex items-center text-xs uppercase tracking-widest" 
                              onClick={(e) => { e.stopPropagation(); setSelected(displayMember) }}
                            >
                              View Profile
                              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
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
              className="relative w-full max-w-4xl glass-strong rounded-3xl p-4 sm:p-6 border border-primary-500/40 overflow-hidden max-h-[90vh] overflow-y-auto md:overflow-hidden"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="overflow-hidden rounded-2xl border-2 border-primary-500/40 h-64 sm:h-72 md:h-[400px]"
                >
                  <img 
                    src={formatImagePath(selected.image)} 
                    alt={selected.name} 
                    onError={handleImageError}
                    className="w-full h-full object-cover object-center" 
                  />
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
                        <p className="text-sm text-primary-100">{selected.ingameName}</p>
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
                      {selected.socials?.whatsapp && (
                        <motion.a 
                          href={selected.socials.whatsapp} 
                          target="_blank" 
                          rel="noreferrer"
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600/20 to-primary-700/20 border border-primary-500/30 hover:border-primary-500/70 flex items-center justify-center text-gray-400 hover:text-primary-300 transition-all"
                        >
                          <FaWhatsapp size={18} />
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

