import { FC, useState, ChangeEvent } from 'react'
import { Box, Card, Stack, TextField, Typography, Button, Divider, Tooltip, IconButton, Grid, Container } from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { Delete } from '@mui/icons-material'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { useNavigate, generatePath } from 'react-router-dom'
import { Quiz } from '../../types/Quiz'

export const CreatePage:FC = () => {
    const navigate = useNavigate()

    const [author, setAuthor] = useState("");
    const [limit, setLimit] = useState(dayjs());

    const [question, setQuestion] = useState('');
    const [selects, setSelects] = useState<Array<string>>(['', ''])

    const [quizes, setQuizes] = useState<Array<Array<Quiz>>>([
        [{
            question: '',
            options: ['', '', '', ''],
            answer: '',
            answerIndex: 0
        },{
            question: '',
            options: ['', '', '', ''],
            answer: '',
            answerIndex: 0
        }],
        [{
            question: '',
            options: ['', '', '', ''],
            answer: '',
            answerIndex: 0
        },
        {
            question: '',
            options: ['', '', '', ''],
            answer: '',
            answerIndex: 0
        }],
        [{
            question: '',
            options: ['', '', '', ''],
            answer: '',
            answerIndex: 0
        },
        {
            question: '',
            options: ['', '', '', ''],
            answer: '',
            answerIndex: 0
        }],
        [{
            question: '',
            options: ['', '', '', ''],
            answer: '',
            answerIndex: 0
        },
        {
            question: '',
            options: ['', '', '', ''],
            answer: '',
            answerIndex: 0
        }]
    ])

    const CreateQuizForGPT = async (theme: string, index: number) => {
        try {
            const res = await fetch('https://fdyoc3p9e3.execute-api.ap-northeast-1.amazonaws.com/quiz/createGPT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'theme': theme
                })
            })
            const data:{quizes: Array<Quiz>} = JSON.parse((await res.json()))

            const cp = [...quizes]
            cp.splice(index, 1, data.quizes)
            setQuizes(cp)
        } catch(e) {
            alert("SendError");
        }
    }

    const SendCreate = async () => {
        const options:Array<{option: string, quizes: Array<Quiz>}> = []
        selects.map((select, index) => {
            options.push({
                option: select,
                quiz: quizes[index]
            })
        })
        const object = {
            author: author,
            limit: limit.format('YYYY/MM/DD'),
            question: question,
            options: options
        }
    
        try {
            console.log(JSON.stringify(object))
            const res = await fetch('https://fdyoc3p9e3.execute-api.ap-northeast-1.amazonaws.com/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            const data = (await res.json())
            console.log(data)
            if (data.voteInfo.voteId) {
                navigate(generatePath('/share/:id', {id: data.voteInfo.voteId}))
            } else {
                alert("SendError");
            }
        } catch(e) {
            alert("SendError");
        }
    }

    return (
        <>
            <DefaultLayout>
                <Box maxWidth="100%">
                    <Typography variant="h4" color="black">
                        投票作成
                    </Typography>
                    <Stack spacing={5}>
                        <Card sx={{p: 3}}>
                            <Typography variant='h6' sx={{textAlign: 'left'}}>
                                | 基本情報
                            </Typography>
                            <Stack spacing={3} sx={{mx: 2, my: 2}}>
                                <TextField id='author' label='author name' variant='outlined' size='small' 
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        setAuthor(event.target.value)
                                    }}
                                />
                                <MobileDatePicker defaultValue={limit} />
                            </Stack>
                        </Card>
                        <Card sx={{p: 3}}>
                            <Typography variant='h6' sx={{textAlign: 'left'}}>
                                | 投票
                            </Typography>
                            <Stack spacing={2} sx={{mx: 2, my: 2}}>
                                <TextField id='question' label='投票タイトル' variant='outlined' size='small'
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        setQuestion(event.target.value)
                                    }}
                                />
                                <Divider />
                                <Stack spacing={4}>
                                    {selects.map((select, index) => {
                                        return (
                                            <>
                                            <Grid container spacing={0} key={index}>
                                                <Grid item xs={10}>
                                                    <TextField id={`select-${index + 1}`} label={`選択肢${index + 1}`} variant='outlined' size='small' fullWidth
                                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                            const cp = [...selects]
                                                            cp[index] = event.target.value
                                                            setSelects([...cp])
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    {index > 1 ?
                                                        <Tooltip title='delete'>
                                                            <IconButton onClick={() => {
                                                                const cp = [...selects]
                                                                cp.splice(index, 1)
                                                                setSelects([...cp])
                                                            }}>
                                                                <Delete />
                                                            </IconButton>
                                                        </Tooltip> : <></>
                                                    }
                                                </Grid>
                                            </Grid>
                                            </>
                                        )
                                    })
                                    }
                                    {selects.length < 4 ?
                                        <Button onClick={() => setSelects([...selects, ''])}>選択肢を増やす</Button>
                                        :
                                        <></>
                                    }
                                </Stack>
                            </Stack>
                        </Card>
                        {selects.map((select, selectIndex) => {
                            return (
                                <>
                                    <Card sx={{my: 5, p: 2}} key={selectIndex}>
                                        <Typography variant='h6' sx={{textAlign: 'left'}}>
                                            | クイズ-選択肢{selectIndex + 1} ({select})
                                        </Typography>
                                        {select !== '' && (
                                            <>
                                            <Container>
                                                <Stack spacing={3} sx={{my: 2}}>
                                                    <Button onClick={() => CreateQuizForGPT(select, selectIndex)}>chatGPTで問題を5問生成!</Button>
                                                    {quizes[selectIndex].map((quiz:Quiz, quizIndex:number) => {
                                                        return (
                                                            <>
                                                                <Stack spacing={3}>
                                                                    <TextField id={`quiz-${quizIndex + 1}`} label={`問題文${quizIndex + 1}`} variant='outlined' size='small' fullWidth value={quiz.question}
                                                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                                            const cp = [...quizes]
                                                                            cp[selectIndex][quizIndex].question = event.target.value
                                                                            setQuizes(cp)
                                                                        }}
                                                                    />
                                                                    <Stack spacing={2}>
                                                                        {quiz.options.map((option:Quiz, optionIndex:number) => {
                                                                            return (
                                                                                <>
                                                                                    <TextField id={`option-${quizIndex}-${optionIndex + 1}`} label={`回答${optionIndex + 1}`} variant='outlined' size='small' fullWidth value={option}
                                                                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                                                            const cp = [...quizes]
                                                                                            cp[selectIndex][quizIndex].options[optionIndex] = event.target.value
                                                                                            setQuizes(cp)
                                                                                        }}
                                                                                    />
                                                                                </>
                                                                            )
                                                                        })
                                                                        }
                                                                    </Stack>
                                                                    <Divider />
                                                                </Stack>
                                                            </>
                                                        )
                                                    })
                                                    }
                                                </Stack>
                                            </Container>
                                            </>
                                        )}
                                    </Card>
                                </>
                            )
                        })
                        }
                        <Button variant="contained" onClick={async () => await SendCreate()}>
                            Create
                        </Button>
                    </Stack>
                </Box>
            </DefaultLayout>
        </>
    )
}