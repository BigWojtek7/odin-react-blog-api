import './App.css';

import MainLayout from './layouts/MainLayout';
import AuthProvider from './context/AuthProvider';
import LoaderProvider from './context/LoaderProvider';

function App() {
  return (
    <>
      <LoaderProvider>
        <AuthProvider>
          <MainLayout />
        </AuthProvider>
      </LoaderProvider>
    </>
  );
}

export default App;
