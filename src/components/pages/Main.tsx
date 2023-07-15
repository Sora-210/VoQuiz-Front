import { FC, useState } from 'react'
import { Box, Card, TextField, Stack, Button, Typography } from '@mui/material'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { useNavigate, generatePath } from 'react-router-dom'

export const Main:FC = () => {
    const navigate = useNavigate()
    const [voteId, setVoteId] = useState('')

    return (
        <>
            <DefaultLayout>
                <Box maxWidth="100%">
                    <Card variant="outlined" sx={{m: 3, p: 3, borderRadius: "2em" }}>
                        <Typography variant="h4" sx={{ textAlign:"left", my: 2, fontWeight: 'bold' }}>
                            参加する
                        </Typography>
                        <Typography sx={{ my: 5 }}>
                            投票コードを入力して投票しよう！
                        </Typography>
                        <Stack spacing={3} sx={{mx: 5, my:2}}>
                            <TextField id="outlined-basic" label="VoteID" variant="outlined" inputRef={setVoteId} size="small" />
                            <Button variant="contained" disabled={!voteId} onClick={() => navigate(generatePath('/vote/:id', {id: voteId.value}))}>
                                Join
                            </Button>
                        </Stack>
                    </Card>
                    <Card variant="outlined" sx={{m: 3, p: 3, borderRadius: "2em" }}>
                        <Typography variant="h4" sx={{ textAlign:"left", my: 2, fontWeight: 'bold' }}>
                            作成する
                        </Typography>
                        <Typography sx={{ my: 5 }}>
                            投票を開始しよう！
                        </Typography>
                        <Stack spacing={3} sx={{mx: 5, my:2}}>
                            <Button variant="contained" onClick={() => navigate('/create')}>
                                Create
                            </Button>
                        </Stack>
                    </Card>
                    <Button onClick={() => navigate("/dev") }>
                        Debug Page
                    </Button>
                </Box>
            </DefaultLayout>
        </>
    )
}