"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_js_1 = __importDefault(require("./routes.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send('OctoFit Tracker API');
});
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'OctoFit Tracker backend is running',
        port,
        baseUrl,
    });
});
app.use('/api', routes_js_1.default);
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    console.log(`Connected to MongoDB: ${mongoUri}`);
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
app.listen(port, () => {
    console.log(`Backend server listening on ${baseUrl}`);
});
