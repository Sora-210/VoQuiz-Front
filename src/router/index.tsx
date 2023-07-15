import { createBrowserRouter } from 'react-router-dom' 
import Top from '../components/pages/Top'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Top />
    },
    {
        path: "/test",
        element: <h1>Test Page</h1>,
    }
])