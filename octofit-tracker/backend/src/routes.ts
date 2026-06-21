import express from 'express'
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
} from './models.js'

const router = express.Router()

router.get('/users', async (_req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' })
  }
})

router.get('/teams', async (_req, res) => {
  try {
    const teams = await Team.find()
    res.json(teams)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' })
  }
})

router.post('/teams', async (req, res) => {
  try {
    const team = await Team.create(req.body)
    res.status(201).json(team)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team' })
  }
})

router.get('/activities', async (_req, res) => {
  try {
    const activities = await Activity.find()
    res.json(activities)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' })
  }
})

router.post('/activities', async (req, res) => {
  try {
    const activity = await Activity.create(req.body)
    res.status(201).json(activity)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity' })
  }
})

router.get('/leaderboard', async (_req, res) => {
  try {
    const entries = await LeaderboardEntry.find().sort({ score: -1 })
    res.json(entries)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' })
  }
})

router.post('/leaderboard', async (req, res) => {
  try {
    const entry = await LeaderboardEntry.create(req.body)
    res.status(201).json(entry)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create leaderboard entry' })
  }
})

router.get('/workouts', async (_req, res) => {
  try {
    const workouts = await Workout.find()
    res.json(workouts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' })
  }
})

router.post('/workouts', async (req, res) => {
  try {
    const workout = await Workout.create(req.body)
    res.status(201).json(workout)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' })
  }
})

export default router
