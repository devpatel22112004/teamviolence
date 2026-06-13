import { useEffect, useState, lazy, Suspense } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  FaTrophy, FaGamepad, FaUsers, FaPlay, FaBolt, FaShieldAlt,
  FaArrowRight, FaHeart, FaDiscord, FaWhatsapp, FaYoutube, FaInstagram,
  FaTwitch, FaCrown, FaFire, FaCrosshairs, FaStar, FaCheckCircle,
  FaMapMarkerAlt, FaCog, FaRocket
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import LazyImage from '../components/LazyImage'
import Button from '../components/ui/Button'
import Card, { MotionCard } from '../components/ui/Card'
import Section from '../components/ui/Section'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import { formatImagePath, handleImageError } from '../utils/images'

// Lazy-load the WebGL scene so the JS chunk is split out.
const HeroScene = lazy(() => import('../components/three/HeroScene'))

const CLAN_LOGO = '/Line_up/logo.png'

const SOCIAL_QUICK_LINKS = [
  { label: 'WhatsApp', href: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu', icon: FaWhatsapp, tone: 'from-emerald-500/20 to-green-600/20 border-emerald-500/30 text-emerald-300' },
  { label: 'Form',     href: 'https://forms.gle/z6Vj1eJXtg8RQGfz7',             icon: FaCrosshairs, tone: 'from-sky-500/20 to-blue-600/20 border-sky-500/30 text-sky-300' },
  { label: 'YouTube',  href: 'https://www.youtube.com/channel/UCb1hDeIuyEwrltpCf-0dw9w', icon: FaYoutube, tone: 'from-red-500/20 to-red-600/20 border-red-500/30 text-red-300' },
  { label: 'Instagram',href: 'https://www.instagram.com/teamviolenceesports?igsh=MTRhOTRzMDR4aHQ2Mw==', icon: FaInstagram, tone: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-300' },
]

const lineup = [
  { name: 'Umang Rana',    role: 'Co-Leader / Flex IGL',          image: '/Line_up/Umang Rana.jpg',     impact: 'Unpredictable IGL instincts with raw fragging power.' },
  { name: 'Karan Patel',   role: 'Entry Fragger',                 image: '/Line_up/karan-patel.jpeg',   impact: 'Cracks compounds and forces flawless trades.' },
  { name: 'Purvang Pandya',role: 'Elite DMR Specialist',          image: '/Line_up/Purvang Pandya.jpg', impact: 'Precision long-range knocks that swing momentum instantly.' },
  { name: 'Aayush Panchal',role: 'Strategic Analyst',             image: '/Line_up/Aayush Panchal.webp',impact: 'Reads patterns and orchestrates mid-round adjustments.' },
  { name: 'Rinkesh Rajput',role: 'Assaulter',                     image: '/Line_up/Rinkesh Rajput.jpeg',impact: 'Explosive entries and relentless close-range pressure.' },
  { name: 'Dev Patel',     role: 'IGL / Founder',                 image: '/Line_up/Dev Patel.jpg',      impact: 'Visionary shot-calling and championship-level clutches.' },
  { name: 'Jainish Soni',  role: 'Video Editor / Creator',        image: '/Line_up/Jainish_Soni.jpeg',  impact: 'Turns highlights into cinematic moments and brand impact.' },
  { name: 'Mehul Darji',   role: 'Aggressive Scout & Co-Leader',  image: '/Line_up/Mehul Darji.jpg',    impact: 'Leads info plays and zone breaks with composure.' },
  { name: 'Harsh Thakor',  role: 'Support Anchor',                image: '/Line_up/Harsh Thakor.jpg',   impact: 'Locks flanks and stabilizes every late circle.' },
]

const slides = [
  { tag: 'BUILT FOR THE SPOTLIGHT', title: 'Modern Esports Experience', subtitle: 'Premium, cinematic, and built for the next generation of competitive BGMI.', image: formatImagePath('/Line_up/Home_Swipe_Layout.webp') },
  { tag: 'PRIME ROSTER',           title: 'Elite Teamwork',             subtitle: 'Synergy, strategy, and relentless execution on every map.',                image: formatImagePath('/Line_up/Home_Swipe_Layout2.webp') },
  { tag: 'JOIN THE JOURNEY',       title: 'Victory Awaits',             subtitle: 'Witness greatness. Become part of the story.',                              image: formatImagePath('/Line_up/Home_Swipe_Layout3.webp') },
]

const featuredTournaments = [
  { title: 'Elite Masters Cup',      pool: '₹25,000', date: 'Feb 05, 2026', type: 'Paid', slots: '18/25', accent: 'from-cyan-500 to-cyan-700' },
  { title: 'Pro League - S1',        pool: '₹10,000', date: 'Jan 28, 2026', type: 'Paid', slots: '28/50', accent: 'from-amber-500 to-orange-600' },
  { title: 'Weekly Squad Championship', pool: '₹5,000',  date: 'Jan 25, 2026', type: 'Free', slots: '45/100', accent: 'from-emerald-500 to-teal-600' },
]

const pillars = [
  { icon: FaCrown,    title: 'Big Stage Ready',  desc: 'Scrim to LAN polish with calm late-game discipline.' },
  { icon: FaBolt,     title: 'Relentless Pace',  desc: 'High-tempo entries with synchronized utility and refrags.' },
  { icon: FaShieldAlt,title: 'System Defense',   desc: 'Layered setups, info nets, and denial rotations.' },
]

const communityStats = [
  { icon: FaHeart,   value: '45K+', label: 'Active Fans',       color: 'from-rose-500 to-pink-600' },
  { icon: FaDiscord, value: '12K+', label: 'Discord Members',   color: 'from-indigo-500 to-purple-600' },
  { icon: FaYoutube, value: '25K+', label: 'YouTube Subs',      color: 'from-red-500 to-red-600' },
  { icon: FaTwitch,  value: '8.5K+',label: 'Twitch Followers',  color: 'from-purple-500 to-purple-700' },
]

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const { scrollY } = useScroll()
  const heroBgY  = useTransform(scrollY, [0, 600], [0, 200])
  const heroOp   = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale= useTransform(scrollY, [0, 600], [1, 1.1])

  useEffect(() => {
    const t = setInterval(() => setActiveSlide((p) => (p + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  const splitTitle = (text) => text.split(' ').map((w, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block mr-3"
    >
      {w}
    </motion.span>
  ))

  return (
    <div className="relative">
      {/* ============================ HERO ============================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Layered background */}
        <motion.div className="absolute inset-0 -z-10" style={{ y: heroBgY, scale: heroScale }}>
          <AnimatePresence mode="sync">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(3,7,18,0.7) 0%, rgba(3,7,18,0.85) 70%, rgba(3,7,18,1) 100%), url(${slides[activeSlide].image})`,
              }}
            />
          </AnimatePresence>
        </motion.div>

        {/* WebGL overlay */}
        <div className="absolute inset-0 -z-10 opacity-60">
          <Suspense fallback={<div className="absolute inset-0 aurora-bg" />}>
            <HeroScene />
          </Suspense>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-[#030712]" />
        <div className="absolute inset-x-0 bottom-0 h-32 -z-10 bg-gradient-to-t from-[#030712] to-transparent" />

        <motion.div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" style={{ opacity: heroOp }}>
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-center">
            {/* LEFT: copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm text-cyan-200 text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-6"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
                </span>
                {slides[activeSlide].tag}
              </motion.div>

              <h1 className="text-display-1 mb-4 sm:mb-6 max-w-3xl">
                <span className="text-white drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                  {splitTitle(slides[activeSlide].title)}
                </span>
              </h1>

              <motion.p
                key={activeSlide + '-sub'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed"
              >
                {slides[activeSlide].subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8"
              >
                <Link to="/tournaments">
                  <Button variant="primary" size="lg" iconLeft={<FaPlay />}>Watch & Register</Button>
                </Link>
                <Link to="/team">
                  <Button variant="secondary" size="lg" iconLeft={<FaUsers />}>Meet the Roster</Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {['LAN ready', 'Tier-1 scrims', 'Prime community', 'Merch drops'].map((tag) => (
                  <span key={tag} className="pill">{tag}</span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-3 font-bold">Quick connect</p>
                <div className="flex flex-wrap gap-2">
                  {SOCIAL_QUICK_LINKS.map((s) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${s.tone} border flex items-center justify-center shadow-lg shadow-black/30 transition-all`}
                      aria-label={s.label}
                    >
                      <s.icon className="text-xl sm:text-2xl" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT: glass stat card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="relative"
            >
              <div className="card-conic rounded-3xl p-6 sm:p-8">
                <div className="card-strong rounded-2xl p-6 sm:p-8" style={{ background: 'linear-gradient(180deg, rgba(11,18,32,0.92) 0%, rgba(3,7,18,0.95) 100%)' }}>
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar src={formatImagePath(CLAN_LOGO)} alt="Team VioLencE" size="lg" ring="aurora" fallbackTone="aurora" />
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Prime Clan</p>
                      <p className="font-display font-black text-xl gradient-text-static">VioLencE</p>
                    </div>
                    <Badge variant="cyan" className="ml-auto">BGMI</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[{ l: 'Aggression', v: '97%' }, { l: 'Team Sync', v: '95%' }, { l: 'Clutch Rate', v: '92%' }].map((m) => (
                      <div key={m.l} className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 text-center">
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{m.l}</p>
                        <p className="font-mono font-bold text-lg gradient-text-static mt-0.5">{m.v}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex -space-x-2">
                      {lineup.slice(0, 4).map((p) => (
                        <Avatar key={p.name} src={formatImagePath(p.image)} name={p.name} size="sm" ring="cyan" fallbackTone="aurora" />
                      ))}
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-cyan-400/60 shadow-lg">+{lineup.length - 4}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 justify-end text-[10px] text-emerald-300 font-bold mb-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE
                      </div>
                      <p className="font-mono font-bold text-lg text-white">18.6K</p>
                    </div>
                  </div>

                  <Link to="/team" className="block">
                    <Button variant="secondary" fullWidth iconRight={<FaArrowRight />}>View Full Roster</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Slide indicator dots */}
          <div className="flex justify-center gap-2 mt-12">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={[
                  'h-1.5 rounded-full transition-all',
                  i === activeSlide ? 'w-10 bg-cyan-400 shadow-glow-cyan' : 'w-1.5 bg-white/20 hover:bg-white/40',
                ].join(' ')}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ============================ STATS STRIP ============================ */}
      <Section aurora gridOverlay contained={false}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="card-conic rounded-2xl p-6 sm:p-8">
            <div className="rounded-2xl bg-[#0b1220]/85 backdrop-blur-xl p-6 sm:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { icon: FaTrophy, value: '50+',   label: 'Tournaments Won',   tone: 'text-amber-300' },
                  { icon: FaGamepad,value: '1.2K+', label: 'Matches Played',    tone: 'text-cyan-300' },
                  { icon: FaUsers,  value: '20',    label: 'Pro Players',       tone: 'text-violet-300' },
                  { icon: FaFire,   value: '120K',  label: 'Total Finishes',    tone: 'text-pink-300' },
                ].map((s, i) => (
                  <MotionCard key={s.label} delay={i * 0.08} className="text-center group">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] mb-3 group-hover:border-cyan-400/50 group-hover:scale-110 transition-all">
                      <s.icon className={`text-xl sm:text-2xl ${s.tone}`} />
                    </div>
                    <p className="font-mono font-black text-3xl sm:text-4xl text-white tracking-tight">{s.value}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest font-bold mt-1">{s.label}</p>
                  </MotionCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================ VIOLENCE ESPORTS PILLAR ============================ */}
      <Section contained>
        <MotionCard>
          <div className="relative overflow-hidden rounded-3xl card-premium p-6 sm:p-10">
            <div className="absolute -left-20 -top-20 w-72 h-72 bg-cyan-500/15 blur-3xl rounded-full" />
            <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-violet-500/15 blur-3xl rounded-full" />
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1">
                <Badge variant="violet" className="mb-3">VIOLENCE ESPORTS</Badge>
                <h2 className="text-display-3 text-white mb-3">Your home for competitive <span className="gradient-text">tournaments</span>.</h2>
                <p className="text-gray-300 max-w-2xl">Explore our full tournament ecosystem, rules, and growth path for teams. Built for serious BGMI squads.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/violence-esports-tournaments">
                  <Button variant="primary" iconRight={<FaArrowRight />}>Explore the pillar</Button>
                </Link>
                <Link to="/tournaments">
                  <Button variant="secondary">View tournaments</Button>
                </Link>
              </div>
            </div>
          </div>
        </MotionCard>
      </Section>

      {/* ============================ PILLARS / PILLARS + STATS ============================ */}
      <Section contained>
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          <MotionCard>
            <div className="card-premium p-6 sm:p-8 h-full">
              <div className="flex items-center gap-2 mb-5">
                <FaBolt className="text-cyan-300 text-lg" />
                <h3 className="text-xl sm:text-2xl font-display font-black text-white">Signature Playstyle</h3>
              </div>
              <div className="space-y-3">
                {pillars.map((p, i) => (
                  <MotionCard key={p.title} delay={i * 0.1} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 hover:border-cyan-400/40 hover:bg-white/[0.05] transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <p.icon className="text-cyan-300" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">{p.title}</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  </MotionCard>
                ))}
              </div>
            </div>
          </MotionCard>

          <MotionCard delay={0.1}>
            <div className="card-premium p-6 sm:p-8 h-full">
              <div className="flex items-center gap-2 mb-5">
                <FaTrophy className="text-amber-300 text-lg" />
                <h3 className="text-xl sm:text-2xl font-display font-black text-white">Career Achievements</h3>
              </div>
              <div className="space-y-3">
                {[
                  { year: '2024', title: 'Regional Championship Winners', detail: 'Dominated 15+ tournaments' },
                  { year: '2024', title: 'State Level Champions',         detail: 'Undefeated in finals' },
                  { year: '2023', title: 'Best Emerging Clan Award',      detail: 'Recognized for excellence' },
                ].map((a, i) => (
                  <MotionCard key={i} delay={0.1 + i * 0.1} className="flex items-center gap-4 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 hover:border-violet-400/40 hover:bg-white/[0.05] transition-all">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="font-mono font-black text-amber-200 text-sm">{a.year}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{a.title}</h4>
                      <p className="text-sm text-gray-400">{a.detail}</p>
                    </div>
                  </MotionCard>
                ))}
              </div>
            </div>
          </MotionCard>
        </div>
      </Section>

      {/* ============================ FEATURED TOURNAMENTS ============================ */}
      <Section contained>
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <Badge variant="cyan" icon={FaTrophy} className="mb-2">LIVE & UPCOMING</Badge>
            <h2 className="text-display-2 text-white">Featured <span className="gradient-text">Tournaments</span></h2>
            <p className="text-gray-400 mt-2">Compete at the highest level. Register now.</p>
          </div>
          <Link to="/tournaments">
            <Button variant="primary" iconRight={<FaArrowRight />}>See all</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featuredTournaments.map((t, i) => (
            <MotionCard key={t.title} delay={i * 0.1}>
              <Card variant="conic" hoverLift className="p-5 sm:p-6 h-full flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <Badge variant={t.type === 'Free' ? 'lime' : 'magenta'} pulse={t.type === 'Free'}>
                    {t.type}
                  </Badge>
                  <FaTrophy className="text-amber-300 text-2xl" />
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-black text-white mb-1 group-hover/card:gradient-text transition-all">{t.title}</h3>
                <p className="text-sm text-gray-400 mb-5 line-clamp-2">Join the action. Compete for glory and prizes in premium BGMI tournaments.</p>
                <div className="grid grid-cols-3 gap-2 mb-5">
                  <div className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-2.5 text-center">
                    <p className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">POOL</p>
                    <p className="font-mono font-bold text-sm text-cyan-300 mt-0.5">{t.pool}</p>
                  </div>
                  <div className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-2.5 text-center">
                    <p className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">SLOTS</p>
                    <p className="font-mono font-bold text-sm text-violet-300 mt-0.5">{t.slots}</p>
                  </div>
                  <div className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-2.5 text-center">
                    <p className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">DATE</p>
                    <p className="font-mono font-bold text-sm text-white mt-0.5">{t.date.split(',')[0]}</p>
                  </div>
                </div>
                <div className="mt-auto">
                  <Link to="/tournaments" className="block">
                    <Button variant="primary" fullWidth iconRight={<FaArrowRight />}>Register now</Button>
                  </Link>
                </div>
              </Card>
            </MotionCard>
          ))}
        </div>
      </Section>

      {/* ============================ COMMUNITY ============================ */}
      <Section aurora gridOverlay>
        <div className="text-center max-w-3xl mx-auto mb-10">
          <MotionCard>
            <Badge variant="magenta" icon={FaHeart} className="mb-3">POWERED BY COMMUNITY</Badge>
            <h2 className="text-display-2 gradient-text mb-3">Join the VioLencE Family</h2>
            <p className="text-gray-300">More than a team — we're a thriving community of passionate gamers, content creators, and esports enthusiasts.</p>
          </MotionCard>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {communityStats.map((s, i) => (
            <MotionCard key={s.label} delay={i * 0.08}>
              <Card variant="premium" hoverLift className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} shadow-lg mb-4`}>
                  <s.icon className="text-2xl text-white" />
                </div>
                <p className="font-mono font-black text-3xl sm:text-4xl text-white tracking-tight">{s.value}</p>
                <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest font-bold mt-1">{s.label}</p>
              </Card>
            </MotionCard>
          ))}
        </div>
      </Section>

      {/* ============================ ROSTER SPOTLIGHT ============================ */}
      <Section contained>
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <Badge variant="amber" icon={FaCrown} className="mb-2">PRIME ROSTER</Badge>
            <h2 className="text-display-2 text-white">Faces behind the <span className="gradient-text-warm">tag</span></h2>
            <p className="text-gray-400 mt-2">Meet the legends. Click to unlock their full story.</p>
          </div>
          <Link to="/team">
            <Button variant="primary" iconRight={<FaArrowRight />}>View full lineup</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {lineup.slice(0, 4).map((player, idx) => (
            <MotionCard key={player.name} delay={idx * 0.08}>
              <Link to="/team">
                <Card variant="premium" hoverLift className="overflow-hidden group block cursor-pointer">
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <LazyImage
                      src={formatImagePath(player.image)}
                      alt={player.name}
                      width={480}
                      height={640}
                      onError={handleImageError}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent" />
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-500/30 group-hover:rotate-45 transition-all">
                      <FaArrowRight className="text-xs" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 relative">
                    <h3 className="font-display font-black text-lg sm:text-xl text-white group-hover:text-cyan-300 transition-colors">{player.name}</h3>
                    <p className="text-[10px] sm:text-xs text-cyan-400 font-bold uppercase tracking-widest mt-0.5">{player.role}</p>
                    <p className="text-xs sm:text-sm text-gray-400 mt-2 line-clamp-2">{player.impact}</p>
                  </div>
                </Card>
              </Link>
            </MotionCard>
          ))}
        </div>
      </Section>

      {/* ============================ CLOSING CTA ============================ */}
      <Section contained>
        <MotionCard>
          <div className="relative overflow-hidden card-conic rounded-3xl">
            <div className="card-strong rounded-3xl p-8 sm:p-12 lg:p-16 text-center" style={{ background: 'linear-gradient(180deg, rgba(11,18,32,0.95) 0%, rgba(3,7,18,0.98) 100%)' }}>
              <div className="absolute -left-20 -top-20 w-72 h-72 bg-cyan-500/15 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-pink-500/15 blur-3xl rounded-full pointer-events-none" />
              <div className="relative">
                <Badge variant="gradient" className="mb-4">PRIME DROP</Badge>
                <h2 className="text-display-2 text-white mb-4 max-w-3xl mx-auto">Ready to queue with <span className="gradient-text">Team VioLencE</span>?</h2>
                <p className="text-gray-300 max-w-2xl mx-auto mb-8">Secure your slot in our next event, scrim with the roster, and experience a studio-grade esports platform built for the spotlight.</p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
                  <Link to="/tournaments">
                    <Button variant="primary" size="lg" iconLeft={<FaTrophy />}>View tournaments</Button>
                  </Link>
                  <a href="https://forms.gle/z6Vj1eJXtg8RQGfz7" target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" size="lg" iconLeft={<FaRocket />} className="!bg-gradient-to-r !from-emerald-600 !to-green-500">Register Now</Button>
                  </a>
                  <Link to="/about">
                    <Button variant="secondary" size="lg" iconLeft={<FaGamepad />}>Learn the story</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </MotionCard>
      </Section>
    </div>
  )
}

export default Home
