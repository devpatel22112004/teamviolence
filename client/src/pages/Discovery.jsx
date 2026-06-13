import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaFire, FaTrophy, FaUsers, FaRocket, FaStar,
  FaCheck, FaArrowRight, FaGamepad, FaMedal,
  FaQuoteLeft,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Section from '../components/ui/Section'
import Card, { MotionCard } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const journey = [
  {
    year: '2019', title: '🌱 Genesis — Basement Dreams',
    phase: 'STRUGGLE TO SURVIVAL',
    summary: 'It started with late nights, old PCs, and a dream bigger than our budget. No sponsors, no recognition — just passion and a promise to build something real in esports.',
    fullStory: 'The year 2019 marked the birth of Team VioLencE, not in a fancy studio, but in a basement with donated equipment and pure determination. Our founder, Dev Patel, along with a handful of friends, started organizing scrims and small local tournaments with their own money. Every rupee earned was reinvested back into the community.',
    highlights: [
      'Zero budget, pure passion',
      'Small scrims & local rooms',
      'Learning tournament systems',
      'First core community formed',
      'Building foundational relationships',
      'Early brand identity creation',
    ],
    keyAchievements: [
      'Organized first 2 official tournaments',
      'Built core team of 5 passionate players',
      'Created basic tournament management system',
      'Established Discord community',
      'Zero external funding - self-funded entirely',
    ],
    stats: { events: '2', members: '5', investment: '₹0', reach: '~500' },
    color: 'amber',
  },
  {
    year: '2020', title: '💪 Pandemic Pivot — Online Revolution',
    phase: 'GRIND TO GROWTH',
    summary: 'The world locked down, but we pushed forward. We organized online tournaments with personal savings and earned trust one match at a time.',
    fullStory: 'When COVID-19 locked everything down, Team VioLencE saw an opportunity. We pivoted completely to online tournaments, investing our personal savings into prize pools. This year was transformative — we ran 12 tournaments, each one bigger than the last. The community responded with unwavering support, and we earned our first sponsor partnerships.',
    highlights: [
      'First organized online tournaments',
      'Self-funded prize pools',
      'Weekly player growth',
      'Community credibility earned',
      'Professional tournament structure',
      'Multi-game expansion started',
    ],
    keyAchievements: [
      'Organized 12 online tournaments',
      'Community grew from 5 to 150 members',
      'First sponsor partnerships formed',
      'Prize pool exceeded ₹50K',
      'Launched weekly community events',
      'Professional rules & regulations implemented',
    ],
    stats: { events: '12', members: '150', investment: '₹50K', reach: '~5K' },
    color: 'amber',
  },
  {
    year: '2021-2022', title: '🚀 Breakthrough — Recognition Arrives',
    phase: 'GROWTH TO PROFESSIONALISM',
    summary: 'Hard work finally paid off. Sponsors noticed, prize pools grew, and the first professional teams were built under Team VioLencE.',
    fullStory: 'These two years marked our meteoric rise. Major sponsors like energy drinks and gaming peripherals came on board. We organized our first ₹1L+ prize pool tournament, assembled professional teams, and hired our first operations manager. The scene began recognizing Team VioLencE as a serious player in Indian esports.',
    highlights: [
      'First ₹1L+ prize pool',
      'Professional team formations',
      'Sponsor partnerships',
      'Streaming + production setup',
      'Expanded tournament portfolio',
      'International exposure began',
    ],
    keyAchievements: [
      'Organized 24 major tournaments',
      'Community grew to 800+ members',
      'Signed 3 professional BGMI teams',
      'Prize distribution crossed ₹5L',
      'Professional streaming studio launched',
      'Media coverage from major outlets',
      'First international tournament held',
    ],
    stats: { events: '24', members: '800', investment: '₹5L', reach: '~50K' },
    color: 'lime',
  },
  {
    year: '2023-2024', title: '👑 Premium Era — The Big League',
    phase: 'PROFESSIONAL TO PREMIUM',
    summary: 'We went premium. High‑production tournaments, brand partnerships, and large prize pools made Team VioLencE a name across the scene.',
    fullStory: 'By 2023-2024, Team VioLencE had become a household name in Indian esports. We organized premium tournaments with cinematic production quality, signed partnership deals with major brands, and hosted events with prize pools exceeding ₹50L. Our teams competed at the highest level, and our community became one of the most engaged in the country.',
    highlights: [
      'Multiple ₹5L+ tournaments',
      'Brand + media partnerships',
      'Professional operations team',
      'Premium streaming quality',
      'International team signings',
      'Season-based tournament formats',
    ],
    keyAchievements: [
      'Organized 40 premium tournaments',
      'Community reached 3000+ members',
      'Assembled 6 professional teams',
      'Prize distribution crossed ₹50L',
      'Premium broadcast studio with 4K streaming',
      'Partnership with major gaming brands',
      'Live events with 5000+ spectators',
      'Ranked #1 esports organizer in India',
    ],
    stats: { events: '40', members: '3000', investment: '₹50L+', reach: '~500K' },
    color: 'magenta',
  },
  {
    year: '2025', title: '⭐ The Glory — Present & Future',
    phase: 'EXCELLENCE & EXPANSION',
    summary: 'Today we are a premier esports organizer with world‑class tournaments, pro teams, and a loyal community. The future is limitless.',
    fullStory: 'In 2025, Team VioLencE stands as the undisputed leader of Indian esports. We organize world-class tournaments, manage 8+ professional teams, and have distributed over ₹1 crore in prize money. Our vision for the future includes global expansion, youth academy development, and establishing esports as a mainstream career path in India.',
    highlights: [
      'World‑class tournament infrastructure',
      'Multiple professional teams',
      '₹1Cr+ prize distributions',
      'Global recognition & partnerships',
      'Youth academy launched',
      'Next-gen esports ecosystem',
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
      'Broadcasting reach: 5M+ across platforms',
    ],
    stats: { events: '50+', members: '5000+', investment: '₹1Cr+', reach: '~5M' },
    color: 'cyan',
  },
]

