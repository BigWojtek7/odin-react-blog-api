import './App.css';

import MainLayout from './layouts/MainLayout';
import AuthProvider from './context/AuthProvider';
import LoaderProvider from './context/LoaderProvider';
import ModalProvider from './context/ModalProvider';

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
