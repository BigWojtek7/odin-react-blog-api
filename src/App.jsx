import './App.css';

import MainLayout from './layouts/MainLayout';
import AuthProvider from './contexts/AuthProvider';
import LoaderProvider from './contexts/LoaderProvider';
import ModalProvider from './contexts/ModalProvider';

function App() {
  return (
    <>
      <ModalProvider>
        <LoaderProvider>
          <AuthProvider>
            <MainLayout />
          </AuthProvider>
        </LoaderProvider>
      </ModalProvider>
    </>
  );
}

export default App;
