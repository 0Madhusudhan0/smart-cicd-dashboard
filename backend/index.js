const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://smart-cicd-dashboard.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Simulated Data
const generateStats = () => ({
  activePipelines: 12,
  successfulBuilds: 482,
  failedBuilds: 7,
  uptime: '99.99%',
});

const generatePipelines = () => [
  { id: 1, name: 'api-gateway', status: 'running', progress: 65, version: 'v2.4.1', author: 'Bhola' },
  { id: 2, name: 'auth-service', status: 'success', progress: 100, version: 'v1.9.0', author: 'Deepak' },
  { id: 3, name: 'payment-worker', status: 'failed', progress: 42, version: 'v3.0.1', author: 'Antigravity' },
  { id: 4, name: 'frontend-app', status: 'running', progress: 20, version: 'v4.2.0', author: 'Bhola' },
];

const generateBuildHistory = () => [
  { id: 'B-892', service: 'api-gateway', result: 'success', time: '2 mins ago', duration: '4m 12s' },
  { id: 'B-891', service: 'auth-service', result: 'success', time: '15 mins ago', duration: '3m 45s' },
  { id: 'B-890', service: 'payment-worker', result: 'failed', time: '1 hour ago', duration: '1m 20s' },
  { id: 'B-889', service: 'frontend-app', result: 'success', time: '3 hours ago', duration: '6m 10s' },
];

const generateLogs = () => [
  '[INFO] 2026-05-07 21:44:46 - Initializing build for api-gateway...',
  '[INFO] 2026-05-07 21:44:48 - Pulling docker base image node:18-alpine',
  '[INFO] 2026-05-07 21:44:55 - Installing dependencies...',
  '[WARN] 2026-05-07 21:45:10 - 4 high severity vulnerabilities found in dependencies',
  '[INFO] 2026-05-07 21:45:12 - Running unit tests...',
  '[INFO] 2026-05-07 21:45:20 - Test suite passed! (45 tests)',
  '[INFO] 2026-05-07 21:45:22 - Building docker image...',
  '[INFO] 2026-05-07 21:45:40 - Pushing image to registry: registry.local/api-gateway:v2.4.1',
  '[INFO] 2026-05-07 21:45:50 - Deploying to kubernetes cluster (staging)...',
  '[SUCCESS] 2026-05-07 21:46:05 - Deployment complete!'
];

const generateContainers = () => [
  { name: 'nginx-proxy', status: 'up', cpu: '0.5%', memory: '128MB', uptime: '14 days' },
  { name: 'postgres-db', status: 'up', cpu: '2.1%', memory: '512MB', uptime: '14 days' },
  { name: 'redis-cache', status: 'up', cpu: '0.1%', memory: '64MB', uptime: '14 days' },
  { name: 'api-server', status: 'up', cpu: '1.2%', memory: '256MB', uptime: '2 days' },
  { name: 'auth-service', status: 'up', cpu: '0.8%', memory: '200MB', uptime: '5 days' },
];

// Routes
app.get('/api/stats', (req, res) => res.json(generateStats()));
app.get('/api/pipelines', (req, res) => res.json(generatePipelines()));
app.get('/api/build-history', (req, res) => res.json(generateBuildHistory()));
app.get('/api/logs', (req, res) => res.json(generateLogs()));
app.get('/api/containers', (req, res) => res.json(generateContainers()));
app.get('/api/metrics', (req, res) => {
  const labels = ['20:00', '20:10', '20:20', '20:30', '20:40', '20:50', '21:00'];
  res.json({
    labels,
    cpu: labels.map(() => Math.floor(Math.random() * 40) + 20),
    ram: labels.map(() => Math.floor(Math.random() * 30) + 50),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
