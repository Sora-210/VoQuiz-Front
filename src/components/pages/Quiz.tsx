import { FC, useState, useEffect } from 'react'
import { Box, Card, Stack, Button, Typography } from '@mui/material'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { useParams } from 'react-router-dom'
import { Quiz } from '../../types/Quiz'

export const QuizPage:FC = () => {
    const params = useParams<{voteId: string, optionId: string}>()

    const [quizes, setQuizes] = useState(Array<Quiz>)
    const [nowQuiz, setNowQuiz] = useState(0)


    useEffect(() => {
        
        alert('Error')
        setQuizes([
            {
                question: '問題',
                options: ['選択肢1', '選択肢2', '選択肢3', '選択肢4'],
                answer: '選択肢1'
            }
        ])
        console.log(quizes)

        // const getData = (voteId: string, optionId: string) => {
        //     setQuizes([
        //         {
        //             question: '問題',
        //             options: ['選択肢1', '選択肢2', '選択肢3', '選択肢4'],
        //             answer: '選択肢1'
        //         }
        //     ])
        //     console.log(quizes[nowQuiz])
        //     alert('Error')
        //     // try {
        //     //     const res = await fetch(`https://fdyoc3p9e3.execute-api.ap-northeast-1.amazonaws.com/quiz/${voteId}/${optionId}`)
        //     //     const data:Array<Quiz> = (await res.json()).quizes
        //     //     setQuizes(data)
        //     // } catch(e) {
        //     //     alert('Error');
        //     // }
        // }

        // getData(params.voteId, params.optionId)
    }, [])


    return (
        <>
            <DefaultLayout>
                <Box maxWidth="100%">
                    {(quizes.length != 0) ?
                    <>
                    <Card sx={{m: 3, p: 3}}>
                        <Typography>
                            Quiz { nowQuiz }
                        </Typography>
                        <Typography>
                            { quizes[nowQuiz].question }
                        </Typography>
                    </Card>
                    <Stack spacing={4} sx={{mx: 10}}>
                        {quizes[nowQuiz].options.map((option, index) => {
                            return (
                                <Button variant="outlined" key={index} onClick={() => alert(option)}>
                                    { option }
                                </Button>
                            )
                        })}
                    </Stack>
                    </> :
                    <>
                    </>
                    }
                </Box>
            </DefaultLayout>
        </>
    )
}