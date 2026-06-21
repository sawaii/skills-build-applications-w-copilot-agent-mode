"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_js_1 = require("./models.js");
const router = express_1.default.Router();
router.get('/users', async (_req, res) => {
    try {
        const users = await models_js_1.User.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
router.post('/users', async (req, res) => {
    try {
        const user = await models_js_1.User.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});
router.get('/teams', async (_req, res) => {
    try {
        const teams = await models_js_1.Team.find();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
router.post('/teams', async (req, res) => {
    try {
        const team = await models_js_1.Team.create(req.body);
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
});
router.get('/activities', async (_req, res) => {
    try {
        const activities = await models_js_1.Activity.find();
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
router.post('/activities', async (req, res) => {
    try {
        const activity = await models_js_1.Activity.create(req.body);
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create activity' });
    }
});
router.get('/leaderboard', async (_req, res) => {
    try {
        const entries = await models_js_1.LeaderboardEntry.find().sort({ score: -1 });
        res.json(entries);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
router.post('/leaderboard', async (req, res) => {
    try {
        const entry = await models_js_1.LeaderboardEntry.create(req.body);
        res.status(201).json(entry);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create leaderboard entry' });
    }
});
router.get('/workouts', async (_req, res) => {
    try {
        const workouts = await models_js_1.Workout.find();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
router.post('/workouts', async (req, res) => {
    try {
        const workout = await models_js_1.Workout.create(req.body);
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create workout' });
    }
});
exports.default = router;
