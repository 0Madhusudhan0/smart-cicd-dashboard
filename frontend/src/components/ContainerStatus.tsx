// ContainerStatus component
import { Box, MoreVertical } from 'lucide-react';

interface Container {
  name: string;
  status: string;
  cpu: string;
  memory: string;
  uptime: string;
}

const ContainerStatus = ({ containers }: { containers: Container[] }) => {
  return (
    <div className="glass-card">
      <div className="p-6 border-b border-dark-border flex items-center justify-between">
        <h3 className="font-bold text-lg">Docker Containers</h3>
        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>
      <div className="p-2">
        {containers.map((container, i) => (
          <div key={i} className="flex items-center justify-between p-4 hover:bg-dark-border/30 rounded-lg transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-dark-border flex items-center justify-center group-hover:bg-devops-blue/20 transition-colors">
                <Box size={20} className="text-gray-400 group-hover:text-devops-blue" />
              </div>
              <div>
                <h4 className="font-medium text-sm">{container.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{container.status}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-8 text-right pr-4">
              <div className="hidden sm:block">
                <p className="text-[10px] text-gray-500 uppercase font-bold">CPU</p>
                <p className="text-sm font-mono">{container.cpu}</p>
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] text-gray-500 uppercase font-bold">Memory</p>
                <p className="text-sm font-mono">{container.memory}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Uptime</p>
                <p className="text-sm font-mono text-gray-400">{container.uptime}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContainerStatus;
