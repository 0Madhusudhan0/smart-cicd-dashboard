import { type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color: string;
}

const StatCard = ({ label, value, icon: Icon, trend, color }: StatCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 flex flex-col gap-4"
    >
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl bg-${color}/10`}>
          <Icon className={`text-${color} w-6 h-6`} />
        </div>
        {trend && (
          <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-gray-400 text-sm font-medium">{label}</h3>
        <p className="text-2xl font-bold mt-1 tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;
