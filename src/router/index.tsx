import { createBrowserRouter } from 'react-router-dom' 
import { Main } from '../components/pages/Main'
import { Error404 } from '../components/pages/Error404'
import { Dev } from '../components/pages/Dev'


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />
    },
    {
        path: "/dev",
        element: <Dev />,
    },
    {
        path: "*",
        element: <Error404 />
    }
])