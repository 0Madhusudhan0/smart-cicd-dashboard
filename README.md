# Smart CI/CD Deployment Dashboard

A modern full-stack DevOps dashboard built with React, Node.js, and Tailwind CSS.

## Features
- **Secure Login**: Professional authentication interface.
- **Real-time Pipelines**: Monitor active builds and deployment progress.
- **Infrastructure Monitoring**: Live CPU and RAM usage charts.
- **Docker Integration**: View container status and resource allocation.
- **Build History**: Comprehensive logs and history of all deployments.
- **Responsive UI**: Fully optimized for all screen sizes with a premium dark theme.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Chart.js, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express.
- **Orchestration**: Docker, Docker Compose.

## Getting Started

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose

### Local Development

1. **Start the Backend**:
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Start the Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Running with Docker

```bash
docker-compose up --build
```
The dashboard will be available at `http://localhost:80`.

## 🚀 Deployment Guide

### 1. Frontend (Vercel/Netlify)
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: Your backend URL (e.g., `https://smart-devops-api.onrender.com/api`)

### 2. Backend (Render/Railway/Heroku)
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `PORT`: `5000` (or as provided by platform)
  - `NODE_ENV`: `production`

### 3. Docker Deployment (Self-Hosted)
To deploy the entire stack using Docker:
```bash
# Build and run
docker-compose up -d --build
```

### 4. CI/CD with GitHub Actions
A sample workflow is provided in `.github/workflows/main.yml`. To enable automatic deployment:
1. Push your code to a GitHub repository.
2. Configure your platform's (Vercel/Render) GitHub integration.
3. The workflow will automatically validate your build on every push.

## 🛠️ Tech Stack
- **Frontend**: React 19, Tailwind CSS 4, Chart.js, Framer Motion
- **Backend**: Node.js, Express
- **DevOps**: Docker, GitHub Actions, Vercel/Render support

## 📝 License
This project is for demonstration purposes.
