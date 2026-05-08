// BuildHistory component

interface Build {
  id: string;
  service: string;
  result: 'success' | 'failed';
  time: string;
  duration: string;
}

const BuildHistory = ({ builds }: { builds: Build[] }) => {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 border-b border-dark-border">
        <h3 className="font-bold text-lg">Build History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-dark-border">
              <th className="px-6 py-4 font-medium">Build ID</th>
              <th className="px-6 py-4 font-medium">Service</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Time</th>
              <th className="px-6 py-4 font-medium">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-border">
            {builds.map((build) => (
              <tr key={build.id} className="hover:bg-dark-border/30 transition-colors">
                <td className="px-6 py-4 font-mono text-devops-blue text-sm">{build.id}</td>
                <td className="px-6 py-4 font-medium">{build.service}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    build.result === 'success' 
                      ? 'bg-emerald-400/10 text-emerald-400' 
                      : 'bg-red-400/10 text-red-400'
                  }`}>
                    {build.result.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{build.time}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{build.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuildHistory;
