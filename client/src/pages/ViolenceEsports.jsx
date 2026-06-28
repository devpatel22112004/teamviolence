import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBolt, FaTrophy, FaUsers, FaShieldAlt, FaArrowRight, FaCheckCircle } from 'react-icons/fa'
import LazyImage from '../components/LazyImage'

const heroImage = '/Line_up/Home_Swipe_Layout.webp'
const rosterImage = '/Line_up/Lobby_Basic_info/Dev_patel_basic_info1.jpg'
const crowdImage = '/Line_up/Home_Swipe_Layout3.webp'

const faqItems = [
  {
    question: 'How do I register for Violence Esports tournaments?',
    answer: 'Go to the Tournaments page, choose an event, and submit your team details. You will receive confirmation and next steps by email or Discord.'
  },
  {
    question: 'Are there free and paid tournaments?',
    answer: 'Yes. We host free community cups and paid premium events with larger prize pools. Each listing clearly shows the entry fee.'
  },
  {
    question: 'What games do you support?',
    answer: 'Our focus is BGMI and mobile esports. We expand formats based on community demand and season schedules.'
  },
  {
    question: 'How do you ensure fair play?',
    answer: 'We use multi-layer anti-cheat checks, clear rules, and verified staff review for disputes.'
  }
]

const ViolenceEsports = () => {
  useEffect(() => {
    const title = 'Violence Esports Tournaments: Win the Arena'
    const description = 'Join Violence Esports tournaments for BGMI teams. Compete in fair, high-production events, grow your skills, and claim prize pools.'
    const canonicalUrl = `${window.location.origin}/violence-esports-tournaments`
    const ogImage = `${window.location.origin}${heroImage}`
    document.title = title

    const setMeta = (attr, key, value) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attr, key)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', value)
    }

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:image', ogImage)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImage)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)
  }, [])

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }

  const siteGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Violence Esports',
        url: 'https://violence.onrender.com',
        sameAs: [
          'https://www.instagram.com/teamviolenceesports',
          'https://www.youtube.com/channel/UCb1hDeIuyEwrltpCf-0dw9w'
        ]
      },
      {
        '@type': 'WebSite',
        name: 'Violence Esports',
        url: 'https://violence.onrender.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://violence.onrender.com/tournaments?search={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'SiteNavigationElement',
        name: ['Home', 'Tournaments', 'Team', 'Discovery'],
        url: [
          'https://violence.onrender.com/',
          'https://violence.onrender.com/tournaments',
          'https://violence.onrender.com/team',
          'https://violence.onrender.com/discovery'
        ]
      }
    ]
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://violence.onrender.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Violence Esports Tournaments',
        item: 'https://violence.onrender.com/violence-esports-tournaments'
      }
    ]
  }

  return (
    <div className="pt-24 pb-24 bg-gradient-to-br from-slate-950 via-slate-900 to-black text-gray-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/20 blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center"
          >
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-primary-300">Violence Esports</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                Violence Esports Tournaments: Win the Arena
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl">
                Violence Esports runs competitive BGMI tournaments built for serious teams and rising stars. We combine fair play, clear rules, and high-production broadcasts so every match feels like a finals lobby. If you want reliable schedules, real prize pools, and a community that supports growth, you are in the right place.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/tournaments" className="btn-primary inline-flex items-center gap-2 px-5 py-3 text-sm sm:text-base">
                  View Live Tournaments
                  <FaArrowRight />
                </Link>
                <Link to="/team" className="btn-secondary inline-flex items-center gap-2 px-5 py-3 text-sm sm:text-base">
                  Meet the Team
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
              <LazyImage
                src={heroImage}
                alt="Violence Esports tournament stage with premium production"
                width={1200}
                height={675}
                loading="eager"
                fetchpriority="high"
                className="relative rounded-3xl border border-white/10 shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-slate-900/70 border border-slate-700/60 rounded-3xl p-8 sm:p-10">
          <p className="text-base sm:text-lg text-gray-200">
            <strong className="text-white">Featured Snippet Answer:</strong> Violence Esports hosts structured BGMI tournaments for squads who want fair competition, verified rules, and serious prize pools. Register online, follow match schedules, and compete in weekly cups or premium events. Our staff and community tools keep the experience smooth, transparent, and built for team growth.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-10">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-white">What Makes Violence Esports Different</h2>
          <p className="text-gray-300">
            We are not just a tournament page. We are a competitive ecosystem designed for teams who want consistency. Every event follows a structured rulebook, and every bracket is managed by staff who play the game. That means faster dispute resolution, clear communication, and fair outcomes.
          </p>
          <p className="text-gray-300">
            The Violence Esports approach is built around three pillars: performance, fairness, and growth. You get a reliable path to compete, learn from each event, and scale from community cups to premium series. Our focus is long-term player development, not one-off hype.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: FaBolt, title: 'Performance First', text: 'Stable lobbies, tight schedules, and professional moderation create a smooth competitive flow.' },
            { icon: FaShieldAlt, title: 'Fair Play', text: 'Transparent rules, anti-cheat checks, and staff review keep outcomes legitimate.' },
            { icon: FaUsers, title: 'Community Growth', text: 'Teams get visibility, feedback, and clear steps to enter higher-tier tournaments.' },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6">
              <item.icon className="text-primary-400 text-2xl mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-10">
        <h2 className="text-3xl sm:text-4xl font-black text-white">Tournament Formats Built for Results</h2>
        <p className="text-gray-300">
          This pillar page anchors the full tournament experience. Use it as your hub, then explore each cluster: weekly cups, seasonal leagues, and high-stakes premium events. Each format targets a different stage of team development.
        </p>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Weekly Community Cups</h3>
              <p className="text-gray-400">
                Fast-paced events built for consistent practice. These are ideal for building synergy, testing rotations, and getting live feedback from real competition. Teams that show strong results often receive early access to premium qualifiers.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Seasonal Leagues</h3>
              <p className="text-gray-400">
                Longer formats built around standings, points, and progression. You play multiple match days, adjust strategies, and prove consistency. The league format is the most accurate mirror of professional play.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Premium Cash Cups</h3>
              <p className="text-gray-400">
                These are our highest-production events with elevated prize pools. They include tighter eligibility checks, detailed lobby management, and broadcast-ready match setups.
              </p>
            </div>
            <Link to="/tournaments" className="inline-flex items-center gap-2 text-primary-300 font-semibold hover:text-primary-200">
              Browse all tournaments
              <FaArrowRight />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-primary-500/20 rounded-3xl blur-2xl" />
            <LazyImage
              src={crowdImage}
              alt="BGMI esports crowd watching a finals match"
              width={1200}
              height={675}
              className="relative rounded-3xl border border-white/10 shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-8">
        <h2 className="text-3xl sm:text-4xl font-black text-white">How to Register and Win More Matches</h2>
        <p className="text-gray-300">
          We want registrations to be simple, and preparation to be serious. The best teams treat registration like a checklist, then focus on fundamentals that win points: rotations, survival, and smart engagements.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6">
            <h3 className="text-xl font-bold text-white mb-3">Registration Checklist</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2"><FaCheckCircle className="text-emerald-400 mt-1" />Confirm your squad name and in-game IDs.</li>
              <li className="flex items-start gap-2"><FaCheckCircle className="text-emerald-400 mt-1" />Read the rules and match schedule carefully.</li>
              <li className="flex items-start gap-2"><FaCheckCircle className="text-emerald-400 mt-1" />Join the official Discord for lobby and result updates.</li>
              <li className="flex items-start gap-2"><FaCheckCircle className="text-emerald-400 mt-1" />Submit proof or verification if required.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6">
            <h3 className="text-xl font-bold text-white mb-3">Preparation Playbook</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2"><FaCheckCircle className="text-emerald-400 mt-1" />Scrim against strong lobbies before match day.</li>
              <li className="flex items-start gap-2"><FaCheckCircle className="text-emerald-400 mt-1" />Assign clear roles: IGL, entry, support, and scout.</li>
              <li className="flex items-start gap-2"><FaCheckCircle className="text-emerald-400 mt-1" />Track landing zones and rotate early for position.</li>
              <li className="flex items-start gap-2"><FaCheckCircle className="text-emerald-400 mt-1" />Review VODs after every event to improve.</li>
            </ul>
          </div>
        </div>
        <p className="text-gray-400 text-sm">
          Internal guide: explore the <Link to="/discovery" className="text-primary-300 hover:text-primary-200">Violence Esports journey</Link> to see how top teams grow over seasons.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-8">
        <h2 className="text-3xl sm:text-4xl font-black text-white">Experience, Expertise, Authority, Trust</h2>
        <p className="text-gray-300">
          We have operated real tournaments since 2019 and scaled through every format: small scrims, online leagues, and premium finals with large prize pools. Our staff includes experienced IGLs, analysts, and event managers who understand the game and the pressure of competitive play.
        </p>
        <p className="text-gray-300">
          We publish clear rules, consistent schedules, and transparent results. The community feedback loop is active through Discord and social channels, so teams get timely updates and direct support. This is how we keep trust high and confusion low.
        </p>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <LazyImage
            src={rosterImage}
            alt="Violence Esports roster preparing for tournaments"
            width={800}
            height={800}
            className="rounded-3xl border border-white/10 shadow-2xl"
          />
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Authority Signals You Can Verify</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2"><FaCheckCircle className="text-primary-400 mt-1" />Tournament history and public highlights.</li>
              <li className="flex items-start gap-2"><FaCheckCircle className="text-primary-400 mt-1" />Transparent prize payouts and match results.</li>
              <li className="flex items-start gap-2"><FaCheckCircle className="text-primary-400 mt-1" />Dedicated moderation and anti-cheat reviews.</li>
              <li className="flex items-start gap-2"><FaCheckCircle className="text-primary-400 mt-1" />Growing partnerships and community endorsements.</li>
            </ul>
            <p className="text-gray-400 text-sm">
              External resources: learn more about <a className="text-primary-300 hover:text-primary-200" href="https://en.wikipedia.org/wiki/Esports" target="_blank" rel="noreferrer">esports competition standards</a> and the official <a className="text-primary-300 hover:text-primary-200" href="https://www.battlegroundsmobileindia.com/" target="_blank" rel="noreferrer">BGMI competitive ecosystem</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-8">
        <h2 className="text-3xl sm:text-4xl font-black text-white">Pillar-Cluster Content Hub</h2>
        <p className="text-gray-300">
          This page is the pillar. Use the clusters below to go deeper on specific topics and guide Google sitelinks and structured navigation signals.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: 'Tournament Hub', desc: 'Dates, formats, prize pools, and registration requirements.', link: '/tournaments' },
            { title: 'Roster and Roles', desc: 'Meet the players and learn how top teams structure roles.', link: '/team' },
            { title: 'Community Growth', desc: 'Our story, milestones, and what we are building next.', link: '/discovery' },
            { title: 'Join the Squad', desc: 'Create an account and enter events faster.', link: '/register' },
          ].map((item) => (
            <Link key={item.title} to={item.link} className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6 hover:border-primary-400/60 transition">
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="rounded-3xl border border-slate-700/70 bg-slate-900/60 p-8 sm:p-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqItems.map(item => (
              <div key={item.question} className="border-b border-slate-700/60 pb-4">
                <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                <p className="text-gray-400 text-sm mt-2">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="rounded-3xl border border-primary-500/40 bg-gradient-to-br from-primary-500/10 to-purple-500/10 p-8 sm:p-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Ready to Compete?</h2>
          <p className="text-gray-300 mb-6">Claim your slot in the next Violence Esports tournament and start building your team legacy.</p>
          <Link to="/tournaments" className="btn-primary inline-flex items-center gap-2 px-6 py-3">
            Register for Tournaments
            <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default ViolenceEsports
