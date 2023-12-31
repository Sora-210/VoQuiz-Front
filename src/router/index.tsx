import { createBrowserRouter } from 'react-router-dom' 
import { Main } from '../components/pages/Main'
import { Error404 } from '../components/pages/Error404'
import { CreatePage } from '../components/pages/Create'
import { ResultPage } from '../components/pages/Result'
import { VotePage } from '../components/pages/Vote'
import { QuizPage } from '../components/pages/Quiz'
import { SharePage } from '../components/pages/Share'



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
        path: "/result/:voteId",
        element: <ResultPage />
    },
    {
        path: "/vote/:id",
        element: <VotePage />
    },
    {
        path: "/share/:id",
        element: <SharePage />
    },
    {
        path: "/quiz/:voteId/:optionId",
        element: <QuizPage />
    },
    {
        path: "*",
        element: <Error404 />
    }
])