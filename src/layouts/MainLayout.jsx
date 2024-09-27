import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Loader from '../components/Loader/Loader';
import Modal from '../components/Modal/Modal';

function MainLayout() {
  return (
    <div className="content">
      <Header />
      <Loader />
      <Modal />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default MainLayout;
