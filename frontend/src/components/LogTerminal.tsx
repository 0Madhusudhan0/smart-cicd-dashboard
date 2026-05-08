// LogTerminal component
import { Terminal as TerminalIcon, Copy, Trash2 } from 'lucide-react';

const LogTerminal = ({ logs }: { logs: string[] }) => {
  return (
    <div className="glass-card overflow-hidden h-[400px] flex flex-col">
      <div className="px-6 py-4 border-b border-dark-border bg-dark-lighter/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon size={18} className="text-gray-400" />
          <h3 className="font-bold">madhu Logs</h3>
        </div>
        <div className="flex gap-3">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Copy size={16} />
          </button>
          <button className="text-gray-400 hover:text-red-400 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="flex-1 p-6 font-mono text-sm overflow-y-auto bg-black/40 space-y-1">
        {(logs || []).map((logItem: any, i: number) => {
          const log = typeof logItem === 'string' ? logItem : (logItem.message || JSON.stringify(logItem));
          let textColor = 'text-gray-300';
          if (log.includes('[SUCCESS]')) textColor = 'text-emerald-400';
          if (log.includes('[ERROR]')) textColor = 'text-red-400';
          if (log.includes('[WARN]')) textColor = 'text-amber-400';
          if (log.includes('[INFO]')) textColor = 'text-blue-400';

          return (
            <div key={i} className={`${textColor} hover:bg-white/5 px-2 py-0.5 rounded transition-colors`}>
              <span className="opacity-50 mr-3 select-none">{(i + 1).toString().padStart(2, '0')}</span>
              {log}
            </div>
          );
        })}
        <div className="w-1.5 h-4 bg-white/20 animate-pulse inline-block ml-1" />
      </div>
    </div>
  );
};

export default LogTerminal;
