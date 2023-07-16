import { createBrowserRouter } from 'react-router-dom' 
import { Main } from '../components/pages/Main'
import { Error404 } from '../components/pages/Error404'
import { Dev } from '../components/pages/Dev'
import { CreatePage } from '../components/pages/Create'
import { VotePage } from '../components/pages/Vote'
import { QuizPage } from '../components/pages/Quiz'



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />
    },
    {
        path: "/create",
        element: <CreatePage />
    },
    {
        path: "/vote/:id",
        element: <VotePage />
    },
    {
        path: "/quiz/:voteId/:optionId",
        element: <QuizPage />
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