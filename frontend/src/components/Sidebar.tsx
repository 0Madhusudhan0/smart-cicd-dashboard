// Sidebar component
import { 
  LayoutDashboard, 
  GitBranch, 
  History, 
  Terminal, 
  Activity, 
  Box, 
  Settings,
  ShieldCheck,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: GitBranch, label: 'Pipelines', active: false },
    { icon: History, label: 'Build History', active: false },
    { icon: Terminal, label: 'Deployment Logs', active: false },
    { icon: Activity, label: 'Monitoring', active: false },
    { icon: Box, label: 'Docker Clusters', active: false },
  ];

  return (
    <div className="w-64 h-screen bg-dark-lighter border-r border-dark-border flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-devops-blue rounded-lg flex items-center justify-center">
          <ShieldCheck className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl tracking-tight">Smart<span className="text-devops-blue">CI/CD</span></span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              item.active 
                ? 'bg-devops-blue/10 text-devops-blue' 
                : 'text-gray-400 hover:bg-dark-border hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-dark-border">
        <div className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white cursor-pointer transition-colors">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 cursor-pointer transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
