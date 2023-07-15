import { createBrowserRouter } from 'react-router-dom' 
import { Main } from '../components/pages/Main'
import { Error404 } from '../components/pages/Error404'
import { Dev } from '../components/pages/Dev'
import { VotePage } from '../components/pages/Vote'


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />
    },
    {
        path: "/vote/:id",
        element: <VotePage />
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