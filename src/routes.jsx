import App from './App';
import PostLists from './components/PostList/PostLists';
import PostPage from './components/PostPage/PostPage/PostPage';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <PostLists /> },
      { path: 'posts/:postid', element: <PostPage /> },
      { path: 'login', element: <Login /> },
      { path: 'sign-up', element: <SignUp />}
    ],
  },
];

export default routes;
