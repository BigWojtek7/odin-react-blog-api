import App from './App';
import PostLists from './components/PostList/PostLists';
import Post from './components/PostPage/Post/Post';
import PostPage from './components/PostPage/PostPage/PostPage';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <PostLists /> },
      { path: 'posts/:postid', element: <PostPage /> },
    ],
  },
];

export default routes;
