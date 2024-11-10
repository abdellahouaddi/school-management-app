import { Bell } from 'lucide-react';

const NotificationsMenu = () => {
  const notifications = [
    { id: 1, title: 'New course available', time: '5m ago', isUnread: true },
    { id: 2, title: 'Assignment due', time: '1h ago', isUnread: true },
    { id: 3, title: 'System update', time: '2h ago', isUnread: false },
  ];

  return (
    <div className="dropdown dropdown-bottom dropdown-end indicator">
      {notifications.filter((n) => n.isUnread).length > 0 && (
        <span className="indicator-item badge badge-secondary badge-sm">
          {notifications.filter((n) => n.isUnread).length}
        </span>
      )}
      <button className="btn btn-ghost btn-circle">
        <Bell className="w-5 h-5" />
      </button>
      <div className="dropdown-content card card-compact w-80 shadow-lg bg-base-100">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Notifications</h3>
            <button className="btn btn-ghost btn-xs">Mark all as read</button>
          </div>
          <div className="divider my-1"></div>
          <ul className="space-y-2">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`flex items-start gap-3 p-2 rounded-lg
                  ${notification.isUnread ? 'bg-base-200' : ''}`}
              >
                <div className="flex-1">
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-base-content/60">{notification.time}</p>
                </div>
                {notification.isUnread && <div className="w-2 h-2 rounded-full bg-primary mt-2" />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotificationsMenu;
