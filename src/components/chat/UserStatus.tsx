
import { User } from './ChatContext';

interface UserStatusProps {
  user: User;
  showName?: boolean;
}

export const UserStatus: React.FC<UserStatusProps> = ({ user, showName = false }) => {
  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    offline: 'bg-gray-400',
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm">
          {user.avatar || user.name.charAt(0)}
        </div>
        <div
          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
            statusColors[user.status]
          }`}
        />
      </div>
      {showName && (
        <span className="text-sm text-sidebar-foreground/80 truncate">{user.name}</span>
      )}
    </div>
  );
};
