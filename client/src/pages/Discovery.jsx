import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaFire, FaTrophy, FaUsers, FaRocket, FaChartLine, FaStar, FaCheck, FaArrowRight, FaGamepad, FaMedal } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Discovery = () => {
  const [activeYear, setActiveYear] = useState('2025')
  const [expandedValue, setExpandedValue] = useState(-1)

  const journey = [
    {
      year: '2019',
      title: '🌱 Genesis — Basement Dreams',
      phase: 'STRUGGLE TO SURVIVAL',
      summary: 'It started with late nights, old PCs, and a dream bigger than our budget. No sponsors, no recognition — just passion and a promise to build something real in esports.',
      fullStory: 'The year 2019 marked the birth of Team VioLencE, not in a fancy studio, but in a basement with donated equipment and pure determination. Our founder, Dev Patel, along with a handful of friends, started organizing scrims and small local tournaments with their own money. Every rupee earned was reinvested back into the community.',
      highlights: [
        'Zero budget, pure passion',
        'Small scrims & local rooms',
        'Learning tournament systems',
        'First core community formed',
        'Building foundational relationships',
        'Early brand identity creation'
      ],
      keyAchievements: [
        'Organized first 2 official tournaments',
        'Built core team of 5 passionate players',
        'Created basic tournament management system',
        'Established Discord community',
        'Zero external funding - self-funded entirely'
      ],
      stats: { events: '2', members: '5', investment: '₹0', reach: '~500' },
      color: 'from-orange-500 to-red-500',
      gradient: 'via-orange-700'
    },
    {
      year: '2020',
      title: '💪 Pandemic Pivot — Online Revolution',
      phase: 'GRIND TO GROWTH',
      summary: 'The world locked down, but we pushed forward. We organized online tournaments with personal savings and earned trust one match at a time.',
      fullStory: 'When COVID-19 locked everything down, Team VioLencE saw an opportunity. We pivoted completely to online tournaments, investing our personal savings into prize pools. This year was transformative — we ran 12 tournaments, each one bigger than the last. The community responded with unwavering support, and we earned our first sponsor partnerships.',
      highlights: [
        'First organized online tournaments',
        'Self-funded prize pools',
        'Weekly player growth',
        'Community credibility earned',
        'Professional tournament structure',
        'Multi-game expansion started'
      ],
      keyAchievements: [
        'Organized 12 online tournaments',
        'Community grew from 5 to 150 members',
        'First sponsor partnerships formed',
        'Prize pool exceeded ₹50K',
        'Launched weekly community events',
        'Professional rules & regulations implemented'
      ],
      stats: { events: '12', members: '150', investment: '₹50K', reach: '~5K' },
      color: 'from-yellow-500 to-orange-500',
      gradient: 'via-yellow-600'
    },
    {
      year: '2021-2022',
      title: '🚀 Breakthrough — Recognition Arrives',
      phase: 'GROWTH TO PROFESSIONALISM',
      summary: 'Hard work finally paid off. Sponsors noticed, prize pools grew, and the first professional teams were built under Team VioLencE.',
      fullStory: 'These two years marked our meteoric rise. Major sponsors like energy drinks and gaming peripherals came on board. We organized our first ₹1L+ prize pool tournament, assembled professional teams, and hired our first operations manager. The scene began recognizing Team VioLencE as a serious player in Indian esports.',
      highlights: [
        'First ₹1L+ prize pool',
        'Professional team formations',
        'Sponsor partnerships',
        'Streaming + production setup',
        'Expanded tournament portfolio',
        'International exposure began'
      ],
      keyAchievements: [
        'Organized 24 major tournaments',
        'Community grew to 800+ members',
        'Signed 3 professional BGMI teams',
        'Prize distribution crossed ₹5L',
        'Professional streaming studio launched',
        'Media coverage from major outlets',
        'First international tournament held'
      ],
      stats: { events: '24', members: '800', investment: '₹5L', reach: '~50K' },
      color: 'from-green-500 to-cyan-500',
      gradient: 'via-green-600'
    },
    {
      year: '2023-2024',
      title: '👑 Premium Era — The Big League',
      phase: 'PROFESSIONAL TO PREMIUM',
      summary: 'We went premium. High‑production tournaments, brand partnerships, and large prize pools made Team VioLencE a name across the scene.',
      fullStory: 'By 2023-2024, Team VioLencE had become a household name in Indian esports. We organized premium tournaments with cinematic production quality, signed partnership deals with major brands, and hosted events with prize pools exceeding ₹50L. Our teams competed at the highest level, and our community became one of the most engaged in the country.',
      highlights: [
        'Multiple ₹5L+ tournaments',
        'Brand + media partnerships',
        'Professional operations team',
        'Premium streaming quality',
        'International team signings',
        'Season-based tournament formats'
      ],
      keyAchievements: [
        'Organized 40 premium tournaments',
        'Community reached 3000+ members',
        'Assembled 6 professional teams',
        'Prize distribution crossed ₹50L',
        'Premium broadcast studio with 4K streaming',
        'Partnership with major gaming brands',
        'Live events with 5000+ spectators',
        'Ranked #1 esports organizer in India'
      ],
      stats: { events: '40', members: '3000', investment: '₹50L+', reach: '~500K' },
      color: 'from-purple-500 to-pink-500',
      gradient: 'via-purple-600'
    },
    {
      year: '2025',
      title: '⭐ The Glory — Present & Future',
      phase: 'EXCELLENCE & EXPANSION',
      summary: 'Today we are a premier esports organizer with world‑class tournaments, pro teams, and a loyal community. The future is limitless.',
      fullStory: 'In 2025, Team VioLencE stands as the undisputed leader of Indian esports. We organize world-class tournaments, manage 8+ professional teams, and have distributed over ₹1 crore in prize money. Our vision for the future includes global expansion, youth academy development, and establishing esports as a mainstream career path in India.',
      highlights: [
        'World‑class tournament infrastructure',
        'Multiple professional teams',
        '₹1Cr+ prize distributions',
        'Global recognition & partnerships',
        'Youth academy launched',
        'Next-gen esports ecosystem'
      ],
      keyAchievements: [
        'Organized 50+ major tournaments',
        'Community reached 5000+ members',
        'Managing 8+ professional BGMI teams',
        'Prize distribution crossed ₹1Cr+',
        'State-of-the-art tournament infrastructure',
        'International sponsorship deals',
        'Live events with 10,000+ spectators',
        'Esports academy for young talent',
        'Broadcasting reach: 5M+ across platforms'
      ],
      stats: { events: '50+', members: '5000+', investment: '₹1Cr+', reach: '~5M' },
      color: 'from-cyan-500 to-blue-500',
      gradient: 'via-cyan-600'
    }
  ]

  const storySummary = [
    {
      icon: FaFire,
      title: 'Humble Origins',
      desc: 'We started from the ground with no sponsors, no studio, and no shortcuts — only belief and grit.',
      detailed: 'From a basement in 2019, with zero funding, to managing premium tournaments in 2025. Every step was earned through hard work.'
    },
    {
      icon: FaRocket,
      title: 'Relentless Grind',
      desc: 'From 2019 to 2022, we organized events, built trust, and reinvested every win back into the community.',
      detailed: 'We turned overnight shifts into tournament success. Every profit was reinvested to grow bigger and better.'
    },
    {
      icon: FaStar,
      title: 'Premium Today',
      desc: 'Now we deliver premium tournaments, pro teams, and a full ecosystem for serious competitors.',
      detailed: 'Today, Team VioLencE is the benchmark for excellence in Indian esports with world-class standards.'
    }
  ]

  const milestones = [
    { year: '2019', event: 'Founded', emoji: '🎮', detail: 'Started in basement with passion' },
    { year: '2020', event: 'First Tournament', emoji: '🏆', detail: 'First official online tournament' },
    { year: '2021', event: 'Pro Teams Formed', emoji: '👥', detail: 'Assembled professional BGMI roster' },
    { year: '2022', event: '₹5L+ Prize Pool', emoji: '💰', detail: 'Crossed major prize milestone' },
    { year: '2023', event: 'Premium Studios', emoji: '📺', detail: '4K broadcast studio launched' },
    { year: '2024', event: 'Brand Leader', emoji: '👑', detail: 'Ranked #1 esports organizer' },
    { year: '2025', event: 'Academy Launch', emoji: '🎓', detail: 'Youth esports academy created' }
  ]

  const stats = [
    { icon: FaTrophy, label: 'Tournaments', value: '50+', trend: '↑ 2500%', detail: 'From 2 to 50+ major events' },
    { icon: FaUsers, label: 'Community', value: '5000+', trend: '↑ 100,000%', detail: 'Global reach of 5M+' },
    { icon: FaGamepad, label: 'Prize Pool', value: '₹1Cr+', trend: '↑ ∞', detail: 'From ₹0 to ₹1 Crore+' },
    { icon: FaMedal, label: 'Pro Teams', value: '8+', trend: '↑ Growing', detail: 'Multiple title-winning squads' }
  ]

  const values = [
    {
      icon: '🔥',
      title: 'Passion First',
      shortDesc: 'We live and breathe competitive gaming.',
      fullDesc: 'Every tournament is crafted with pure passion and dedication to the game. Our team bleeds for esports and it shows in every event we organize.',
      color: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/30'
    },
    {
      icon: '👥',
      title: 'Community Focused',
      shortDesc: 'Our players are our family.',
      fullDesc: 'We grow together, win together, celebrate together. Your success is our success. We invest in building lasting relationships with every member of our community.',
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: '💎',
      title: 'Premium Quality',
      shortDesc: 'Excellence is non-negotiable.',
      fullDesc: 'World-class infrastructure, 4K streaming, professional commentary, and premium venue setups. We never compromise on quality.',
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30'
    },
    {
      icon: '⚔️',
      title: 'Fair & Transparent',
      shortDesc: 'Every result is honest.',
      fullDesc: 'Every tournament is fair, every result is transparent, and your trust is our foundation. We maintain the highest standards of integrity.',
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30'
    }
  ]

  const futureVision = [
    {
      icon: '🌍',
      title: 'Global Expansion',
      desc: 'Taking Team VioLencE tournaments to international stage and competing with global esports giants.'
    },
    {
      icon: '🎓',
      title: 'Youth Academy',
      desc: 'Building the next generation of esports athletes with professional coaching and mentorship programs.'
    },
    {
      icon: '🏢',
      title: 'Physical Stadiums',
      desc: 'Creating dedicated esports arenas for live tournaments with capacity for thousands of spectators.'
    },
    {
      icon: '💼',
      title: 'Career Platform',
      desc: 'Establishing esports as a mainstream career path with sponsorships and professional contracts for athletes.'
    }
  ]

  const activeJourney = journey.find(j => j.year === activeYear)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black pt-24 pb-20 px-4 sm:px-6 relative overflow-hidden">
      {/* ===== PREMIUM HERO SECTION ===== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mb-24"
      >
        <div className="relative text-center">
          {/* Animated glow orbs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-block mb-8 relative z-10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-3xl opacity-60 rounded-full w-28 h-28" />
              <div className="relative text-8xl animate-pulse">🎮</div>
            </div>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight relative z-10">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse">VioLencE</span> Journey
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 relative z-10">
            From a basement dream in 2019 to India's premier esports organizer — every struggle, every sacrifice, every victory. This is our complete story.
          </p>

          <div className="flex flex-wrap justify-center gap-3 relative z-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-2 border-cyan-500/60 text-cyan-300 font-bold text-sm backdrop-blur-md hover:border-cyan-400 transition-all"
            >
              ✨ Since 2019
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-2 border-purple-500/60 text-purple-300 font-bold text-sm backdrop-blur-md hover:border-purple-400 transition-all"
            >
              🏆 Industry Leaders
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-2 border-green-500/60 text-green-300 font-bold text-sm backdrop-blur-md hover:border-green-400 transition-all"
            >
              📈 2500% Growth
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ===== STORY SUMMARY CARDS ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-24"
      >
        <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12">Our Three Acts</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {storySummary.map((card, idx) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-slate-900/98 via-slate-950/98 to-black/98 backdrop-blur-xl border border-slate-700/70 rounded-2xl p-8 hover:border-slate-600 transition-all overflow-hidden">
                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/40 to-purple-500/40 mb-6 border border-cyan-500/50"
                    >
                      <Icon className="text-3xl text-cyan-300" />
                    </motion.div>
                    <h3 className="text-2xl font-black text-white mb-3">{card.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">{card.desc}</p>
                    <p className="text-gray-400 text-xs leading-relaxed italic border-l-2 border-cyan-500/50 pl-3">{card.detailed}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* ===== TIMELINE SELECTOR ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-8"
      >
        <h2 className="text-2xl font-black text-white text-center mb-8">Journey Through The Years</h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {journey.map((item) => (
            <motion.button
              key={item.year}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveYear(item.year)}
              className={`px-5 sm:px-7 py-3 sm:py-4 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 relative overflow-hidden group ${
                activeYear === item.year
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-2xl shadow-cyan-500/60 border border-cyan-400/60'
                  : 'bg-slate-800/60 text-gray-300 border border-slate-700/60 hover:border-slate-600 hover:bg-slate-800/80'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] ${activeYear === item.year ? 'group-hover:translate-x-[100%]' : ''} transition-transform duration-700`} />
              <span className="relative">{item.year}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ===== MILESTONE STRIP ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-20 overflow-hidden"
      >
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {milestones.map((milestone, idx) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-slate-800/70 to-slate-800/50 border border-slate-700/60 text-gray-300 text-xs sm:text-sm font-bold hover:border-slate-600 transition-all cursor-help group relative"
              title={milestone.detail}
            >
              <span className="text-xl group-hover:scale-125 transition-transform">{milestone.emoji}</span>
              <span className="text-white font-black">{milestone.year}</span>
              <span className="hidden sm:inline text-slate-500">•</span>
              <span className="hidden sm:inline">{milestone.event}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ===== ACTIVE YEAR DETAILED CARD ===== */}
      {activeJourney && (
        <motion.div
          key={activeYear}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto mb-24"
        >
          <div className="relative group">
            {/* Animated background glow */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${activeJourney.color} rounded-[28px] blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-500`} />
            
            <div className="relative bg-gradient-to-br from-slate-900/98 via-slate-950/98 to-black/98 backdrop-blur-xl border-2 border-gradient rounded-[28px] overflow-hidden p-8 sm:p-12"
              style={{
                borderImage: `linear-gradient(135deg, ${activeJourney.color}) 1`
              }}
            >
              {/* Accent line at top */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${activeJourney.color}`} />

              <div className="relative space-y-8">
                {/* Phase & Year Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${activeJourney.color} text-white font-black text-sm w-fit shadow-lg shadow-current/50`}
                  >
                    <span className="text-lg">✨</span>
                    {activeJourney.phase}
                  </motion.div>
                  <div className={`text-4xl font-black bg-gradient-to-r ${activeJourney.color} text-transparent bg-clip-text`}>
                    {activeJourney.year}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">{activeJourney.title}</h2>
                  <p className="text-lg text-gray-300 leading-relaxed">{activeJourney.summary}</p>
                </div>

                {/* Full Story */}
                <div className="border-l-4 border-cyan-500/50 pl-6 py-4 bg-slate-800/30 rounded-r-lg">
                  <p className="text-gray-300 text-base leading-relaxed italic">{activeJourney.fullStory}</p>
                </div>

                {/* Highlights Grid */}
                <div>
                  <h3 className="text-xl font-black text-white mb-4">Key Highlights</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {activeJourney.highlights.map((highlight, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 transition-all group cursor-pointer"
                      >
                        <div className={`text-xl mt-0.5 font-black text-transparent bg-clip-text bg-gradient-to-r ${activeJourney.color} group-hover:scale-125 transition-transform`}>✓</div>
                        <p className="text-gray-200 font-semibold text-sm sm:text-base">{highlight}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Major Achievements */}
                <div>
                  <h3 className="text-xl font-black text-white mb-4">Major Achievements</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {activeJourney.keyAchievements.map((achievement, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.06 }}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-slate-800/60 to-slate-800/30 border border-slate-700/40 hover:border-purple-500/30 transition-all"
                      >
                        <FaStar className={`text-lg text-transparent bg-clip-text bg-gradient-to-r ${activeJourney.color}`} />
                        <span className="text-gray-300 text-sm">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Stats Card */}
                <div className="border-t border-slate-700/50 pt-8">
                  <h3 className="text-lg font-black text-white mb-6">Impact By Numbers</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: 'Events', value: activeJourney.stats.events },
                      { label: 'Members', value: activeJourney.stats.members },
                      { label: 'Investment', value: activeJourney.stats.investment },
                      { label: 'Reach', value: activeJourney.stats.reach }
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="text-center p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
                      >
                        <div className={`text-2xl sm:text-3xl font-black bg-gradient-to-r ${activeJourney.color} text-transparent bg-clip-text mb-2`}>
                          {stat.value}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider font-bold">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ===== OVERALL STATS SECTION ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-24"
      >
        <h2 className="text-4xl sm:text-5xl font-black text-white text-center mb-4">
          By The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Numbers</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">Our complete impact across 6 incredible years</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -12, scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-cyan-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-8 text-center hover:border-slate-600 transition-all overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <Icon className="w-14 h-14 text-cyan-400 mx-auto mb-4 group-hover:scale-125 group-hover:text-purple-400 transition-all" />
                  <div className="text-5xl font-black text-white mb-2">{stat.value}</div>
                  <p className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-4">{stat.label}</p>
                  <div className="flex items-center justify-center gap-1 text-green-400 font-black text-sm mb-3">{stat.trend}</div>
                  <p className="text-xs text-gray-500">{stat.detail}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* ===== CORE VALUES SECTION ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-24"
      >
        <h2 className="text-4xl sm:text-5xl font-black text-white text-center mb-4">
          What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Stand For</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">The pillars that define Team VioLencE</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setExpandedValue(expandedValue === idx ? -1 : idx)}
              className="relative group text-left"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500" />
              <div className={`relative bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-8 hover:border-slate-600 transition-all ${value.color} ${value.borderColor}`}>
                <div className="text-5xl mb-4 text-center">{value.icon}</div>
                <h3 className="text-xl font-black text-white mb-3 text-center">{value.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed text-center mb-4">{value.shortDesc}</p>
                {expandedValue === idx && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-xs text-gray-400 leading-relaxed border-t border-slate-600/50 pt-4 mt-4"
                  >
                    {value.fullDesc}
                  </motion.p>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ===== FUTURE VISION ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-24"
      >
        <h2 className="text-4xl sm:text-5xl font-black text-white text-center mb-4">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Future Vision</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">Where we're heading next</p>

        <div className="grid sm:grid-cols-2 gap-6">
          {futureVision.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all" />
              <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-8 hover:border-slate-600 transition-all">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ===== CTA SECTION ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="relative bg-gradient-to-r from-slate-900/98 via-purple-900/40 to-slate-900/98 backdrop-blur-3xl border-2 border-purple-500/50 rounded-[32px] overflow-hidden p-10 sm:p-16 text-center group"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-7xl mb-8 inline-block"
            >
              🚀
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Ready to Be Part of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">The Story?</span>
            </h2>
            
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of competitive gamers in India's premier esports community. Compete at the highest level, win prizes, and write your own success story with Team VioLencE.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tournaments"
                className="relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-black text-white uppercase tracking-wider text-sm overflow-hidden group/btn bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 shadow-xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all border border-cyan-400/60 hover:border-cyan-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                <FaRocket className="relative text-base" />
                <span className="relative">Explore Tournaments</span>
                <FaArrowRight className="relative text-base group-hover/btn:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/register"
                className="relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-black text-white uppercase tracking-wider text-sm overflow-hidden group/btn bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border border-slate-600/80 hover:border-slate-500 transition-all"
              >
                <FaCheck className="relative text-base" />
                <span className="relative">Join Now</span>
              </Link>
            </div>

            <p className="text-gray-500 text-xs mt-8">
              Questions? Check out our <Link to="/about" className="text-cyan-400 hover:text-cyan-300 font-bold">About page</Link> or contact support
            </p>
          </div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="fixed -bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}

export default Discovery
