import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';

function MainLayout() {
  // const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const setToken = undefined;

  const { token, user } = useAuth();

  return (
    <div className="content">
      <Header />
      <main>
        <Outlet context={[token, setToken, user, isLoading, setIsLoading]} />
      </main>
    </div>
  );
}
export default MainLayout;
