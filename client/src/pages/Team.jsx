import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDiscord, FaInstagram, FaYoutube, FaWhatsapp, FaCrown, FaVideo, FaEdit, FaArrowRight } from 'react-icons/fa'

const CLAN_LOGO = '/Line_up/logo.png'

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(0)

  const formatImagePath = (path) => {
    if (!path) return ''
    if (path.startsWith('http')) return path
    return path.split('/').map(part => part ? encodeURIComponent(part) : part).join('/')
  }

  const handleImageError = (e) => {
    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%231f2937" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="%236b7280"%3EImage Loading%3C/text%3E%3C/svg%3E'
  }

  // All members data
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
    {
      _id: 'aayush-panchal',
      name: 'Aayush Panchal',
      role: 'Strategic Analyst / Creator',
      category: 'Creator',
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
      role: 'Support Anchor / Creator',
      category: 'Creator',
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
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      description: 'Leadership team managing clan operations and strategies'
    },
    { 
      title: 'Creators', 
      members: creators, 
      icon: FaVideo,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      description: 'Creators bringing VioLencE to the community'
    },
  ]

  const currentCategory = categories[selectedCategory]
  const displayMember = selectedMember || currentCategory.members[0]

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
                Meet the elite roster. Click any member to explore their premium profile and role expertise.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Category Grid with Modal */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="space-y-12">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
              className="space-y-6"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 pb-6 border-b border-primary-500/20">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <category.icon className="text-white text-2xl" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-display font-black gradient-text">
                    {category.title}
                  </h2>
                  <p className="text-gray-400 text-sm">{category.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary-400">{category.members.length}</p>
                  <p className="text-xs text-gray-400 uppercase font-bold">Members</p>
                </div>
              </div>

              {/* Members Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.members.map((member, idx) => (
                  <motion.button
                    key={member._id}
                    onClick={() => setSelectedMember(member)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative overflow-hidden rounded-2xl border-2 transition-all cursor-pointer ${
                      category.borderColor
                    } ${category.bgColor} backdrop-blur-sm`}
                  >
                    {/* Member Image */}
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={formatImagePath(member.image)}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={handleImageError}
                      />
                    </div>

                    {/* Info Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-bold text-sm">{member.name}</p>
                      <p className="text-primary-300 text-xs">{member.role.split('/')[0]}</p>
                    </div>

                    {/* Static Info */}
                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-white text-sm line-clamp-1">{member.name}</h3>
                      <p className="text-primary-300 text-xs font-bold uppercase">{member.role.split('/')[0]}</p>
                      <div className="flex gap-2 pt-2">
                        <div className="text-center flex-1 bg-dark-900/50 rounded-lg p-2">
                          <div className="text-sm font-bold gradient-text">{member.kills}+</div>
                          <div className="text-xs text-gray-400">Kills</div>
                        </div>
                        <div className="text-center flex-1 bg-dark-900/50 rounded-lg p-2">
                          <div className="text-sm font-bold gradient-text">{member.winRate}%</div>
                          <div className="text-xs text-gray-400">WR</div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Premium Member Profile Modal */}
      <AnimatePresence>
        {selectedMember && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 30 }}
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                className="relative w-full max-w-2xl rounded-3xl border-2 border-primary-500/50 bg-gradient-to-br from-dark-850 via-dark-900 to-dark-950 shadow-2xl pointer-events-auto overflow-hidden"
              >
                {/* Background Glow Effect */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
                
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white flex items-center justify-center transition-all shadow-lg font-bold text-lg"
                >
                  ✕
                </motion.button>

                {/* Main Content - Square Layout */}
                <div className="relative z-10 flex flex-col sm:flex-row">
                  {/* Left Side - Image */}
                  <div className="w-full sm:w-2/5 h-80 relative overflow-hidden">
                    <img
                      src={formatImagePath(selectedMember.image)}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-sm uppercase shadow-lg">
                      {selectedMember.category}
                    </div>
                  </div>

                  {/* Right Side - Info */}
                  <div className="w-full sm:w-3/5 p-6 sm:p-8 flex flex-col justify-between">
                    {/* Header */}
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-3xl font-display font-black text-white leading-tight">
                          {selectedMember.name}
                        </h2>
                        <p className="text-primary-400 font-bold uppercase tracking-widest text-xs mt-2">
                          {selectedMember.role}
                        </p>
                      </div>

                      {/* Quick Stats - Horizontal */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-dark-800/60 backdrop-blur rounded-lg p-3 border border-primary-500/20">
                          <div className="text-2xl font-bold gradient-text">{selectedMember.kills}+</div>
                          <div className="text-xs text-gray-400 uppercase font-bold mt-1">Kills</div>
                        </div>
                        <div className="bg-dark-800/60 backdrop-blur rounded-lg p-3 border border-primary-500/20">
                          <div className="text-2xl font-bold gradient-text">{selectedMember.winRate}%</div>
                          <div className="text-xs text-gray-400 uppercase font-bold mt-1">Win</div>
                        </div>
                        <div className="bg-dark-800/60 backdrop-blur rounded-lg p-3 border border-primary-500/20">
                          <div className="text-2xl font-bold gradient-text">{selectedMember.since}</div>
                          <div className="text-xs text-gray-400 uppercase font-bold mt-1">Since</div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="bg-dark-800/40 backdrop-blur rounded-lg p-4 border border-primary-500/20">
                        <p className="text-xs text-gray-300 leading-relaxed">{selectedMember.description}</p>
                      </div>
                    </div>

                    {/* IGN and Social */}
                    <div className="space-y-3">
                      {/* IGN */}
                      <div className="bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-lg p-3 border border-primary-500/30">
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">In-Game Name</p>
                        <p className="text-lg font-bold text-primary-300">{selectedMember.ingameName}</p>
                      </div>

                      {/* Social Links */}
                      <div className="flex gap-2">
                        {selectedMember.socials?.discord && (
                          <motion.a
                            href={selectedMember.socials.discord}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.08, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600/40 to-blue-500/40 hover:from-blue-600 hover:to-blue-500 text-blue-300 hover:text-white transition-all border border-blue-500/30 font-bold text-xs"
                          >
                            <FaDiscord size={14} />
                            Discord
                          </motion.a>
                        )}
                        {selectedMember.socials?.instagram && (
                          <motion.a
                            href={selectedMember.socials.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.08, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-pink-600/40 to-pink-500/40 hover:from-pink-600 hover:to-pink-500 text-pink-300 hover:text-white transition-all border border-pink-500/30 font-bold text-xs"
                          >
                            <FaInstagram size={14} />
                            Instagram
                          </motion.a>
                        )}
                        {selectedMember.socials?.whatsapp && (
                          <motion.a
                            href={selectedMember.socials.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.08, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-green-600/40 to-green-500/40 hover:from-green-600 hover:to-green-500 text-green-300 hover:text-white transition-all border border-green-500/30 font-bold text-xs"
                          >
                            <FaWhatsapp size={14} />
                            WhatsApp
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Clan Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6 sm:space-y-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black">
            The <span className="gradient-text">VioLencE</span> Story
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built from the ground up by Dev Patel's vision, Team VioLencE combines strategic brilliance with raw mechanical skill. Every member bleeds the colors, every round is a battle, and every victory is earned.
          </p>

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
