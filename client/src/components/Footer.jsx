import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { memo } from 'react'
import {
  FaDiscord, FaInstagram, FaYoutube, FaWhatsapp, FaTrophy, FaGamepad,
  FaArrowRight, FaHeart, FaPaperPlane, FaShieldAlt, FaCheck
} from 'react-icons/fa'
import Button from './ui/Button'

const Footer = memo(() => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const socialLinks = [
    { icon: FaDiscord,   label: 'Discord',   href: 'https://discord.gg/amN9D8SrN8',         color: 'hover:text-indigo-300 hover:border-indigo-400/50 hover:bg-indigo-500/10' },
    { icon: FaInstagram, label: 'Instagram', href: 'https://www.instagram.com/teamviolenceesports?igsh=MTRhOTRzMDR4aHQ2Mw==', color: 'hover:text-pink-300 hover:border-pink-400/50 hover:bg-pink-500/10' },
    { icon: FaYoutube,   label: 'YouTube',   href: 'https://www.youtube.com/channel/UCb1hDeIuyEwrltpCf-0dw9w', color: 'hover:text-red-300 hover:border-red-400/50 hover:bg-red-500/10' },
    { icon: FaWhatsapp,  label: 'WhatsApp',  href: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu', color: 'hover:text-emerald-300 hover:border-emerald-400/50 hover:bg-emerald-500/10' },
  ]

  const quickLinks = [
    { name: 'Home',                path: '/' },
    { name: 'Violence Esports',    path: '/violence-esports-tournaments' },
    { name: 'About Us',            path: '/about' },
    { name: 'Our Team',            path: '/team' },
    { name: 'Tournaments',         path: '/tournaments' },
    { name: 'Our Story',           path: '/discovery' },
  ]

  const tournamentLinks = [
    { name: 'Elite Masters',   path: '/tournaments' },
    { name: 'Pro League',      path: '/tournaments' },
    { name: 'Squad Wars',      path: '/tournaments' },
    { name: 'Free Entry Cups', path: '/tournaments' },
  ]

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email && email.includes('@')) {
      setSubscribed(true)
      setTimeout(() => { setEmail(''); setSubscribed(false) }, 3000)
    }
  }

  return (
    <footer className="relative overflow-hidden mt-24 border-t border-white/[0.06]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220] via-[#030712] to-[#030712]" />
      <div className="absolute inset-0 aurora-bg opacity-40" />
      <div className="absolute inset-0 grid-overlay" />
      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10">
        {/* CTA strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-conic rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8"
          >
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-xs font-bold tracking-wide mb-3">
                <FaGamepad className="text-cyan-300" />
                <span>JOIN THE ROSTER</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-white mb-1">
                <span className="gradient-text-static">Next tournament</span> drops soon.
              </h3>
              <p className="text-sm text-gray-400">Subscribe to get early-bird slots, scrim invites, and merch drops.</p>
            </div>
            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex gap-2">
              <div className="relative flex-1 lg:w-80">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@esports.gg"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
              </div>
              <Button type="submit" variant="primary" size="md" iconLeft={subscribed ? <FaCheck /> : <FaPaperPlane />}>
                {subscribed ? 'Subscribed' : 'Join'}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Main footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-10">
            {/* Brand */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-glow-cyan">
                  <FaGamepad className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl gradient-text-static">Team VioLencE</h3>
                  <p className="text-[10px] font-bold tracking-[0.3em] text-cyan-400">ESPORTS</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-md">
                Professional BGMI Esports Clan. Dominating the battlefield with precision, strategy,
                and relentless execution. Home of champions.
              </p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className={[
                      'w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 transition-all',
                      s.color,
                    ].join(' ')}
                    aria-label={s.label}
                  >
                    <s.icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Explore
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="group flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>{link.name}</span>
                      <FaArrowRight className="text-[10px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tournaments */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                Compete
              </h4>
              <ul className="space-y-2.5">
                {tournamentLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="group flex items-center gap-2 text-sm text-gray-400 hover:text-violet-300 transition-colors"
                    >
                      <span>{link.name}</span>
                      <FaArrowRight className="text-[10px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                Connect
              </h4>
              <div className="space-y-3 text-sm">
                <a href="mailto:esportsteamviolence@gmail.com" className="block text-gray-400 hover:text-cyan-300 transition-colors break-all">
                  esportsteamviolence@gmail.com
                </a>
                <a href="https://discord.gg/amN9D8SrN8" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-indigo-300 transition-colors">
                  Discord server
                </a>
                <a href="https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-emerald-300 transition-colors">
                  WhatsApp channel
                </a>
              </div>
            </div>
          </div>

          <div className="divider-gradient mb-6" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <FaTrophy className="text-cyan-400" />
              <span>© {currentYear} Team VioLencE. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Built with</span>
              <FaHeart className="text-pink-400" />
              <span>for the BGMI community</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <FaShieldAlt className="text-emerald-400" />
              <span>Safe & secure payments via Razorpay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
})

export default Footer
