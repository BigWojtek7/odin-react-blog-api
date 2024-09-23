import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Loader from '../components/Loader/Loader';

function MainLayout() {
  // const [user, setUser] = useState({});

  return (
    <div className="content">
      <Header />
      <Loader />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default MainLayout;
