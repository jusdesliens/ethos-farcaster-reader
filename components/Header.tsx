import { Shield } from 'lucide-react';

interface HeaderProps {
  channel: string;
  onChannelChange: (channel: string) => void;
}

export default function Header({ channel, onChannelChange }: HeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ethos Channel Reader</h1>
          <p className="text-sm text-gray-500">Reputation-driven feed filtering</p>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Channel
        </label>
        <input
          type="text"
          value={channel}
          onChange={(e) => onChannelChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter channel name"
        />
      </div>
    </div>
  );
}
