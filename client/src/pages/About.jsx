import { motion } from 'framer-motion'
import { FaBullseye, FaTrophy, FaUsers, FaHeart, FaArrowRight } from 'react-icons/fa'

const About = () => {
  const values = [
    {
      icon: FaBullseye,
      title: 'Excellence',
      description: 'We strive for perfection in every match, constantly improving our skills and strategies.',
      color: 'from-primary-500 to-primary-600',
    },
    {
      icon: FaTrophy,
      title: 'Competition',
      description: 'We compete at the highest level, participating in major tournaments and championships.',
      color: 'from-yellow-500 to-orange-600',
    },
    {
      icon: FaUsers,
      title: 'Teamwork',
      description: 'Success comes from perfect coordination and trust between team members.',
      color: 'from-green-500 to-primary-600',
    },
    {
      icon: FaHeart,
      title: 'Passion',
      description: 'Our love for the game drives us to push boundaries and achieve greatness.',
      color: 'from-accent-500 to-red-600',
    },
  ]

  const achievements = [
    { year: '2024', achievement: '🏆 Regional Championship Winners', detail: 'Dominated across 15+ tournaments' },
    { year: '2024', achievement: '🥇 State Level Champions', detail: 'Undefeated in finals' },
    { year: '2023', achievement: '⭐ Best Emerging Clan Award', detail: 'Recognized for excellence' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-dark-950 to-dark-950" />
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute -left-32 -top-32 w-96 h-96 bg-primary-500/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 w-80 h-80 bg-primary-700/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-primary-500/15 border border-primary-500/40 text-primary-100 text-sm font-bold mx-auto"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              Our Story
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-display font-black leading-tight">
              About <span className="gradient-text">Team VioLencE</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Professional BGMI esports clan committed to excellence, teamwork, and dominating the competitive scene with precision and strategy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <p className="section-label mb-3">Our Journey</p>
                <h2 className="section-title">
                  From Dreams to <span className="gradient-text">Dominance</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Team VioLencE was founded by passionate BGMI players who shared a common dream - to create a clan that would dominate the competitive scene through skill, strategy, and unwavering dedication.
                </p>
                <p>
                  Starting from small local tournaments, we quickly made our mark with aggressive yet calculated gameplay. Our unique approach to team coordination and strategic planning set us apart from other clans.
                </p>
                <p>
                  Today, we stand as one of the most respected BGMI esports clans, with multiple tournament victories, a growing community of fans and supporters, and a legacy built on excellence.
                </p>
              </div>

              <motion.div
                whileHover={{ x: 5 }}
                className="inline-flex items-center text-primary-300 font-bold text-lg cursor-pointer group"
              >
                Discover Our Achievements
                <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-gradient-to-br from-primary-600/20 to-primary-700/20 rounded-3xl blur-2xl" />
              <div className="relative aspect-video rounded-3xl bg-gradient-to-br from-primary-600/30 to-primary-800/30 border-2 border-primary-500/30 flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/20 transition-all" />
                <FaTrophy className="text-8xl text-primary-500/40 group-hover:scale-110 transition-transform" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-dark-900/40 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-12"
          >
            <motion.div variants={itemVariants} className="text-center">
              <p className="section-label mb-3">Core Principles</p>
              <h2 className="section-title">
                Our <span className="gradient-text">Values</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
                These core principles guide everything we do and shape our identity as a world-class esports organization.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="card-interactive group relative overflow-hidden rounded-2xl"
                >
                  <div className={`absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-all duration-500`} />
                  
                  <div className="relative space-y-4">
                    <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${value.color} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <value.icon className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold mb-2">{value.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div className="text-center">
              <p className="section-label mb-3">Milestones</p>
              <h2 className="section-title">
                Our <span className="gradient-text">Achievements</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="card-interactive group"
                >
                  <div className="space-y-4">
                    <p className="text-primary-400 font-bold text-sm uppercase tracking-widest">{item.year}</p>
                    <h3 className="text-2xl font-display font-bold group-hover:gradient-text transition-all">{item.achievement}</h3>
                    <p className="text-gray-400">{item.detail}</p>
                    <div className="h-1 w-0 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:w-full transition-all duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-12 text-center border-primary-500/30 relative overflow-hidden group"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl group-hover:bg-primary-600/20 transition-all" />
            <div className="relative space-y-6">
              <p className="section-label">Ready to Compete?</p>
              <h2 className="text-4xl md:text-5xl font-display font-black">
                Join Our <span className="gradient-text">Community</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                Participate in tournaments, scrims, and events with Team VioLencE. Show your skills and become part of our legacy.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <button className="btn-primary text-lg px-8 py-3">
                  View Tournaments
                </button>
                <button className="btn-secondary text-lg px-8 py-3">
                  Join Community
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
