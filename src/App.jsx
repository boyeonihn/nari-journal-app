import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import Root from './pages/Root';

import { createBrowserRouter } from 'react-router-dom';
import './App.css';

const App = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/diary/:id',
        element: <Diary />,
      },
      {
        path: '/new',
        element: <New />,
      },
      {
        path: '/edit/:id',
        element: <Edit />,
      },
    ],
  },
]);

export default App;
