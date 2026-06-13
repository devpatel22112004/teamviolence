import { motion } from 'framer-motion'
import {
  FaBullseye, FaTrophy, FaUsers, FaHeart,
  FaArrowRight, FaQuoteLeft, FaMedal, FaGamepad, FaBolt,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Section from '../components/ui/Section'
import Card, { MotionCard } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const values = [
  {
    icon: FaBullseye, title: 'Excellence',
    description: 'We strive for perfection in every match, constantly improving our skills and strategies.',
    tone: 'cyan',
  },
  {
    icon: FaTrophy, title: 'Competition',
    description: 'We compete at the highest level, participating in major tournaments and championships.',
    tone: 'amber',
  },
  {
    icon: FaUsers, title: 'Teamwork',
    description: 'Success comes from perfect coordination and trust between team members.',
    tone: 'lime',
  },
  {
    icon: FaHeart, title: 'Passion',
    description: 'Our love for the game drives us to push boundaries and achieve greatness.',
    tone: 'magenta',
  },
]

const stats = [
  { icon: FaTrophy, label: 'Tournaments', value: '50+', sub: 'Since 2019' },
  { icon: FaMedal,   label: 'Pro Teams',   value: '8+',  sub: 'BGMI rosters' },
  { icon: FaGamepad, label: 'Prize Pool',  value: '₹1Cr+', sub: 'Distributed' },
  { icon: FaUsers,   label: 'Community',   value: '5K+',  sub: 'Members' },
]

const achievements = [
  { year: '2024', title: 'Regional Championship Winners', detail: 'Dominated across 15+ tournaments', color: 'cyan' },
  { year: '2024', title: 'State Level Champions',         detail: 'Undefeated in finals',            color: 'amber' },
  { year: '2023', title: 'Best Emerging Clan Award',      detail: 'Recognized for excellence',       color: 'magenta' },
]

export default function About() {
  return (
    <div className="pt-20 pb-12">
      {/* Hero */}
      <Section aurora className="overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
        <div className="absolute -left-32 -top-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-32 bottom-0 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center max-w-4xl mx-auto space-y-6">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <Badge variant="cyan" pulse size="lg">Our Story</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-black leading-[1.05]"
          >
            About <span className="gradient-text">Team VioLencE</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
          >
            Professional BGMI esports clan committed to excellence, teamwork, and dominating the competitive scene with precision and strategy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4"
          >
            {stats.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.label} className="glass rounded-2xl p-4 text-center">
                  <Icon className="text-cyan-300 text-lg mx-auto mb-2" />
                  <div className="font-mono font-bold text-2xl text-white">{s.value}</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{s.label}</div>
                  <div className="text-[10px] text-gray-500 mt-1">{s.sub}</div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </Section>

      {/* Story split */}
      <Section>
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <MotionCard>
            <div className="space-y-5">
              <Badge variant="violet" size="md">Our Journey</Badge>
              <h2 className="text-4xl md:text-5xl font-display font-black leading-tight">
                From Dreams to <span className="gradient-text">Dominance</span>
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Team VioLencE was founded by passionate BGMI players who shared a common dream — to create a clan that would dominate the competitive scene through skill, strategy, and unwavering dedication.
                </p>
                <p>
                  Starting from small local tournaments, we quickly made our mark with aggressive yet calculated gameplay. Our unique approach to team coordination and strategic planning set us apart from other clans.
                </p>
                <p>
                  Today, we stand as one of the most respected BGMI esports clans, with multiple tournament victories, a growing community of fans and supporters, and a legacy built on excellence.
                </p>
              </div>

              <Card variant="glass" className="p-4 flex items-start gap-3">
                <FaQuoteLeft className="text-cyan-400 text-xl shrink-0 mt-1" />
                <p className="text-sm italic text-gray-300">
                  We don't just play the game — we study it, master it, and rewrite the rules. Every loss is a lesson, every win a stepping stone.
                </p>
              </Card>

              <Link to="/discovery" className="inline-flex items-center gap-2 text-cyan-300 font-bold hover:text-cyan-200 transition group">
                Discover Our Achievements
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </MotionCard>

          <MotionCard delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-3xl blur-2xl" />
              <div className="relative aspect-video rounded-3xl overflow-hidden glass-strong">
                <div className="absolute inset-0 grid-overlay opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10" />
                <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
                  <FaBolt className="text-6xl text-cyan-300 mb-3" />
                  <p className="text-xs uppercase tracking-widest text-cyan-300 font-bold mb-1">Founded 2019</p>
                  <h3 className="text-3xl font-display font-black text-white">VioLencE Era</h3>
                  <p className="text-sm text-gray-400 mt-2 max-w-xs">From basement scrims to India's premier BGMI clan.</p>
                </div>
              </div>
            </div>
          </MotionCard>
        </div>
      </Section>

      {/* Values */}
      <Section aurora>
        <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
        <div className="relative space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="magenta" size="md">Core Principles</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-black">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-gray-400 text-lg">
              These core principles guide everything we do and shape our identity as a world-class esports organization.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <MotionCard key={v.title} delay={i * 0.08}>
                  <Card variant="glass" hoverLift className="p-6 h-full group">
                    <div className="w-14 h-14 rounded-2xl glass-strong grid place-items-center mb-4 group-hover:scale-110 transition">
                      <Icon className="text-cyan-300 text-xl" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-2">{v.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{v.description}</p>
                    <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full transition-all duration-500" />
                  </Card>
                </MotionCard>
              )
            })}
          </div>
        </div>
      </Section>

      {/* Achievements */}
      <Section>
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="amber" size="md">Milestones</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-black">
              Our <span className="gradient-text">Achievements</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((a, i) => (
              <MotionCard key={a.title} delay={i * 0.1}>
                <Card variant="premium" hoverLift className="p-6 group h-full">
                  <Badge variant={a.color} size="md" className="mb-4">{a.year}</Badge>
                  <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:gradient-text transition-all">{a.title}</h3>
                  <p className="text-sm text-gray-400">{a.detail}</p>
                  <div className="mt-5 h-1 w-0 group-hover:w-full bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full transition-all duration-500" />
                </Card>
              </MotionCard>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <Card variant="conic" className="overflow-hidden">
          <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
          <div className="relative text-center p-8 sm:p-12 lg:p-16 space-y-6 max-w-3xl mx-auto">
            <Badge variant="cyan" pulse size="lg">Ready to Compete?</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-black leading-tight">
              Join Our <span className="gradient-text">Community</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Participate in tournaments, scrims, and events with Team VioLencE. Show your skills and become part of our legacy.
            </p>
            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <Button as={Link} to="/tournaments" size="lg" iconRight={<FaArrowRight />}>
                View Tournaments
              </Button>
              <Button as={Link} to="/register" size="lg" variant="secondary">
                Join Community
              </Button>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  )
}
