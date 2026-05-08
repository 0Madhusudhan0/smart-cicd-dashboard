// MonitoringCharts component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MetricsProps {
  data: {
    labels: string[];
    cpu: number[];
    ram: number[];
  };
}

const MonitoringCharts = ({ data }: MetricsProps) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#161B2D',
        titleColor: '#94A3B8',
        bodyColor: '#F1F5F9',
        borderColor: '#2D3748',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748B', font: { size: 10 } },
      },
      y: {
        grid: { color: 'rgba(45, 55, 72, 0.5)' },
        ticks: { color: '#64748B', font: { size: 10 }, stepSize: 20 },
        min: 0,
        max: 100,
      },
    },
    elements: {
      point: { radius: 0, hoverRadius: 6 },
      line: { tension: 0.4 },
    },
  };

  const cpuData = {
    labels: data?.labels || [],
    datasets: [
      {
        fill: true,
        label: 'CPU Usage %',
        data: data?.cpu || [],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
      },
    ],
  };

  const ramData = {
    labels: data?.labels || [],
    datasets: [
      {
        fill: true,
        label: 'RAM Usage %',
        data: data?.ram || [],
        borderColor: '#06B6D4',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg">CPU Utilization</h3>
          <span className="text-devops-blue font-mono text-sm">{data?.cpu?.[data.cpu.length - 1] || 0}%</span>
        </div>
        <div className="h-[200px]">
          <Line options={chartOptions} data={cpuData} />
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg">RAM Utilization</h3>
          <span className="text-devops-cyan font-mono text-sm">{data?.ram?.[data.ram.length - 1] || 0}%</span>
        </div>
        <div className="h-[200px]">
          <Line options={chartOptions} data={ramData} />
        </div>
      </div>
    </div>
  );
};

export default MonitoringCharts;
