import { useState } from 'react';
import NotificationContext from './NotificationContext';
import NotificationsList from '../components/Notifications/NotificationsList';

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = new Date().getTime();
    setNotifications([...notifications, { id, message, type }]);

    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <NotificationsList notifications={notifications} />
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
