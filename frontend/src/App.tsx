import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Activity, 
  GitBranch, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  Search,
  Bell,
  User
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import PipelineCard from './components/PipelineCard';
import BuildHistory from './components/BuildHistory';
import LogTerminal from './components/LogTerminal';
import MonitoringCharts from './components/MonitoringCharts';
import ContainerStatus from './components/ContainerStatus';
import LoginPage from './components/LoginPage';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const MOCK_STATS = {
  activePipelines: 12,
  successfulBuilds: 145,
  failedBuilds: 3,
  uptime: '99.9%'
};

const MOCK_PIPELINES = [
  { id: '1', name: 'api-gateway', status: 'running', branch: 'main', commit: 'a1b2c3d', duration: '2m 30s' },
  { id: '2', name: 'auth-service', status: 'success', branch: 'develop', commit: 'f9e8d7c', duration: '1m 45s' },
  { id: '3', name: 'web-frontend', status: 'failed', branch: 'feature/new-ui', commit: '4b5n6m7', duration: '5m 12s' },
  { id: '4', name: 'payment-processor', status: 'queued', branch: 'main', commit: 'z1x2c3v', duration: '-' }
];

const MOCK_BUILDS = [
  { id: '101', pipeline: 'api-gateway', status: 'success', duration: '2m 14s', time: '10 mins ago' },
  { id: '102', name: 'web-frontend', pipeline: 'web-frontend', status: 'failed', duration: '45s', time: '1 hour ago' },
  { id: '103', name: 'auth-service', pipeline: 'auth-service', status: 'success', duration: '1m 50s', time: '3 hours ago' },
  { id: '104', name: 'database-migration', pipeline: 'database-migration', status: 'success', duration: '5m 20s', time: '5 hours ago' }
];

const MOCK_LOGS = [
  { id: 1, timestamp: '10:24:01', message: 'Starting build for api-gateway', type: 'info' },
  { id: 2, timestamp: '10:24:15', message: 'Installing dependencies...', type: 'info' },
  { id: 3, timestamp: '10:25:02', message: 'Running unit tests', type: 'info' },
  { id: 4, timestamp: '10:25:30', message: 'Warning: Deprecated package detected', type: 'warning' },
  { id: 5, timestamp: '10:26:10', message: 'Build successful. Pushing to registry.', type: 'success' },
  { id: 6, timestamp: '11:05:00', message: 'Error: Cannot connect to database', type: 'error' }
];

const MOCK_CONTAINERS = [
  { id: 'c1', name: 'nginx-proxy', status: 'running', cpu: '2.4%', memory: '128MB' },
  { id: 'c2', name: 'redis-cache', status: 'running', cpu: '0.5%', memory: '64MB' },
  { id: 'c3', name: 'postgres-db', status: 'running', cpu: '5.8%', memory: '512MB' },
  { id: 'c4', name: 'worker-node', status: 'stopped', cpu: '0%', memory: '0MB' }
];

const MOCK_METRICS = {
  cpu: [45, 52, 48, 61, 59, 65, 50],
  memory: [60, 62, 65, 64, 68, 70, 65],
  labels: ['10:00', '10:10', '10:20', '10:30', '10:40', '10:50', '11:00']
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stats, setStats] = useState<any>(MOCK_STATS);
  const [pipelines, setPipelines] = useState<any[]>(MOCK_PIPELINES);
  const [builds, setBuilds] = useState<any[]>(MOCK_BUILDS);
  const [logs, setLogs] = useState<any[]>(MOCK_LOGS);
  const [containers, setContainers] = useState<any[]>(MOCK_CONTAINERS);
  const [metrics, setMetrics] = useState<any>(MOCK_METRICS);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    try {
      const [s, p, b, l, c, m] = await Promise.all([
        axios.get(`${API_BASE}/stats`),
        axios.get(`${API_BASE}/pipelines`),
        axios.get(`${API_BASE}/build-history`),
        axios.get(`${API_BASE}/logs`),
        axios.get(`${API_BASE}/containers`),
        axios.get(`${API_BASE}/metrics`),
      ]);

      setStats(s.data);
      setPipelines(p.data);
      setBuilds(b.data);
      setLogs(l.data);
      setContainers(c.data);
      setMetrics(m.data);
    } catch (error) {
      console.error('Error fetching data (keeping current data):', error);
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-dark flex">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
            <p className="text-gray-400 mt-1">Real-time status of your infrastructure and pipelines.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden xl:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search resources..."
                className="bg-dark-lighter border border-dark-border rounded-xl py-2 pl-10 pr-4 text-sm w-64 focus:border-devops-blue outline-none transition-all"
              />
            </div>
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-dark" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-dark-border">
              <div className="text-right">
                <p className="text-sm font-bold">Admin User</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">DevOps Engineer</p>
              </div>
              <div className="w-10 h-10 bg-devops-indigo rounded-full flex items-center justify-center text-white font-bold">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard 
            label="Active Pipelines" 
            value={stats.activePipelines} 
            icon={GitBranch} 
            color="blue"
            trend="+2 today"
          />
          <StatCard 
            label="Successful Builds" 
            value={stats.successfulBuilds} 
            icon={CheckCircle} 
            color="emerald"
            trend="+48.2%"
          />
          <StatCard 
            label="Failed Builds" 
            value={stats.failedBuilds} 
            icon={AlertCircle} 
            color="red"
          />
          <StatCard 
            label="System Uptime" 
            value={stats.uptime} 
            icon={Activity} 
            color="cyan"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-2 space-y-8">
            {/* Pipelines Section */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <GitBranch className="text-devops-blue" size={24} />
                  Active Pipelines
                </h2>
                <button className="text-sm font-bold text-devops-blue flex items-center gap-1 hover:underline">
                  <RefreshCw size={14} />
                  Refresh
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pipelines.map((p: any) => (
                  <PipelineCard key={p.id} pipeline={p} />
                ))}
              </div>
            </section>

            {/* Monitoring Section */}
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Activity className="text-devops-cyan" size={24} />
                Infrastructure Monitoring
              </h2>
              <MonitoringCharts data={metrics} />
            </section>

            {/* Build History */}
            <BuildHistory builds={builds} />
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <ContainerStatus containers={containers} />
            <LogTerminal logs={logs} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
