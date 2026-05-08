// PipelineCard component
import { Play, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface PipelineProps {
  pipeline: {
    id: number;
    name: string;
    status: 'running' | 'success' | 'failed';
    progress: number;
    version: string;
    author: string;
  };
}

const PipelineCard = ({ pipeline }: PipelineProps) => {
  const getStatusIcon = () => {
    switch (pipeline.status) {
      case 'running': return <Play className="text-blue-400 animate-pulse w-5 h-5" />;
      case 'success': return <CheckCircle2 className="text-emerald-400 w-5 h-5" />;
      case 'failed': return <XCircle className="text-red-400 w-5 h-5" />;
    }
  };

  const getStatusColor = () => {
    switch (pipeline.status) {
      case 'running': return 'blue';
      case 'success': return 'emerald';
      case 'failed': return 'red';
    }
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="glass-card p-5"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg">{pipeline.name}</h3>
          <p className="text-xs text-gray-400 mt-1">Version: {pipeline.version} • {pipeline.author}</p>
        </div>
        {getStatusIcon()}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-xs font-medium">
          <span className="capitalize text-gray-400">{pipeline.status}...</span>
          <span>{pipeline.progress}%</span>
        </div>
        <div className="h-2 w-full bg-dark-border rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${pipeline.progress}%` }}
            className={`h-full bg-${getStatusColor()}-400 rounded-full transition-all duration-500`}
          />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-dark-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock size={14} />
          <span>Last build: 2m ago</span>
        </div>
        <button className="text-xs font-bold text-devops-blue hover:underline">
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default PipelineCard;