const storySummary = [
  {
    icon: FaFire, title: 'Humble Origins',
    desc: 'We started from the ground with no sponsors, no studio, and no shortcuts — only belief and grit.',
    detailed: 'From a basement in 2019, with zero funding, to managing premium tournaments in 2025. Every step was earned through hard work.',
  },
  {
    icon: FaRocket, title: 'Relentless Grind',
    desc: 'From 2019 to 2022, we organized events, built trust, and reinvested every win back into the community.',
    detailed: 'We turned overnight shifts into tournament success. Every profit was reinvested to grow bigger and better.',
  },
  {
    icon: FaStar, title: 'Premium Today',
    desc: 'Now we deliver premium tournaments, pro teams, and a full ecosystem for serious competitors.',
    detailed: 'Today, Team VioLencE is the benchmark for excellence in Indian esports with world-class standards.',
  },
]

const milestones = [
  { year: '2019', event: 'Founded', emoji: '🎮' },
  { year: '2020', event: 'First Tournament', emoji: '🏆' },
  { year: '2021', event: 'Pro Teams Formed', emoji: '👥' },
  { year: '2022', event: '₹5L+ Prize Pool', emoji: '💰' },
  { year: '2023', event: 'Premium Studios', emoji: '📺' },
  { year: '2024', event: 'Brand Leader', emoji: '👑' },
  { year: '2025', event: 'Academy Launch', emoji: '🎓' },
]

const stats = [
  { icon: FaTrophy, label: 'Tournaments', value: '50+', trend: '↑ 2500%' },
  { icon: FaUsers,  label: 'Community',  value: '5000+', trend: '↑ 100,000%' },
  { icon: FaGamepad, label: 'Prize Pool', value: '₹1Cr+', trend: '↑ ∞' },
  { icon: FaMedal,   label: 'Pro Teams',  value: '8+', trend: '↑ Growing' },
]

const values = [
  { icon: '🔥', title: 'Passion First',      shortDesc: 'We live and breathe competitive gaming.', color: 'amber' },
  { icon: '👥', title: 'Community Focused',  shortDesc: 'Our players are our family.',           color: 'cyan' },
  { icon: '💎', title: 'Premium Quality',    shortDesc: 'Excellence is non-negotiable.',          color: 'magenta' },
  { icon: '⚔️', title: 'Fair & Transparent', shortDesc: 'Every result is honest.',                color: 'lime' },
]

