import MainLayout from './layouts/MainLayout';
import AuthProvider from './contexts/AuthProvider';
import LoaderProvider from './contexts/LoaderProvider';
import ModalProvider from './contexts/ModalProvider';
import NotificationProvider from './contexts/NotificationProvider';

function App() {
  return (
    <>
      <NotificationProvider>
        <ModalProvider>
          <LoaderProvider>
            <AuthProvider>
              <MainLayout />
            </AuthProvider>
          </LoaderProvider>
        </ModalProvider>
      </NotificationProvider>
    </>
  );
}

export default App;
