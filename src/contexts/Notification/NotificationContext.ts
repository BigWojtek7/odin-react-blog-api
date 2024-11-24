import { createContext } from 'react';

interface NotificationContextType {
  addNotification: (message: any, type?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export default NotificationContext;
