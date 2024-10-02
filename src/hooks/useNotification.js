import { useContext } from 'react';
import NotificationContext from '../contexts/NotificationContext';

const useNotification = () => {
  const notificationContext = useContext(NotificationContext);

  if (!notificationContext) {
    throw new Error(
      'Please use useLoader inside the context of LoaderProvider'
    );
  }
  return notificationContext;
};

export default useNotification;
