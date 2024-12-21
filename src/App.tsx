import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import User from './pages/User';
import List from './pages/wrapper/components/List';
import Wrapper from './pages/wrapper';
import AlbumType from './pages/Album';
import Error from './pages/Error';

const router = createBrowserRouter([
   {
      path: '/',
      element: <Wrapper />,
      handle: {
         crumb: () => 'Home'
      },
      children: [
         {
            errorElement: <Error />,
            children: [
               {
                  element: <Main />,
                  index: true
               },
               {
                  path: '/users',
                  handle: {
                     crumb: () => 'Users'
                  },
                  children: [
                     {
                        element: <List endpoint="users" />,
                        index: true
                     },
                     {
                        path: '/users/:userID',
                        element: <User />,
                        handle: {
                           crumb: (params: Record<string, string>) => {
                              return <span>User #{params?.userID}</span>;
                           }
                        }
                     }
                  ]
               },
               {
                  path: '/albums',
                  handle: {
                     crumb: () => 'Albums'
                  },
                  children: [
                     {
                        element: <List endpoint="albums" />,
                        index: true
                     },
                     {
                        path: '/albums/:albumID',
                        element: <AlbumType />,
                        handle: {
                           crumb: (params: Record<string, string>) => {
                              return <span>Album #{params?.albumID}</span>;
                           }
                        }
                     }
                  ]
               },
               {
                  path: '/api_spa',
                  element: <Navigate to="/" />,
                  handle: {
                     disableCrumbs: true
                  }
               },
               {
                  path: '*',
                  element: <NotFound />,
                  handle: {
                     disableCrumbs: true
                  }
               }
            ]
         }
      ]
   }
]);

function App() {
   return <RouterProvider router={router} />;
}

export default App;
