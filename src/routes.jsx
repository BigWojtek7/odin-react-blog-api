import App from "./App";
import PostLists from "./PostList/PostLists";


const routes = [
  {
    path: '/',
    element: <App />,
    children : [
      { index: true, element: <PostLists /> },
    ]
  }
]

export default routes