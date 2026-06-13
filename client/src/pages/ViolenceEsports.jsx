import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FaBolt, FaTrophy, FaUsers, FaShieldAlt,
  FaArrowRight, FaCheckCircle, FaQuestion, FaChevronDown,
} from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import Section from '../components/ui/Section'
import Card, { MotionCard } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import LazyImage from '../components/LazyImage'

const heroImage = '/Line_up/Home_Swipe_Layout.webp'
const rosterImage = '/Line_up/Lobby_Basic_info/Dev_patel_basic_info1.jpg'
const crowdImage = '/Line_up/Home_Swipe_Layout3.webp'

const faqItems = [
  {
    question: 'How do I register for Violence Esports tournaments?',
    answer: 'Go to the Tournaments page, choose an event, and submit your team details. You will receive confirmation and next steps by email or Discord.',
  },
  {
    question: 'Are there free and paid tournaments?',
    answer: 'Yes. We host free community cups and paid premium events with larger prize pools. Each listing clearly shows the entry fee.',
  },
  {
    question: 'What games do you support?',
    answer: 'Our focus is BGMI and mobile esports. We expand formats based on community demand and season schedules.',
  },
  {
    question: 'How do you ensure fair play?',
    answer: 'We use multi-layer anti-cheat checks, clear rules, and verified staff review for disputes.',
  },
]

const pillars = [
  { icon: FaBolt,     title: 'Performance First', text: 'Stable lobbies, tight schedules, and professional moderation create a smooth competitive flow.' },
  { icon: FaShieldAlt, title: 'Fair Play',        text: 'Transparent rules, anti-cheat checks, and staff review keep outcomes legitimate.' },
  { icon: FaUsers,    title: 'Community Growth',  text: 'Teams get visibility, feedback, and clear steps to enter higher-tier tournaments.' },
]

const formats = [
  {
    title: 'Weekly Community Cups',
    text: 'Fast-paced events built for consistent practice. These are ideal for building synergy, testing rotations, and getting live feedback from real competition. Teams that show strong results often receive early access to premium qualifiers.',
  },
  {
    title: 'Seasonal Leagues',
    text: 'Longer formats built around standings, points, and progression. You play multiple match days, adjust strategies, and prove consistency. The league format is the most accurate mirror of professional play.',
  },
  {
    title: 'Premium Cash Cups',
    text: 'These are our highest-production events with elevated prize pools. They include tighter eligibility checks, detailed lobby management, and broadcast-ready match setups.',
  },
]

const clusters = [
  { title: 'Tournament Hub',  desc: 'Dates, formats, prize pools, and registration requirements.', link: '/tournaments' },
  { title: 'Roster and Roles', desc: 'Meet the players and learn how top teams structure roles.',     link: '/team' },
  { title: 'Community Growth', desc: 'Our story, milestones, and what we are building next.',          link: '/discovery' },
  { title: 'Join the Squad',   desc: 'Create an account and enter events faster.',                   link: '/register' },
]

function FaqItem({ q, a, defaultOpen = false }) {
  return (
    <details
      className="group glass rounded-2xl overflow-hidden"
      {...(defaultOpen ? { open: true } : {})}
    >
      <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <FaQuestion className="text-cyan-400 text-xs shrink-0" />
          {q}
        </h3>
        <FaChevronDown className="text-cyan-300 text-sm transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5 text-sm text-gray-300 leading-relaxed">
        {a}
      </div>
    </details>
  )
}

