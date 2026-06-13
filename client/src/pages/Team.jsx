import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaDiscord, FaInstagram, FaYoutube, FaWhatsapp,
  FaCrown, FaVideo, FaEdit, FaArrowRight, FaTimes, FaSearch,
  FaGamepad, FaCrosshairs, FaUsers,
} from 'react-icons/fa'
import Section from '../components/ui/Section'
import Card, { MotionCard } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import Button from '../components/ui/Button'
import { formatImagePath, handleImageError } from '../utils/images'

const CLAN_LOGO = '/Line_up/logo.png'

// =====================
// Data
// =====================
const organizers = [
  {
    _id: 'umang-rana', name: 'Umang Rana', role: 'Co-Leader / Flex IGL', category: 'Organizer',
    kills: 5739, winRate: 84, ign: 'VioLencE UB', since: 2019,
    description: 'Aggressive co-leader who blends IGL instincts with raw fragging power. Unpredictable rotations, ruthless decision-making, and the firepower to back every call. Keeps the team sharp and enemies on edge.',
    image: '/Line_up/Umang Rana.jpg',
    additionalImages: [
      { type: 'basic_info', url: '/Line_up/Lobby_Basic_info/UMANG_rana_BASIC_INFO.jpg' },
      { type: 'lobby', url: '/Line_up/Lobby_Basic_info/Umang Rana _LOBBY.jpg' },
    ],
    socials: { discord: 'https://discord.gg/amN9D8SrN8', instagram: 'https://instagram.com/umangrana', whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu' },
  },
  {
    _id: 'karan-patel', name: 'Karan Patel', role: 'Entry Fragger / Organizer', category: 'Organizer',
    kills: 5111, winRate: 72, ign: 'VioLencE KP', since: 2020,
    description: 'Fearless entry specialist who cracks compound doors and creates the chaos that wins fights. Aggressive entries, flawless trades, and the aggression to control zones. The breach that breaks defenses.',
    image: '/Line_up/karan-patel.jpeg',
    additionalImages: [
      { type: 'basic_info', url: '/Line_up/Lobby_Basic_info/Karan_patel_basic_info.jpg' },
      { type: 'lobby', url: '/Line_up/Lobby_Basic_info/Karan_patel_lobby.jpg' },
    ],
    socials: { discord: 'https://discord.gg/amN9D8SrN8', instagram: 'https://instagram.com/karanpatel', whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu' },
  },
  {
    _id: 'purvang-pandya', name: 'Purvang Pandya', role: 'Elite DMR Specialist / Organizer', category: 'Organizer',
    kills: 4999, winRate: 72, ign: 'VioLencE PV', since: 2023,
    description: 'Legendary long-range specialist whose precision knocks open every engagement. Clutch DMR plays that shift momentum, ridiculous aim, and the poise to perform under pressure when it matters most.',
    image: '/Line_up/Purvang Pandya.jpg',
    additionalImages: [
      { type: 'basic_info', url: '/Line_up/Lobby_Basic_info/Purvang_pandya_basic_ino.jpg' },
      { type: 'lobby', url: '/Line_up/Lobby_Basic_info/Purvang_pandya_lobby.jpg' },
    ],
    socials: { discord: 'https://discord.gg/amN9D8SrN8', instagram: 'https://instagram.com/purvangpandya', whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu' },
  },
  {
    _id: 'aayush-panchal', name: 'Aayush Panchal', role: 'Strategic Analyst / Organizer', category: 'Organizer',
    kills: 4120, winRate: 75, ign: 'VioLencE DP', since: 2022,
    description: 'Strategic mind who decodes enemy patterns and optimizes team plays. Deep VOD breakdowns, mid-round adjustments, and mental fortitude coaching keep VioLencE one step ahead in every engagement.',
    image: '/Line_up/Aayush Panchal.webp',
    additionalImages: [
      { type: 'basic_info', url: '/Line_up/Lobby_Basic_info/Aayush_panchal_basic_info.jpg' },
      { type: 'lobby', url: '/Line_up/Lobby_Basic_info/Aayush_panchal_lobby.jpg' },
    ],
    socials: { discord: 'https://discord.gg/amN9D8SrN8', instagram: 'https://instagram.com/aayushpanchal', whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu' },
  },
  {
    _id: 'rinkesh-rajput', name: 'Rinkesh Rajput', role: 'Assaulter / Organizer', category: 'Organizer',
    kills: 4895, winRate: 72, ign: 'VioLencE RR', since: 2020,
    description: 'Explosive assaulter who breaks defenses with fast entries and relentless pressure. Reads timing windows, commits to duels, and clears space for the squad to dominate zones.',
    image: '/Line_up/Rinkesh Rajput.jpeg',
    additionalImages: [
      { type: 'basic_info', url: '/Line_up/Lobby_Basic_info/Rinkesh_rajput_basic_info.jpeg' },
      { type: 'lobby', url: '/Line_up/Lobby_Basic_info/Rinkesh_rajput_lobby.jpeg' },
    ],
    socials: { discord: 'https://discord.gg/amN9D8SrN8', instagram: 'https://instagram.com/rinkeshrajput', whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu' },
  },
]

const creators = [
  {
    _id: 'jainish-soni', name: 'Jainish Soni', role: 'Video Editor / Content Creator', category: 'Creator',
    kills: 4136, winRate: 71, ign: 'VioLencE JS', since: 2021,
    description: 'Creative mastermind behind VioLencE content and brand presence. Master video editor crafting cinematic highlights, managing all social media channels, and driving promotional strategies. Transforms raw gameplay into viral moments while building the clan\'s digital empire.',
    image: '/Line_up/Jainish_Soni.jpeg',
    additionalImages: [
      { type: 'basic_info', url: '/Line_up/Lobby_Basic_info/jainish_soni_Basic_info.jpeg' },
      { type: 'lobby', url: '/Line_up/Lobby_Basic_info/jainish_soni_Lobby.jpeg' },
    ],
    socials: { discord: 'https://discord.gg/amN9D8SrN8', instagram: 'https://instagram.com/jainishsoni', whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu' },
  },
  {
    _id: 'dev-patel', name: 'Dev Patel', role: 'IGL / Founder / Creator', category: 'Creator',
    kills: 5320, winRate: 77, ign: 'VioLencE 乂', since: 2019,
    description: 'Visionary founder and in-game leader of Team VioLencE. Built the clan from the ground up with strategic genius and unwavering determination. Calls rotations that break defenses and clutches that win championships.',
    image: '/Line_up/Dev Patel.jpg',
    additionalImages: [
      { type: 'basic_info', url: '/Line_up/Lobby_Basic_info/Dev_patel_basic_info1.jpg' },
      { type: 'lobby', url: '/Line_up/Lobby_Basic_info/Dev_patel_lobby1.jpg' },
    ],
    socials: { discord: 'https://discord.gg/amN9D8SrN8', instagram: 'https://instagram.com/devpatel', whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu' },
  },
  {
    _id: 'harsh-thakor', name: 'Harsh Thakor', role: 'Support Anchor / Creator', category: 'Creator',
    kills: 4798, winRate: 78, ign: 'VioLencE HT', since: 2020,
    description: 'Steady support anchor who locks down flanks and stabilizes every round. Reliable utility, smart positioning, and the composure to hold zones under fire. The silent protector of VioLencE.',
    image: '/Line_up/Harsh Thakor.jpg',
    additionalImages: [
      { type: 'basic_info', url: '/Line_up/Lobby_Basic_info/Harsh_thakor_basic_info.jpg' },
      { type: 'lobby', url: '/Line_up/Lobby_Basic_info/Harsh_thakor_lobby.jpg' },
    ],
    socials: { discord: 'https://discord.gg/amN9D8SrN8', instagram: 'https://instagram.com/harshthakor', whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu' },
  },
  {
    _id: 'mehul-darji', name: 'Mehul Darji', role: 'Aggressive Scout / Creator', category: 'Creator',
    kills: 4510, winRate: 73, ign: 'VioLencE MD', since: 2021,
    description: 'Second co-leader and tactical scout who leads aggressive zone pushes and info plays. Rotations that catch teams off-guard, discipline mixed with aggression, and the leadership to hold composure.',
    image: '/Line_up/Mehul Darji.jpg',
    additionalImages: [
      { type: 'basic_info', url: '/Line_up/Lobby_Basic_info/Mehul_darji_basic_info.jpg' },
      { type: 'lobby', url: '/Line_up/Lobby_Basic_info/Mehul_darji_lobby.jpg' },
    ],
    socials: { discord: 'https://discord.gg/amN9D8SrN8', instagram: 'https://instagram.com/mehuldarji', whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu' },
  },
]

const allMembers = [...organizers, ...creators]

// =====================
// Member Card
// =====================
function MemberCard({ member, index, onClick }) {
  return (
    <MotionCard delay={index * 0.05}>
      <button
        type="button"
        onClick={() => onClick(member)}
        className="group relative w-full text-left rounded-2xl overflow-hidden glass hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1"
      >
        {/* Image */}
        <div className="aspect-[4/5] relative overflow-hidden">
          <img
            src={formatImagePath(member.image)}
            alt={member.name}
            loading="lazy"
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {/* gradient veil on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/0 to-black/0 opacity-80 group-hover:opacity-100 transition-opacity" />
          {/* hover overlay quick info */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex items-center gap-2 text-cyan-200 text-xs font-semibold mb-1">
              <FaSearch className="text-[10px]" /> View profile
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant={member.category === 'Organizer' ? 'amber' : 'violet'} size="sm">
              {member.category}
            </Badge>
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Since {member.since}</span>
          </div>
          <h3 className="font-display font-black text-white text-base leading-tight truncate">{member.name}</h3>
          <p className="text-cyan-300 text-xs font-bold uppercase tracking-wider line-clamp-1">{member.role}</p>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="rounded-lg bg-surface-2/60 border border-white/5 p-2 text-center">
              <div className="font-mono font-bold text-white text-sm">{member.kills}+</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Kills</div>
            </div>
            <div className="rounded-lg bg-surface-2/60 border border-white/5 p-2 text-center">
              <div className="font-mono font-bold text-white text-sm">{member.winRate}%</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Win</div>
            </div>
          </div>
        </div>
      </button>
    </MotionCard>
  )
}

// =====================
// Member Modal
// =====================
function MemberModal({ member, onClose, onImage }) {
  useEffect(() => {
    if (!member) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [member, onClose])

  return (
    <AnimatePresence>
      {member && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80]"
          />
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="pointer-events-auto relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-500/30 bg-surface-1/95 backdrop-blur-2xl shadow-2xl"
              style={{ boxShadow: '0 30px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(34,211,238,0.08)' }}
            >
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
              <button
                type="button" onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full glass-strong flex items-center justify-center text-white hover:text-cyan-300 transition"
                aria-label="Close"
              >
                <FaTimes />
              </button>

              <div className="grid md:grid-cols-[5fr_7fr] gap-0">
                {/* Left — Image + IGN */}
                <div className="relative">
                  <div className="aspect-square md:aspect-auto md:h-full overflow-hidden">
                    <img
                      src={formatImagePath(member.image)}
                      alt={member.name}
                      onError={handleImageError}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-surface-1 to-transparent p-5">
                    <Badge variant="amber" size="md" className="mb-2">{member.category}</Badge>
                    <p className="text-[10px] uppercase tracking-widest text-cyan-300 font-bold">In-Game Name</p>
                    <p className="text-white font-display font-black text-lg">{member.ign}</p>
                  </div>
                </div>

                {/* Right — Info */}
                <div className="p-6 sm:p-8 space-y-5">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-white leading-tight">{member.name}</h2>
                    <p className="text-cyan-300 font-bold uppercase tracking-widest text-xs mt-1">{member.role}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="glass rounded-xl p-3 text-center">
                      <FaCrosshairs className="text-cyan-400 text-xs mx-auto mb-1" />
                      <div className="font-mono font-bold text-white text-lg">{member.kills}+</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest">Kills</div>
                    </div>
                    <div className="glass rounded-xl p-3 text-center">
                      <FaGamepad className="text-violet-400 text-xs mx-auto mb-1" />
                      <div className="font-mono font-bold text-white text-lg">{member.winRate}%</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest">Win</div>
                    </div>
                    <div className="glass rounded-xl p-3 text-center">
                      <FaUsers className="text-pink-400 text-xs mx-auto mb-1" />
                      <div className="font-mono font-bold text-white text-lg">{member.since}</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest">Since</div>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed">{member.description}</p>

                  {member.additionalImages?.length > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Screenshots</p>
                      <div className="grid grid-cols-2 gap-2">
                        {member.additionalImages.map((img, idx) => (
                          <button
                            key={idx} type="button" onClick={() => onImage(img)}
                            className="relative group overflow-hidden rounded-xl border border-white/10 hover:border-cyan-400/60 transition"
                          >
                            <div className="aspect-video">
                              <img
                                src={formatImagePath(img.url)}
                                alt={img.type}
                                onError={handleImageError}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div className="absolute inset-x-0 bottom-0 px-2 py-1.5 bg-gradient-to-t from-black/80 to-transparent">
                              <span className="text-[10px] uppercase tracking-widest font-bold text-white">
                                {img.type === 'basic_info' ? 'Basic Info' : 'Lobby'}
                              </span>
                            </div>
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-cyan-500/80 grid place-items-center text-white text-[10px]">
                              <FaSearch />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <a href={member.socials.discord} target="_blank" rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold bg-indigo-500/15 text-indigo-200 border border-indigo-500/30 hover:bg-indigo-500/25 transition">
                      <FaDiscord /> Discord
                    </a>
                    <a href={member.socials.instagram} target="_blank" rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold bg-pink-500/15 text-pink-200 border border-pink-500/30 hover:bg-pink-500/25 transition">
                      <FaInstagram /> Insta
                    </a>
                    <a href={member.socials.whatsapp} target="_blank" rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold bg-emerald-500/15 text-emerald-200 border border-emerald-500/30 hover:bg-emerald-500/25 transition">
                      <FaWhatsapp /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

// =====================
// Image Viewer
// =====================
function ImageViewer({ image, onClose }) {
  useEffect(() => {
    if (!image) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [image, onClose])

  return (
    <AnimatePresence>
      {image && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            className="relative max-w-5xl w-full"
          >
            <div className="absolute -top-12 left-0">
              <Badge variant="cyan" size="md">
                {image.type === 'basic_info' ? 'Basic Info' : 'Lobby'}
              </Badge>
            </div>
            <button
              type="button" onClick={onClose}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-red-500/80 hover:bg-red-500 grid place-items-center text-white transition"
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <div className="rounded-2xl border border-cyan-500/30 overflow-hidden bg-surface-1 shadow-2xl">
              <img
                src={formatImagePath(image.url)}
                alt={image.type}
                onError={handleImageError}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// =====================
// Page
// =====================
const CATEGORIES = [
  { id: 'all', label: 'All Members', members: allMembers, icon: FaUsers, color: 'from-cyan-400 to-violet-500' },
  { id: 'organizer', label: 'Organizers', members: organizers, icon: FaCrown, color: 'from-amber-400 to-orange-500' },
  { id: 'creator', label: 'Content Creators', members: creators, icon: FaVideo, color: 'from-violet-400 to-pink-500' },
]

export default function Team() {
  const [activeCat, setActiveCat] = useState('all')
  const [selected, setSelected] = useState(null)
  const [image, setImage] = useState(null)

  const current = CATEGORIES.find((c) => c.id === activeCat)
  const totalKills = useMemo(() => allMembers.reduce((s, m) => s + m.kills, 0), [])
  const avgWin = useMemo(() => Math.round(allMembers.reduce((s, m) => s + m.winRate, 0) / allMembers.length), [])

  return (
    <div className="pt-20 pb-12">
      {/* Hero */}
      <Section aurora className="overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
        <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="space-y-5">
            <Badge variant="cyan" pulse size="md" className="!text-cyan-200">
              Prime Lineup
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black leading-[1.05]">
              Team <span className="gradient-text">VioLencE</span>
              <br />
              <span className="text-gray-400 text-3xl md:text-4xl">Roster</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed">
              Meet the elite squad. Tap any member to open their premium profile — bios, stats, screenshots, and live socials.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 max-w-md">
              <div className="glass rounded-xl p-3 text-center">
                <div className="font-mono font-bold text-2xl text-white">{allMembers.length}</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">Members</div>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <div className="font-mono font-bold text-2xl text-cyan-300">{totalKills.toLocaleString()}+</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">Total Kills</div>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <div className="font-mono font-bold text-2xl text-violet-300">{avgWin}%</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">Avg Win</div>
              </div>
            </div>
          </div>

          {/* Hero visual — leader cards */}
          <div className="relative h-[420px] hidden lg:block">
            <div className="absolute inset-0 grid-overlay opacity-20 rounded-3xl" />
            {allMembers.slice(0, 3).map((m, i) => (
              <motion.div
                key={m._id}
                initial={{ opacity: 0, y: 30, rotate: i === 0 ? 0 : i === 1 ? 4 : -4 }}
                animate={{ opacity: 1, y: 0, rotate: i === 0 ? 0 : i === 1 ? 4 : -4 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className={`absolute glass rounded-2xl border border-cyan-500/20 overflow-hidden shadow-2xl ${
                  i === 0 ? 'top-0 left-6 w-56' :
                  i === 1 ? 'top-16 right-2 w-56' :
                  'bottom-4 left-1/3 w-56'
                }`}
                style={{ boxShadow: '0 20px 60px -20px rgba(34,211,238,0.35)' }}
              >
                <div className="aspect-[4/5]">
                  <img
                    src={formatImagePath(m.image)}
                    alt={m.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 text-center">
                  <p className="font-display font-black text-white text-sm">{m.name}</p>
                  <p className="text-[10px] text-cyan-300 uppercase tracking-widest">{m.role.split('/')[0]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Category tabs */}
      <Section contained={false} className="!py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CATEGORIES.map((c) => {
              const Icon = c.icon
              const active = activeCat === c.id
              return (
                <button
                  key={c.id} type="button" onClick={() => setActiveCat(c.id)}
                  className={`group relative inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all ${
                    active
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="team-cat-pill"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <Icon className="text-sm" />
                    {c.label}
                    <span className={`font-mono text-xs ${active ? 'text-white/80' : 'text-gray-500'}`}>
                      {c.members.length}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </Section>

      {/* Roster grid */}
      <Section>
        <motion.div
          key={activeCat}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4"
        >
          {current.members.map((m, i) => (
            <MemberCard key={m._id} member={m} index={i} onClick={setSelected} />
          ))}
        </motion.div>
      </Section>

      {/* Connect */}
      <Section>
        <Card variant="conic" className="p-8 sm:p-10 lg:p-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="magenta" size="md">Stay Connected</Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
              Follow the <span className="gradient-text">VioLencE</span> journey
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto">
              Watch scrim VODs, follow tournaments, and join the community across our channels.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
            <a href="https://www.instagram.com/teamviolenceesports" target="_blank" rel="noreferrer"
              className="group flex items-center gap-3 p-4 rounded-2xl glass hover:border-pink-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 grid place-items-center text-white shrink-0 group-hover:scale-110 transition">
                <FaInstagram className="text-xl" />
              </div>
              <div className="min-w-0">
                <div className="text-white font-bold text-sm">Instagram</div>
                <div className="text-xs text-gray-400 truncate">@teamviolenceesports</div>
              </div>
            </a>
            <a href="https://www.youtube.com/channel/UCb1hDeIuyEwrltpCf-0dw9w" target="_blank" rel="noreferrer"
              className="group flex items-center gap-3 p-4 rounded-2xl glass hover:border-red-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 grid place-items-center text-white shrink-0 group-hover:scale-110 transition">
                <FaYoutube className="text-xl" />
              </div>
              <div className="min-w-0">
                <div className="text-white font-bold text-sm">YouTube</div>
                <div className="text-xs text-gray-400 truncate">VioLencE Esports</div>
              </div>
            </a>
            <a href="https://discord.gg/amN9D8SrN8" target="_blank" rel="noreferrer"
              className="group flex items-center gap-3 p-4 rounded-2xl glass hover:border-indigo-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 grid place-items-center text-white shrink-0 group-hover:scale-110 transition">
                <FaDiscord className="text-xl" />
              </div>
              <div className="min-w-0">
                <div className="text-white font-bold text-sm">Discord</div>
                <div className="text-xs text-gray-400 truncate">Join the community</div>
              </div>
            </a>
            <a href="https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu" target="_blank" rel="noreferrer"
              className="group flex items-center gap-3 p-4 rounded-2xl glass hover:border-emerald-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 grid place-items-center text-white shrink-0 group-hover:scale-110 transition">
                <FaWhatsapp className="text-xl" />
              </div>
              <div className="min-w-0">
                <div className="text-white font-bold text-sm">WhatsApp</div>
                <div className="text-xs text-gray-400 truncate">Quick updates</div>
              </div>
            </a>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">Want to <span className="gradient-text">join the team</span>?</h3>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">Submit your details and tryouts. We scout talent, not followers.</p>
            <Button as="a" href="https://forms.gle/z6Vj1eJXtg8RQGfz7" target="_blank" rel="noreferrer" size="lg" iconLeft={<FaEdit />}>
              Open Tryout Form <FaArrowRight className="ml-1" />
            </Button>
          </div>
        </Card>
      </Section>

      {/* Modals */}
      <MemberModal member={selected} onClose={() => setSelected(null)} onImage={setImage} />
      <ImageViewer image={image} onClose={() => setImage(null)} />
    </div>
  )
}
