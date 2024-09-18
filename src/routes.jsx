import App from './App';
import PostLists from './pages/PostList/PostLists';
import PostPage from './pages/PostPage/PostPage/PostPage';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import NewPost from './pages/NewPost/NewPost';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <PostLists /> },
      { path: 'posts/:postid', element: <PostPage /> },
      { path: 'new-post', element: <NewPost /> },
      { path: 'login', element: <Login /> },
      { path: 'sign-up', element: <SignUp /> },
    ],
  },
];

export default routes;