export default function ViolenceEsports() {
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
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
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
          'https://www.youtube.com/channel/UCb1hDeIuyEwrltpCf-0dw9w',
        ],
      },
      {
        '@type': 'WebSite',
        name: 'Violence Esports',
        url: 'https://violence.onrender.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://violence.onrender.com/tournaments?search={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SiteNavigationElement',
        name: ['Home', 'Tournaments', 'Team', 'Discovery'],
        url: [
          'https://violence.onrender.com/',
          'https://violence.onrender.com/tournaments',
          'https://violence.onrender.com/team',
          'https://violence.onrender.com/discovery',
        ],
      },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://violence.onrender.com/' },
      { '@type': 'ListItem', position: 2, name: 'Violence Esports Tournaments', item: 'https://violence.onrender.com/violence-esports-tournaments' },
    ],
  }

  return (
    <div className="pt-20 pb-12 text-gray-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <Section aurora className="overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <MotionCard>
            <div className="space-y-5">
              <Badge variant="cyan" size="md" className="uppercase tracking-[0.35em]">Violence Esports</Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black leading-[1.05]">
                Violence Esports Tournaments: <span className="gradient-text">Win the Arena</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl">
                Violence Esports runs competitive BGMI tournaments built for serious teams and rising stars. We combine fair play, clear rules, and high-production broadcasts so every match feels like a finals lobby. If you want reliable schedules, real prize pools, and a community that supports growth, you are in the right place.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button as={Link} to="/tournaments" size="lg" iconRight={<FaArrowRight />}>
                  View Live Tournaments
                </Button>
                <Button as={Link} to="/team" size="lg" variant="secondary">
                  Meet the Team
                </Button>
              </div>
            </div>
          </MotionCard>

          <MotionCard delay={0.15}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-3xl blur-2xl" />
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
          </MotionCard>
        </div>
      </Section>

      {/* Featured Snippet */}
      <Section>
        <Card variant="glass" className="p-6 sm:p-8">
          <p className="text-base sm:text-lg text-gray-200">
            <strong className="text-white">Featured Snippet Answer:</strong> Violence Esports hosts structured BGMI tournaments for squads who want fair competition, verified rules, and serious prize pools. Register online, follow match schedules, and compete in weekly cups or premium events. Our staff and community tools keep the experience smooth, transparent, and built for team growth.
          </p>
        </Card>
      </Section>

      {/* What makes us different */}
      <Section>
        <div className="space-y-8">
          <div className="space-y-3 max-w-3xl">
            <Badge variant="violet" size="md">The Difference</Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white">What Makes Violence Esports Different</h2>
            <p className="text-gray-300">
              We are not just a tournament page. We are a competitive ecosystem designed for teams who want consistency. Every event follows a structured rulebook, and every bracket is managed by staff who play the game. That means faster dispute resolution, clear communication, and fair outcomes.
            </p>
            <p className="text-gray-300">
              The Violence Esports approach is built around three pillars: performance, fairness, and growth. You get a reliable path to compete, learn from each event, and scale from community cups to premium series. Our focus is long-term player development, not one-off hype.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {pillars.map((p, i) => {
              const Icon = p.icon
              return (
                <MotionCard key={p.title} delay={i * 0.08}>
                  <Card variant="premium" hoverLift className="p-6 group h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-violet-500/30 border border-cyan-500/30 grid place-items-center mb-4 group-hover:scale-110 transition">
                      <Icon className="text-cyan-300 text-xl" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{p.text}</p>
                  </Card>
                </MotionCard>
              )
            })}
          </div>
        </div>
      </Section>

      {/* Formats */}
      <Section>
        <div className="space-y-8">
          <div className="space-y-3 max-w-3xl">
            <Badge variant="amber" size="md">Formats</Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white">Tournament Formats Built for Results</h2>
            <p className="text-gray-300">
              This pillar page anchors the full tournament experience. Use it as your hub, then explore each cluster: weekly cups, seasonal leagues, and high-stakes premium events. Each format targets a different stage of team development.
            </p>
          </div>

          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center">
            <div className="space-y-5">
              {formats.map((f, i) => (
                <MotionCard key={f.title} delay={i * 0.08}>
                  <Card variant="glass" className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="font-mono text-xs text-cyan-300 mt-1">0{i + 1}</div>
                      <div>
                        <h3 className="text-lg font-display font-bold text-white mb-2">{f.title}</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">{f.text}</p>
                      </div>
                    </div>
                  </Card>
                </MotionCard>
              ))}
              <Link to="/tournaments" className="inline-flex items-center gap-2 text-cyan-300 font-semibold hover:text-cyan-200 group">
                Browse all tournaments
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <MotionCard delay={0.2}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
                <LazyImage
                  src={crowdImage}
                  alt="BGMI esports crowd watching a finals match"
                  width={1200}
                  height={675}
                  className="relative rounded-3xl border border-white/10 shadow-2xl"
                />
              </div>
            </MotionCard>
          </div>
        </div>
      </Section>

      {/* How to register + prep */}
      <Section>
        <div className="space-y-8">
          <div className="space-y-3 max-w-3xl">
            <Badge variant="lime" size="md">Playbook</Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white">How to Register and Win More Matches</h2>
            <p className="text-gray-300">
              We want registrations to be simple, and preparation to be serious. The best teams treat registration like a checklist, then focus on fundamentals that win points: rotations, survival, and smart engagements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <MotionCard>
              <Card variant="premium" className="p-6 h-full">
                <h3 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
                  <Badge variant="cyan" size="sm">Step 1</Badge> Registration Checklist
                </h3>
                <ul className="space-y-2.5 text-sm text-gray-300">
                  {[
                    'Confirm your squad name and in-game IDs.',
                    'Read the rules and match schedule carefully.',
                    'Join the official Discord for lobby and result updates.',
                    'Submit proof or verification if required.',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <FaCheckCircle className="text-emerald-400 mt-0.5 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </Card>
            </MotionCard>
            <MotionCard delay={0.1}>
              <Card variant="premium" className="p-6 h-full">
                <h3 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
                  <Badge variant="violet" size="sm">Step 2</Badge> Preparation Playbook
                </h3>
                <ul className="space-y-2.5 text-sm text-gray-300">
                  {[
                    'Scrim against strong lobbies before match day.',
                    'Assign clear roles: IGL, entry, support, and scout.',
                    'Track landing zones and rotate early for position.',
                    'Review VODs after every event to improve.',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <FaCheckCircle className="text-cyan-400 mt-0.5 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </Card>
            </MotionCard>
          </div>

          <p className="text-sm text-gray-400">
            Internal guide: explore the{' '}
            <Link to="/discovery" className="text-cyan-300 hover:text-cyan-200">Violence Esports journey</Link>{' '}
            to see how top teams grow over seasons.
          </p>
        </div>
      </Section>

      {/* EEAT */}
      <Section>
        <div className="space-y-8">
          <div className="space-y-3 max-w-3xl">
            <Badge variant="magenta" size="md">EEAT</Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white">Experience, Expertise, Authority, Trust</h2>
            <p className="text-gray-300">
              We have operated real tournaments since 2019 and scaled through every format: small scrims, online leagues, and premium finals with large prize pools. Our staff includes experienced IGLs, analysts, and event managers who understand the game and the pressure of competitive play.
            </p>
            <p className="text-gray-300">
              We publish clear rules, consistent schedules, and transparent results. The community feedback loop is active through Discord and social channels, so teams get timely updates and direct support. This is how we keep trust high and confusion low.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <MotionCard>
              <LazyImage
                src={rosterImage}
                alt="Violence Esports roster preparing for tournaments"
                width={800}
                height={800}
                className="rounded-3xl border border-white/10 shadow-2xl w-full"
              />
            </MotionCard>
            <MotionCard delay={0.1}>
              <Card variant="glass" className="p-6">
                <h3 className="text-xl font-display font-bold text-white mb-4">Authority Signals You Can Verify</h3>
                <ul className="space-y-2.5 text-sm text-gray-300">
                  {[
                    'Tournament history and public highlights.',
                    'Transparent prize payouts and match results.',
                    'Dedicated moderation and anti-cheat reviews.',
                    'Growing partnerships and community endorsements.',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <FaCheckCircle className="text-cyan-400 mt-0.5 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-400 mt-5 leading-relaxed">
                  External resources: learn more about{' '}
                  <a className="text-cyan-300 hover:text-cyan-200" href="https://en.wikipedia.org/wiki/Esports" target="_blank" rel="noreferrer">esports competition standards</a>{' '}
                  and the official{' '}
                  <a className="text-cyan-300 hover:text-cyan-200" href="https://www.battlegroundsmobileindia.com/" target="_blank" rel="noreferrer">BGMI competitive ecosystem</a>.
                </p>
              </Card>
            </MotionCard>
          </div>
        </div>
      </Section>

      {/* Pillar cluster */}
      <Section>
        <div className="space-y-8">
          <div className="space-y-3 max-w-3xl">
            <Badge variant="cyan" size="md">Hub</Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white">Pillar-Cluster Content Hub</h2>
            <p className="text-gray-300">
              This page is the pillar. Use the clusters below to go deeper on specific topics and guide Google sitelinks and structured navigation signals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {clusters.map((c, i) => (
              <MotionCard key={c.title} delay={i * 0.06}>
                <Link to={c.link} className="block group">
                  <Card variant="premium" hoverLift className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-display font-bold text-white mb-1 group-hover:gradient-text transition-all">{c.title}</h3>
                        <p className="text-sm text-gray-400">{c.desc}</p>
                      </div>
                      <FaArrowRight className="text-cyan-300 text-sm group-hover:translate-x-2 transition-transform shrink-0" />
                    </div>
                  </Card>
                </Link>
              </MotionCard>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white text-center">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-3xl mx-auto">
            {faqItems.map((item, i) => (
              <FaqItem key={item.question} q={item.question} a={item.answer} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <Card variant="conic" className="overflow-hidden">
          <div className="relative p-8 sm:p-12 text-center space-y-5 max-w-3xl mx-auto">
            <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="relative text-3xl sm:text-4xl font-display font-black text-white">Ready to Compete?</h2>
            <p className="relative text-gray-300">
              Claim your slot in the next Violence Esports tournament and start building your team legacy.
            </p>
            <div className="relative pt-2">
              <Button as={Link} to="/tournaments" size="lg" iconRight={<FaArrowRight />}>
                Register for Tournaments
              </Button>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  )
}
