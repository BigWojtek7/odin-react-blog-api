import { createContext } from 'react';

interface NotificationContextType {
  addNotification: (message: string, type: 'success' | 'error') => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export default NotificationContext;
