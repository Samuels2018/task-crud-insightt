import {  RouterProvider, createBrowserRouter as Router} from 'react-router-dom';
import {router} from './routes/routes.tsx';

function App() {

  return (
    <RouterProvider router={Router(router)} />
  )
}

export default App
