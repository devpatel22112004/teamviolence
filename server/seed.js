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
      name: 'Admin',
      email: 'admin@teamviolence.com',
      phone: '9876543210',
      password: adminPassword,
      role: 'admin'
    })
    console.log('✅ Admin user created (email: admin@teamviolence.com, password: admin123)')

    // Create test user
    const userPassword = await bcrypt.hash('user123', 10)
    await User.create({
      name: 'Test User',
      email: 'user@test.com',
      phone: '9876543211',
      password: userPassword,
      role: 'user'
    })
    console.log('✅ Test user created (email: user@test.com, password: user123)')

    // Create team members
    const teamMembers = [
      {
        name: 'VioLencE | Shadow',
        role: 'IGL / Assaulter',
        kills: 5200,
        winRate: 76,
        description: 'In-game leader with exceptional strategic thinking and aggressive fragging ability. Known for clutch moments.',
        socials: {
          discord: 'Shadow#1234',
          instagram: 'https://instagram.com/shadow',
          youtube: 'https://youtube.com/@shadow'
        }
      },
      {
        name: 'VioLencE | Phoenix',
        role: 'Assaulter',
        kills: 4900,
        winRate: 74,
        description: 'Aggressive entry fragger with incredible aim. Master of close-quarters combat and quick rotations.',
        socials: {
          discord: 'Phoenix#5678',
          instagram: 'https://instagram.com/phoenix'
        }
      },
      {
        name: 'VioLencE | Ghost',
        role: 'Support / Sniper',
        kills: 4500,
        winRate: 72,
        description: 'Expert marksman providing long-range cover fire. Tactical support player with excellent game sense.',
        socials: {
          discord: 'Ghost#9012',
          youtube: 'https://youtube.com/@ghost'
        }
      },
      {
        name: 'VioLencE | Thunder',
        role: 'Flex Player',
        kills: 4700,
        winRate: 73,
        description: 'Versatile player adapting to any situation. Can play any role and excels in teamwork coordination.',
        socials: {
          instagram: 'https://instagram.com/thunder',
          youtube: 'https://youtube.com/@thunder'
        }
      }
    ]

    await TeamMember.insertMany(teamMembers)
    console.log('✅ Team members created')

    // Create tournaments
    const tournaments = [
      {
        title: 'Weekly Squad Championship',
        description: 'Free weekly tournament for all skill levels. Show your skills and compete for prizes! Best teams will be featured on our social media.',
        mode: 'Squad TPP',
        type: 'free',
        entryFee: 0,
        prizePool: 5000,
        totalSlots: 100,
        registeredTeams: 45,
        date: new Date('2026-01-25'),
        status: 'open',
        rules: [
          'Squad must have 4 players',
          'TPP mode only',
          'No hacking or cheating',
          'Fair play required',
          'Team leader must be present 30 mins before match'
        ],
        prizes: [
          { position: '1st Place', amount: 2500 },
          { position: '2nd Place', amount: 1500 },
          { position: '3rd Place', amount: 1000 }
        ]
      },
      {
        title: 'Pro League - Season 1',
        description: 'Compete with the best teams for massive prizes! This is a paid tournament with bigger prize pool and better competition.',
        mode: 'Squad TPP',
        type: 'paid',
        entryFee: 30,
        prizePool: 10000,
        totalSlots: 50,
        registeredTeams: 28,
        date: new Date('2026-01-28'),
        status: 'open',
        rules: [
          'Entry fee: ₹30 per team',
          'Squad must have 4 players',
          'TPP mode only',
          'No hacking - instant ban',
          'Payment required before registration'
        ],
        prizes: [
          { position: '1st Place', amount: 5000 },
          { position: '2nd Place', amount: 3000 },
          { position: '3rd Place', amount: 2000 }
        ]
      },
      {
        title: 'TDM Showdown - Free Entry',
        description: 'Fast-paced TDM action! Show your gunplay skills in intense 4v4 battles. Perfect for practicing aim and reflexes.',
        mode: 'TDM 4v4',
        type: 'free',
        entryFee: 0,
        prizePool: 3000,
        totalSlots: 32,
        registeredTeams: 20,
        date: new Date('2026-01-27'),
        status: 'open',
        rules: [
          'TDM mode only',
          'First to 50 kills wins',
          'Best of 3 matches',
          'Warehouse map',
          'No camping rules'
        ],
        prizes: [
          { position: '1st Place', amount: 1500 },
          { position: '2nd Place', amount: 1000 },
          { position: '3rd Place', amount: 500 }
        ]
      },
      {
        title: 'Elite Masters Cup',
        description: 'Premium tournament with the biggest prize pool! Only for serious competitive teams. Registration limited.',
        mode: 'Squad TPP',
        type: 'paid',
        entryFee: 50,
        prizePool: 25000,
        totalSlots: 25,
        registeredTeams: 18,
        date: new Date('2026-02-05'),
        status: 'open',
        rules: [
          'Entry fee: ₹50 per team',
          'Minimum rank: Crown',
          'Squad must have 4 players',
          'Multiple rounds',
          'Professional referee present'
        ],
        prizes: [
          { position: '1st Place', amount: 12000 },
          { position: '2nd Place', amount: 7000 },
          { position: '3rd Place', amount: 4000 },
          { position: '4th-5th Place', amount: 1000 }
        ]
      },
      {
        title: 'Duo Madness',
        description: 'Test your duo coordination! Perfect for partners who play well together. Free entry with decent prizes.',
        mode: 'Duo TPP',
        type: 'free',
        entryFee: 0,
        prizePool: 4000,
        totalSlots: 50,
        registeredTeams: 15,
        date: new Date('2026-02-01'),
        status: 'open',
        rules: [
          'Duo must have 2 players',
          'TPP mode only',
          'Communication required',
          'No team switching',
          'Fair play mandatory'
        ],
        prizes: [
          { position: '1st Place', amount: 2000 },
          { position: '2nd Place', amount: 1200 },
          { position: '3rd Place', amount: 800 }
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
