import { motion } from 'framer-motion'
import { FaBullseye, FaTrophy, FaUsers, FaHeart } from 'react-icons/fa'

const About = () => {
  const values = [
    {
      icon: FaBullseye,
      title: 'Excellence',
      description: 'We strive for perfection in every match, constantly improving our skills and strategies.',
    },
    {
      icon: FaTrophy,
      title: 'Competition',
      description: 'We compete at the highest level, participating in major tournaments and championships.',
    },
    {
      icon: FaUsers,
      title: 'Teamwork',
      description: 'Success comes from perfect coordination and trust between team members.',
    },
    {
      icon: FaHeart,
      title: 'Passion',
      description: 'Our love for the game drives us to push boundaries and achieve greatness.',
    },
  ]

  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              About <span className="text-primary-500">Team VioLencE</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We are a professional BGMI esports clan committed to excellence, teamwork, and dominating the competitive scene.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold mb-6">
                Our <span className="text-primary-500">Story</span>
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Team VioLencE was founded by passionate BGMI players who shared a common dream - to create a clan that would dominate the competitive scene through skill, strategy, and dedication.
                </p>
                <p>
                  Starting from small local tournaments, we quickly made our mark with aggressive yet calculated gameplay. Our unique approach to team coordination and strategic planning set us apart from other clans.
                </p>
                <p>
                  Today, we stand as one of the most respected BGMI esports clans, with multiple tournament victories and a growing community of fans and supporters.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary-600/20 to-primary-800/20 border border-primary-500/30 flex items-center justify-center">
                <FaTrophy className="text-8xl text-primary-500/30" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              Our <span className="text-primary-500">Values</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These core principles guide everything we do and shape our identity as a clan.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center group hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full mb-4 group-hover:animate-glow">
                  <value.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-display font-bold mb-12">
              Our <span className="text-primary-500">Achievements</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { year: '2024', achievement: 'Regional Championship Winners' },
                { year: '2024', achievement: 'State Level Tournament Champions' },
                { year: '2023', achievement: 'Best Emerging Clan Award' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                >
                  <div className="text-5xl font-display font-bold text-primary-500 mb-4">
                    {item.year}
                  </div>
                  <p className="text-lg text-gray-300">{item.achievement}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
