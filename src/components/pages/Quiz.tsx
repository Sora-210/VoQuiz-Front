import { FC, useState, useEffect, ChangeEvent } from 'react'
import { Box, Card, Stack, Button, Typography, Container, TextField, Divider, Grid } from '@mui/material'
import { Stepper, Step, StepLabel } from '@mui/material'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { Quiz } from '../../types/Quiz'
import { Close, PanoramaFishEye } from '@mui/icons-material'

export const QuizPage:FC = () => {
    const params = useParams<{voteId: string, optionId: string}>()
    const navigator = useNavigate()

    const [quizes, setQuizes] = useState<Array<Quiz>>([])
    const [nowQuiz, setNowQuiz] = useState(0)

    // 内部制御用
    const [steps, setSteps] = useState<Array<string>>(['Name', 'Result'])
    const [activeStep, setActiveStep] = useState(0)

    // 回答者記録用
    const [name, setName] = useState('')
    const [answers, setAnswers] = useState<Array<number>>([])
    const [score, setScore] = useState(0)

    // 回答送信
    const sendVote = async (voteId: string, optionId: string) => {
        try {
            let count = 0;
            quizes.forEach((quiz, index) => {
                count += (quiz.answerIndex === answers[index]) ? 1 : 0;
            })
            setScore(count)

            const res = await fetch(`https://fdyoc3p9e3.execute-api.ap-northeast-1.amazonaws.com/vote/${voteId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: name,
                    voteOptionId: optionId,
                    voteCount: count
                })
            })

            console.log('Vote')
        } catch(e) {
            alert('Error');
        }
    }

    useEffect(() => {
        const getData = async (optionId: string) => {
            try {
                const res = await fetch(`https://fdyoc3p9e3.execute-api.ap-northeast-1.amazonaws.com/quiz/${optionId}`)
                const data:Array<Quiz> = (await res.json()).quizes
                
                const label = []
                for (let i=1; i <= data.length; i++) { label.push(`Quiz${i}`) }
                const cp = ['Name', 'Result']
                cp.splice(1, 0, ...label)
                setSteps(cp)

                setQuizes(data)
            } catch(e) {
                alert('Error');
            }
        }

        getData(params.optionId)
    }, [])


    return (
        <>
            <DefaultLayout>
                <Box maxWidth="100%">
                    <Stepper activeStep={activeStep} alternativeLabel sx={{my: 2}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Container sx={{my: 3}}>
                        {activeStep === 0 && (
                            <Card sx={{m: 3, p: 3}}>
                                <Stack spacing={4}>
                                    <Typography>
                                        名前を入力してください！
                                    </Typography>
                                    <TextField id='name' label='回答者名' variant='outlined' size='small' fullWidth value={name}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            setName(event.target.value)
                                        }}
                                    />
                                    <Button onClick={() => setActiveStep(1)} disabled={name === ''}>次へ</Button>
                                </Stack>
                            </Card>
                        )}
                        {(0 < activeStep && activeStep < steps.length - 1) && (
                            <>
                            <Card sx={{m: 3, p: 2}}>
                                <Typography variant='h6' sx={{textAlign: 'left'}}>
                                    Quiz { activeStep }
                                </Typography>
                                <Typography>
                                    { quizes[activeStep - 1].question }
                                </Typography>
                            </Card>
                            <Stack spacing={4} sx={{mx: 6}}>
                                {quizes[activeStep - 1].options.map((option, index) => {
                                    return (
                                        <Button variant="outlined" key={index} onClick={() => {
                                            setAnswers([...answers, index])
                                            if (activeStep === steps.length - 2) {sendVote(params.voteId, params.optionId)}
                                            setActiveStep(activeStep + 1)
                                        }}>
                                            { option }
                                        </Button>
                                    )
                                })}
                            </Stack>
                            </>
                        )}
                        {(activeStep === steps.length - 1) && (
                            <Card sx={{m: 3, p: 3}}>
                                <Stack spacing={4}>
                                    <Typography variant='h6'>
                                        - 結果 -
                                    </Typography>
                                    <Divider />
                                    <Grid container>
                                        {quizes.map((quiz, index) => (
                                            <>
                                            {(quiz.answerIndex === answers[index]) ?
                                                <Grid item xs={4}><PanoramaFishEye /></Grid>:<Grid item xs={4}><Close /></Grid>
                                            }
                                            <Grid item xs={8}>Quiz {index + 1}</Grid>
                                            </>
                                        ))}
                                    </Grid>
                                    <Divider />
                                    <Typography variant='h6'>
                                        Score: {score}
                                    </Typography>
                                    <Divider />
                                    <Button onClick={() => {
                                        navigator(generatePath("/result/:voteId", { voteId: params.voteId }))
                                    }}>投票結果を見る</Button>
                                </Stack>
                                
                            </Card>
                        )}
                    </Container>
                    


                    
                </Box>
            </DefaultLayout>
        </>
    )
}