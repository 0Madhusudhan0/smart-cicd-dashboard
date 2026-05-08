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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [pipelines, setPipelines] = useState([]);
  const [builds, setBuilds] = useState([]);
  const [logs, setLogs] = useState([]);
  const [containers, setContainers] = useState([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  if (loading || !stats || !metrics) {
    return (
      <div className="h-screen bg-dark flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-devops-blue border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 font-medium animate-pulse">Initializing DevOps Dashboard...</p>
      </div>
    );
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
