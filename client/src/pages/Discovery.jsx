import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaFire, FaTrophy, FaUsers, FaRocket, FaChartLine, FaStar, FaCheck, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Discovery = () => {
  const [activeTab, setActiveTab] = useState('journey')

  const journeyMilestones = [
    {
      year: '2019',
      title: 'The Struggle Begins',
      subtitle: 'From Dreams to Grassroots',
      description: 'Everything started with a dream and passion. In 2019, Team VioLencE was born from the basement of passionate gamers who believed that gaming could be more than just a hobby. With limited resources, zero budget, and just pure love for competitive gaming, we started from scratch. The struggle was real – no sponsors, no recognition, but endless determination.',
      icon: '🌱',
      challenges: ['No funding', 'Limited visibility', 'Competing solo', 'Building from zero'],
      color: 'from-orange-500 to-red-500'
    },
    {
      year: '2020',
      title: 'The Grind Years',
      subtitle: 'Building Community Through Sweat',
      description: 'The pandemic changed everything. When the world shut down, we found our moment. We started organizing online tournaments with minimal equipment. What started as small gatherings became regular events. Every tournament was organized with our own money, every player was a friend, and every victory was collective.',
      icon: '💪',
      challenges: ['Limited resources', 'Building credibility', 'Growing online presence', 'Hardware limitations'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      year: '2021-2022',
      title: 'Breakthrough Phase',
      subtitle: 'Recognition & Growth',
      description: 'Hard work paid off. We started getting recognition from gaming communities. Sponsors began to take interest in what we were building. The first major tournaments with decent prize pools happened. Our community grew from dozens to hundreds. We invested back into the ecosystem, better tournaments, better infrastructure, and professional management.',
      icon: '🚀',
      challenges: ['Scaling challenges', 'Professional management', 'Maintaining quality', 'Growing pains'],
      color: 'from-green-500 to-cyan-500'
    },
    {
      year: '2023-2024',
      title: 'Premium Era',
      subtitle: 'Going Big League',
      description: 'From grassroots to premium. We launched large-scale tournaments with substantial prize pools, professional streaming, and partnerships with major brands. The journey from zero to hero became a testament to consistent effort and community dedication. We established ourselves as a premier tournament organizer in the gaming industry.',
      icon: '👑',
      challenges: ['Maintaining standards', 'International expansion', 'Technology infrastructure', 'Talent management'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      year: '2025',
      title: 'The Present Glory',
      subtitle: 'Premium & Professional',
      description: 'Today, Team VioLencE stands as a beacon of excellence in competitive gaming. We host world-class tournaments, manage professional teams, and create gaming experiences that rival international standards. From a small group of passionate gamers to a multi-team organization – the struggle paid off.',
      icon: '⭐',
      achievements: ['Multiple tournaments', 'Professional teams', 'Premium infrastructure', 'Global recognition'],
      color: 'from-cyan-500 to-blue-500'
    }
  ]

  const stats = [
    { icon: FaTrophy, label: 'Tournaments Hosted', value: '50+', color: 'from-amber-500 to-orange-500' },
    { icon: FaUsers, label: 'Active Members', value: '5000+', color: 'from-cyan-500 to-blue-500' },
    { icon: FaRocket, label: 'Prize Pools', value: '₹1Cr+', color: 'from-purple-500 to-pink-500' },
    { icon: FaChartLine, label: 'Growth Rate', value: '300%', color: 'from-green-500 to-emerald-500' }
  ]

  const coreValues = [
    {
      title: 'Passion',
      description: 'We play to win, but we love the game even more. Every tournament is organized with pure passion.',
      icon: '🔥'
    },
    {
      title: 'Community',
      description: 'Our strength is in our community. We believe in uplifting every gamer who joins us.',
      icon: '👥'
    },
    {
      title: 'Excellence',
      description: 'Premium quality in everything. From tournaments to infrastructure, excellence is non-negotiable.',
      icon: '✨'
    },
    {
      title: 'Integrity',
      description: 'Fair play, transparency, and honesty form the foundation of everything we do.',
      icon: '⚔️'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black pt-24 pb-20 px-4 sm:px-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mb-16"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-2xl opacity-40 rounded-full" />
              <div className="relative text-6xl sm:text-7xl">👑</div>
            </div>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">The VioLencE Story</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            From basement dreams in 2019 to premium gaming tournaments today. A journey of struggle, passion, and relentless pursuit of excellence.
          </p>
        </div>
      </motion.div>

      {/* Timeline Section */}
      <div className="max-w-5xl mx-auto mb-20">
        <div className="space-y-8">
          {journeyMilestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className={`relative bg-gradient-to-br from-slate-900/95 via-slate-950/95 to-black/95 backdrop-blur-3xl border-2 border-slate-700/50 rounded-[24px] overflow-hidden p-8 sm:p-10 hover:border-slate-600/80 transition-all duration-300 shadow-2xl`}>
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${milestone.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-[24px]`} />

                <div className="relative">
                  {/* Year Badge */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${milestone.color} mb-5 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <span className="text-2xl font-black text-white">{milestone.year.slice(-2)}</span>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                      {milestone.title}
                    </h3>
                    <p className="text-cyan-400 font-bold text-sm mb-3 uppercase tracking-widest">
                      {milestone.subtitle}
                    </p>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-5">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Challenges or Achievements */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(milestone.challenges || milestone.achievements || []).map((item, idx) => (
                      <div
                        key={idx}
                        className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-lg p-3 text-center hover:border-slate-600/80 transition-all"
                      >
                        <p className="text-gray-200 font-bold text-xs sm:text-sm">{item}</p>
                      </div>
                    ))}
                  </div>

                  {/* Icon */}
                  <div className="absolute top-8 right-8 text-5xl opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    {milestone.icon}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
            By The Numbers
          </h2>
          <p className="text-gray-400 text-lg">Our impact in the gaming community</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-300`} />
                <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-950/95 border border-slate-700/50 rounded-2xl p-8 text-center hover:border-slate-600/80 transition-all duration-300">
                  <Icon className={`w-10 h-10 mx-auto mb-4 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`} />
                  <p className="text-4xl font-black text-white mb-2">{stat.value}</p>
                  <p className="text-gray-400 font-bold text-sm uppercase tracking-wider">{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Core Values Section */}
      <div className="max-w-6xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Our Core Values
          </h2>
          <p className="text-gray-400 text-lg">What we stand for</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-300" />
              <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600/80 transition-all duration-300">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-black text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="relative bg-gradient-to-r from-slate-900/95 via-purple-900/50 to-slate-900/95 backdrop-blur-3xl border-2 border-purple-500/50 rounded-[28px] overflow-hidden p-10 sm:p-14 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-5 transition-opacity" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ready to Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">The VioLencE</span>?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Be part of our premium gaming community. Compete in world-class tournaments and write your own success story.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tournaments"
                className="relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-white uppercase tracking-wider text-sm overflow-hidden group/btn bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 shadow-xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-all duration-300 border border-cyan-400/50 hover:border-cyan-300/70"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                <FaRocket className="relative text-base group-hover/btn:rotate-45 transition-transform duration-300" />
                <span className="relative">Browse Tournaments</span>
                <FaArrowRight className="relative text-base group-hover/btn:translate-x-0.5 transition-transform duration-300" />
              </Link>

              <Link
                to="/register"
                className="relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-white uppercase tracking-wider text-sm overflow-hidden group/btn bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 border border-slate-700/80 hover:border-slate-600/80 transition-all duration-300"
              >
                <FaCheck className="relative text-base group-hover/btn:scale-110 transition-transform duration-300" />
                <span className="relative">Join Community</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Discovery
