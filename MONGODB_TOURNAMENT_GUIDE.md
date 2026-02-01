# 🗄️ MongoDB Tournament Management Guide

## Overview
All tournament data is now **stored directly in MongoDB**. The website pulls tournaments from the database instead of using hardcoded data.

---

## 📊 Tournament Collection Structure

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  mode: String,  // 'Squad TPP', 'Squad FPP', 'Duo TPP', etc.
  type: String,  // 'free' or 'paid'
  entryFee: Number,  // Entry fee in rupees
  prizePool: Number,  // Total prize pool
  totalSlots: Number,  // Maximum teams allowed
  registeredTeams: Number,  // Current registrations
  date: Date,  // Tournament date
  status: String,  // 'open', 'closed', 'ongoing', 'completed'
  badge: String,  // Badge text (e.g., '👑 Featured')
  specialNote: String,  // Special announcement
  freeEntrySlotsAvailable: Number,  // Free slots for first N teams
  prizeBreakdown: {
    first: Number,
    second: Number,
    third: Number,
    igl: Number,
    mvp: Number
  },
  rules: [String],  // Tournament rules
  prizes: [{
    position: String,
    amount: Number
  }],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔧 How to Update Tournament Data

### Option 1: Using MongoDB Atlas UI (Easiest)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Login with your account
3. Navigate to your `teamviolence` database
4. Find the `tournaments` collection
5. Click **Add Data** or **Insert Document** to add new tournaments
6. Or **Edit** existing tournaments

### Option 2: Using MongoDB Compass (Desktop App)
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect with your MongoDB URI
3. Navigate to `teamviolence` → `tournaments`
4. Click **Insert Document** or **Edit** existing ones

### Option 3: Using Command Line (mongosh)
```bash
# Connect to MongoDB
mongosh "your_mongodb_uri"

# Switch to database
use teamviolence

# View all tournaments
db.tournaments.find()

# Add new tournament
db.tournaments.insertOne({
  title: "Tournament Name",
  description: "Description",
  mode: "Squad TPP",
  type: "paid",
  entryFee: 50,
  prizePool: 8000,
  totalSlots: 32,
  registeredTeams: 12,
  date: new Date("2026-02-27"),
  status: "open",
  badge: "👑 Featured",
  specialNote: "🎉 First 7 teams get FREE ENTRY!",
  freeEntrySlotsAvailable: 7,
  prizeBreakdown: {
    first: 4000,
    second: 2000,
    third: 1000,
    igl: 500,
    mvp: 500
  },
  rules: ["Rule 1", "Rule 2"],
  prizes: [
    { position: "1st Place", amount: 4000 },
    { position: "2nd Place", amount: 2000 }
  ]
})

# Update existing tournament
db.tournaments.updateOne(
  { _id: ObjectId("your_tournament_id") },
  { $set: { registeredTeams: 15 } }
)

# Delete tournament
db.tournaments.deleteOne({ _id: ObjectId("your_tournament_id") })
```

---

## 📱 Current Tournament (As of Feb 1, 2026)

**Team VioLencE Pro Championship**
- Entry Fee: ₹50
- Prize Pool: ₹4,000
- Total Slots: 100
- Tournament Date: Feb 27, 2026
- First 7 teams: FREE ENTRY

**Prize Distribution:**
- 1st Place: ₹2,000
- 2nd Place: ₹1,000
- 3rd Place: ₹500
- Highest Killer: ₹500

---

## 🚀 Seeding Initial Data

If you want to reset tournaments to the default data:

```bash
cd server
npm run seed
```

This will:
- Clear all existing tournaments
- Insert the Team VioLencE Pro Championship tournament
- Reset team members and users

---

## ✅ Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| title | String | Tournament name |
| description | String | Brief description shown to users |
| mode | String | Game mode (Squad TPP, Duo FPP, etc.) |
| type | String | 'free' or 'paid' |
| entryFee | Number | Cost to register (rupees) |
| prizePool | Number | Total prize money distributed |
| totalSlots | Number | Max teams allowed |
| registeredTeams | Number | Current registrations |
| date | Date | Tournament date and time |
| status | String | 'open', 'closed', 'ongoing', 'completed' |
| badge | String | Badge displayed on card (emoji + text) |
| specialNote | String | Highlighted announcement |
| freeEntrySlotsAvailable | Number | Free slots for first N teams |
| prizeBreakdown | Object | Prize distribution per category |
| rules | Array | List of tournament rules |
| prizes | Array | Detailed prize distribution |

---

## 💡 Tips for Managing Tournaments

1. **Badge Ideas**: 🎮 Weekly, 🔥 Hot, ⚡ Fast, 👑 Elite, 🌟 New
2. **Special Notes**: Use emoji for highlights (🎉, ⭐, 🎯, etc.)
3. **Status Updates**: Change status from 'open' → 'ongoing' → 'completed'
4. **Auto-Updates**: registeredTeams updates automatically when users register

---

## 🔗 API Endpoints

### Get All Tournaments
```
GET /api/tournaments
```
Returns all active tournaments from MongoDB

### Get Single Tournament
```
GET /api/tournaments/:id
```
Returns specific tournament by ID

### Register for Tournament
```
POST /api/tournaments/:id/register
```
Requires authentication and tournament details

---

## 📞 Need Help?

- Check MongoDB connection in `.env` file
- Ensure `MONGODB_URI` is set correctly
- Verify database name is `teamviolence`
- Check collection name is `tournaments` (lowercase)
