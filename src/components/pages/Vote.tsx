import { FC, useState, useEffect } from 'react'
import { Box, Card, Stack, Button, Typography } from '@mui/material'
import { PendingActions, Person } from '@mui/icons-material'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { useParams, useNavigate, generatePath } from 'react-router-dom'
import { Vote, Option } from '../../types/Vote'

export const VotePage:FC = () => {
    const [author, setAuthor] = useState("");
    const [limit, setLimit] = useState("");
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(Array<Option>)
    const [selectOption, setSelectOption] = useState("")

    const params = useParams<{id: string}>()
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async(voteId: string) => {
            try {
                const res = await fetch(`https://fdyoc3p9e3.execute-api.ap-northeast-1.amazonaws.com/vote/${voteId}`)
                const data:Vote = (await res.json())
                setQuestion(data.question)
                setOptions(data.options)
                setAuthor(data.author)
                setLimit(data.limit)
            } catch(e) {
                navigate('/404')
            }
        }

        getData(params.id)
    }, [])

    const Vote = () => {
        navigate(generatePath('/quiz/:optionId', { optionId: selectOption }))
    }


    return (
        <>
            <DefaultLayout>
                <Box maxWidth="100%">
                    <Box color='black' sx={{ textAlign: 'right', mx: 3}}>
                        <Typography sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Person /> {author}
                        </Typography>
                        <Typography sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <PendingActions /> {limit}
                        </Typography>
                    </Box>
                    <Card sx={{m: 3, p: 3}}>
                        <Typography>
                            { question }
                        </Typography>
                    </Card>
                    <Stack spacing={4} sx={{mx: 10}}>
                        {options.map((option) => {
                            return (
                                <Button variant={option.optionId == selectOption ? "contained" : "outlined"} key={option.optionId} onClick={() => setSelectOption(option.optionId)}>
                                    { option.option }
                                </Button>
                            )
                        })}
                        <Button variant="contained" onClick={Vote}>
                            Vote
                        </Button>
                    </Stack>
                </Box>
            </DefaultLayout>
        </>
    )
}