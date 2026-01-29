import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaDiscord, FaInstagram, FaYoutube, FaTwitch, FaTrophy, FaGamepad, FaArrowRight, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FaDiscord, label: 'Discord', href: 'https://discord.gg/AmezSUbP' },
    { icon: FaInstagram, label: 'Instagram', href: '#' },
    { icon: FaYoutube, label: 'YouTube', href: '#' },
    { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu' },
  ]

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Team', path: '/team' },
    { name: 'Tournaments', path: '/tournaments' },
  ]

  const company = [
    { name: 'Contact Us', path: '#' },
    { name: 'Careers', path: '#' },
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms of Service', path: '#' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
    <footer className="relative bg-dark-950 border-t border-primary-500/10 mt-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-10 w-64 h-64 bg-primary-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary-700/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
          >
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                  <FaGamepad className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-display font-black gradient-text">
                  Team VioLencE
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Professional BGMI Esports Clan. Dominating the battlefield with precision, strategy, and relentless execution.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-dark-900/80 hover:bg-primary-600 border border-dark-800 hover:border-primary-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6 flex items-center">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-primary-400 transition-colors flex items-center group text-sm"
                    >
                      <span>{link.name}</span>
                      <FaArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-xs" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6 flex items-center">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3" />
                Company
              </h4>
              <ul className="space-y-3">
                {company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.path}
                      className="text-gray-400 hover:text-primary-400 transition-colors flex items-center group text-sm"
                    >
                      <span>{link.name}</span>
                      <FaArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-xs" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6 flex items-center">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3" />
                Contact Info
              </h4>
              <div className="space-y-4 text-sm text-gray-400">
                <div>
                  <p className="text-primary-400 font-semibold mb-1">Email</p>
                  <a href="mailto:teamviolence@gmail.com" className="hover:text-primary-400 transition-colors">
                    teamviolence@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-primary-400 font-semibold mb-1">Discord</p>
                  <a href="https://discord.gg/AmezSUbP" className="hover:text-primary-400 transition-colors">
                    Join Our Server
                  </a>
                </div>
                <div>
                  <p className="text-primary-400 font-semibold mb-1">WhatsApp</p>
                  <a href="https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu" className="hover:text-primary-400 transition-colors">
                    Join Channel
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent my-12" />

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0"
          >
            <div className="flex items-center space-x-2">
              <FaTrophy className="text-primary-500 text-lg" />
              <p>&copy; {currentYear} Team VioLencE. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-primary-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-primary-400 transition-colors">Sitemap</a>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-2 h-2 bg-primary-500 rounded-full opacity-30 animate-pulse" />
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-primary-600 rounded-full opacity-20 animate-pulse delay-300" />
      </div>
    </footer>
  )
}

export default Footer
