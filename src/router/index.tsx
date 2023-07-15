import { createBrowserRouter } from 'react-router-dom' 
import { Main } from '../components/pages/Main'


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />
    }
])