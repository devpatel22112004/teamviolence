import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaDiscord, FaInstagram, FaYoutube, FaWhatsapp,
  FaArrowLeft, FaBolt, FaShieldAlt, FaUsers,
} from 'react-icons/fa'
import Badge from './ui/Badge'

/**
 * AuthLayout — split-pane shell for Login/Register.
 * Left: brand panel with mesh gradient + features. Right: form slot.
 * Mobile: brand panel collapses to a small banner at top.
 */
export default function AuthLayout({
  title,
  subtitle,
  highlight,        // e.g. "Welcome Back" or "Join the VioLencE"
  highlightAccent,  // optional — overrides default gradient on highlight
  altLink,          // { to, label, prompt }
  children,
}) {
  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-12 px-3 sm:px-6 relative overflow-hidden">
      {/* Brand panel — desktop only (sticky left column) */}
      <div className="hidden lg:grid lg:grid-cols-2 max-w-7xl mx-auto gap-8 items-stretch min-h-[calc(100vh-7rem)]">
        <BrandPanel highlight={highlight} highlightAccent={highlightAccent} />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-md">
            <FormHeader
              title={title}
              subtitle={subtitle}
              altLink={altLink}
            />
            {children}
          </div>
        </motion.div>
      </div>

      {/* Mobile layout — brand banner on top, form below */}
      <div className="lg:hidden max-w-md mx-auto">
        <div className="mb-6 rounded-2xl overflow-hidden border border-cyan-500/20 glass-strong p-5 text-center">
          <Link to="/" className="inline-block mb-2">
            <span className="font-display font-black text-2xl">
              <span className="gradient-text">VioLencE</span>
            </span>
          </Link>
          <h2 className="text-xl font-display font-black text-white">{highlight}</h2>
        </div>
        <FormHeader title={title} subtitle={subtitle} altLink={altLink} />
        {children}
      </div>
    </div>
  )
}

function BrandPanel({ highlight, highlightAccent }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden border border-cyan-500/20"
    >
      {/* Animated mesh gradient bg */}
      <div className="absolute inset-0 aurora-bg" />
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl" />

      <div className="relative h-full flex flex-col justify-between p-8 lg:p-10 min-h-[600px]">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-cyan-200 text-sm font-bold hover:text-cyan-100 transition group">
            <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          <div className="mt-8 lg:mt-12">
            <Badge variant="cyan" pulse size="md">Esports Since 2019</Badge>
            <h2 className="mt-4 text-4xl lg:text-5xl font-display font-black text-white leading-[1.05]">
              {highlight}{' '}
              {highlightAccent ? (
                <span className="gradient-text">{highlightAccent}</span>
              ) : (
                <span className="gradient-text">VioLencE</span>
              )}
            </h2>
            <p className="mt-4 text-gray-300 max-w-md leading-relaxed">
              India's premier BGMI esports clan. Compete in tournaments, track your stats, and rise through the ranks.
            </p>
          </div>

          <div className="mt-8 lg:mt-10 space-y-3 max-w-md">
            <Feature icon={FaBolt}     title="Compete weekly" text="Premium tournaments, fair play, real prize pools." />
            <Feature icon={FaShieldAlt} title="Fair & transparent" text="Verified rules, anti-cheat, clear payouts." />
            <Feature icon={FaUsers}    title="Grow together" text="Join 5,000+ competitive players and rising teams." />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Follow the journey</p>
          <div className="flex items-center gap-2">
            {[
              { Icon: FaInstagram, href: 'https://www.instagram.com/teamviolenceesports' },
              { Icon: FaYoutube,   href: 'https://www.youtube.com/channel/UCb1hDeIuyEwrltpCf-0dw9w' },
              { Icon: FaDiscord,   href: 'https://discord.gg/amN9D8SrN8' },
              { Icon: FaWhatsapp,  href: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu' },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href} target="_blank" rel="noreferrer"
                className="w-10 h-10 grid place-items-center rounded-xl glass border border-white/10 text-gray-300 hover:text-cyan-300 hover:border-cyan-400/40 transition"
              >
                <Icon className="text-base" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Feature({ icon: Icon, title, text }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/30 to-violet-500/30 border border-cyan-500/30 grid place-items-center shrink-0">
        <Icon className="text-cyan-300 text-sm" />
      </div>
      <div>
        <p className="text-white font-bold text-sm">{title}</p>
        <p className="text-xs text-gray-400 leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

function FormHeader({ title, subtitle, altLink }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl sm:text-4xl font-display font-black text-white leading-tight">
        {title}
      </h1>
      {subtitle && <p className="text-gray-400 text-sm mt-2">{subtitle}</p>}
      {altLink && (
        <p className="text-sm text-gray-400 mt-3">
          {altLink.prompt}{' '}
          <Link to={altLink.to} className="text-cyan-300 hover:text-cyan-200 font-semibold">
            {altLink.label}
          </Link>
        </p>
      )}
    </div>
  )
}