const futureVision = [
  { icon: '🌍', title: 'Global Expansion',  desc: 'Taking Team VioLencE tournaments to international stage and competing with global esports giants.' },
  { icon: '🎓', title: 'Youth Academy',     desc: 'Building the next generation of esports athletes with professional coaching and mentorship programs.' },
  { icon: '🏢', title: 'Physical Stadiums', desc: 'Creating dedicated esports arenas for live tournaments with capacity for thousands of spectators.' },
  { icon: '💼', title: 'Career Platform',   desc: 'Establishing esports as a mainstream career path with sponsorships and professional contracts for athletes.' },
]

export default function Discovery() {
  const [activeYear, setActiveYear] = useState('2025')
  const [expandedValue, setExpandedValue] = useState(-1)
  const activeJourney = journey.find((j) => j.year === activeYear)

  return (
    <div className="pt-20 pb-12">
      {/* Hero */}
      <Section aurora className="overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="gradient" size="lg">🎮 Esports Journey</Badge>
          </motion.div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[1.05]">
            The <span className="gradient-text">VioLencE</span> Journey
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From a basement dream in 2019 to India's premier esports organizer — every struggle, every sacrifice, every victory. This is our complete story.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="cyan" size="md">Since 2019</Badge>
            <Badge variant="violet" size="md">Industry Leaders</Badge>
            <Badge variant="lime" size="md">2500% Growth</Badge>
          </div>
        </div>
      </Section>

      {/* Three Acts */}
      <Section>
        <div className="space-y-8">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-center">Our Three Acts</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {storySummary.map((c, i) => {
              const Icon = c.icon
              return (
                <MotionCard key={c.title} delay={i * 0.1}>
                  <Card variant="premium" hoverLift className="p-6 h-full group">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-violet-500/30 border border-cyan-500/30 grid place-items-center mb-4 group-hover:scale-110 transition">
                      <Icon className="text-2xl text-cyan-300" />
                    </div>
                    <h3 className="text-xl font-display font-black text-white mb-2">{c.title}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed mb-3">{c.desc}</p>
                    <Card variant="glass" className="p-3">
                      <p className="text-xs text-gray-400 italic leading-relaxed">{c.detailed}</p>
                    </Card>
                  </Card>
                </MotionCard>
              )
            })}
          </div>
        </div>
      </Section>

      {/* Timeline selector */}
      <Section contained={false} className="!py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white">Journey Through The Years</h2>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {journey.map((item) => {
              const active = activeYear === item.year
              return (
                <button
                  key={item.year}
                  type="button"
                  onClick={() => setActiveYear(item.year)}
                  className={`relative px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider transition ${
                    active
                      ? 'text-white'
                      : 'text-gray-400 border border-white/10 hover:border-white/20 bg-white/5'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="timeline-pill"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.year}</span>
                </button>
              )
            })}
          </div>

          {/* Milestone strip */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-gray-300 font-semibold"
              >
                <span>{m.emoji}</span>
                <span className="text-white font-mono">{m.year}</span>
                <span className="hidden sm:inline text-gray-500">·</span>
                <span className="hidden sm:inline">{m.event}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Active year detailed card */}
      <Section>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <Card variant="conic" className="overflow-hidden">
              <div className="relative p-6 sm:p-10 lg:p-12 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <Badge variant={activeJourney.color} size="lg" pulse>
                    {activeJourney.phase}
                  </Badge>
                  <div className="font-mono font-black text-3xl gradient-text-static">{activeJourney.year}</div>
                </div>

                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white mb-3">{activeJourney.title}</h2>
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">{activeJourney.summary}</p>
                </div>

                <Card variant="glass" className="p-5 sm:p-6">
                  <FaQuoteLeft className="text-cyan-400 text-lg mb-3" />
                  <p className="text-gray-200 text-base leading-relaxed italic">{activeJourney.fullStory}</p>
                </Card>

                <div>
                  <h3 className="text-lg font-display font-bold text-white mb-4">Key Highlights</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {activeJourney.highlights.map((h, i) => (
                      <motion.div
                        key={h}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 p-3 rounded-lg glass hover:border-cyan-500/30 transition group"
                      >
                        <FaCheck className="text-cyan-400 text-sm mt-1 shrink-0 group-hover:scale-125 transition" />
                        <p className="text-sm text-gray-200">{h}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-display font-bold text-white mb-4">Major Achievements</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {activeJourney.keyAchievements.map((a, i) => (
                      <motion.div
                        key={a}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg glass border-violet-500/20"
                      >
                        <FaStar className="text-violet-300 text-xs shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-200">{a}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-base font-display font-bold text-white mb-4">Impact By Numbers</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'Events',     value: activeJourney.stats.events },
                      { label: 'Members',    value: activeJourney.stats.members },
                      { label: 'Investment', value: activeJourney.stats.investment },
                      { label: 'Reach',      value: activeJourney.stats.reach },
                    ].map((s) => (
                      <Card key={s.label} variant="glass" className="p-4 text-center">
                        <div className="font-mono font-black text-2xl gradient-text-static mb-1">{s.value}</div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{s.label}</div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </Section>

      {/* Overall stats */}
      <Section>
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-4xl md:text-5xl font-display font-black">By The <span className="gradient-text">Numbers</span></h2>
            <p className="text-gray-400 text-lg">Our complete impact across 6 incredible years</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => {
              const Icon = s.icon
              return (
                <MotionCard key={s.label} delay={i * 0.08}>
                  <Card variant="premium" hoverLift className="p-6 text-center group">
                    <Icon className="text-3xl text-cyan-300 mx-auto mb-3 group-hover:scale-110 group-hover:text-violet-300 transition" />
                    <div className="font-mono font-black text-3xl text-white mb-1">{s.value}</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">{s.label}</div>
                    <div className="text-xs text-lime-300 font-mono">{s.trend}</div>
                  </Card>
                </MotionCard>
              )
            })}
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section aurora>
        <div className="relative space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-4xl md:text-5xl font-display font-black">What We <span className="gradient-text">Stand For</span></h2>
            <p className="text-gray-400 text-lg">The pillars that define Team VioLencE</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <MotionCard key={v.title} delay={i * 0.08}>
                <button
                  type="button"
                  onClick={() => setExpandedValue(expandedValue === i ? -1 : i)}
                  className="w-full text-left"
                >
                  <Card variant="glass" hoverLift className="p-6 h-full">
                    <div className="text-4xl mb-3 text-center">{v.icon}</div>
                    <h3 className="text-lg font-display font-black text-white text-center mb-2">{v.title}</h3>
                    <p className="text-sm text-gray-300 text-center">{v.shortDesc}</p>
                    <AnimatePresence>
                      {expandedValue === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-gray-400 leading-relaxed border-t border-white/10 pt-3 mt-3"
                        >
                          {v.title === 'Passion First' && 'Every tournament is crafted with pure passion and dedication to the game. Our team bleeds for esports and it shows in every event we organize.'}
                          {v.title === 'Community Focused' && 'We grow together, win together, celebrate together. Your success is our success. We invest in building lasting relationships with every member of our community.'}
                          {v.title === 'Premium Quality' && 'World-class infrastructure, 4K streaming, professional commentary, and premium venue setups. We never compromise on quality.'}
                          {v.title === 'Fair & Transparent' && 'Every tournament is fair, every result is transparent, and your trust is our foundation. We maintain the highest standards of integrity.'}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </Card>
                </button>
              </MotionCard>
            ))}
          </div>
        </div>
      </Section>

      {/* Future Vision */}
      <Section>
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-4xl md:text-5xl font-display font-black">Our <span className="gradient-text">Future Vision</span></h2>
            <p className="text-gray-400 text-lg">Where we're heading next</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {futureVision.map((item, i) => (
              <MotionCard key={item.title} delay={i * 0.1}>
                <Card variant="premium" hoverLift className="p-6 group">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition">{item.icon}</div>
                  <h3 className="text-xl font-display font-black text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
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
          <div className="relative p-8 sm:p-12 lg:p-16 text-center space-y-6 max-w-3xl mx-auto">
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} className="text-6xl inline-block">🚀</motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black leading-tight">
              Ready to Be Part of <span className="gradient-text">The Story?</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Join thousands of competitive gamers in India's premier esports community. Compete at the highest level, win prizes, and write your own success story with Team VioLencE.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button as={Link} to="/tournaments" size="lg" iconLeft={<FaRocket />} iconRight={<FaArrowRight />}>
                Explore Tournaments
              </Button>
              <Button as={Link} to="/register" size="lg" variant="secondary" iconLeft={<FaCheck />}>
                Join Now
              </Button>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  )
}
