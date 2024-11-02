import App from '../App';
import PostLists from '../pages/PostList/PostList';
import PostPage from '../pages/PostPage/PostPage';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import NewPost from '../pages/NewPost/NewPost';
import PrivateRoute from './PrivateRoute';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <PostLists /> },
      { path: 'posts/:postid', element: <PostPage /> },
      {
        element: <PrivateRoute />,
        children: [{ path: 'new-post', element: <NewPost /> }],
      },

      { path: 'login', element: <Login /> },
      { path: 'sign-up', element: <SignUp /> },
    ],
  },
];

export default routes;
