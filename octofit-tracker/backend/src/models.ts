import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'member' },
  },
  { timestamps: true },
)

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    members: [{ type: String }],
  },
  { timestamps: true },
)

const activitySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, default: 0 },
  },
  { timestamps: true },
)

const leaderboardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  { timestamps: true },
)

const workoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, default: 'beginner' },
  },
  { timestamps: true },
)

export const User = mongoose.model('User', userSchema)
export const Team = mongoose.model('Team', teamSchema)
export const Activity = mongoose.model('Activity', activitySchema)
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema)
export const Workout = mongoose.model('Workout', workoutSchema)
