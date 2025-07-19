import {  RouterProvider, createBrowserRouter as Router} from 'react-router-dom';
import {router} from './routes/routes.tsx';

const appRouter = Router(router);

function App() {

  return (
    <RouterProvider router={appRouter} />
  )
}

export default App
