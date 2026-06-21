"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Seed the octofit_db database with test data
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_js_1 = require("../models.js");
dotenv_1.default.config();
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const seedData = async () => {
    await mongoose_1.default.connect(mongoUri);
    console.log('Connected to MongoDB for seeding');
    await Promise.all([
        models_js_1.User.deleteMany({}),
        models_js_1.Team.deleteMany({}),
        models_js_1.Activity.deleteMany({}),
        models_js_1.LeaderboardEntry.deleteMany({}),
        models_js_1.Workout.deleteMany({}),
    ]);
    const users = await models_js_1.User.insertMany([
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
    ]);
    const teams = await models_js_1.Team.insertMany([
        {
            name: 'Velocity Squad',
            members: users.slice(0, 2).map((user) => user._id.toString()),
        },
        {
            name: 'Endurance Crew',
            members: [users[2]._id.toString()],
        },
    ]);
    const activities = await models_js_1.Activity.insertMany([
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
    ]);
    const leaderboardEntries = await models_js_1.LeaderboardEntry.insertMany([
        { name: 'Velocity Squad', score: 980, rank: 1 },
        { name: 'Endurance Crew', score: 945, rank: 2 },
        { name: 'Avery Chen', score: 912, rank: 3 },
    ]);
    const workouts = await models_js_1.Workout.insertMany([
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
    ]);
    console.log('Seed data inserted:', {
        users: users.length,
        teams: teams.length,
        activities: activities.length,
        leaderboardEntries: leaderboardEntries.length,
        workouts: workouts.length,
    });
    await mongoose_1.default.disconnect();
};
seedData().catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
});
