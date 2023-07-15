import { createBrowserRouter } from 'react-router-dom' 
import { Main } from '../components/pages/Main'
import { Error404 } from '../components/pages/Error404'


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />
    },
    {
        path: "*",
        element: <Error404 />
    }
])