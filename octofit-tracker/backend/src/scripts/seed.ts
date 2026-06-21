// Seed the octofit_db database with test data
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
} from '../models.js'

dotenv.config()

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db'

const seedData = async () => {
  await mongoose.connect(mongoUri)
  console.log('Connected to MongoDB for seeding')

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ])

  const users = await User.insertMany([
    {
      name: 'Avery Chen',
      email: 'avery@example.com',
      role: 'admin',
    },
    {
      name: 'Jordan Lee',
      email: 'jordan@example.com',
      role: 'member',
    },
    {
      name: 'Taylor Brooks',
      email: 'taylor@example.com',
      role: 'member',
    },
  ])

  const teams = await Team.insertMany([
    {
      name: 'Velocity Squad',
      members: users.slice(0, 2).map((user) => user._id.toString()),
    },
    {
      name: 'Endurance Crew',
      members: [users[2]._id.toString()],
    },
  ])

  const activities = await Activity.insertMany([
    {
      userId: users[0]._id.toString(),
      type: 'run',
      duration: 35,
      calories: 280,
    },
    {
      userId: users[1]._id.toString(),
      type: 'strength',
      duration: 45,
      calories: 320,
    },
    {
      userId: users[2]._id.toString(),
      type: 'cycle',
      duration: 25,
      calories: 180,
    },
  ])

  const leaderboardEntries = await LeaderboardEntry.insertMany([
    { name: 'Velocity Squad', score: 980, rank: 1 },
    { name: 'Endurance Crew', score: 945, rank: 2 },
    { name: 'Avery Chen', score: 912, rank: 3 },
  ])

  const workouts = await Workout.insertMany([
    {
      name: 'Sunrise Run',
      type: 'cardio',
      duration: 30,
      difficulty: 'beginner',
    },
    {
      name: 'Core Strength',
      type: 'strength',
      duration: 20,
      difficulty: 'intermediate',
    },
    {
      name: 'Cycling Intervals',
      type: 'cardio',
      duration: 40,
      difficulty: 'advanced',
    },
  ])

  console.log('Seed data inserted:', {
    users: users.length,
    teams: teams.length,
    activities: activities.length,
    leaderboardEntries: leaderboardEntries.length,
    workouts: workouts.length,
  })

  await mongoose.disconnect()
}

seedData().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
