const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const User = require('./models/User')
const Tournament = require('./models/Tournament')
const TeamMember = require('./models/TeamMember')

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing data
    await User.deleteMany({})
    await Tournament.deleteMany({})
    await TeamMember.deleteMany({})
    console.log('🗑️  Cleared existing data')

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10)
    const admin = await User.create({
      name: 'Team VioLencE Admin',
      email: 'admin@teamviolence.com',
      phone: '9876543210',
      password: adminPassword,
      role: 'admin'
    })
    console.log('✅ Admin user created (email: admin@teamviolence.com, password: admin123)')

    // Create test users with realistic data
    const userPassword = await bcrypt.hash('user123', 10)
    await User.create({
      name: 'Dev Patel',
      email: 'devpatel@teamviolence.com',
      phone: '9876543211',
      password: userPassword,
      role: 'user'
    })
    
    await User.create({
      name: 'Karan Patel',
      email: 'karanpatel@teamviolence.com',
      phone: '9876543212',
      password: userPassword,
      role: 'user'
    })
    
    await User.create({
      name: 'Test Player',
      email: 'user@test.com',
      phone: '9876543213',
      password: userPassword,
      role: 'user'
    })
    console.log('✅ Test users created')

    // Create team members
    const teamMembers = [
      // Organizers
      {
        name: 'Umang Rana',
        role: 'Co-Leader / Flex IGL',
        kills: 5739,
        winRate: 84,
        description: 'Aggressive co-leader who blends IGL instincts with raw fragging power. Unpredictable rotations, ruthless decision-making, and the firepower to back every call. Keeps the team sharp and enemies on edge.',
        ingameName: 'VioLencE UB',
        since: 2019,
        category: 'Organizer',
        image: '/Line_up/Umang Rana.jpg',
        socials: {
          discord: 'https://discord.gg/amN9D8SrN8',
          instagram: 'https://www.instagram.com/teamviolenceesports?igsh=MTRhOTRzMDR4aHQ2Mw==',
          whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu'
        }
      },
      {
        name: 'Karan Patel',
        role: 'Entry Fragger / Organizer',
        kills: 5111,
        winRate: 72,
        description: 'Fearless entry specialist who cracks compound doors and creates the chaos that wins fights. Aggressive entries, flawless trades, and the aggression to control zones. The breach that breaks defenses.',
        ingameName: 'VioLencE KP',
        since: 2020,
        category: 'Organizer',
        image: '/Line_up/karan-patel.jpeg',
        socials: {
          discord: 'https://discord.gg/amN9D8SrN8',
          instagram: 'https://www.instagram.com/teamviolenceesports?igsh=MTRhOTRzMDR4aHQ2Mw==',
          whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu'
        }
      },
      {
        name: 'Purvang Pandya',
        role: 'Elite DMR Specialist / Organizer',
        kills: 4999,
        winRate: 72,
        description: 'Legendary long-range specialist whose precision knocks open every engagement. Clutch DMR plays that shift momentum, ridiculous aim, and the poise to perform under pressure when it matters most.',
        ingameName: 'VioLencE PV',
        since: 2023,
        category: 'Organizer',
        image: '/Line_up/Purvang Pandya.jpg',
        socials: {
          discord: 'https://discord.gg/amN9D8SrN8',
          instagram: 'https://www.instagram.com/teamviolenceesports?igsh=MTRhOTRzMDR4aHQ2Mw==',
          whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu'
        }
      },
      {
        name: 'Aayush Panchal',
        role: 'Strategic Analyst / Organizer',
        kills: 4120,
        winRate: 75,
        description: 'Strategic mind who decodes enemy patterns and optimizes team plays. Deep VOD breakdowns, mid-round adjustments, and mental fortitude coaching keep VioLencE one step ahead in every engagement.',
        ingameName: 'VioLencE DP',
        since: 2022,
        category: 'Organizer',
        image: '/Line_up/Aayush Panchal.webp',
        socials: {
          discord: 'https://discord.gg/amN9D8SrN8',
          instagram: 'https://www.instagram.com/teamviolenceesports?igsh=MTRhOTRzMDR4aHQ2Mw==',
          whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu'
        }
      },
      {
        name: 'Rinkesh Rajput',
        role: 'Assaulter / Organizer',
        kills: 4895,
        winRate: 72,
        description: 'Explosive assaulter who breaks defenses with fast entries and relentless pressure. Reads timing windows, commits to duels, and clears space for the squad to dominate zones.',
        ingameName: 'VioLencE RR',
        since: 2020,
        category: 'Organizer',
        image: '/Line_up/Rinkesh Rajput.jpeg',
        socials: {
          discord: 'https://discord.gg/amN9D8SrN8',
          instagram: 'https://www.instagram.com/teamviolenceesports?igsh=MTRhOTRzMDR4aHQ2Mw==',
          whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu'
        }
      },
      // Content Creators
      {
        name: 'Jainish Soni',
        role: 'Video Editor / Content Creator',
        kills: 4136,
        winRate: 71,
        description: 'Creative mastermind behind VioLencE content and brand presence. Master video editor crafting cinematic highlights, managing all social media channels, and driving promotional strategies. Transforms raw gameplay into viral moments while building the clan\'s digital empire.',
        ingameName: 'VioLencE JS',
        since: 2021,
        category: 'Creator',
        image: '/Line_up/Jainish_Soni.jpeg',
        socials: {
          discord: 'https://discord.gg/amN9D8SrN8',
          instagram: 'https://www.instagram.com/teamviolenceesports?igsh=MTRhOTRzMDR4aHQ2Mw==',
          whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu'
        }
      },
      {
        name: 'Dev Patel',
        role: 'IGL / Founder / Creator',
        kills: 5320,
        winRate: 77,
        description: 'Visionary founder and in-game leader of Team VioLencE. Built the clan from the ground up with strategic genius and unwavering determination. Calls rotations that break defenses and clutches that win championships.',
        ingameName: 'VioLencE 乂',
        since: 2019,
        category: 'Creator',
        image: '/Line_up/Dev Patel.jpg',
        socials: {
          discord: 'https://discord.gg/amN9D8SrN8',
          instagram: 'https://www.instagram.com/teamviolenceesports?igsh=MTRhOTRzMDR4aHQ2Mw==',
          whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu'
        }
      },
      {
        name: 'Harsh Thakor',
        role: 'Support Anchor / Creator',
        kills: 4269,
        winRate: 69,
        description: 'Steady support anchor who locks down flanks and stabilizes every round. Reliable utility, smart positioning, and the composure to hold zones under fire. The silent protector of VioLencE.',
        ingameName: 'VioLencE HT',
        since: 2023,
        category: 'Creator',
        image: '/Line_up/Harsh Thakor.jpg',
        socials: {
          discord: 'https://discord.gg/amN9D8SrN8',
          instagram: 'https://www.instagram.com/teamviolenceesports?igsh=MTRhOTRzMDR4aHQ2Mw==',
          whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu'
        }
      },
      {
        name: 'Mehul Darji',
        role: 'Aggressive Scout / Co-Leader / Creator',
        kills: 4510,
        winRate: 73,
        description: 'Second co-leader and tactical scout who leads aggressive zone pushes and info plays. Rotations that catch teams off-guard, discipline mixed with aggression, and the leadership to hold composure.',
        ingameName: 'VioLencE MD',
        since: 2021,
        category: 'Creator',
        image: '/Line_up/Mehul Darji.jpg',
        socials: {
          discord: 'https://discord.gg/amN9D8SrN8',
          instagram: 'https://www.instagram.com/teamviolenceesports?igsh=MTRhOTRzMDR4aHQ2Mw==',
          whatsapp: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu'
        }
      }
    ]

    await TeamMember.insertMany(teamMembers)
    console.log('✅ Team members created')

    // Create tournaments
    const tournaments = [
      {
        title: 'Team VioLencE Pro Championship',
        description: 'Official Team VioLencE Championship with massive prize pool! First 7 teams get FREE entry!',
        mode: 'Squad TPP',
        type: 'paid',
        entryFee: 50,
        prizePool: 4000,
        totalSlots: 100,
        registeredTeams: 0,
        date: new Date('2026-02-27'),
        status: 'open',
        badge: '👑 Featured',
        specialNote: '🎉 First 7 registered teams get FREE ENTRY! Contact for payment details.',
        freeEntrySlotsAvailable: 7,
        rules: [
          'Squad must have 4 players',
          'TPP mode only',
          'First 7 teams get FREE entry',
          'No hacking or cheating',
          'Professional matches with live commentary',
          'Team leader must be present 30 mins before match',
          'FOR PAYMENT: Join WhatsApp Channel or contact us via message'
        ],
        prizeBreakdown: {
          first: 2000,
          second: 1000,
          third: 500,
          highestKiller: 500
        },
        prizes: [
          { position: '1st Place', amount: 2000 },
          { position: '2nd Place', amount: 1000 },
          { position: '3rd Place', amount: 500 },
          { position: 'Highest Killer', amount: 500 }
        ]
      }
    ]

    await Tournament.insertMany(tournaments)
    console.log('✅ Tournaments created')

    console.log('\n🎉 Database seeded successfully!')
    console.log('\n📝 Login Credentials:')
    console.log('Admin: admin@teamviolence.com / admin123')
    console.log('User: user@test.com / user123')
    console.log('\n✨ You can now start your servers and test the website!')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedData()
