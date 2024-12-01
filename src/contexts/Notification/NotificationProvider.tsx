import { useState } from 'react';
import NotificationContext from './NotificationContext';
import NotificationsList from '../../components/NotificationsList/NotificationsList';

import { ChildrenProps } from '../../types/SharedInterfaces';

export interface NotificationsType {
  id: number;
  message: string;
  type: 'success' | 'error';
}

const NotificationProvider = ({ children }: ChildrenProps) => {
  const [notifications, setNotifications] = useState<NotificationsType[] | []>(
    []
  );

  const addNotification = (message: string, type: 'success' | 'error') => {
    const id = new Date().getTime();

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id, message, type },
    ]);

    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification: NotificationsType) => notification.id !== id
      )
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
